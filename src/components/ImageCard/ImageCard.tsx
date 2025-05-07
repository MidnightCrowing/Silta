import './ImageCard.scss'

import { Image, SkeletonItem } from '@fluentui/react-components'
import { convertFileSrc } from '@tauri-apps/api/core'
import { useMemo, useState } from 'react'
import { PhotoView } from 'react-photo-view'

import type { ImageCardProps } from './ImageCard.types'

export default function ImageCard({ index, imageInfo }: ImageCardProps) {
  const [isImageLoading, setIsImageLoading] = useState<boolean>(true)

  // 如果未传递 imageInfo，则设置默认值
  const rawImage = imageInfo ? convertFileSrc(imageInfo.path) : ''
  const aspectRatio = useMemo(() => {
    if (imageInfo) {
      const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b))
      const divisor = gcd(imageInfo.width, imageInfo.height)
      return `${imageInfo.width / divisor}/${imageInfo.height / divisor}`
    }
    // 默认比例为 9:16
    return '9/16'
  }, [imageInfo])

  return (
    <div
      className="image-card group @container"
      relative
      flex="~ col"
      bg="hover:$colorNeutralStroke1Hover active:$colorNeutralStroke1Pressed"
      ring="hover:8 hover:$colorNeutralStroke1Hover active:$colorNeutralStroke1Pressed"
      rounded="3px"
      transition="all duration-200 ease-in-out"
      cursor-pointer
    >
      {/* 在图片加载完成前，显示骨架图占位 */}
      {isImageLoading && (
        <SkeletonItem
          className="h-unset!"
          shape="rectangle"
          style={{ aspectRatio }}
        />
      )}
      {/* 图片加载后显示 */}
      {imageInfo && (
        <PhotoView src={rawImage}>
          <Image
            block
            className="shadow-xl"
            src={rawImage}
            alt={`image ${index + 1}`}
            shape="rounded"
            fit="contain"
            style={{
              display: isImageLoading ? 'none' : 'block',
              aspectRatio,
            }}
            onLoad={() => setIsImageLoading(false)}
          />
        </PhotoView>
      )}

      {/* 序号 */}
      <div
        className="serial-number overlay"
        group-hover:opacity-0
        pos="absolute top-1 left-1"
        w="[min(30px,30%)]"
        aspect-square
        text-center
        place-content-center
        rounded="1/2"
        color="$colorNeutralForeground1"
        bg="$colorNeutralBackgroundAlpha2"
        select-none
        transition="opacity duration-200 ease-in-out"
      >
        {index + 1}
      </div>
      <div
        className="serial-number footer"
        color="$colorNeutralForeground1"
        m="t-3px r-5px"
        text-right
        select-none
      >
        {index + 1}
      </div>
    </div>
  )
}
