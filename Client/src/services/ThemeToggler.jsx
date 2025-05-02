import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSun, faMoon, faTextHeight, faCompress, faExpand } from '@fortawesome/free-solid-svg-icons'
import { useTheme } from '../../context/ThemeContext'

const SettingsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  background: var(--surface);
  border-radius: 8px;
  border: 1px solid var(--border);
  min-width: 200px;
`

const SettingRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
`

const ThemeButton = styled.button`
  background: ${props => props.$active ? 'var(--primary)' : 'var(--surface)'};
  color: ${props => props.$active ? 'white' : 'var(--text)'};
  border: 1px solid var(--border);
  padding: 0.5rem;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s ease;
  
  &:hover {
    border-color: var(--primary);
  }
`

const FontSelect = styled.select`
  background: var(--surface);
  color: var(--text);
  border: 1px solid var(--border);
  padding: 0.5rem;
  border-radius: 4px;
  cursor: pointer;
  transition: var(--transition);
  
  &:focus {
    border-color: var(--primary);
    outline: none;
  }

  /* Prevent layout shift during transition */
  width: 120px;
  
  /* Better dropdown styling */
  option {
    background: var(--surface);
    color: var(--text);
    padding: 8px;
  }
`

const Label = styled.span`
  color: var(--text);
  font-weight: 500;
`

const ThemeToggler = () => {
  const { 
    currentTheme, 
    toggleTheme, 
    currentFont, 
    setCurrentFont, 
    fonts,
    isCompactMode,
    setIsCompactMode 
  } = useTheme()

  const [selectedFont, setSelectedFont] = useState(currentFont)

  // Handle font changes with debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      if (selectedFont !== currentFont) {
        setCurrentFont(selectedFont)
      }
    }, 300) // Debounce font changes

    return () => clearTimeout(timer)
  }, [selectedFont, currentFont, setCurrentFont])

  return (
    <SettingsContainer>
      <SettingRow>
        <Label>Theme</Label>
        <ThemeButton 
          onClick={toggleTheme}
          $active={currentTheme === 'dark'}
        >
          <FontAwesomeIcon icon={currentTheme === 'light' ? faSun : faMoon} />
          {currentTheme === 'light' ? 'Light' : 'Dark'}
        </ThemeButton>
      </SettingRow>

      <SettingRow>
        <Label>Font</Label>
        <FontSelect
          value={selectedFont}
          onChange={(e) => setSelectedFont(e.target.value)}
        >
          {Object.entries(fonts).map(([key, value]) => (
            <option key={key} value={key}>
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </option>
          ))}
        </FontSelect>
      </SettingRow>

      <SettingRow>
        <Label>Layout</Label>
        <ThemeButton 
          onClick={() => setIsCompactMode(!isCompactMode)}
          $active={isCompactMode}
        >
          <FontAwesomeIcon icon={isCompactMode ? faCompress : faExpand} />
          {isCompactMode ? 'Compact' : 'Comfortable'}
        </ThemeButton>
      </SettingRow>
    </SettingsContainer>
  )
}

export default ThemeToggler