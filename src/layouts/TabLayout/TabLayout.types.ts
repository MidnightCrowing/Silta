import type { FluentIcon } from '@fluentui/react-icons'
import type { ComponentType, HTMLAttributes } from 'react'

export interface TabItem {
  id: string
  label: string
  icon?: FluentIcon
  component: ComponentType<{ className: string }>
}

/* TabLayout */
export interface TabLayoutProps extends Omit<HTMLAttributes<HTMLDivElement>, 'items'> {
  items?: TabItem[]
}

export interface TabLayoutState {
  activeItem: TabItem | null
  items: TabItem[]
}
