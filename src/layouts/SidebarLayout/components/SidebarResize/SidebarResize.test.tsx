import '@testing-library/jest-dom'

import { fireEvent, render } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { SidebarResize } from './SidebarResize'

describe('sidebarResize', () => {
  it('渲染默认状态', () => {
    const result = render(
      <SidebarResize
        onMouseDown={() => {}}
        isResizing={false}
      />,
    )
    expect(result.container).toMatchSnapshot()
  })

  it('渲染调整大小状态', () => {
    const result = render(
      <SidebarResize
        onMouseDown={() => {}}
        isResizing
      />,
    )
    expect(result.container).toMatchSnapshot()
  })

  it('点击时应该触发onMouseDown事件', () => {
    const onMouseDownMock = vi.fn()
    const { getByRole } = render(
      <SidebarResize
        onMouseDown={onMouseDownMock}
        isResizing={false}
      />,
    )
    const divElement = getByRole('button')
    fireEvent.mouseDown(divElement)
    expect(onMouseDownMock).toHaveBeenCalledTimes(1)
  })

  it('渲染额外的属性', () => {
    const { container } = render(
      <SidebarResize
        onMouseDown={() => {}}
        isResizing={false}
        absolute
      />,
    )
    const divElement = container.firstChild as HTMLElement
    expect(divElement).toHaveAttribute('absolute')
  })
})
