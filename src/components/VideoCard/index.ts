import { lazy } from 'react'

export const VideoCard = lazy(() => import('./VideoCard'))
export const VideoCardList = lazy(() => import('./VideoCardList'))
export type { VideoCardProps } from './VideoCard.types'
