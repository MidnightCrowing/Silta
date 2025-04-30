import type { FluentIcon } from '@fluentui/react-icons'

import type { LocationComponentProps } from '~/contexts/location'
import type { MultiPreviewPageLocationProps } from '~/pages/MultiPreviewPage'
import type { VideoPageLocationProps } from '~/pages/VideoPage'

export enum TabComponentNameEnum {
  NewPage = 'NewPage',
  SearchPage = 'SearchPage',
  SearchListPage = 'SearchListPage',
  MultiPreviewPage = 'MultiPreviewPage',
  SinglePreviewPage = 'SinglePreviewPage',
  VideoPage = 'VideoPage',
}

// 定义每个组件对应的 props 类型
interface TabComponentPropsMap {
  [TabComponentNameEnum.NewPage]: LocationComponentProps
  [TabComponentNameEnum.SearchPage]: LocationComponentProps
  [TabComponentNameEnum.SearchListPage]: LocationComponentProps
  [TabComponentNameEnum.MultiPreviewPage]: MultiPreviewPageLocationProps
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
