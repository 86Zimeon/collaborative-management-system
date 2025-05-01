import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faPalette, 
  faTextHeight, 
  faGear,
  faToggleOn,
  faLock,
  faBell
} from '@fortawesome/free-solid-svg-icons'
import { useTheme } from '../context/ThemeContext'
import ThemeToggler from '../components/shared/ThemeToggler'

const SettingsContainer = styled.div`
  display: grid;
  gap: 2rem;
  max-width: 800px;
  margin: 0 auto;
`

const SettingsCard = styled.div`
  background: var(--card-bg);
  border-radius: 8px;
  padding: var(--spacing-unit);
  border: 1px solid var(--border);
`

const SettingsSection = styled.div`
  margin-bottom: 2rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`

const SectionTitle = styled.h3`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--text);
  margin-bottom: 1rem;
  font-size: 1.25rem;
  
  svg {
    color: var(--primary);
  }
`

const SettingRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid var(--border);
  
  &:last-child {
    border-bottom: none;
  }
`

const SettingInfo = styled.div`
  flex: 1;
`

const SettingTitle = styled.h4`
  margin: 0;
  color: var(--text);
  font-size: 1rem;
`

const SettingDescription = styled.p`
  margin: 0.25rem 0 0;
  color: var(--text-secondary);
  font-size: 0.875rem;
`

const Settings = () => {
  const { currentTheme, currentFont } = useTheme()

  return (
    <SettingsContainer>
      <h2 className="mb-4">Settings</h2>

      <SettingsCard>
        <SettingsSection>
          <SectionTitle>
            <FontAwesomeIcon icon={faPalette} />
            Appearance
          </SectionTitle>
          <ThemeToggler />
        </SettingsSection>

        <SettingsSection>
          <SectionTitle>
            <FontAwesomeIcon icon={faBell} />
            Notifications
          </SectionTitle>
          
          <SettingRow>
            <SettingInfo>
              <SettingTitle>Email Notifications</SettingTitle>
              <SettingDescription>
                Receive notifications about task assignments and updates via email
              </SettingDescription>
            </SettingInfo>
            <div className="form-check form-switch">
              <input 
                className="form-check-input" 
                type="checkbox" 
                role="switch" 
                id="emailNotifications" 
              />
            </div>
          </SettingRow>

          <SettingRow>
            <SettingInfo>
              <SettingTitle>Push Notifications</SettingTitle>
              <SettingDescription>
                Receive desktop notifications for important updates
              </SettingDescription>
            </SettingInfo>
            <div className="form-check form-switch">
              <input 
                className="form-check-input" 
                type="checkbox" 
                role="switch" 
                id="pushNotifications" 
              />
            </div>
          </SettingRow>
        </SettingsSection>

        <SettingsSection>
          <SectionTitle>
            <FontAwesomeIcon icon={faLock} />
            Privacy
          </SectionTitle>
          
          <SettingRow>
            <SettingInfo>
              <SettingTitle>Online Status</SettingTitle>
              <SettingDescription>
                Show your online status to other team members
              </SettingDescription>
            </SettingInfo>
            <div className="form-check form-switch">
              <input 
                className="form-check-input" 
                type="checkbox" 
                role="switch" 
                id="onlineStatus" 
                defaultChecked 
              />
            </div>
          </SettingRow>

          <SettingRow>
            <SettingInfo>
              <SettingTitle>Activity Status</SettingTitle>
              <SettingDescription>
                Show when you're active on tasks
              </SettingDescription>
            </SettingInfo>
            <div className="form-check form-switch">
              <input 
                className="form-check-input" 
                type="checkbox" 
                role="switch" 
                id="activityStatus" 
                defaultChecked 
              />
            </div>
          </SettingRow>
        </SettingsSection>
      </SettingsCard>
    </SettingsContainer>
  )
}

export default Settings