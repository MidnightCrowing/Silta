import { lazy } from 'react'

export const SidebarLayout = lazy(() => import('./SidebarLayout'))
export type { SidebarItem } from './SidebarLayout.types'
