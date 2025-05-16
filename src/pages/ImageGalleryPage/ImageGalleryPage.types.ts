import type { LocationProps } from '~/contexts/location'
import type { GalleryImageInfo } from '~/tauri-types.ts'

import type { PageBaseProps } from '../shared/sharedProps.types'

/** 页面属性 */
export interface ImageGalleryPageProps extends PageBaseProps {
}

/** 页面位置属性 */
export interface ImageGalleryLocationProps extends LocationProps {
  // 图片路径
  path: string
}

/** 页面存储属性 */
export interface ImageGalleryStore {
  // 图片列表
  imageInfos: GalleryImageInfo[]
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
}

/** 配置文件结构，最新版本配置接口 */
export type ImageGalleryConfig = ImageGalleryConfigV1

interface ImageGalleryConfigBase {
  // 版本号，用于标识配置文件的版本
  version: number
  // 加载页配置，用于指定使用哪个页面加载
  pageType: 'ImageGalleryPage'
}

// V1 配置接口
export interface ImageGalleryConfigV1 extends ImageGalleryConfigBase {
  // 版本号，用于标识配置文件的版本
  version: 1
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
  // 爬取时间，时间戳 Date.now()
  crawlTime: number
  // 爬取各图片的链接（key为图片名称，值为图片链接）
  imageLinks: Record<string, string>
}
