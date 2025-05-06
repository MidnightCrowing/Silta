import type { updatePageData } from '~/layouts/TabLayout'

import type { TabItem } from '../../shared/TabItem.types'

export interface TabPageProps {
  /**
   * @description 当前激活的项目ID
   */
  activeItemId: string

  /**
   * @description 当前激活的项目
   */
  activeItem: TabItem

  /**
   * @description 更新页面数据
   * @param pageId 页面ID
   * @param updater 更新函数
   */
  updatePageData: updatePageData
}
