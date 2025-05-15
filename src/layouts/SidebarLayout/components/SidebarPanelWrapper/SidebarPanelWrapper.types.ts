import type { HTMLAttributes } from 'react'

import type { SidebarActiveItem, SidebarActiveItemId, SidebarPosition } from '../../shared/SidebarItem.types.ts'

export interface SidebarPanelWrapperProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * @description 侧边栏位置
   */
  position: SidebarPosition

  /**
   * @description 当前激活的项目
   */
  activeItem: SidebarActiveItem

  /**
   * @description 是否固定Fade顶部栏
   */
  isFadeTopbarPinned: boolean

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
   * @description 设置是否Fade固定顶部栏
   * @param value 是否固定Fade顶部栏
   */
  setFadeTopbarPinned: (value: boolean) => void

  /**
   * @description 设置当前激活项目的位置
   * @param itemId 项目ID
   */
  setItemPosition: (itemId: SidebarActiveItemId, newPosition: SidebarPosition) => void

  /**
   * @description 隐藏面板
   */
  hidePanel: () => void
}
