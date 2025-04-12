import { Image, ListItem, SkeletonItem } from '@fluentui/react-components'
import { useState } from 'react'

import type { VideoCardProps } from './VideoCard.types'

export default function VideoCard({ cover, title }: VideoCardProps) {
  const [isImageLoading, setIsImageLoading] = useState<boolean>(true)

  return (
    <ListItem>
      <div
        bg="hover:$colorNeutralStroke1Hover active:$colorNeutralStroke1Pressed"
        ring="hover:6 hover:$colorNeutralStroke1Hover active:$colorNeutralStroke1Pressed"
        m="6px"
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
            className="w-76%! h-unset! aspect-[16/9]"
            shape="rectangle"
          />
        )}
        {/* 图片加载后显示 */}
        <Image
          className="w-45% h-auto"
          alt="video recommendation card image"
          src={cover}
          shape="rounded"
          style={{ display: isImageLoading ? 'none' : 'block' }}
          onLoad={() => setIsImageLoading(false)}
        />

        <div grow line-clamp="3">{title}</div>
      </div>
    </ListItem>
  )
}
