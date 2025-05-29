import './ImageCard.scss'

import { Image, SkeletonItem, Text } from '@fluentui/react-components'
import { convertFileSrc } from '@tauri-apps/api/core'
import { useMemo, useState } from 'react'
import { PhotoView } from 'react-photo-view'

import type { ImageCardProps } from './ImageCard.types'

export default function ImageCard({
  name,
  src,
  path,
  width,
  height,
  index,
  showName = false,
  enablePreview = false,
  ...props
}: ImageCardProps) {
  const [isImageLoading, setIsImageLoading] = useState(true)

  const rawImage = useMemo(() => {
    return src || (path ? convertFileSrc(path) : '')
  }, [src, path])

  const aspectRatio = useMemo(() => {
    if (width && height) {
      const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b))
      const divisor = gcd(width, height)
      return `${width / divisor}/${height / divisor}`
    }
    return '9/16'
  }, [width, height])

  const innerImage = (
    <Image
      block
      shadow
      src={rawImage}
      alt={name}
      shape="rounded"
      fit="contain"
      className={!enablePreview ? 'shadow-xl' : ''}
      style={{
        display: isImageLoading ? 'none' : 'block',
        aspectRatio,
      }}
      onLoad={() => setIsImageLoading(false)}
    />
  )

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
      {...props}
    >
      {/* 骨架屏 */}
      {isImageLoading && (
        <SkeletonItem className="h-unset!" shape="rectangle" style={{ aspectRatio }} />
      )}

      {/* 图片预览或直接显示 */}
      {rawImage && (
        enablePreview
          ? <PhotoView src={rawImage}>{ innerImage }</PhotoView>
          : innerImage
      )}

      {/* 序号显示 */}
      {index !== undefined && (
        <>
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
        </>
      )}

      {showName && (
        <Text className="py-3px line-clamp-2!">
          {name}
        </Text>
      )}
    </div>
  )
}
