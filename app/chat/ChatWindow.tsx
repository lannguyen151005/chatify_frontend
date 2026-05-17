import React, { useEffect, useRef } from 'react';
import { MessageItem } from './items/MessageItem';
import { ChatInput } from './ChatInput';

interface ChatWindowProps {
  messages: any[];
  isTyping: boolean;
  activeChatName: string;
  onSendMessage: (text: string) => void;
  onTyping: () => void;
  onUploadFile: (file: File) => void;
  isMobileChatOpen: boolean;
  onBackToList: () => void;
  onlineCount?: number;
  
  // Thêm các prop phân trang từ ChatPage truyền xuống
  onLoadMore: () => Promise<void>;
  hasMore: boolean;
  isLoadingMore: boolean;
}

export const ChatWindow = ({ 
  messages, isTyping, activeChatName, onSendMessage, onTyping, 
  onUploadFile, isMobileChatOpen, onBackToList, onlineCount,
  onLoadMore, hasMore, isLoadingMore 
}: ChatWindowProps) => {
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null); // Khai báo ref để điều khiển thanh cuộn
  
  // Dùng các Ref này để ghi nhớ trạng thái tin nhắn cuối cùng, chống cuộn bừa bãi
  const lastMsgIdRef = useRef<string | number | undefined>(undefined);
  const prevChatNameRef = useRef<string>("");

  // 1. Thuật toán tự động cuộn thông minh (Chỉ cuộn xuống khi có tin nhắn MỚI xuất hiện)
  useEffect(() => {
    if (messages.length === 0) return;
    
    const lastMessage = messages[messages.length - 1];
    // Kiểm tra xem tin nhắn cuối cùng có phải tin nhắn mới tinh không (hoặc tin ảo chưa có id)
    const hasNewMessage = lastMessage?.id !== lastMsgIdRef.current || !lastMessage?.id;
    const isNewChat = activeChatName !== prevChatNameRef.current;

    // Nếu đổi phòng chat hoặc có tin nhắn mới tinh -> Cuộn xuống đáy khung chat
    if (isNewChat || hasNewMessage) {
      messagesEndRef.current?.scrollIntoView({ behavior: isNewChat ? "auto" : "smooth" });
    }

    // Ghi nhớ lại dấu vết cho lần render sau
    lastMsgIdRef.current = lastMessage?.id;
    prevChatNameRef.current = activeChatName;
  }, [messages, isTyping, activeChatName]);

  // 2. Thuật toán bắt sự kiện cuộn lên đỉnh (Scroll Up to Load More)
  const handleScroll = async (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    
    // Khi người dùng cuộn kịch lên đỉnh (scrollTop === 0) và hệ thống báo vẫn còn tin cũ
    if (target.scrollTop === 0 && hasMore && !isLoadingMore) {
      
      // BƯỚC THẦN THÁNH: Lưu lại tổng chiều cao (scrollHeight) của khung chat TRƯỚC KHI TẢI
      const oldScrollHeight = target.scrollHeight;
      
      await onLoadMore(); // Gọi hàm lên ChatPage tải tin cũ về
      
      // Sau khi tin cũ chèn vào đầu mảng, tính toán lại độ lệch chiều cao và bù đắp vị trí cuộn
      setTimeout(() => {
        if (scrollContainerRef.current) {
          const newScrollHeight = scrollContainerRef.current.scrollHeight;
          // Vị trí cuộn mới = Chiều cao mới - Chiều cao cũ. Giúp màn hình đứng im re!
          scrollContainerRef.current.scrollTop = newScrollHeight - oldScrollHeight;
        }
      }, 30);
    }
  };

  return (
    <div className={`col-12 col-md-7 col-lg-8 d-flex flex-column h-100 ${!isMobileChatOpen ? 'd-none d-md-flex' : ''}`}>

      {/* HEADER (Hiện trên cả Mobile và PC) */}
      <div className="d-flex align-items-center p-3 border-bottom bg-light">
        <button className="btn btn-sm btn-outline-secondary me-3 d-md-none" onClick={onBackToList}>
          <i className="fas fa-chevron-left"></i>
        </button>
        <div>
          <h5 className="mb-0 fw-bold">{activeChatName}</h5>
          {onlineCount && onlineCount > 0 ? (
            <small className="text-success fw-bold d-flex align-items-center">
              <span className="bg-success rounded-circle me-1" style={{ width: "8px", height: "8px", display: "inline-block" }}></span>
              {onlineCount === 1 ? "Đang hoạt động" : `${onlineCount + 1} người đang hoạt động`}
            </small>
          ) : (
            <small className="text-muted d-flex align-items-center">
              <span className="bg-secondary rounded-circle me-1" style={{ width: "8px", height: "8px", display: "inline-block" }}></span>
              Ngoại tuyến
            </small>
          )}
        </div>
      </div>

      {/* BONG BÓNG TIN NHẮN: Đã thêm gắn ref và hàm onScroll */}
      <div 
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="p-3 flex-grow-1" 
        style={{ overflowY: "auto", backgroundColor: "#f8f9fa" }}
      >
        {/* Vòng quay Loading nhỏ xinh xuất hiện ở đỉnh khi đang tải tin nhắn cũ */}
        {isLoadingMore && (
          <div className="text-center my-2 text-muted small d-flex align-items-center justify-content-center">
            <div className="spinner-border spinner-border-sm text-secondary me-2" role="status"></div>
            Đang tải tin nhắn cũ hơn...
          </div>
        )}

        {messages.map((msg, index) => (
          <MessageItem key={index} {...msg} />
        ))}
        {isTyping && <div className="text-muted small ms-3 mt-2 font-italic">Ai đó đang gõ...</div>}
        <div ref={messagesEndRef} />
      </div>

      {/* Ô NHẬP TIN NHẮN */}
      <div className="mt-auto bg-white border-top">
        <ChatInput onSendMessage={onSendMessage} onTyping={onTyping} onUploadFile={onUploadFile} />
      </div>
    </div>
  );
};