import type { LocationProps } from '~/contexts/location'
import type { GalleryImageInfo } from '~/tauri-types.ts'

/** 页面位置属性 */
export interface ImageGalleryLocationProps extends LocationProps {
  // 图片路径
  path: string
}

/** 页面存储属性 */
export interface ImageGalleryStore {
  // 图片列表
  images: string[]
  // 图片信息（键为images中图片路径，值为图片信息）
  imageInfos: Record<string, GalleryImageInfo | undefined>
  // 加载错误信息
  loadError: string | null
  // 图片标题
  imageTitle: string | null
  // 图片链接
  imageLink: string
  // 面包屑路径
  breadcrumbPath: Array<{ title: string, link: string }>
  // 发布时间（格式：YYYY-MM-DD HH:mm:ss）
  publishTime: string
  // 来源
  source: string
  // 作者名称
  authorName: string
  // 描述信息
  description: string
  // 标签列表
  tags: string[]
  // 图片列表滚动位置
  scrollPosition: number
}
