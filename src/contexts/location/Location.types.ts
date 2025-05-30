import type { ReactNode } from 'react'

import type { TabHistoryItem, TabItemTypes, updatePageData } from '~/layouts'

export interface LocationProps {
  [p: string]: any
}

/**
 * @description 表示页面的状态
 */
export type LocationState = TabHistoryItem

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
  activeTab: TabItemTypes

  /**
   * @description 页面存储处理函数
   */
  storeHandlers: {
    /**
     * @description 页面存储
     */
    store: Record<any, any>

    /**
     * @description 设置页面存储
     * @param data 页面存储数据
     */
    setStore: <T extends Record<any, any>>(data: T) => void

    /**
     * @description 深度合并页面存储
     * @param key 键名
     * @param value 值
     */
    deepMergeStore: <T extends Record<any, any>>(key: string, value: T) => void

    /**
     * @description 清空页面存储
     */
    clearStore: () => void
  }

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
export interface LocationContextType<
  P extends LocationProps = LocationProps,
  S extends Record<any, any> = Record<any, any>,
> {
  /**
   * @description 页面ID
   */
  pageId: string

  /**
   * @description 当前的位置状态
   */
  location: LocationState

  /**
   * @description 获取位置状态的属性
   * @returns 返回位置状态的属性
   */
  props: P

  /**
   * @description 页面存储
   */
  store: S

  /**
   * @description 获取KeepAlive组件在当前page的名称
   * @param name 名称
   * @returns 返回 KeepAlive name
   */
  getAliveName: (name: string) => string

  /**
   * @description 设置新的位置状态
   * @param title 页面标签
   * @param icon 页面图标
   * @param url 页面链接
   */
  setLocation: ({ title, icon, url }: Partial<LocationState>) => void

  /**
   * @description 设置页面存储
   * @param data 页面存储数据
   */
  setStore: (data: Partial<S>) => void

  /**
   * @description 深度合并页面存储
   * @param key 键名
   * @param value 值
   */
  deepMergeStore: <T extends Record<any, any>>(key: keyof S, value: T) => void

  /**
   * @description 清空页面存储
   */
  clearStore: () => void
}
