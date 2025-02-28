import type { FluentIcon } from '@fluentui/react-icons'

export enum TabComponentNameEnum {
  NewPage = 'NewPage',
  SearchPage = 'SearchPage',
  MultiPreviewPage = 'MultiPreviewPage',
  SinglePreviewPage = 'SinglePreviewPage',
  VideoPage = 'VideoPage',
}

export interface TabItem {
  // 页面组件名称
  componentName: TabComponentNameEnum

  // 页面组件参数
  componentProps?: Record<string, any>

  // 页面标签
  label?: string

  // 页面图标
  icon?: FluentIcon

  // 是否显示添加动画, false时不显示
  showAddAnimation?: boolean
}
