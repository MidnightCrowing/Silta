import type { HTMLAttributes } from 'react'
import type { AliveController } from 'react-activation'

import type { TabItemTypes } from '~/layouts/TabLayout'

export interface TabLayoutProps extends Omit<HTMLAttributes<HTMLDivElement>, 'items'>, Partial<AliveController> {
  /**
   * @description 标签页项目列表
   */
  items?: TabItemTypes[]
}

export interface TabLayoutState {
  /**
   * @description 当前激活的项目ID
   */
  activeItemId: string | null

  /**
   * @description 标签页项目映射
   */
  items: { [id: string]: TabItemTypes }
}

export type updatePageData = (pageId: string, updater: (oldTab: TabItemTypes) => TabItemTypes) => void
