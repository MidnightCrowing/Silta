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
  /**
   * @description 历史记录
   */
  history: TabHistoryItem[]

  /**
   * @description 当前历史记录索引
   */
  historyIndex: number

  /**
   * @description 是否显示添加动画, false时不显示
   */
  showAddAnimation?: boolean

  /**
   * @description 是否固定标签页
   */
  isPinned?: boolean
}
