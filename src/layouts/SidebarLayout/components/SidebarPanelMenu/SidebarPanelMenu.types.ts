import type { ReactNode } from 'react'

import type { SidebarPosition } from '../../shared/SidebarItem.types.ts'

export interface MovePanelMenuProps {
  position: SidebarPosition
  setPosition: (newPosition: SidebarPosition) => void
}

export interface ResizePanelMenuProps {
  position: SidebarPosition
}

export interface SidebarPanelMenuProps {
  customMenu: ReactNode
}
