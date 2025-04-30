import type { FluentIcon } from '@fluentui/react-icons'
import type { Dispatch, SetStateAction } from 'react'

import type { LocationComponentProps } from '~/contexts/location'

import type { TabComponentNameEnum, TabItem } from '../../shared/TabItem.types'

export interface LocationState {
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

export interface PageWrapperRef {
  /**
   * @description 获取位置状态
   */
  getLocationState: () => LocationState
}

export interface PageWrapperProps {
  /**
   * @description 当前激活的项目ID
   */
  activeItemId: string

  /**
   * @description 当前激活的项目
   */
  activeItem: TabItem

  /**
   * @description 设置页面标题
   * @param pageId 页面ID
   * @param newTitle 新标题
   */
  setPageTitle: (pageId: string, newTitle: string) => void

  /**
   * @description 设置页面图标
   * @param pageId 页面ID
   * @param newIcon 新图标
   */
  setPageIcon: (pageId: string, newIcon: FluentIcon) => void

  /**
   * @description 设置页面组件名称
   * @param pageId 页面ID
   * @param newComponentName 新组件名称
   */
  setPageComponentName: (pageId: string, newComponentName: TabComponentNameEnum) => void

  /**
   * @description 设置页面组件属性
   * @param pageId 页面ID
   * @param newComponentProps 新组件属性
   */
  setPageComponentProps: (pageId: string, newComponentProps: LocationComponentProps) => void

  /**
   * @description 设置位置状态
   */
  setLocationState: Dispatch<SetStateAction<LocationState>>
}

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
   * @description 设置页面标题
   * @param pageId 页面ID
   * @param newTitle 新标题
   */
  setPageTitle: (pageId: string, newTitle: string) => void

  /**
   * @description 设置页面图标
   * @param pageId 页面ID
   * @param newIcon 新图标
   */
  setPageIcon: (pageId: string, newIcon: FluentIcon) => void

  /**
   * @description 设置页面组件名称
   * @param pageId 页面ID
   * @param newComponentName 新组件名称
   */
  setPageComponentName: (pageId: string, newComponentName: TabComponentNameEnum) => void

  /**
   * @description 设置页面组件属性
   * @param pageId 页面ID
   * @param newComponentProps 新组件属性
   */
  setPageComponentProps: (pageId: string, newComponentProps: LocationComponentProps) => void
}
