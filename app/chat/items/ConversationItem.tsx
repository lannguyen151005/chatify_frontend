interface ConversationItemProps {
  name: string;
  lastMessage: string;
  avatar: string;
  time: string;
  isOnline: boolean;
  unreadCount?: number;
  isActive?: boolean;
}

export const ConversationItem = ({ name, lastMessage, avatar, time, isOnline, unreadCount, isActive }: ConversationItemProps) => (
  <li className={`p-2 border-bottom ${isActive ? 'bg-light' : ''}`}>
    <a href="#!" className="d-flex justify-content-between text-decoration-none">
      <div className="d-flex flex-row">
        <div>
          <img src={avatar} alt="avatar" className="d-flex align-self-center me-3" width="60" />
          <span className={`badge ${isOnline ? 'bg-success' : 'bg-secondary'} badge-dot`}></span>
        </div>
        <div className="pt-1">
          <p className="fw-bold mb-0 text-dark">{name}</p>
          <p className="small text-muted">{lastMessage}</p>
        </div>
      </div>
      <div className="pt-1">
        <p className="small text-muted mb-1">{time}</p>
        {unreadCount && <span className="badge bg-danger rounded-pill float-end">{unreadCount}</span>}
      </div>
    </a>
  </li>
);