import type { GalleryImageInfo } from '~/tauri-types.ts'

export interface ImageCardProps {
  // 图片序号
  index: number
  // 图片信息，未传则只显示骨架图
  imageInfo?: GalleryImageInfo
}
