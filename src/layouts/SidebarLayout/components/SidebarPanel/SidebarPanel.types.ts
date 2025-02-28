import type { HTMLAttributes, ReactNode } from 'react'

import type { SidebarActiveItem } from '../../shared/SidebarItem.types'

export interface SidebarPanelProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  position: 'start' | 'end' | 'bottom'
  activeItem: SidebarActiveItem
  open: boolean
  setDrawerIsResizing: (state: boolean) => void
  hidePanel: () => void
}

export interface SidebarPanelState {
  drawerLength: number
  drawerIsResizing: boolean
  toolbarVisible: boolean
}
