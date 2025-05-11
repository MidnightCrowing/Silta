import type { ComponentType } from 'react'

import type { LocationProps } from '~/contexts/location'
import type { ImageGalleryLocationProps, SearchResultLocationProps, VideoLocationProps } from '~/pages'
import { ImageGalleryPage, SearchPage, SearchResultPage, SinglePreviewPage, VideoPage } from '~/pages'

export enum TabPageEnum {
  NewPage = 'NewPage',
  SearchPage = 'SearchPage',
  SearchResultPage = 'SearchResultPage',
  ImageGalleryPage = 'ImageGalleryPage',
  SinglePreviewPage = 'SinglePreviewPage',
  VideoPage = 'VideoPage',
}

// 定义每个组件对应的 props 类型
export interface TabPropsMap {
  [TabPageEnum.NewPage]: LocationProps
  [TabPageEnum.SearchPage]: LocationProps
  [TabPageEnum.SearchResultPage]: SearchResultLocationProps
  [TabPageEnum.ImageGalleryPage]: ImageGalleryLocationProps
  [TabPageEnum.SinglePreviewPage]: LocationProps
  [TabPageEnum.VideoPage]: VideoLocationProps
}

// 定义组件映射
export const componentMap: Record<TabPageEnum, ComponentType<any>> = {
  [TabPageEnum.NewPage]: SearchPage,
  [TabPageEnum.SearchPage]: SearchPage,
  [TabPageEnum.SearchResultPage]: SearchResultPage,
  [TabPageEnum.ImageGalleryPage]: ImageGalleryPage,
  [TabPageEnum.SinglePreviewPage]: SinglePreviewPage,
  [TabPageEnum.VideoPage]: VideoPage,
}
