export interface breadcrumbPathItem {
  title: string
  link: string
}

export interface GalleryTopBarProps {
  /**
   * @description 图片标题，null表示加载失败
   */
  imageTitle?: string | null

  /**
   * @description 图片链接
   */
  imageLink?: string

  /**
   * @description 路径
   */
  breadcrumbPath?: breadcrumbPathItem[]

  /**
   * @description 发布时间
   */
  publishTime?: string

  /**
   * @description 来源描述
   */
  source?: string

  /**
   * @description 作者名称
   */
  authorName?: string

  /**
   * @description 图片数量
   */
  imageCount: number

  /**
   * @description 描述
   */
  description?: string

  /**
   * @description 标签
   */
  tags?: string[]
}
