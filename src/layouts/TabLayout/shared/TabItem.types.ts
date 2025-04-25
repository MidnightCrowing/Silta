import type { FluentIcon } from '@fluentui/react-icons'

export enum TabComponentNameEnum {
  NewPage = 'NewPage',
  SearchPage = 'SearchPage',
  SearchListPage = 'SearchListPage',
  MultiPreviewPage = 'MultiPreviewPage',
  SinglePreviewPage = 'SinglePreviewPage',
  VideoPage = 'VideoPage',
}

export interface TabItem {
  /**
   * @description 页面组件名称
   */
  componentName: TabComponentNameEnum

  /**
   * @description 页面组件参数
   */
  componentProps?: Record<string, any>

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
