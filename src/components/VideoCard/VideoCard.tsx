import { Image, ListItem, SkeletonItem, Text } from '@fluentui/react-components'
import { useState } from 'react'

import type { VideoCardProps } from './VideoCard.types'

export default function VideoCard({ cover, title }: VideoCardProps) {
  const [isImageLoading, setIsImageLoading] = useState<boolean>(true)

  return (
    <ListItem>
      <div
        bg="hover:$colorSubtleBackgroundHover active:$colorSubtleBackgroundPressed"
        ring="hover:6 hover:$colorSubtleBackgroundHover active:$colorSubtleBackgroundPressed"
        m="6px"
        w-full
        rounded="3px"
        flex="~ row items-start"
        gap="7px"
        transition="all duration-200 ease-in-out"
        overflow-hidden
        cursor-pointer
      >
        {/* 在图片加载完成前，显示骨架图占位 */}
        {isImageLoading && (
          <SkeletonItem
            className="w-45%! h-full! aspect-[16/9]"
            shape="rectangle"
          />
        )}
        {/* 图片加载后显示 */}
        <Image
          className="w-45% max-w-150px h-auto"
          alt="video recommendation card image"
          src={cover}
          shape="rounded"
          style={{ display: isImageLoading ? 'none' : 'block' }}
          onLoad={() => setIsImageLoading(false)}
        />

        <Text className="line-clamp-3! break-words" weight="semibold">{title}</Text>
      </div>
    </ListItem>
  )
}
