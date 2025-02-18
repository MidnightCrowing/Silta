import { Image, SkeletonItem } from '@fluentui/react-components'
import { convertFileSrc } from '@tauri-apps/api/core'
import { useEffect, useState } from 'react'
import { PhotoView } from 'react-photo-view'

import ThumbnailWorker from '~/workers/thumbnailWorker?worker'

import type { ImageCardProps } from './ImageCard.types'

export default function ImageCard({ index, imagePath }: ImageCardProps) {
  const [isImageLoading, setIsImageLoading] = useState<boolean>(true)
  const [thumbnail, setThumbnail] = useState<string>('')

  const rawImage = convertFileSrc(imagePath)

  useEffect(() => {
    const worker = new ThumbnailWorker()

    worker.onmessage = (e) => {
      const { thumbnail, error } = e.data
      if (thumbnail) {
        setThumbnail(thumbnail)
      }
      else if (error) {
        console.error('Error generating thumbnail:', imagePath, error)
      }
      setIsImageLoading(false)

      worker.terminate()
    }

    worker.postMessage({ src: rawImage, width: 320, height: 480 })

    return () => {
      worker.terminate()
    }
  }, [imagePath, rawImage])

  return (
    <div
      className="group @container"
      relative
      flex="~ col"
      bg="hover:8 hover:$colorNeutralStroke1Hover active:$colorNeutralStroke1Pressed"
      ring="hover:8 hover:$colorNeutralStroke1Hover active:$colorNeutralStroke1Pressed"
      rounded="3px"
      transition="all duration-200 ease-in-out"
      cursor-pointer
    >
      {/* 在图片加载完成前，显示骨架图占位 */}
      {isImageLoading && (
        <SkeletonItem
          className="aspect-[2/3] h-unset!"
          shape="rectangle"
        />
      )}
      {/* 图片加载后显示 */}
      <PhotoView src={rawImage}>
        <Image
          block
          className="aspect-[2/3]"
          src={thumbnail}
          alt={`demo image ${index + 1}`}
          shape="rounded"
          fit="cover"
          style={{ display: isImageLoading ? 'none' : 'block' }}
          onLoad={() => setIsImageLoading(false)}
        />
      </PhotoView>

      {/* 序号 */}
      <div
        className="MultiPreview-serial-number overlay"
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
        className="MultiPreview-serial-number footer"
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
