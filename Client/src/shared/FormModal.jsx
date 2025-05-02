import { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { useTheme } from '../../context/ThemeContext'

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
`

const ModalContent = styled.div`
  background: var(--surface);
  border-radius: 8px;
  padding: 1rem;
  width: 100%;
  max-width: 450px;
  position: relative;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-height: calc(100vh - 2rem);
  display: flex;
  flex-direction: column;

  h2 {
    font-size: 1.1rem;
    margin-bottom: 1rem;
    padding-right: 2rem;
    flex-shrink: 0;
  }
`

const ModalBody = styled.div`
  overflow-y: auto;
  padding-right: 0.5rem;
  margin-right: -0.5rem;
  
  /* Scrollbar styling */
  &::-webkit-scrollbar {
    width: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: var(--background);
    border-radius: 4px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: var(--border);
    border-radius: 4px;
    
    &:hover {
      background: var(--text-secondary);
    }
  }
`

const CloseButton = styled.button`
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  background: none;
  border: none;
  color: var(--text);
  cursor: pointer;
  padding: 0.4rem;
  
  &:hover {
    color: var(--primary);
  }
`

const FormModal = ({ isOpen, onClose, title, children }) => {
  const modalRef = useRef()
  const { currentTheme } = useTheme()

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose()
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <ModalOverlay onClick={(e) => e.target === e.currentTarget && onClose()}>
      <ModalContent ref={modalRef}>
        <h2>{title}</h2>
        <CloseButton onClick={onClose}>
          <FontAwesomeIcon icon={faTimes} />
        </CloseButton>
        <ModalBody>
          {children}
        </ModalBody>
      </ModalContent>
    </ModalOverlay>
  )
}

export default FormModal