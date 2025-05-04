import type { LocationComponentProps } from '~/contexts/location'

import type { PageBaseProps } from '../shared/sharedProps.types'

export interface ImageGalleryPageProps extends PageBaseProps {
}

export interface ImageGalleryPageLocationProps extends LocationComponentProps {
  // 图片路径
  path: string
}

export interface ImageGalleryConfig {
  // 图片标题
  title: string
  // 爬取链接
  link: string
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
  // 爬取时间
  crawlTime: string
  // 爬取各图片的链接（key为图片名称，值为图片链接）
  imageLinks: Record<string, string>
}
