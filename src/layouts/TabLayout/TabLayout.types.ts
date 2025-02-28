import type { HTMLAttributes } from 'react'

import type { TabItem } from './shared/TabItem.types'

export interface TabLayoutProps extends Omit<HTMLAttributes<HTMLDivElement>, 'items'> {
  items?: TabItem[]
}

export interface TabLayoutState {
  activeItemId: string | null
  items: { [id: string]: TabItem }
}
