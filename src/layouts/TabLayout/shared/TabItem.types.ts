import type { FluentIcon } from '@fluentui/react-icons'

import type { LocationComponentProps } from '~/contexts/location'
import type { ImageGalleryPageLocationProps } from '~/pages/ImageGalleryPage'
import type { VideoPageLocationProps } from '~/pages/VideoPage'

export enum TabComponentNameEnum {
  NewPage = 'NewPage',
  SearchPage = 'SearchPage',
  SearchListPage = 'SearchListPage',
  ImageGalleryPage = 'ImageGalleryPage',
  SinglePreviewPage = 'SinglePreviewPage',
  VideoPage = 'VideoPage',
}

// 定义每个组件对应的 props 类型
interface TabComponentPropsMap {
  [TabComponentNameEnum.NewPage]: LocationComponentProps
  [TabComponentNameEnum.SearchPage]: LocationComponentProps
  [TabComponentNameEnum.SearchListPage]: LocationComponentProps
  [TabComponentNameEnum.ImageGalleryPage]: ImageGalleryPageLocationProps
  [TabComponentNameEnum.SinglePreviewPage]: LocationComponentProps
  [TabComponentNameEnum.VideoPage]: VideoPageLocationProps
}

export interface TabItem<T extends TabComponentNameEnum = TabComponentNameEnum> {
  /**
   * @description 页面组件名称
   */
  componentName: T

  /**
   * @description 页面组件参数
   */
  componentProps?: T extends keyof TabComponentPropsMap ? TabComponentPropsMap[T] : never

  /**
   * @description 页面标签
   */
  label?: string

  /**
   * @description 页面图标
   */
  icon?: FluentIcon

  /**
   * @description 是否显示添加动画, false时不显示
   */
  showAddAnimation?: boolean
}
