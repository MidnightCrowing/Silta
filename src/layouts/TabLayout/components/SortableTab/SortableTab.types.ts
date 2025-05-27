import type { HTMLAttributes } from 'react'

import type { TabItemTypes } from '../../shared/TabItem.types'
import type { updatePageData } from '../../TabLayout.types'

export interface SortableTabProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * @description 标签页ID
   */
  id: string

  /**
   * @description 标签页项目
   */
  item: TabItemTypes

  /**
   * @description 是否选中
   */
  isSelect: boolean

  /**
   * @description 添加新标签页
   * @param newItem 新的标签项
   * @param active 是否激活新标签
   * @param insertIndex 插入位置索引
   */
  addItem: (newItem?: TabItemTypes, active?: boolean, insertIndex?: number) => void

  /**
   * @description 移除标签页
   * @param updater 用于更新标签集合的函数
   */
  removeItem: (updater: (items: Record<string, TabItemTypes>) => Record<string, TabItemTypes>) => void

  /**
   * @description 所有标签页的ID集合
   */
  allTabIds?: string[]

  /**
   * @description 更新页面数据的方法
   */
  updatePageData: updatePageData
}
