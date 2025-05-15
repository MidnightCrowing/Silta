import { createContext, useContext } from 'react'

import type { SidebarPosition } from '../../shared/SidebarItem.types.ts'

export interface SidebarPanelWrapperContextType {
  position: SidebarPosition
  pointerEnter: boolean
  hidePanel: () => void
  isFadeTopbarPinned: boolean
  setPosition: (newPosition: SidebarPosition) => void
  setFadeTopbarPinned: (value: boolean) => void
}

export const SidebarPanelWrapperContext = createContext<SidebarPanelWrapperContextType | null>(null)

export function useSidebarPanelWrapperContext() {
  const ctx = useContext(SidebarPanelWrapperContext)
  if (!ctx)
    throw new Error('useSidebarPanelWrapperContext must be used within SidebarPanelWrapperContext.Provider')
  return ctx
}
