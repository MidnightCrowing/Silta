import type { HTMLAttributes } from 'react'

import type { TabItem } from '../../shared/TabItem.types'
import type { updatePageData } from '../../TabLayout.types.ts'

export interface BackButtonProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * @description 当前激活的项目ID
   */
  activeItemId: string

  /**
   * @description 当前激活的项目
   */
  activeItem: TabItem | null

  /**
   * @description 更新页面数据
   * @param pageId 页面ID
   * @param updater 更新函数
   */
  updatePageData: updatePageData
}

export interface ForwardButtonProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * @description 当前激活的项目ID
   */
  activeItemId: string

  /**
   * @description 当前激活的项目
   */
  activeItem: TabItem | null

  /**
   * @description 更新页面数据
   * @param pageId 页面ID
   * @param updater 更新函数
   */
  updatePageData: updatePageData
}

export interface RefreshButtonProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * @description 刷新页面
   */
  refreshPage: () => void
}

export interface AddressBarProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * @description 当前激活的项目ID
   */
  activeItemId: string

  /**
   * @description 当前激活的项目
   */
  activeItem: TabItem | null

  /**
   * @description 更新页面数据
   * @param pageId 页面ID
   * @param updater 更新函数
   */
  updatePageData: updatePageData
}

export interface TabToolbarProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * @description 当前激活的项目ID
   */
  activeItemId: string

  /**
   * @description 当前激活的项目
   */
  activeItem: TabItem | null

  /**
   * @description 更新页面数据
   * @param pageId 页面ID
   * @param updater 更新函数
   */
  updatePageData: updatePageData

  /**
   * @description 刷新页面
   */
  refreshPage: () => void
}
