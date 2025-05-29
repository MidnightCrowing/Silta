import type { FC } from 'react'
import { memo } from 'react'

import type { SidebarResizeProps } from './SidebarResize.types'

export const SidebarResize: FC<SidebarResizeProps> = memo(({ isResizing, onMouseDown, ...props }) => (
  <div
    role="button"
    aria-label="resize panel"
    className={isResizing ? 'b-r-(2px! $colorBrandBackgroundHover!)' : undefined}
    transition="colors duration-100 ease-in-out"
    z="3"
    onMouseDown={onMouseDown}
    {...props}
  />
))
