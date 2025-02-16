import type { Theme } from '@fluentui/react-components'
import { teamsDarkTheme, teamsLightTheme, webDarkTheme, webLightTheme } from '@fluentui/react-components'
import { createContext } from 'react'

export type ThemeName = 'teamsLight' | 'teamsDark' | 'webLight' | 'webDark'

export const themeMap: Record<ThemeName, Theme> = {
  teamsLight: teamsLightTheme,
  teamsDark: teamsDarkTheme,
  webLight: webLightTheme,
  webDark: webDarkTheme,
}

export const ThemeContext = createContext<{
  theme: Theme
  themeName: ThemeName
  setTheme: (theme: ThemeName) => void
}>({
      theme: teamsDarkTheme, // 默认主题
      themeName: 'teamsDark',
      setTheme: () => {},
    })
