import '@testing-library/jest-dom'

import { renderHook } from '@testing-library/react'
import type { ReactNode } from 'react'
import { act } from 'react'
import { describe, expect, it } from 'vitest'

import { ThemeProvider } from './ThemeProvider'
import { isDarkMode, useIsDarkMode, useTheme } from './useTheme'

// 创建一个包装器组件来提供Context
function Wrapper({ children }: { children: ReactNode }) {
  return <ThemeProvider>{children}</ThemeProvider>
}

// 创建一个组合的hook来同时获取theme和darkMode
function useThemeAndDarkMode() {
  const theme = useTheme()
  const isDark = useIsDarkMode()
  return { theme, isDark }
}

describe('theme context', () => {
  describe('isDarkMode', () => {
    it('应该正确判断深色主题', () => {
      expect(isDarkMode('teamsDark')).toBe(true)
      expect(isDarkMode('webDark')).toBe(true)
      expect(isDarkMode('teamsLight')).toBe(false)
      expect(isDarkMode('webLight')).toBe(false)
    })
  })

  describe('useTheme', () => {
    it('应该提供默认主题', () => {
      const { result } = renderHook(() => useTheme(), { wrapper: Wrapper })

      expect(result.current.themeName).toBe('teamsDark')
      expect(result.current.theme).toBeDefined()
      expect(typeof result.current.setTheme).toBe('function')
    })

    it('应该能够切换主题', async () => {
      const { result } = renderHook(() => useTheme(), { wrapper: Wrapper })

      // 切换到亮色主题
      act(() => {
        result.current.setTheme('webLight')
      })
      expect(result.current.themeName).toBe('webLight')

      // 切换到深色主题
      act(() => {
        result.current.setTheme('webDark')
      })
      expect(result.current.themeName).toBe('webDark')
    })
  })

  describe('useIsDarkMode', () => {
    it('应该返回当前主题的深色模式状态', () => {
      const { result } = renderHook(() => useThemeAndDarkMode(), { wrapper: Wrapper })

      // 默认是深色主题
      expect(result.current.isDark).toBe(true)

      // 切换到亮色主题
      act(() => {
        result.current.theme.setTheme('webLight')
      })
      expect(result.current.isDark).toBe(false)
    })
  })

  describe('themeProvider', () => {
    it('应该正确设置body类名', () => {
      const { result } = renderHook(() => useTheme(), { wrapper: Wrapper })

      // 默认深色主题
      expect(document.body.classList.contains('dark')).toBe(true)
      expect(document.body.classList.contains('light')).toBe(false)

      // 切换到亮色主题
      act(() => {
        result.current.setTheme('webLight')
      })
      expect(document.body.classList.contains('light')).toBe(true)
      expect(document.body.classList.contains('dark')).toBe(false)
    })

    it('应该正确设置color-scheme', () => {
      const { result } = renderHook(() => useTheme(), { wrapper: Wrapper })

      // 默认深色主题
      expect(document.documentElement.style.getPropertyValue('color-scheme')).toBe('dark')

      // 切换到亮色主题
      act(() => {
        result.current.setTheme('webLight')
      })
      expect(document.documentElement.style.getPropertyValue('color-scheme')).toBe('light')
    })
  })
})
