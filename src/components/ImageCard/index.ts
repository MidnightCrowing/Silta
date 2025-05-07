import { lazy } from 'react'

export const ImageCard = lazy(() => import('./ImageCard'))
export const ImageCardList = lazy(() => import('./ImageCardList'))
export type { ImageCardProps } from './ImageCard.types'
