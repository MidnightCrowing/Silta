import type { FluentIcon } from '@fluentui/react-icons'
import type { ComponentType } from 'react'

export type SidebarItemId = string | number
export type SidebarPosition = 'leftTop' | 'leftBottom' | 'rightTop' | 'rightBottom'

interface SidebarItemBase {
  /**
   * @description 项目ID
   */
  id: SidebarItemId

  /**
   * @description 项目标签
   */
  label: string

  /**
   * @description 项目组件
   */
  component: ComponentType<any>

  /**
   * @description 项目位置
   */
  position: SidebarPosition
}

export interface SidebarNavItem extends SidebarItemBase {
  /**
   * @description 项目类型
   */
  type?: 'item'

  /**
   * @description 项目图标
   */
  icon?: FluentIcon
}

export interface SidebarButton extends SidebarItemBase {
  /**
   * @description 项目类型
   */
  type: 'button'
}

export interface SidebarItemDivider {
  /**
   * @description 分隔符ID
   */
  id: string | number

  /**
   * @description 分隔符类型
   */
  type: 'divider'

  /**
   * @description 分隔符位置
   */
  position: SidebarPosition
}

export type SidebarItem = SidebarNavItem | SidebarButton | SidebarItemDivider
export type SidebarActiveItem = SidebarNavItem | null
export type SidebarActiveItemId = SidebarItemId | null
