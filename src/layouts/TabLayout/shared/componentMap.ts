import type { ComponentType } from 'react'

import { ImageGalleryPage, SearchListPage, SearchPage, SinglePreviewPage, VideoPage } from '~/pages'

import { TabComponentNameEnum } from './TabItem.types'

export type ComponentMapType = Record<TabComponentNameEnum, ComponentType<any>>

export const componentMap: ComponentMapType = {
  [TabComponentNameEnum.NewPage]: SearchPage,
  [TabComponentNameEnum.SearchPage]: SearchPage,
  [TabComponentNameEnum.ImageGalleryPage]: ImageGalleryPage,
  [TabComponentNameEnum.SinglePreviewPage]: SinglePreviewPage,
  [TabComponentNameEnum.VideoPage]: VideoPage,
  [TabComponentNameEnum.SearchListPage]: SearchListPage,
}
