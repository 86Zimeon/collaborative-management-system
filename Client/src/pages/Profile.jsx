import { useState, useRef } from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faUser, 
  faCamera, 
  faEnvelope, 
  faBriefcase, 
  faBuilding,
  faCheck
} from '@fortawesome/free-solid-svg-icons'
import { useUser } from '../context/UserContext'

const ProfileContainer = styled.div`
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const ProfileSidebar = styled.div`
  background: var(--card-bg);
  border-radius: 8px;
  padding: 1.5rem;
  height: fit-content;
  border: 1px solid var(--border);
`

const ProfileImageContainer = styled.div`
  position: relative;
  width: 200px;
  height: 200px;
  margin: 0 auto 1.5rem;
`

const ProfileImage = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: ${props => props.$hasImage ? `url(${props.$image})` : 'var(--surface)'};
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 4rem;
  color: var(--text-secondary);
  cursor: pointer;
  transition: var(--transition);
  border: 2px solid var(--border);

  &:hover {
    .upload-overlay {
      opacity: 1;
    }
  }
`

const UploadOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.2s ease;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
`

const ProfileInfo = styled.div`
  text-align: center;
  margin-bottom: 1.5rem;
`

const MainContent = styled.div`
  background: var(--card-bg);
  border-radius: 8px;
  padding: 2rem;
  border: 1px solid var(--border);
`

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: var(--text);
`

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid var(--border);
  border-radius: 4px;
  background: var(--surface);
  color: var(--text);
  
  &:focus {
    border-color: var(--primary);
    outline: none;
    box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2);
  }
`

const SaveFeedback = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: var(--primary);
  color: white;
  padding: 1rem;
  border-radius: 4px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  animation: slideIn 0.3s ease;

  @keyframes slideIn {
    from {
      transform: translateY(100%);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
`

const Profile = () => {
  const { user, updateUser } = useUser()
  const [showSaved, setShowSaved] = useState(false)
  const [profileImage, setProfileImage] = useState(user.avatar)
  const fileInputRef = useRef()

  const handleImageClick = () => {
    fileInputRef.current.click()
  }

  const handleImageChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setProfileImage(e.target.result)
        updateUser({ ...user, avatar: e.target.result })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const updatedUser = {
      ...user,
      name: formData.get('name'),
      email: formData.get('email'),
      role: formData.get('role'),
      department: formData.get('department'),
      bio: formData.get('bio')
    }
    updateUser(updatedUser)
    setShowSaved(true)
    setTimeout(() => setShowSaved(false), 3000)
  }

  return (
    <ProfileContainer>
      <ProfileSidebar>
        <ProfileImageContainer>
          <ProfileImage 
            $hasImage={!!profileImage} 
            $image={profileImage}
            onClick={handleImageClick}
          >
            {!profileImage && <FontAwesomeIcon icon={faUser} />}
            <UploadOverlay className="upload-overlay">
              <FontAwesomeIcon icon={faCamera} />
            </UploadOverlay>
          </ProfileImage>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageChange}
            accept="image/*"
            style={{ display: 'none' }}
          />
        </ProfileImageContainer>
        <ProfileInfo>
          <h3 className="h5 mb-1">{user.name}</h3>
          <p className="text-muted mb-0">{user.role}</p>
          <p className="text-muted">{user.department}</p>
        </ProfileInfo>
      </ProfileSidebar>
      
      <MainContent>
        <h3 className="mb-4">Personal Information</h3>
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="name">
              <FontAwesomeIcon icon={faUser} className="me-2" />
              Full Name
            </Label>
            <Input
              type="text"
              id="name"
              name="name"
              defaultValue={user.name}
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="email">
              <FontAwesomeIcon icon={faEnvelope} className="me-2" />
              Email
            </Label>
            <Input
              type="email"
              id="email"
              name="email"
              defaultValue={user.email}
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="role">
              <FontAwesomeIcon icon={faBriefcase} className="me-2" />
              Role
            </Label>
            <Input
              type="text"
              id="role"
              name="role"
              defaultValue={user.role}
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="department">
              <FontAwesomeIcon icon={faBuilding} className="me-2" />
              Department
            </Label>
            <Input
              type="text"
              id="department"
              name="department"
              defaultValue={user.department}
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="bio">Bio</Label>
            <textarea
              id="bio"
              name="bio"
              className="form-control"
              rows="4"
              defaultValue={user.bio}
            />
          </FormGroup>

          <button type="submit" className="btn btn-primary">
            Save Changes
          </button>
        </form>
      </MainContent>

      {showSaved && (
        <SaveFeedback>
          <FontAwesomeIcon icon={faCheck} />
          Changes saved successfully
        </SaveFeedback>
      )}
    </ProfileContainer>
  )
}

export default Profile