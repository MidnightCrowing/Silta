import type { FluentIcon } from '@fluentui/react-icons'
import type { ReactNode } from 'react'

import type { TabItem, updatePageData } from '~/layouts/TabLayout'

export interface LocationProps {
  [p: string]: any
}

/**
 * @description 表示页面的状态
 */
export interface LocationState {
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

/**
 * @description 表示位置提供者的属性
 */
export interface LocationProviderProps {
  /**
   * @description 页面组件
   */
  children: ReactNode

  /**
   * @description 页面ID
   */
  pageId: string

  /**
   * @description 当前激活的标签
   */
  activeTab: TabItem

  /**
   * @description 更新页面数据的函数
   * @param pageId 页面ID
   * @param updater 更新函数
   */
  updatePageData: updatePageData
}

/**
 * @description 表示位置上下文的类型
 */
export interface LocationContextType {
  /**
   * @description 当前的位置状态
   */
  location: LocationState

  getProps: <T extends LocationProps>() => T

  /**
   * @description 设置新的位置状态
   * @param title 页面标签
   * @param icon 页面图标
   * @param url 页面链接
   */
  setLocation: ({ title, icon, url }: Partial<LocationState>) => void
}
