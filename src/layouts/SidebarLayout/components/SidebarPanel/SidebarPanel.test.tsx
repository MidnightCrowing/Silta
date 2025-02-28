import '@testing-library/jest-dom'

import { FluentProvider, webLightTheme } from '@fluentui/react-components'
import { act, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import type { SidebarNavItem } from '../../shared/SidebarItem.types'
import { SidebarPanel } from './SidebarPanel'
import type { SidebarPanelProps } from './SidebarPanel.types'

// 模拟 react-activation
vi.mock('react-activation', () => ({
  default: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}))

const mockProps: SidebarPanelProps = {
  open: true,
  position: 'start',
  activeItem: {
    id: '1',
    label: '测试面板',
    component: () => <div>测试组件</div>,
    position: 'start',
  } as unknown as SidebarNavItem,
  setDrawerIsResizing: vi.fn(),
  hidePanel: vi.fn(),
  children: undefined,
}

const drawerLength: number = 320

function renderSidebarPanel(props: Partial<SidebarPanelProps> = {}) {
  return render(
    <SidebarPanel {...mockProps} {...props}>
      <div>面板内容</div>
    </SidebarPanel>,
  )
}

describe('sidebarPanel', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('应该正确渲染面板标题', () => {
    renderSidebarPanel()
    expect(screen.getByText('测试面板')).toBeInTheDocument()
  })

  it('当open为false时不应该显示面板', () => {
    renderSidebarPanel({ open: false })
    expect(screen.queryByText('测试面板')).not.toBeInTheDocument()
  })

  it('应该正确渲染子组件', () => {
    renderSidebarPanel()
    expect(screen.getByText('面板内容')).toBeInTheDocument()
  })

  it('点击隐藏按钮时应该调用hidePanel', () => {
    renderSidebarPanel()

    // 触发鼠标进入事件以显示工具栏
    const drawer = screen.getByText('测试面板').closest('div[role="complementary"]')
    if (drawer) {
      fireEvent.pointerEnter(drawer)
    }

    // 查找并点击隐藏按钮
    const hideButton = screen.getByLabelText('Close panel')
    fireEvent.click(hideButton)

    expect(mockProps.hidePanel).toHaveBeenCalled()
  })

  it('调整大小时应该更新面板尺寸', () => {
    renderSidebarPanel()

    // 触发调整大小
    const resizeHandle = screen.getByRole('button', { name: /resize/i })
    expect(resizeHandle).toBeInTheDocument()

    if (resizeHandle) {
      fireEvent.mouseDown(resizeHandle)
      fireEvent.mouseMove(document, { clientX: 400, clientY: 0 })
      fireEvent.mouseUp(document)
    }

    expect(mockProps.setDrawerIsResizing).toHaveBeenCalledTimes(2)
    expect(mockProps.setDrawerIsResizing).toHaveBeenNthCalledWith(1, true)
    expect(mockProps.setDrawerIsResizing).toHaveBeenNthCalledWith(2, false)
  })

  it('在不同position下应该渲染正确的调整大小把手', () => {
    const { rerender } = renderSidebarPanel()

    // 测试 start 位置
    expect(screen.getByRole('button', { name: /resize/i })).toHaveAttribute('cursor', 'col-resize')

    // 测试 end 位置
    rerender(
      <FluentProvider theme={webLightTheme}>
        <SidebarPanel {...mockProps} position="end">
          <div>面板内容</div>
        </SidebarPanel>
      </FluentProvider>,
    )
    expect(screen.getByRole('button', { name: /resize/i })).toHaveAttribute('cursor', 'col-resize')

    // 测试 bottom 位置
    rerender(
      <FluentProvider theme={webLightTheme}>
        <SidebarPanel {...mockProps} position="bottom">
          <div>面板内容</div>
        </SidebarPanel>
      </FluentProvider>,
    )
    expect(screen.getByRole('button', { name: /resize/i })).toHaveAttribute('cursor', 'row-resize')
  })

  describe('调整抽屉大小', () => {
    beforeEach(() => {
      vi.useFakeTimers()
    })

    afterEach(() => {
      vi.useRealTimers()
    })

    it('start位置时应正确计算抽屉宽度', async () => {
      // 渲染 SidebarPanel 组件，传递位置为 'start'
      const { container } = renderSidebarPanel({ position: 'start' })
      const panel = container.firstChild as HTMLElement

      // 获取 resizeHandle 按钮元素
      const resizeHandle = screen.getByRole('button', { name: /resize/i })

      // 模拟 panel 的 getBoundingClientRect 方法
      const mockRect = { left: drawerLength }
      vi.spyOn(panel, 'getBoundingClientRect').mockImplementation(() => mockRect as DOMRect)

      // 模拟鼠标按下，开始调整大小
      fireEvent.mouseDown(resizeHandle)
      expect(mockProps.setDrawerIsResizing).toHaveBeenCalledWith(true)

      // 使用 act 包装导致状态更新的操作
      await act(async () => {
        // 模拟鼠标移动 200px
        fireEvent.mouseMove(document, { clientX: drawerLength + 200 })
        vi.advanceTimersByTime(100) // TODO: 这里需要优化

        // no use:
        // await Promise.resolve()
      })

      // 触发 mouseUp 事件结束拖拽
      fireEvent.mouseUp(document)
      expect(mockProps.setDrawerIsResizing).toHaveBeenCalledWith(false)

      const drawer = container.querySelector('.fui-InlineDrawer') as HTMLElement
      expect(drawer.style.width).toBe(`min(${drawerLength + 200}px, calc(100vw - 43px))`)
    })

    it('end位置时应正确计算抽屉宽度', async () => {
      const { container } = renderSidebarPanel({ position: 'end' })
      const panel = container.firstChild as HTMLElement
      const resizeHandle = screen.getByRole('button', { name: /resize/i })

      const mockRect = { right: drawerLength }
      vi.spyOn(panel, 'getBoundingClientRect').mockImplementation(() => mockRect as DOMRect)

      fireEvent.mouseDown(resizeHandle)
      expect(mockProps.setDrawerIsResizing).toHaveBeenCalledWith(true)

      await act(async () => {
        fireEvent.mouseMove(document, { clientX: 200 - drawerLength })
        vi.advanceTimersByTime(100) // TODO: 这里需要优化
      })

      fireEvent.mouseUp(document)
      expect(mockProps.setDrawerIsResizing).toHaveBeenCalledWith(false)

      const drawer = container.querySelector('.fui-InlineDrawer') as HTMLElement
      expect(drawer.style.width).toBe(`min(${drawerLength - 200}px, calc(100vw - 43px))`)
    })

    it('bottom位置时应正确计算抽屉高度', async () => {
      const { container } = renderSidebarPanel({ position: 'bottom' })
      const panel = container.firstChild as HTMLElement
      const resizeHandle = screen.getByRole('button', { name: /resize/i })

      const mockRect = { bottom: drawerLength }
      vi.spyOn(panel, 'getBoundingClientRect').mockImplementation(() => mockRect as DOMRect)

      fireEvent.mouseDown(resizeHandle)
      expect(mockProps.setDrawerIsResizing).toHaveBeenCalledWith(true)

      await act(async () => {
        fireEvent.mouseMove(document, { clientY: 200 - drawerLength })
        vi.advanceTimersByTime(100) // TODO: 这里需要优化
      })

      fireEvent.mouseUp(document)
      expect(mockProps.setDrawerIsResizing).toHaveBeenCalledWith(false)

      const drawer = container.querySelector('.fui-InlineDrawer') as HTMLElement
      expect(drawer.style.height).toBe(`min(${drawerLength - 200}px, calc(100vh - 43px))`)
    })

    it('非调整状态时不应更新尺寸', async () => {
      const { container } = renderSidebarPanel()
      const panel = container.firstChild as HTMLElement

      const mockRect = { left: drawerLength }
      vi.spyOn(panel, 'getBoundingClientRect').mockImplementation(() => mockRect as DOMRect)

      // 直接移动鼠标，不触发 mouseDown
      await act(async () => {
        fireEvent.mouseMove(document, { clientX: drawerLength + 200 })
        vi.advanceTimersByTime(100) // TODO: 这里需要优化
      })

      const drawer = container.querySelector('.fui-InlineDrawer') as HTMLElement
      expect(drawer.style.width).toBe('min(320px, calc(100vw - 43px))')
    })

    it('组件卸载时应清理动画帧', () => {
      const cancelAnimationFrameSpy = vi.spyOn(window, 'cancelAnimationFrame')
      const { unmount } = renderSidebarPanel()

      unmount()

      expect(cancelAnimationFrameSpy).toHaveBeenCalled()
    })
  })

  describe('工具栏显示/隐藏', () => {
    // TODO:
    it('鼠标进入面板时应显示工具栏', async () => {
      // const { container } = renderSidebarPanel()
      // const panel = container.querySelector('.fui-InlineDrawer') as HTMLElement
      // expect(panel).toBeInTheDocument()

      // // 初始状态工具栏应该是隐藏的
      // const toolbar = container.querySelector('.fui-Toolbar')
      // expect(toolbar).not.toBeVisible()

      // // 触发鼠标进入事件
      // await act(async () => {
      //   fireEvent.pointerEnter(panel)
      // })

      // // 工具栏应该显示
      // expect(toolbar).not.toBeVisible()
    })

    it('鼠标离开面板时应隐藏工具栏', async () => {
      // const { container } = renderSidebarPanel()
      // const panel = container.querySelector('.fui-InlineDrawer') as HTMLElement
      // expect(panel).toBeInTheDocument()

      // const toolbar = container.querySelector('.fui-Toolbar')

      // // 先让工具栏显示
      // await act(async () => {
      //   fireEvent.pointerEnter(panel)
      // })
      // expect(toolbar).toBeVisible()

      // // 触发鼠标离开事件
      // await act(async () => {
      //   fireEvent.pointerLeave(panel, {
      //     relatedTarget: document.body,
      //   })
      // })

      // // 工具栏应该隐藏
      // expect(toolbar).not.toBeVisible()
    })

    it('鼠标从工具栏移动到面板内其他位置时不应隐藏工具栏', async () => {
      // const { container } = renderSidebarPanel()
      // const panel = container.querySelector('.fui-InlineDrawer') as HTMLElement
      // const toolbar = container.querySelector('.fui-Toolbar')
      // expect(panel).toBeInTheDocument()
      // expect(toolbar).toBeInTheDocument()

      // // 先让工具栏显示
      // await act(async () => {
      //   fireEvent.pointerEnter(panel)
      // })
      // expect(toolbar).toBeVisible()

      // // 模拟从工具栏移动到面板内的其他元素
      // await act(async () => {
      //   fireEvent.pointerLeave(toolbar!, {
      //     relatedTarget: panel,
      //   })
      // })

      // // 工具栏应该保持显示
      // expect(toolbar).toBeVisible()
    })

    it('组件卸载时应移除事件监听器', () => {
      // const { container, unmount } = renderSidebarPanel()
      // const panel = container.querySelector('.fui-InlineDrawer') as HTMLElement

      // // 模拟 removeEventListener
      // const removeEventListenerSpy = vi.spyOn(panel, 'removeEventListener')

      // unmount()

      // expect(removeEventListenerSpy).toHaveBeenCalledWith('pointerenter', expect.any(Function))
      // expect(removeEventListenerSpy).toHaveBeenCalledWith('pointerleave', expect.any(Function))
    })
  })
})
