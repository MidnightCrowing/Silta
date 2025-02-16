import type { FluentIcon } from '@fluentui/react-icons'
import type { ComponentType, HTMLAttributes, ReactNode } from 'react'

export interface ResizeComponentProps extends HTMLAttributes<HTMLDivElement> {
  onMouseDown: () => void
  isResizing: boolean
}

type SidebarItemId = string | number
export type SidebarPosition = 'leftTop' | 'leftBottom' | 'rightTop' | 'rightBottom'

interface SidebarItemBase {
  id: SidebarItemId
  label: string
  position: SidebarPosition
}

export interface SidebarNavItem extends SidebarItemBase {
  type?: 'item'
  icon?: FluentIcon
  componentUrl: string
}

export interface SidebarButton extends SidebarItemBase {
  type: 'button'
  icon: FluentIcon | ComponentType<any>
}

export interface SidebarItemDivider {
  id: string | number
  type: 'divider'
  position: SidebarPosition
}

export type SidebarItem = SidebarNavItem | SidebarButton | SidebarItemDivider
export type SidebarActiveItem = SidebarNavItem | null
export type SidebarActiveItemId = SidebarItemId | null

/* SidebarNavigation */
export interface SidebarNavigationProps extends HTMLAttributes<HTMLDivElement> {
  position: 'left' | 'right'
  topItems?: SidebarItem[]
  bottomItems?: SidebarItem[]
  topActiveItemId: SidebarActiveItemId
  bottomActiveItemId: SidebarActiveItemId
  setTopActiveItemId: (topItem: SidebarActiveItemId) => void
  setBottomActiveItemId: (bottomItem: SidebarActiveItemId) => void
}

/* SidebarPanel */
export interface SidebarPanelProps extends HTMLAttributes<HTMLDivElement> {
  position: 'start' | 'end' | 'bottom'
  activeItem: SidebarActiveItem
  open: boolean
  setDrawerIsResizing: (state: boolean) => void
  hidePanel: () => void
}

export interface SidebarPanelState {
  drawerWidth: number
  drawerHeight: number
  drawerIsResizing: boolean
  toolbarVisible: boolean
}

/* SidebarLayout */
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
