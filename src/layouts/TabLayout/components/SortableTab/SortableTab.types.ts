import type { HTMLAttributes } from 'react'

import type { TabItemTypes } from '../../shared/TabItem.types'

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
   * @description 移除标签页
   */
  removeItem: () => void
}
