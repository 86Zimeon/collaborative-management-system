import { Link, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faHome, 
  faTasks, 
  faProjectDiagram, 
  faInbox, 
  faComments 
} from '@fortawesome/free-solid-svg-icons'

const SidebarWrapper = styled.div`
  width: 250px;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  background: #2c3e50;
  color: #ecf0f1;
  padding-top: 70px;
  transition: all 0.3s ease;
`

const NavItem = styled(Link)`
  display: flex;
  align-items: center;
  padding: 15px 25px;
  color: #ecf0f1;
  text-decoration: none;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
    color: #fff;
  }
  
  ${props => props.$active && `
    background: rgba(255, 255, 255, 0.1);
    border-left: 4px solid #3498db;
  `}

  svg {
    width: 20px;
    margin-right: 10px;
  }
`

const NavText = styled.span`
  margin-left: 10px;
`

const Sidebar = () => {
  const location = useLocation()
  
  const navItems = [
    { path: '/', icon: faHome, text: 'Dashboard' },
    { path: '/tasks', icon: faTasks, text: 'Tasks' },
    { path: '/projects', icon: faProjectDiagram, text: 'Projects' },
    { path: '/inbox', icon: faInbox, text: 'Inbox' },
    { path: '/messages', icon: faComments, text: 'Messages' }
  ]

  return (
    <SidebarWrapper>
      {navItems.map((item) => (
        <NavItem 
          key={item.path}
          to={item.path}
          $active={location.pathname === item.path}
        >
          <FontAwesomeIcon icon={item.icon} />
          <NavText>{item.text}</NavText>
        </NavItem>
      ))}
    </SidebarWrapper>
  )
}

export default Sidebar