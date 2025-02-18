import type { FluentIcon } from '@fluentui/react-icons'
import type { ComponentType, HTMLAttributes } from 'react'

export interface TabItem {
  id: string
  label: string
  icon?: FluentIcon
  component: ComponentType<{ className: string }>
  new?: boolean // 是否显示添加动画, false时不显示
}

/* TabDivider */
export interface TabDividerProps extends HTMLAttributes<HTMLDivElement> {
  groupId: string
}

/* SortableTab */
export interface SortableTabProps extends HTMLAttributes<HTMLDivElement> {
  item: TabItem
  isSelect: boolean
  removeItem: () => void
}

/* TabLayout */
export interface TabLayoutProps extends Omit<HTMLAttributes<HTMLDivElement>, 'items'> {
  items?: TabItem[]
}

export interface TabLayoutState {
  activeItem: TabItem | null
  items: TabItem[]
}
