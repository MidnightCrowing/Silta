import type { ComponentType } from 'react'

import { MultiPreviewPage, SearchPage, SinglePreviewPage, VideoPage } from '~/pages'

import { TabComponentNameEnum } from './TabItem.types'

export type ComponentMapType = Record<TabComponentNameEnum, ComponentType<any>>

export const componentMap: ComponentMapType = {
  [TabComponentNameEnum.NewPage]: SearchPage,
  [TabComponentNameEnum.SearchPage]: SearchPage,
  [TabComponentNameEnum.MultiPreviewPage]: MultiPreviewPage,
  [TabComponentNameEnum.SinglePreviewPage]: SinglePreviewPage,
  [TabComponentNameEnum.VideoPage]: VideoPage,
}
