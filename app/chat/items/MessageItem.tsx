interface MessageItemProps{
    content: string;
    time: string;
    isMe: boolean;
    avatar: string;
    attachment_url: string;
}

export const MessageItem = ({content, time, isMe, avatar, attachment_url}: MessageItemProps) => {
    return (
    <div className={`d-flex flex-row ${isMe ? 'justify-content-end' : 'justify-content-start'}`}>
      {!isMe && <img src={avatar} alt="avatar" style={{ width: "45px", height: "100%" }} />}
      
      <div style={{ maxWidth: "75%" }}> 
        
        <div 
            className={`small p-2 ${isMe ? 'me-3 text-white bg-primary' : 'ms-3 bg-body-secondary'} mb-1 rounded-3 text-break`}
            style={{ whiteSpace: "pre-wrap" }}
        >
          {content}
          {attachment_url && (
            <img src={attachment_url} className="d-block mt-2 rounded" style={{ maxWidth: '100%', height: 'auto' }} alt="sent attachment" />
          )}
        </div>
        
        <p className={`small ${isMe ? 'me-3' : 'ms-3'} mb-3 rounded-3 text-muted ${isMe ? 'text-end' : ''}`}>
          {time}
        </p>
      </div>

      {isMe && <img src={avatar} alt="avatar" style={{ width: "45px", height: "100%" }} />}
    </div>
  );
};