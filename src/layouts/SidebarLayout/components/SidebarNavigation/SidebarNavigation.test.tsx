import '@testing-library/jest-dom'

import { fireEvent, render, screen } from '@testing-library/react'
import { Fragment } from 'react'
import { describe, expect, it, vi } from 'vitest'

import type { SidebarItem } from '../../shared/SidebarItem.types'
import { SidebarNavigation } from './SidebarNavigation'

describe('sidebarNavigation', () => {
  const mockTopItems: SidebarItem[] = [
    {
      id: 'item1',
      type: 'item',
      label: 'Item 1',
      position: 'leftTop',
      component: Fragment,
    },
    {
      id: 'item2',
      type: 'item',
      label: 'Item 2',
      position: 'leftTop',
      component: Fragment,
    },
  ]

  const mockBottomItems: SidebarItem[] = [
    {
      id: 'item3',
      type: 'item',
      label: 'Item 3',
      position: 'leftBottom',
      component: Fragment,
    },
    {
      id: 'divider1',
      type: 'divider',
      position: 'leftBottom',
    },
    {
      id: 'item4',
      type: 'item',
      label: 'Item 4',
      position: 'leftBottom',
      component: Fragment,
    },
  ]

  const defaultProps = {
    position: 'left' as const,
    topItems: mockTopItems,
    bottomItems: mockBottomItems,
    topActiveItemId: '',
    bottomActiveItemId: '',
    setTopActiveItemId: vi.fn(),
    setBottomActiveItemId: vi.fn(),
  }

  it('应该正确渲染所有导航项', () => {
    render(<SidebarNavigation {...defaultProps} />)

    // 检查顶部项目是否渲染
    expect(screen.getByLabelText('Item 1')).toBeTruthy()
    expect(screen.getByLabelText('Item 2')).toBeTruthy()

    // 检查底部项目是否渲染
    expect(screen.getByLabelText('Item 3')).toBeTruthy()
    expect(screen.getByLabelText('Item 4')).toBeTruthy()
  })

  it('点击顶部项目时应该调用setTopActiveItemId', () => {
    render(<SidebarNavigation {...defaultProps} />)

    fireEvent.click(screen.getByLabelText('Item 1'))
    expect(defaultProps.setTopActiveItemId).toHaveBeenCalledWith('item1')
  })

  it('点击底部项目时应该调用setBottomActiveItemId', () => {
    render(<SidebarNavigation {...defaultProps} />)

    fireEvent.click(screen.getByLabelText('Item 3'))
    expect(defaultProps.setBottomActiveItemId).toHaveBeenCalledWith('item3')
  })

  it('应该正确渲染分隔线', () => {
    const { container } = render(<SidebarNavigation {...defaultProps} />)
    const divider = container.querySelector('.fui-Divider')
    expect(divider).toBeTruthy()
  })

  it('应该根据position属性添加正确的边框样式', () => {
    const { container: leftContainer } = render(<SidebarNavigation {...defaultProps} />)
    expect(leftContainer.firstChild).toHaveClass('b-r-solid b-r-1px b-r-$colorNeutralBackground5')

    const { container: rightContainer } = render(<SidebarNavigation {...defaultProps} position="right" />)
    expect(rightContainer.firstChild).toHaveClass('b-l-solid b-l-1px b-l-$colorNeutralBackground5')
  })

  it('应该正确处理自定义按钮类型', () => {
    const CustomButton = () => <button type="button">Custom Button</button>
    const itemsWithCustomButton: SidebarItem[] = [
      {
        id: 'custom',
        type: 'button',
        label: 'Custom Button',
        position: 'leftTop',
        component: CustomButton,
      },
    ]

    render(
      <SidebarNavigation
        {...defaultProps}
        topItems={itemsWithCustomButton}
      />,
    )

    expect(screen.getByText('Custom Button')).toBeInTheDocument()
  })

  it('应该在传入未知类型时抛出错误', () => {
    // 屏蔽 console.error 以避免控制台输出 React 捕获的错误
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {
    })

    const invalidItems: any[] = [{
      id: 'invalid',
      type: 'unknown',
      position: 'leftTop',
      label: 'Invalid Item',
    }]

    expect(() => {
      render(
        <SidebarNavigation
          {...defaultProps}
          topItems={invalidItems}
        />,
      )
    }).toThrow('Unknown sidebar item type: unknown')

    // 恢复 console.error 以免影响其他测试
    consoleErrorSpy.mockRestore()
  })
})
