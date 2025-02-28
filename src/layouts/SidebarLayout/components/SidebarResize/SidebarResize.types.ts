import type { HTMLAttributes } from 'react'

export interface SidebarResizeProps extends HTMLAttributes<HTMLDivElement> {
  onMouseDown: () => void
  isResizing: boolean
}
