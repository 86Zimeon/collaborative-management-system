import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCircle, faComment } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import FormModal from './FormModal';
import { messageService } from '../../services/messageService';
import { socketService } from '../../services/socketService';

const SidebarContainer = styled.div`
  width: 100%;
  height: 100vh;
  background: var(--surface);
  overflow-y: auto;
`;

const Header = styled.div`
  padding: 1rem;
  border-bottom: 1px solid var(--border);
  font-weight: 500;
  color: var(--text);
  position: sticky;
  top: 0;
  background: var(--surface);
  z-index: 1;
`;

const UserItem = styled.div`
  padding: 1rem;
  cursor: pointer;
  border-bottom: 1px solid var(--border);
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: var(--text);
  transition: background 0.2s;

  &:hover {
    background: var(--hover-bg);
  }

  svg:first-child {
    width: 24px;
    height: 24px;
    color: var(--text-secondary);
  }
`;

const UserStatus = styled.span`
  color: ${props => props.$online ? '#2ecc71' : '#95a5a6'};
  font-size: 0.75rem;
  margin-left: auto;
  
  svg {
    width: 8px;
    height: 8px;
  }
`;

export default function UsersSidebar() {
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [showNewChatModal, setShowNewChatModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOnlineUsers = async () => {
      try {
        const response = await fetch('/api/notifications/online-users');
        const data = await response.json();
        setOnlineUsers(data.filter(u => u.userId !== user._id));
      } catch (error) {
        console.error('Error fetching online users:', error);
      }
    };
    fetchOnlineUsers();

    // Use socketService for real-time updates
    socketService.on('user_status_changed', (data) => {
      setOnlineUsers(prev => {
        const userIndex = prev.findIndex(u => u.userId === data.userId);
        if (userIndex === -1 && data.status === 'online') {
          return [...prev, { userId: data.userId, name: data.name, status: 'online' }];
        } else if (data.status === 'offline') {
          return prev.filter(u => u.userId !== data.userId);
        }
        return prev;
      });
    });

    return () => {
      socketService.off('user_status_changed');
    };
  }, [user._id]);

  const startNewChat = async () => {
    if (!selectedUser) return;

    try {
      const response = await messageService.createChat({
        users: [selectedUser.userId],
        type: 'private'
      });
      setShowNewChatModal(false);
      setSelectedUser(null);
      navigate('/messages', { state: { chatId: response.data._id } });
    } catch (error) {
      console.error('Error creating chat:', error);
    }
  };

  return (
    <SidebarContainer>
      <Header>Online Users</Header>
      {onlineUsers.map(onlineUser => (
        <UserItem 
          key={onlineUser.userId} 
          onClick={() => {
            setSelectedUser(onlineUser);
            setShowNewChatModal(true);
          }}
        >
          <FontAwesomeIcon icon={faUser} />
          <span>{onlineUser.name}</span>
          <UserStatus $online>
            <FontAwesomeIcon icon={faCircle} />
          </UserStatus>
        </UserItem>
      ))}

      <FormModal 
        isOpen={showNewChatModal}
        onClose={() => {
          setShowNewChatModal(false);
          setSelectedUser(null);
        }}
        title="Start New Chat"
      >
        <div className="mb-3">
          <p>Start a chat with {selectedUser?.name}?</p>
        </div>
        <div className="d-flex justify-content-end gap-2">
          <button 
            className="btn btn-secondary"
            onClick={() => {
              setShowNewChatModal(false);
              setSelectedUser(null);
            }}
          >
            Cancel
          </button>
          <button 
            className="btn btn-primary"
            onClick={startNewChat}
          >
            Start Chat
          </button>
        </div>
      </FormModal>
    </SidebarContainer>
  );
}