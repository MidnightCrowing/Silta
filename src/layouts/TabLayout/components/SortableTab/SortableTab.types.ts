import type { HTMLAttributes } from 'react'

import type { TabItem } from '../../shared/TabItem.types'

export interface SortableTabProps extends HTMLAttributes<HTMLDivElement> {
  id: string
  item: TabItem
  isSelect: boolean
  removeItem: () => void
}
