import { useState } from "react";

interface ChatInputProps{
    onSendMessage: (text: string) => void;
    onTyping: () => void;
    onUploadFile: (file: File) => void; 
}

export const ChatInput = ({onSendMessage, onTyping, onUploadFile}: ChatInputProps) => {
    const [text, setText] = useState("");
    
    return (
    <div className="text-muted d-flex justify-content-start align-items-center pe-3 pt-3 mt-2">
      <input
        type="text"
        className="form-control form-control-lg"
        placeholder="Type message"
        value={text}
        onChange={(e) => { setText(e.target.value); onTyping(); }}
        onKeyDown={(e) => { if(e.key === 'Enter') { onSendMessage(text); setText(""); } }}
      />
      {/* Nút đính kèm ảnh */}
      <label className="ms-1 text-muted" style={{ cursor: 'pointer' }}>
        <i className="fas fa-paperclip"></i>
        <input 
          type="file" 
          hidden 
          onChange={(e) => e.target.files && onUploadFile(e.target.files[0])} 
        />
      </label>
      <a className="ms-3 text-muted" href="#!"><i className="fas fa-smile"></i></a>
      <button className="btn p-0 ms-3 text-primary" onClick={() => { onSendMessage(text); setText(""); }}>
        <i className="fas fa-paper-plane"></i>
      </button>
    </div>
  );
};
