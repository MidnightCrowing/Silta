import clsx from 'clsx'
import type { FC } from 'react'
import { memo } from 'react'

import type { SidebarResizeProps } from './SidebarResize.types'

export const SidebarResize: FC<SidebarResizeProps> = memo(({ isResizing, onMouseDown, ...props }) => (
  <div
    role="button"
    aria-label="resize panel"
    className={clsx(
      isResizing ? 'b-r-(3px $colorNeutralBackground5Pressed)' : '',
    )}
    z="3"
    onMouseDown={onMouseDown}
    {...props}
  />
))
