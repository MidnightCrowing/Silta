import type { HTMLAttributes, ReactNode, RefObject } from 'react'

import type { SidebarActiveItem } from '../../shared/SidebarItem.types'
import type { SidebarPanelRef } from '../../shared/SidebarPanel.types'

export interface SidebarPanelProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * @description 子组件
   */
  children: ReactNode

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
   * @description 子组件的引用
   */
  childrenRef: RefObject<SidebarPanelRef>

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

export interface SidebarPanelState {
  /**
   * @description 抽屉长度
   */
  drawerLength: number

  /**
   * @description 抽屉是否正在调整大小
   */
  drawerIsResizing: boolean

  /**
   * @description 工具栏是否可见
   */
  toolbarVisible: boolean
}
