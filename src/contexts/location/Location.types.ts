import type { FluentIcon } from '@fluentui/react-icons'

import type { TabComponentNameEnum } from '~/layouts'

export interface LocationComponentProps {
  [p: string]: any
}

/**
 * @description 表示页面的状态
 */
export interface LocationState {
  /**
   * @description 页面标签
   */
  pageLabel: string

  /**
   * @description 页面图标
   */
  pageIcon?: FluentIcon

  /**
   * @description 页面组件名称
   */
  pageComponentName: TabComponentNameEnum

  /**
   * @description 页面组件属性
   */
  pageComponentProps: LocationComponentProps
}

/**
 * @description 表示位置上下文的类型
 */
export interface LocationContextType {
  /**
   * @description 当前的位置状态
   */
  location: LocationState

  /**
   * @description 位置历史记录
   */
  locationHistory: LocationState[]

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

  /**
   * @description 设置新的位置状态
   * @param pageLabel 页面标签
   * @param pageIcon 页面图标
   * @param pageComponentName 页面组件名称
   * @param pageComponentProps 页面组件属性
   */
  setLocation: ({ pageLabel, pageIcon, pageComponentName, pageComponentProps }: Partial<LocationState>) => void
}
