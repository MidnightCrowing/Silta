import type { FluentIcon } from '@fluentui/react-icons'
import type { ComponentType } from 'react'

import type { TabComponentNameEnum, TabItem } from '../../shared/TabItem.types'

export type ComponentMapType = Record<TabComponentNameEnum, ComponentType<any>>

export interface TabPageProps {
  activeItemId: string
  activeItem: TabItem
  setPageTitle: (pageId: string, newTitle: string) => void
  setPageIcon: (pageId: string, newIcon: FluentIcon) => void
  setPageComponentName: (pageId: string, newComponentName: TabComponentNameEnum) => void
  setPageComponentProps: (pageId: string, newComponentProps: Record<string, any>) => void
}

export interface PageWrapperProps {
  activeItemId: string
  setPageTitle: (pageId: string, newTitle: string) => void
  setPageIcon: (pageId: string, newIcon: FluentIcon) => void
  setPageComponentName: (pageId: string, newComponentName: TabComponentNameEnum) => void
  setPageComponentProps: (pageId: string, newComponentProps: Record<string, any>) => void
}
