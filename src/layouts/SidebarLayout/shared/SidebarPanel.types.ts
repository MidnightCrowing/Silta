import type { ReactNode } from 'react'

export interface SidebarPanelRef {
  customStaticToolbar?: () => ReactNode
  customFadeToolbar?: () => ReactNode
  customMenu?: () => ReactNode
}
