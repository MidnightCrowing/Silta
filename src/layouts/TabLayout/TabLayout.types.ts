import type { HTMLAttributes } from 'react'

import type { TabItem } from '~/layouts/TabLayout'

export interface TabLayoutProps extends Omit<HTMLAttributes<HTMLDivElement>, 'items'> {
  /**
   * @description 标签页项目列表
   */
  items?: TabItem[]
}

export interface TabLayoutState {
  /**
   * @description 当前激活的项目ID
   */
  activeItemId: string | null

  /**
   * @description 标签页项目映射
   */
  items: { [id: string]: TabItem }
}

export type updatePageData = (pageId: string, updater: (oldTab: TabItem) => TabItem) => void
