import type { HTMLAttributes } from 'react'

import type { SidebarActiveItemId, SidebarItem, SidebarNavItem, SidebarPosition } from '../../shared/SidebarItem.types'

export interface SidebarNavigationProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * @description 侧边栏位置，左侧或右侧
   */
  position: 'left' | 'right'

  /**
   * @description 顶部项目列表
   */
  topItems?: SidebarItem[]

  /**
   * @description 底部项目列表
   */
  bottomItems?: SidebarItem[]

  /**
   * @description 当前激活的顶部项目ID
   */
  topActiveItemId: SidebarActiveItemId

  /**
   * @description 当前激活的底部项目ID
   */
  bottomActiveItemId: SidebarActiveItemId

  /**
   * @description 设置当前激活的顶部项目ID
   * @param topItem 顶部项目ID
   */
  setTopActiveItemId: (topItem: SidebarActiveItemId) => void

  /**
   * @description 设置当前激活的底部项目ID
   * @param bottomItem 底部项目ID
   */
  setBottomActiveItemId: (bottomItem: SidebarActiveItemId) => void

  /**
   * @description 设置当前激活项目的位置
   * @param itemId 项目ID
   */
  setItemPosition: (itemId: SidebarActiveItemId, newPosition: SidebarPosition) => void
}

export interface NavigationItemProps {
  itemPosition: SidebarPosition
  item: SidebarNavItem
  checked: boolean
  onClick: () => void
  setItemPosition: (newPosition: SidebarPosition) => void
}
