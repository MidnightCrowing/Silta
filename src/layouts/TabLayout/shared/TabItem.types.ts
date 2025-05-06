import type { FluentIcon } from '@fluentui/react-icons'

export interface TabItem {
  title: string
  icon: FluentIcon
  history: string[] // url列表
  historyIndex: number

  /**
   * @description 是否显示添加动画, false时不显示
   */
  showAddAnimation?: boolean
}
