import type { HTMLAttributes, ReactNode } from 'react'

import type { SidebarActiveItem, SidebarActiveItemId, SidebarItem } from './shared/SidebarItem.types'

export interface SidebarLayoutProps extends Omit<HTMLAttributes<HTMLDivElement>, 'items'> {
  /**
   * @description 子组件
   */
  children: ReactNode

  /**
   * @description 侧边栏项目列表
   */
  items?: SidebarItem[]

  /**
   * @description 左上角当前激活的项目ID
   */
  leftTopActiveItemId?: SidebarActiveItemId

  /**
   * @description 左下角当前激活的项目ID
   */
  leftBottomActiveItemId?: SidebarActiveItemId

  /**
   * @description 右上角当前激活的项目ID
   */
  rightTopActiveItemId?: SidebarActiveItemId

  /**
   * @description 右下角当前激活的项目ID
   */
  rightBottomActiveItemId?: SidebarActiveItemId
}

export interface SidebarLayoutState {
  /**
   * @description 左上角当前激活的项目
   */
  leftTopActiveItem: SidebarActiveItem

  /**
   * @description 左下角当前激活的项目
   */
  leftBottomActiveItem: SidebarActiveItem

  /**
   * @description 右上角当前激活的项目
   */
  rightTopActiveItem: SidebarActiveItem

  /**
   * @description 右下角当前激活的项目
   */
  rightBottomActiveItem: SidebarActiveItem

  /**
   * @description 抽屉是否正在调整大小
   */
  drawerIsResizing: boolean

  /**
   * @description 底部抽屉是否正在调整大小
   */
  bottomDrawersIsResizing: boolean
}
