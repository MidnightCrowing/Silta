import type { FluentIcon } from '@fluentui/react-icons'
import type { ComponentType } from 'react'

export type SidebarItemId = string | number
export type SidebarPosition = 'leftTop' | 'leftBottom' | 'rightTop' | 'rightBottom'

interface SidebarItemBase {
  id: SidebarItemId
  label: string
  component: ComponentType<any>
  position: SidebarPosition
}

export interface SidebarNavItem extends SidebarItemBase {
  type?: 'item'
  icon?: FluentIcon
}

export interface SidebarButton extends SidebarItemBase {
  type: 'button'
}

export interface SidebarItemDivider {
  id: string | number
  type: 'divider'
  position: SidebarPosition
}

export type SidebarItem = SidebarNavItem | SidebarButton | SidebarItemDivider
export type SidebarActiveItem = SidebarNavItem | null
export type SidebarActiveItemId = SidebarItemId | null
