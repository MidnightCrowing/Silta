import type { FluentIcon } from '@fluentui/react-icons'
import type { Dispatch, SetStateAction } from 'react'

import type { TabComponentNameEnum, TabItem } from '../../shared/TabItem.types'

export interface LocationState {
  isBack: boolean
  isForward: boolean
  locationBack: () => void
  locationForward: () => void
}

export interface PageWrapperRef {
  getLocationState: () => LocationState
}

export interface PageWrapperProps {
  activeItemId: string
  setPageTitle: (pageId: string, newTitle: string) => void
  setPageIcon: (pageId: string, newIcon: FluentIcon) => void
  setPageComponentName: (pageId: string, newComponentName: TabComponentNameEnum) => void
  setPageComponentProps: (pageId: string, newComponentProps: Record<string, any>) => void
  setLocationState: Dispatch<SetStateAction<LocationState>>
}

export interface TabPageProps {
  activeItemId: string
  activeItem: TabItem
  setPageTitle: (pageId: string, newTitle: string) => void
  setPageIcon: (pageId: string, newIcon: FluentIcon) => void
  setPageComponentName: (pageId: string, newComponentName: TabComponentNameEnum) => void
  setPageComponentProps: (pageId: string, newComponentProps: Record<string, any>) => void
}
