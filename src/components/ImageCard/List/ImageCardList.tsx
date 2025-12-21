import { Skeleton } from '@fluentui/react-components'
import { useMemo } from 'react'
import { PhotoProvider } from 'react-photo-view'

import type { ImageCardListProps } from './ImageCardList.types.ts'
import type { ImageCardListContextType } from './ImageCardListContext.ts'
import { ImageCardListContextContext } from './ImageCardListContext.ts'

export default function ImageCardList({
  className,
  children,
  maskOpacity = 0.85,
  showName = false,
  enablePreview = false,
}: ImageCardListProps) {
  const contextValue: ImageCardListContextType = useMemo(() => ({
    showName,
    enablePreview,
  }), [showName, enablePreview])

  return (
    <Skeleton
      className={className}
      animation="pulse"
      aria-label="Loading image list"
    >
      <PhotoProvider maskOpacity={maskOpacity}>
        <ImageCardListContextContext.Provider value={contextValue}>
          {children}
        </ImageCardListContextContext.Provider>
      </PhotoProvider>
    </Skeleton>
  )
}
