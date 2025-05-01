import { useState } from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faProjectDiagram,
  faTasks,
  faUsers, 
  faMessage,
  faSearch
} from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
import ProjectGrid from '../components/projects/ProjectGrid'
import TaskList from '../components/tasks/TaskList'
import { useUser } from '../context/UserContext'

const QuickActions = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
`

const ActionCard = styled.button`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.25rem;
  background: var(--card-bg);
  border: 1px solid var(--border);
  border-radius: 8px;
  cursor: pointer;
  transition: var(--transition);
  color: var(--text);
  text-align: left;
  width: 100%;

  &:hover {
    background: var(--card-hover);
    transform: translateY(-2px);
    box-shadow: var(--card-shadow);
  }

  .icon {
    padding: 1rem;
    background: var(--primary);
    color: white;
    border-radius: 8px;
    transition: var(--transition);
  }

  &:hover .icon {
    transform: scale(1.1);
  }

  ${props => props.$active && `
    background: var(--card-hover);
    border-color: var(--primary);
  `}
`

const SearchBar = styled.div`
  position: relative;
  margin-bottom: 2rem;

  input {
    width: 100%;
    padding: 1rem;
    padding-left: 3rem;
    background: var(--card-bg);
    border: 1px solid var(--border);
    border-radius: 8px;
    color: var(--text);
    transition: var(--transition);

    &:focus {
      outline: none;
      border-color: var(--primary);
      box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2);
    }
  }

  .search-icon {
    position: absolute;
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
    color: var(--text-secondary);
  }
`

const ContentGrid = styled.div`
  display: grid;
  gap: 2rem;
`

const Dashboard = () => {
  const { user } = useUser()
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [showProjectModal, setShowProjectModal] = useState(false)
  const [showTaskModal, setShowTaskModal] = useState(false)
  const [showTeamModal, setShowTeamModal] = useState(false)

  const quickActions = [
    {
      icon: faProjectDiagram,
      title: 'New Project',
      description: 'Create a new project',
      onClick: () => setShowProjectModal(true)
    },
    {
      icon: faTasks,
      title: 'New Task',
      description: 'Add a new task',
      onClick: () => setShowTaskModal(true)
    },
    {
      icon: faUsers,
      title: 'New Team',
      description: 'Create a team',
      onClick: () => setShowTeamModal(true)
    },
    {
      icon: faMessage,
      title: 'Message',
      description: 'Start a conversation',
      onClick: () => navigate('/messages')
    }
  ]

  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
  }

  return (
    <div>
      <h2 className="mb-4">Welcome back, {user.name}!</h2>
      
      <QuickActions>
        {quickActions.map(action => (
          <ActionCard key={action.title} onClick={action.onClick}>
            <span className="icon">
              <FontAwesomeIcon icon={action.icon} />
            </span>
            <div>
              <div style={{ fontWeight: 500 }}>{action.title}</div>
              <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                {action.description}
              </div>
            </div>
          </ActionCard>
        ))}
      </QuickActions>

      <SearchBar>
        <FontAwesomeIcon icon={faSearch} className="search-icon" />
        <input
          type="text"
          placeholder="Search projects, tasks, or team members..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </SearchBar>

      <ContentGrid>
        <ProjectGrid 
          searchTerm={searchTerm} 
          onCreateProject={() => setShowProjectModal(true)} 
        />
        <TaskList 
          searchTerm={searchTerm}
          onCreateTask={() => setShowTaskModal(true)} 
        />
      </ContentGrid>

      {/* Add modals here */}
    </div>
  )
}

export default Dashboard