import type { HTMLAttributes, ReactNode } from 'react'

export interface SidebarPanelProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * 要在侧边栏面板中渲染的内容。
   */
  children: ReactNode

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
   * 指示指针是否当前悬停在面板上。
   */
  pointerEnter: boolean

  /**
   * 隐藏侧边栏面板的函数。
   */
  hidePanel: () => void
}

export interface SidebarPanelPropsBase {
  /**
   * 指示指针是否当前悬停在面板上。
   */
  pointerEnter: boolean

  /**
   * 隐藏侧边栏面板的函数。
   */
  hidePanel: () => void
}
