import type { HTMLAttributes } from 'react'

import type { TabItem } from '../../shared/TabItem.types'

export interface BackButtonProps extends HTMLAttributes<HTMLDivElement> {
  isBack: boolean
  setBack: () => void
}

export interface ForwardButtonProps extends HTMLAttributes<HTMLDivElement> {
  isForward: boolean
  setForward: () => void
}

export interface RefreshButtonProps extends HTMLAttributes<HTMLDivElement> {
  refreshPage: () => void
}

export interface UrlInputProps extends HTMLAttributes<HTMLDivElement> {
  activeItem: TabItem | null
}

export interface TabToolbarProps extends HTMLAttributes<HTMLDivElement> {
  activeItem: TabItem | null
  refreshPage: () => void
  isBack: boolean
  isForward: boolean
  locationBack: () => void
  locationForward: () => void
}
