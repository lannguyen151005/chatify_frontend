import React from 'react';
import { ConversationItem } from './items/ConversationItem';

interface ConversationListProps {
  conversations: any[];
  onSelectConversation: (id: string, name: string) => void;
  isMobileChatOpen: boolean; 
}

export const ConversationList = ({ conversations, onSelectConversation, isMobileChatOpen }: ConversationListProps) => {
  return (
    // Thêm h-100 và d-flex flex-column
    <div className={`col-12 col-md-5 col-lg-4 border-end h-100 d-flex flex-column ${isMobileChatOpen ? 'd-none d-md-flex' : ''}`}>
      {/* Phần Search Bar (Không thay đổi) */}
      <div className="p-3 border-bottom">
        <div className="input-group rounded">
          <input type="search" className="form-control rounded" placeholder="Search users..." />
          <span className="input-group-text border-0"><i className="fas fa-search"></i></span>
        </div>
      </div>

      {/* Dùng flex-grow-1 để nó tự kéo dãn hết phần màn hình còn lại */}
      <div className="flex-grow-1" style={{ overflowY: "auto" }}>
        <ul className="list-unstyled mb-0">
          {conversations.map((conv, index) => (
            <div key={index} onClick={() => onSelectConversation(conv.id, conv.name)} style={{ cursor: "pointer" }}>
              <ConversationItem {...conv} />
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};