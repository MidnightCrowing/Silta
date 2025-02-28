import type { HTMLAttributes } from 'react'

import type { SidebarActiveItemId, SidebarItem } from '../../shared/SidebarItem.types'

export interface SidebarNavigationProps extends HTMLAttributes<HTMLDivElement> {
  position: 'left' | 'right'
  topItems?: SidebarItem[]
  bottomItems?: SidebarItem[]
  topActiveItemId: SidebarActiveItemId
  bottomActiveItemId: SidebarActiveItemId
  setTopActiveItemId: (topItem: SidebarActiveItemId) => void
  setBottomActiveItemId: (bottomItem: SidebarActiveItemId) => void
}
