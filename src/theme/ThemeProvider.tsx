import type { ReactNode } from 'react'
import { useEffect, useMemo, useState } from 'react'

import type { ThemeName } from './ThemeContext'
import { ThemeContext, themeMap } from './ThemeContext'
import { isDarkMode } from './useTheme'

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [themeName, setThemeName] = useState<ThemeName>('teamsDark')
  const isDark = isDarkMode(themeName)

  useEffect(() => {
    document.documentElement.style.setProperty(
      'color-scheme',
      isDark ? 'dark' : 'light',
    )

    if (isDark) {
      document.body.classList.add('dark')
      document.body.classList.remove('light')
    }
    else {
      document.body.classList.add('light')
      document.body.classList.remove('dark')
    }
  }, [isDark])

  const contextValue = useMemo(() => ({
    theme: themeMap[themeName],
    themeName,
    setTheme: setThemeName,
  }), [themeName])

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  )
}
