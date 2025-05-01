import { useState, useCallback, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell, faUser, faCog } from '@fortawesome/free-solid-svg-icons'
import { useUser } from '../../context/UserContext'
import { useClickOutside } from '../../hooks/useClickOutside'
import ThemeToggler from '../shared/ThemeToggler'

const NavbarWrapper = styled.nav`
  position: fixed;
  top: 0;
  right: 0;
  left: 250px;
  height: 60px;
  background: var(--surface);
  border-bottom: 1px solid var(--border);
  z-index: 1000;
  padding: 0 20px;
  transition: all 0.2s ease;

  @media (max-width: 768px) {
    left: 0;
  }
`

const NavContent = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 100%;
  gap: 20px;
`

const IconButton = styled.button`
  background: none;
  border: none;
  position: relative;
  cursor: pointer;
  padding: 8px;
  color: var(--text);
  
  &:hover {
    color: var(--primary);
  }
`

const NotificationBadge = styled.span`
  position: absolute;
  top: 0;
  right: 0;
  background: #e74c3c;
  color: white;
  border-radius: 50%;
  padding: 2px 6px;
  font-size: 0.7rem;
`

const DropdownMenu = styled.div`
  position: absolute;
  top: calc(100% + 5px);
  right: 0;
  background: var(--dropdown-bg);
  border: 1px solid var(--border);
  box-shadow: var(--dropdown-shadow);
  border-radius: 8px;
  min-width: 200px;
  opacity: ${props => props.$show ? 1 : 0};
  visibility: ${props => props.$show ? 'visible' : 'hidden'};
  transform: translateY(${props => props.$show ? '0' : '-10px'});
  transition: all 0.2s ease-in-out;
  z-index: 1000;
`

const DropdownItem = styled(Link).attrs(props => ({
  as: props.$as || Link
}))`
  display: block;
  padding: 10px 15px;
  color: var(--text);
  text-decoration: none;
  transition: background 0.2s ease;
  
  &:hover {
    background: var(--background);
  }
`

const Divider = styled.hr`
  border: none;
  border-top: 1px solid var(--border);
  margin: 0.5rem 0;
`

const UserAvatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: ${props => props.$image ? `url(${props.$image})` : 'var(--primary)'};
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 500;
  margin-right: 8px;
`

export default function TopNavbar() {
  const { user, notifications, markNotificationAsRead, unreadCount, logout } = useUser()
  const navigate = useNavigate()
  const [activeDropdown, setActiveDropdown] = useState(null)
  const dropdownRef = useRef(null)

  useClickOutside(dropdownRef, () => setActiveDropdown(null))

  const handleDropdownClick = useCallback((name) => {
    setActiveDropdown(prev => prev === name ? null : name)
  }, [])

  const handleNotificationClick = (id) => {
    markNotificationAsRead(id)
    setActiveDropdown(null)
  }

  const handleLogout = () => {
    logout()
    navigate('/auth')
  }

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
  }

  return (
    <NavbarWrapper>
      <NavContent>
        <div ref={dropdownRef}>
          <IconButton onClick={() => handleDropdownClick('notifications')}>
            <FontAwesomeIcon icon={faBell} />
            {unreadCount > 0 && <NotificationBadge>{unreadCount}</NotificationBadge>}
          </IconButton>
          <DropdownMenu $show={activeDropdown === 'notifications'}>
            {notifications.length > 0 ? (
              notifications.map(notification => (
                <DropdownItem 
                  key={notification.id}
                  $as="button"
                  onClick={() => handleNotificationClick(notification.id)}
                >
                  <div>{notification.text}</div>
                  {!notification.read && (
                    <small style={{ color: 'var(--primary)' }}>New</small>
                  )}
                </DropdownItem>
              ))
            ) : (
              <div className="p-3 text-center text-muted">
                No new notifications
              </div>
            )}
          </DropdownMenu>
        </div>

        <div ref={dropdownRef}>
          <IconButton onClick={() => handleDropdownClick('settings')}>
            <FontAwesomeIcon icon={faCog} />
          </IconButton>
          <DropdownMenu $show={activeDropdown === 'settings'}>
            <ThemeToggler />
          </DropdownMenu>
        </div>

        <div ref={dropdownRef}>
          <IconButton onClick={() => handleDropdownClick('profile')}>
            {user.avatar ? (
              <UserAvatar $image={user.avatar} />
            ) : (
              <UserAvatar>{getInitials(user.name)}</UserAvatar>
            )}
          </IconButton>
          <DropdownMenu $show={activeDropdown === 'profile'}>
            <div className="px-3 py-2">
              <strong>{user.name}</strong>
              <div className="small text-muted">{user.role}</div>
            </div>
            <Divider />
            <DropdownItem 
              to="/profile" 
              onClick={() => setActiveDropdown(null)}
            >
              My Profile
            </DropdownItem>
            <DropdownItem 
              to="/settings" 
              onClick={() => setActiveDropdown(null)}
            >
              Settings
            </DropdownItem>
            <Divider />
            <DropdownItem 
              $as="button" 
              onClick={handleLogout}
            >
              Logout
            </DropdownItem>
          </DropdownMenu>
        </div>
      </NavContent>
    </NavbarWrapper>
  )
}