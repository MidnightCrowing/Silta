import type { ReactNode } from 'react'

import type { SidebarActiveItem } from '../../shared/SidebarItem.types.ts'

export interface SidebarPanelWrapperProps {
  /**
   * @description 自定义类名
   */
  className?: string

  /**
   * @description 子组件
   */
  children: (hidePanel: () => void, pointerEnter: boolean) => ReactNode

  /**
   * @description 侧边栏位置，开始、结束或底部
   */
  position: 'start' | 'end' | 'bottom'

  /**
   * @description 当前激活的项目
   */
  activeItem: SidebarActiveItem

  /**
   * @description 是否打开抽屉面板
   */
  open: boolean

  /**
   * @description 设置抽屉是否正在调整大小的状态
   * @param state 状态
   */
  setDrawerIsResizing: (state: boolean) => void

  /**
   * @description 隐藏面板
   */
  hidePanel: () => void
}
