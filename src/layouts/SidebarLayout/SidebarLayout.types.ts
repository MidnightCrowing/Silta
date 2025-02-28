import type { HTMLAttributes, ReactNode } from 'react'

import type { SidebarActiveItem, SidebarActiveItemId, SidebarItem } from './shared/SidebarItem.types'

export interface SidebarLayoutProps extends Omit<HTMLAttributes<HTMLDivElement>, 'items'> {
  children: ReactNode
  items?: SidebarItem[]
  leftTopActiveItemId?: SidebarActiveItemId
  leftBottomActiveItemId?: SidebarActiveItemId
  rightTopActiveItemId?: SidebarActiveItemId
  rightBottomActiveItemId?: SidebarActiveItemId
}

export interface SidebarLayoutState {
  leftTopActiveItem: SidebarActiveItem
  leftBottomActiveItem: SidebarActiveItem
  rightTopActiveItem: SidebarActiveItem
  rightBottomActiveItem: SidebarActiveItem
  drawerIsResizing: boolean
  bottomDrawersIsResizing: boolean
}
