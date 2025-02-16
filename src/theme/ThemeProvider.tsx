import type { ReactNode } from 'react'
import { useEffect, useMemo, useState } from 'react'

import type { ThemeName } from './ThemeContext'
import { ThemeContext, themeMap } from './ThemeContext'

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [themeName, setThemeName] = useState<ThemeName>('teamsDark')

  useEffect(() => {
    document.documentElement.style.setProperty(
      'color-scheme',
      themeName.includes('Dark') ? 'dark' : 'light',
    )
  }, [themeName])

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
