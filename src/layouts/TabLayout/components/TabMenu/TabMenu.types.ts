import type { MenuProps } from '@fluentui/react-components'
import type { Dispatch, SetStateAction } from 'react'

import type { TabItemTypes } from '../../shared/TabItem.types'
import type { updatePageData } from '../../TabLayout.types'

export interface OpenAsPopoverProps {
  anchorEl: HTMLElement | null
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  tabId: string
  item: TabItemTypes
  updatePageData: updatePageData
}

export interface TabMenuProps {
  menuOpen: boolean
  onOpenChange: MenuProps['onOpenChange']
  anchorEl: HTMLElement | null
  tabId: string
  item: TabItemTypes
  addItem: (newItem?: TabItemTypes, active?: boolean, insertIndex?: number) => void
  removeItem: (updater: (items: Record<string, TabItemTypes>) => Record<string, TabItemTypes>) => void
  allTabIds?: string[]
  updatePageData: updatePageData
}
