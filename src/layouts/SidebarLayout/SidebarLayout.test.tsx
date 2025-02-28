import '@testing-library/jest-dom'

import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import type { SidebarItem } from './shared/SidebarItem.types'
import SidebarLayout from './SidebarLayout'

describe('sidebarLayout', () => {
  const TestLeftTopPanel = () => <div>Left Top Panel Content</div>
  const TestLeftBottomPanel = () => <div>Left Bottom Panel Content</div>
  const TestRightTopPanel = () => <div>Right Top Panel Content</div>
  const TestRightBottomPanel = () => <div>Right Bottom Panel Content</div>

  const mockItems: SidebarItem[] = [
    {
      id: 'leftTop1',
      type: 'item',
      label: 'Left Top Item',
      position: 'leftTop',
      component: TestLeftTopPanel,
    },
    {
      id: 'leftBottom1',
      type: 'item',
      label: 'Left Bottom Item',
      position: 'leftBottom',
      component: TestLeftBottomPanel,
    },
    {
      id: 'rightTop1',
      type: 'item',
      label: 'Right Top Item',
      position: 'rightTop',
      component: TestRightTopPanel,
    },
    {
      id: 'rightBottom1',
      type: 'item',
      label: 'Right Bottom Item',
      position: 'rightBottom',
      component: TestRightBottomPanel,
    },
  ]

  const defaultProps = {
    items: mockItems,
    children: <div>Main Content</div>,
  }

  it('应该正确渲染主要内容', () => {
    render(<SidebarLayout {...defaultProps} />)
    expect(screen.getByText('Main Content')).toBeInTheDocument()
  })

  it('应该正确渲染所有导航按钮', () => {
    render(<SidebarLayout {...defaultProps} />)
    expect(screen.getByLabelText('Left Top Item')).toBeInTheDocument()
    expect(screen.getByLabelText('Left Bottom Item')).toBeInTheDocument()
    expect(screen.getByLabelText('Right Top Item')).toBeInTheDocument()
    expect(screen.getByLabelText('Right Bottom Item')).toBeInTheDocument()
  })

  it('点击导航按钮时应该打开对应面板', () => {
    render(<SidebarLayout {...defaultProps} />)

    // 点击左上角按钮
    fireEvent.click(screen.getByLabelText('Left Top Item'))
    expect(screen.getByText('Left Top Panel Content')).toBeInTheDocument()

    // 点击左下角按钮
    fireEvent.click(screen.getByLabelText('Left Bottom Item'))
    expect(screen.getByText('Left Bottom Panel Content')).toBeInTheDocument()

    // 点击右上角按钮
    fireEvent.click(screen.getByLabelText('Right Top Item'))
    expect(screen.getByText('Right Top Panel Content')).toBeInTheDocument()

    // 点击右下角按钮
    fireEvent.click(screen.getByLabelText('Right Bottom Item'))
    expect(screen.getByText('Right Bottom Panel Content')).toBeInTheDocument()
  })

  it('再次点击已激活的导航按钮时应该关闭面板', () => {
    render(<SidebarLayout {...defaultProps} />)

    // 打开左上角面板
    const leftTopButton = screen.getByLabelText('Left Top Item')
    fireEvent.click(leftTopButton)
    expect(screen.getByText('Left Top Panel Content')).toBeInTheDocument()

    // 再次点击关闭面板
    fireEvent.click(leftTopButton)
    expect(screen.queryByText('Left Top Panel Content')).not.toBeInTheDocument()
  })

  it('应该根据传入的activeItemId正确初始化激活状态', () => {
    render(
      <SidebarLayout
        {...defaultProps}
        leftTopActiveItemId="leftTop1"
        rightBottomActiveItemId="rightBottom1"
      />,
    )

    expect(screen.getByText('Left Top Panel Content')).toBeInTheDocument()
    expect(screen.getByText('Right Bottom Panel Content')).toBeInTheDocument()
  })

  it('当没有items时不应该渲染导航栏', () => {
    const { container } = render(
      <SidebarLayout>
        <div>Content</div>
      </SidebarLayout>,
    )

    const navigationBars = container.querySelectorAll('[class*="b-r-solid"], [class*="b-l-solid"]')
    expect(navigationBars.length).toBe(0)
  })

  it('应该在拖动时切换select-none类', () => {
    const { container } = render(<SidebarLayout {...defaultProps} />)

    fireEvent.click(screen.getByLabelText('Left Bottom Item'))

    const resizeHandle = screen.getByRole('button', { name: /resize/i })
    expect(resizeHandle).toBeInTheDocument()

    fireEvent.mouseDown(resizeHandle)
    expect(container.firstChild).toHaveClass('select-none')

    fireEvent.mouseUp(document)
    expect(container.firstChild).toHaveClass('select-auto')
  })
})
