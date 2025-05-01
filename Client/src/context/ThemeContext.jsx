import { createContext, useContext, useState, useEffect } from 'react'

const ThemeContext = createContext()

const themes = {
  light: {
    background: '#f8f9fa',
    surface: '#ffffff',
    primary: '#3498db',
    text: '#2c3e50',
    border: '#dee2e6'
  },
  dark: {
    background: '#1a1a1a',
    surface: '#2d2d2d',
    primary: '#3498db',
    text: '#ecf0f1',
    border: '#404040'
  }
}

const fonts = {
  system: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
  poppins: "'Poppins', sans-serif",
  inter: "'Inter', sans-serif",
  roboto: "'Roboto', sans-serif"
}

// Preload fonts to prevent FOIT (Flash of Invisible Text)
const preloadFonts = () => {
  const linkTags = [
    { href: 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap' },
    { href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap' },
    { href: 'https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap' }
  ]

  linkTags.forEach(({ href }) => {
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = href
    document.head.appendChild(link)
  })
}

export function ThemeProvider({ children }) {
  const [currentTheme, setCurrentTheme] = useState('light')
  const [currentFont, setCurrentFont] = useState('system')
  const [isCompactMode, setIsCompactMode] = useState(false)
  const [fontsLoaded, setFontsLoaded] = useState(false)
  
  // Load preferences from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    const savedFont = localStorage.getItem('font')
    const savedCompactMode = localStorage.getItem('compactMode')
    
    if (savedTheme) setCurrentTheme(savedTheme)
    if (savedFont) setCurrentFont(savedFont)
    if (savedCompactMode) setIsCompactMode(JSON.parse(savedCompactMode))

    // Preload fonts
    preloadFonts()
    setFontsLoaded(true)
  }, [])
  
  // Save preferences to localStorage and apply theme
  useEffect(() => {
    if (!fontsLoaded) return

    localStorage.setItem('theme', currentTheme)
    localStorage.setItem('font', currentFont)
    localStorage.setItem('compactMode', JSON.stringify(isCompactMode))
    
    // Apply theme to body
    document.body.setAttribute('data-theme', currentTheme)
    document.body.style.fontFamily = fonts[currentFont]
    document.body.classList.toggle('compact-mode', isCompactMode)
  }, [currentTheme, currentFont, isCompactMode, fontsLoaded])

  const toggleTheme = () => {
    setCurrentTheme(prev => prev === 'light' ? 'dark' : 'light')
  }

  const value = {
    currentTheme,
    toggleTheme,
    themes,
    currentFont,
    setCurrentFont,
    fonts,
    isCompactMode,
    setIsCompactMode,
    spacing: isCompactMode ? 'compact' : 'comfortable'
  }

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}