import type { HTMLAttributes } from 'react'

export interface SidebarResizeProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * @description 鼠标按下事件处理程序
   */
  onMouseDown: () => void

  /**
   * @description 是否正在调整大小
   */
  isResizing: boolean
}
