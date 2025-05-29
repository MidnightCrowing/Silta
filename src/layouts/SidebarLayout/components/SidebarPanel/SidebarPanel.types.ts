import type { HTMLAttributes, ReactNode } from 'react'

export interface SidebarPanelProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * 要在侧边栏面板中渲染的内容。
   */
  children: ReactNode

  /**
   * 侧边栏面板的 CSS 类名, 需要给出组件css名。
   */
  className: string

  /**
   * 侧边栏面板的标题。
   */
  title: string

  /**
   * 可选的静态工具栏内容，将显示在面板中。
   */
  staticToolbar?: ReactNode

  /**
   * 可选的渐隐工具栏内容，将显示在面板中。
   */
  fadeToolbar?: ReactNode

  /**
   * 可选的自定义菜单内容，将显示在面板中。
   */
  customMenu?: ReactNode

  /**
   * 工具栏的选中值映射，key 为工具栏名称，value 为选中的项数组。
   */
  toolbarValve?: any

  /**
   * 设置工具栏选中值的函数。
   */
  setToolbarValve?: (newValve: any) => void
}
