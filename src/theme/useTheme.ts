import { useContext } from 'react'

import type { ThemeName } from './ThemeContext'
import { ThemeContext } from './ThemeContext'

export function useTheme() {
  return useContext(ThemeContext)
}

export function isDarkMode(themeName: ThemeName): boolean {
  return themeName.includes('Dark')
}

export function useIsDarkMode(): boolean {
  const { themeName } = useTheme()

  return isDarkMode(themeName)
}
