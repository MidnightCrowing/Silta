import type { HTMLAttributes } from 'react'

import type { TabItem } from '../../shared/TabItem.types'

export interface BackButtonProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * @description 是否可以后退
   */
  isBack: boolean

  /**
   * @description 设置后退
   */
  setBack: () => void
}

export interface ForwardButtonProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * @description 是否可以前进
   */
  isForward: boolean

  /**
   * @description 设置前进
   */
  setForward: () => void
}

export interface RefreshButtonProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * @description 刷新页面
   */
  refreshPage: () => void
}

export interface UrlInputProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * @description 当前激活的项目
   */
  activeItem: TabItem | null
}

export interface TabToolbarProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * @description 当前激活的项目
   */
  activeItem: TabItem | null

  /**
   * @description 刷新页面
   */
  refreshPage: () => void

  /**
   * @description 是否可以后退
   */
  isBack: boolean

  /**
   * @description 是否可以前进
   */
  isForward: boolean

  /**
   * @description 后退到上一个位置
   */
  locationBack: () => void

  /**
   * @description 前进到下一个位置
   */
  locationForward: () => void
}
