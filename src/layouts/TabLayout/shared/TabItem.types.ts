import type { FluentIcon } from '@fluentui/react-icons'

export interface TabHistoryItem {
  /**
   * @description 页面标签
   */
  title: string

  /**
   * @description 页面图标
   */
  icon?: FluentIcon

  /**
   * @description 页面链接
   */
  url: string
}

export interface TabItemTypes {
  history: TabHistoryItem[]
  historyIndex: number

  /**
   * @description 是否显示添加动画, false时不显示
   */
  showAddAnimation?: boolean
}
