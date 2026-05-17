"use client";

import React, { useEffect, useState } from 'react';
import { ConversationList } from './chat/ConversationList';
import { ChatWindow } from './chat/ChatWindow';
import api from './utils/api';
import useWebSocket from 'react-use-websocket';

export default function ChatPage() {

  const [conversations, setConversations] = useState([]);
  const [messages, setMessages] = useState<any[]>([]);

  const [isMobileChatOpen, setIsMobileChatOpen] = useState(false);
  const [activeChat, setActiveChat] = useState({ id: "", name: "" });
  const [isTyping, setIsTyping] = useState(false);

  const [onlineUsers, setOnlineUsers] = useState<Set<string>>(new Set);

  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);


  //Lay thong tin chung thuc tu local storage
  const token = typeof window !== "undefined" ? localStorage.getItem("jwt_token") : "";
  const myUserId = typeof window !== "undefined" ? localStorage.getItem("user_id") : "";

  //Lay danh sach phong chat
  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const res = await api.get('/api/conversations');

        const formattedData = res.data.map((conv: any) => {
          const timeString = new Date(conv.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

          return {
            id: conv.id,
            name: conv.title || "Phòng chat chưa đặt tên",
            lastMessage: "Bấm để xem tin nhắn...",
            time: timeString,
            avatar: "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp",
            isOnline: true
          };
        });

        setConversations(formattedData);
      } catch (error) {
        console.error("Lỗi lấy danh sách phòng chat:", error);
      }
    };
    fetchConversations();
  }, []);

  const loadMoreMessages = async () => {
    // nếu đang tải hoặc đã hết tin nhắn cũ hoặc chưa chọn chat thì bỏ qua
    if (isLoadingMore || !hasMore || !activeChat.id) return;

    setIsLoadingMore(true);
    const nextPage = page + 1;

    try {
      const [res] = await Promise.all([
        api.get(`/api/messages/${activeChat.id}?page=${nextPage}&size=20`),
        new Promise(resolve => setTimeout(resolve, 1700)) 
      ]);

      if (res.data.length < 20) {
        setHasMore(false); // Hết dữ liệu cũ
      }

      if (res.data.length > 0) {
        const olderMessages = res.data.map((msg: any) => ({
          id: msg.id,
          content: msg.content,
          time: new Date(msg.created_at).toLocaleTimeString(),
          isMe: msg.user_id === myUserId,
          avatar: msg.user_id === myUserId ? "/my-avatar.png" : "/friend-avatar.png",
          attachmentUrl: msg.attachment_url
        }));

        //Nối tin nhắn cũ vào đầu mảng
        setMessages(prev => [...olderMessages, ...prev]);
        setPage(nextPage);
      }
    } catch (error) {
      console.error("Lỗi tải thêm tin nhắn cũ:", error);
    } finally {
      setIsLoadingMore(false);
    }
  };

  const handleSelectConversation = async (id: string, name: string) => {
    setActiveChat({ id, name });
    setIsMobileChatOpen(true);
    setOnlineUsers(new Set);

    //Reset phân trang khi đổi phòng chat
    setPage(0);
    setHasMore(true);
    setIsLoadingMore(false);

    try {
      const res = await api.get(`/api/messages/${id}?page=0&size=20`);
      const historyMessages = res.data.map(
        (msg: any) => (
          {
            id: msg.id,
            content: msg.content,
            time: new Date(msg.created_at).toLocaleTimeString(),
            isMe: msg.user_id === myUserId,
            avatar: msg.user_id === myUserId ? "/my-avatar.png" : "/friend-avatar.png",
            attachmentUrl: msg.attachment_url
          }
        )
      );
      //Nếu dữ liệu trả về ít hơn 20 -> hết tin nhắn cũ
      if (res.data.length < 20) {
        setHasMore(false);
      }
      setMessages(historyMessages);
    } catch (error) {
      console.error("Lỗi lấy lịch sử tin nhắn:", error);
      setMessages([]);
    }

    try {
      //Lấy danh sách user online trong group
      const onlineRes = await api.get(`/api/conversations/${id}/online-users`);
      //Lọc bỏ id của mình
      const otherOnlineUsers = onlineRes.data.filter((uid: string) => uid != myUserId);
      setOnlineUsers(new Set(otherOnlineUsers));
    } catch (error) {
      console.log("Lỗi không thể lấy danh sách online:", error);
    }
  };

  // url kết nối websocket chỉ kết nối khi đã chọn 1 phòng chat (có activeChat.id)
  const socketUrl = activeChat.id ? `ws://localhost:8080/chat/${activeChat.id}?token=${token}` : null;

  const { sendMessage: sendWsMessage, lastJsonMessage } = useWebSocket(socketUrl, {
    shouldReconnect: () => true,
  });

  // Lắng nghe sự kiện đẩy về từ Quarkus (Hứng luồng dữ liệu)
  useEffect(() => {
    if (lastJsonMessage) {
      const data: any = lastJsonMessage;

      // xử lý luồng trạng thái Online/Offline
      if (data.type === "STATUS") {
        // Chỉ quan tâm trạng thái của người khác, không phải của mình
        if (data.user_id !== myUserId) {
          setOnlineUsers(prev => {
            const newSet = new Set(prev);
            if (data.is_online) {
              newSet.add(data.user_id); // Có người vào -> Thêm vào danh sách
            } else {
              newSet.delete(data.user_id); // Có người thoát -> Xóa khỏi danh sách
            }
            return newSet;
          });
        }
        return;
      }

      // Xử lý luồng Đang gõ
      if (data.type === "TYPING") {
        // Chỉ hiện chữ "Đang gõ" nếu người gõ không phải là mình
        if (data.senderId !== myUserId) {
          setIsTyping(true);
          setTimeout(() => setIsTyping(false), 3000);
        }
        return;
      }

      // Xử lý luồng Đã xem
      if (data.type === "READ") {
        console.log(`User ${data.userId} đã xem tin nhắn`);
        return;
      }

      // Xử lý tin nhắn mới (CHAT)
      // Nếu tin nhắn nhận được KHÔNG PHẢI của mình gửi thì mới cần render thêm (để tránh bị lặp 2 lần do mình đã render ở hàm handleSendMessage rồi)
      if (data.user_id !== myUserId) {
        const incomingMsg = {
          id: data.id,
          content: data.content,
          time: new Date().toLocaleTimeString(),
          isMe: false, // Chắc chắn là của người kia
          avatar: "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp",
          attachmentUrl: data.attachment_url
        };
        setMessages(prev => [...prev, incomingMsg]);
      }
    }
  }, [lastJsonMessage, myUserId]);

  // Hành động nhấn nút Gửi tin nhắn
  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    // 1. Hiển thị ngay lên màn hình của mình
    const optimisticMsg = {
      content: text,
      time: new Date().toLocaleTimeString(),
      isMe: true,
      avatar: "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava6-bg.webp"
    };
    setMessages(prev => [...prev, optimisticMsg]);

    // 2. Bắn data JSON chuẩn DTO qua ống WebSocket lên Quarkus
    sendWsMessage(JSON.stringify({
      type: "CHAT",
      content: text
    }));
  };

  const handleTyping = () => {
    sendWsMessage(JSON.stringify({ type: "TYPING" }));
  };

  // Tính năng Upload Ảnh (Tái sử dụng API Cloudinary)
  const handleUploadFile = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const response = await api.post('/api/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      const fileUrl = response.data.url;

      // Hiển thị tạm ảnh của mình lên màn hình
      setMessages(prev => [...prev, {
        content: "Đã gửi một ảnh", time: new Date().toLocaleTimeString(), isMe: true,
        avatar: "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava6-bg.webp",
        attachmentUrl: fileUrl
      }]);

      // Bắn link qua WS cho người kia
      sendWsMessage(JSON.stringify({
        type: "CHAT", content: "Đã gửi một ảnh", attachment_url: fileUrl
      }));
    } catch (error) {
      alert("Lỗi tải ảnh lên!");
    }
  };

  return (
    <section
      className="d-flex justify-content-center align-items-center vh-100 overflow-hidden"
      style={{ backgroundColor: "#d6f0f4" }}
    >
      {/* p-0 (Mobile): Không có padding, tràn viền */}
      {/* p-md-4 (PC): Thêm padding 24px để tạo lề */}
      <div
        className="w-100 h-100 p-0 p-md-4 d-flex justify-content-center"
        style={{ maxWidth: "1400px" }}
      >
        <div
          className="card shadow-lg w-100 h-100 border-0"
          id="chat3"
          style={{ overflow: "hidden" }}
        >
          {/* Thêm p-0 cho mobile, p-md-3 cho PC */}
          <div className="card-body h-100 p-0 p-md-3">
            <div className="row h-100 g-0">

              {/* BÊN TRÁI: Danh sách phòng chat */}
              <ConversationList
                conversations={conversations}
                onSelectConversation={handleSelectConversation}
                isMobileChatOpen={isMobileChatOpen}
              />

              {/* BÊN PHẢI: Khung chat hoặc Màn hình chào mừng */}
              {activeChat.id ? (
                <ChatWindow
                  messages={messages}
                  isTyping={isTyping}
                  activeChatName={activeChat.name}
                  onSendMessage={handleSendMessage}
                  onlineCount={onlineUsers.size}
                  onTyping={handleTyping}
                  onUploadFile={handleUploadFile}
                  isMobileChatOpen={isMobileChatOpen}
                  onBackToList={() => setIsMobileChatOpen(false)}
                  onLoadMore={loadMoreMessages}
                  hasMore={hasMore}
                  isLoadingMore={isLoadingMore}
                />
              ) : (
                /* MÀN HÌNH TRỐNG KHI CHƯA CHỌN PHÒNG CHAT */
                <div
                  className={`col-12 col-md-7 col-lg-8 d-flex flex-column justify-content-center align-items-center h-100 bg-light ${!isMobileChatOpen ? 'd-none d-md-flex' : ''}`}
                >
                  <div className="text-center text-muted">
                    <div className="mb-3">
                      <i className="fas fa-comments text-secondary" style={{ fontSize: "4rem", opacity: 0.5 }}></i>
                    </div>
                    <h4>Chào mừng đến với Chatify!</h4>
                    <p>Hãy chọn một phòng chat bên trái để bắt đầu trò chuyện.</p>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}