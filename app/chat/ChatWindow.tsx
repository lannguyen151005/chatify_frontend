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
}

export const ChatWindow = ({ messages, isTyping, activeChatName, onSendMessage, onTyping, onUploadFile, isMobileChatOpen, onBackToList, onlineCount }: ChatWindowProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  return (
    // Thêm h-100
    <div className={`col-12 col-md-7 col-lg-8 d-flex flex-column h-100 ${!isMobileChatOpen ? 'd-none d-md-flex' : ''}`}>

      {/* HEADER MOBILE */}
      <div className="d-flex d-md-none align-items-center p-3 border-bottom bg-light">
        <button className="btn btn-sm btn-outline-secondary me-3" onClick={onBackToList}>
          <i className="fas fa-chevron-left"></i>
        </button>
        <div>
          <h5 className="mb-0 fw-bold">{activeChatName}</h5>

          {/* LOGIC HIỂN THỊ TRẠNG THÁI (Dùng cho cả 1-1 và Group) */}
          {onlineCount && onlineCount > 0 ? (
            <small className="text-success fw-bold d-flex align-items-center">
              <span
                className="bg-success rounded-circle me-1"
                style={{ width: "8px", height: "8px", display: "inline-block" }}
              ></span>
              {onlineCount === 1 ? "Đang hoạt động" : `${onlineCount + 1} người đang hoạt động`}
            </small>
          ) : (
            <small className="text-muted d-flex align-items-center">
              <span
                className="bg-secondary rounded-circle me-1"
                style={{ width: "8px", height: "8px", display: "inline-block" }}
              ></span>
              Ngoại tuyến
            </small>
          )}
        </div>
      </div>

      {/* BONG BÓNG TIN NHẮN: Dùng flex-grow-1 thay cho height fix cứng */}
      <div className="p-3 flex-grow-1" style={{ overflowY: "auto", backgroundColor: "#f8f9fa" }}>
        {messages.map((msg, index) => (
          <MessageItem key={index} {...msg} />
        ))}
        {isTyping && <div className="text-muted small ms-3 mt-2 font-italic">Ai đó đang gõ...</div>}
        <div ref={messagesEndRef} />
      </div>

      {/* Ô NHẬP TIN NHẮN: Luôn bám đáy */}
      <div className="mt-auto bg-white border-top">
        <ChatInput onSendMessage={onSendMessage} onTyping={onTyping} onUploadFile={onUploadFile} />
      </div>
    </div>
  );
};