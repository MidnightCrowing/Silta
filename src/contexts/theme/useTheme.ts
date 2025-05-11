import { useContext } from 'react'

import type { ThemeName } from './ThemeContext'
import { ThemeContext, themeMap } from './ThemeContext'

export function useTheme() {
  return useContext(ThemeContext)
}

export function isDarkMode(themeName: ThemeName): boolean {
  return themeName.includes('Dark')
}

export function useThemeByMode(isDark: boolean) {
  const { themeName } = useTheme()
  const base = themeName.startsWith('teams') ? 'teams' : 'web'
  const targetThemeName: ThemeName = isDark ? `${base}Dark` : `${base}Light`
  return themeMap[targetThemeName]
}

export function useIsDarkMode(): boolean {
  const { themeName } = useTheme()

  return isDarkMode(themeName)
}
