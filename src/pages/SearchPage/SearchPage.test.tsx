import '@testing-library/jest-dom'

import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { LocationProvider } from '~/contexts/location'

import SearchPage from './SearchPage'
import type { SearchPageProps } from './SearchPage.types'

// Mock Tauri API
vi.mock('@tauri-apps/api/core', () => ({
  convertFileSrc: (path: string) => path,
}))

function renderSearchPage(props: Partial<SearchPageProps> = {}) {
  return render(
    <LocationProvider>
      <SearchPage className="test-class" {...props} />
    </LocationProvider>,
  )
}

describe('searchPage', () => {
  it('应该正确渲染基础组件', () => {
    renderSearchPage()

    // 检查主要元素是否存在
    expect(screen.getByPlaceholderText('输入关键词搜索')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '搜索' })).toBeInTheDocument()
    expect(screen.getByRole('img', { name: 'logo' })).toBeInTheDocument()
    expect(screen.getByRole('img', { name: 'background image' })).toBeInTheDocument()
  })

  it('应该正确处理输入框值的变化', () => {
    renderSearchPage()
    const input = screen.getByPlaceholderText('输入关键词搜索')

    fireEvent.change(input, { target: { value: 'test search' } })
    expect(input).toHaveValue('test search')
  })

  it('当输入框有值时应该显示清除按钮，点击后清除内容', () => {
    renderSearchPage()
    const input = screen.getByPlaceholderText('输入关键词搜索')

    // 初始状态下不应该显示清除按钮
    expect(screen.queryByTestId('clear-button')).not.toBeInTheDocument()

    // 输入内容后应该显示清除按钮
    fireEvent.change(input, { target: { value: 'test search' } })
    const clearButton = screen.getByTestId('clear-button')
    expect(clearButton).toBeInTheDocument()

    // 点击清除按钮后应该清空输入框
    fireEvent.click(clearButton)
    expect(input).toHaveValue('')
  })

  it('输入框获得焦点时应该改变样式', () => {
    renderSearchPage()
    const input = screen.getByPlaceholderText('输入关键词搜索')
    const searchContainer = input.parentElement

    // 初始状态
    expect(searchContainer).not.toHaveClass('SearchPage-input-focus-effect')

    // 获得焦点后
    fireEvent.focus(input)
    expect(searchContainer).toHaveClass('SearchPage-input-focus-effect')

    // 失去焦点后
    fireEvent.blur(input)
    expect(searchContainer).not.toHaveClass('SearchPage-input-focus-effect')
  })

  it('应该正确应用传入的className', () => {
    const { container } = renderSearchPage()
    expect(container.firstChild).toHaveClass('test-class')
  })
})
