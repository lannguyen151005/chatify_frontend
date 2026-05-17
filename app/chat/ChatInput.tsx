import { useState } from "react";

interface ChatInputProps {
    onSendMessage: (text: string) => void;
    onTyping: () => void;
    onUploadFile: (file: File) => void; 
}

export const ChatInput = ({ onSendMessage, onTyping, onUploadFile }: ChatInputProps) => {
    const [text, setText] = useState("");

    const handleSend = () => {
        if (text.trim()) {
            onSendMessage(text);
            setText(""); // Xóa trắng ô nhập liệu sau khi gửi
        }
    };

    // Hàm bắt sự kiện bàn phím
    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        // Nếu người dùng bấm Enter VÀ KHÔNG giữ phím Shift
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault(); // Ngăn hành vi tự động văng xuống dòng của textarea
            handleSend();       // Thực hiện gửi tin nhắn
        }
    };

    return (
        <div className="text-muted d-flex justify-content-start align-items-center pe-3 pt-3 mt-2 mb-2">

            <textarea
                className="form-control form-control-lg"
                placeholder="Type message..."
                value={text}
                onChange={(e) => { setText(e.target.value); onTyping(); }}
                onKeyDown={handleKeyDown}
                rows={1} // Chiều cao mặc định ban đầu là 1 dòng
                style={{
                    resize: "none",        // Khóa không cho người dùng tự kéo giãn khung
                    overflowY: "auto",     // Tự động hiện thanh cuộn nếu văn bản quá dài
                    maxHeight: "120px",    // Giới hạn chiều cao tối đa không che khuất màn hình
                    whiteSpace: "pre-wrap" // Giữ nguyên khoảng trắng và dấu xuống dòng
                }}
            />
            

            <label className="ms-3 text-muted mb-0" style={{ cursor: 'pointer' }}>
                <i className="fas fa-paperclip"></i>
                <input 
                    type="file" 
                    hidden 
                    onChange={(e) => {
                        if (e.target.files && e.target.files.length > 0) {
                            onUploadFile(e.target.files[0]);
                        }
                    }} 
                />
            </label>
            
            <a className="ms-3 text-muted" href="#!"><i className="fas fa-smile"></i></a>
            
            <button className="btn p-0 ms-3 text-primary" onClick={handleSend}>
                <i className="fas fa-paper-plane" style={{ fontSize: '1.2rem' }}></i>
            </button>
        </div>
    );
};