import type { HTMLAttributes } from 'react'

export interface ImageCardProps extends Omit<HTMLAttributes<HTMLDivElement>, 'height'> {
  /**
   * 图片名称，用于 alt 属性
   */
  name?: string

  /**
   * 图片链接
   */
  src?: string

  /**
   * 图片本地路径，优先使用 src
   */
  path?: string

  /**
   * 图片宽度
   */
  width?: number

  /**
   * 图片高度
   */
  height?: number

  /**
   * 图片序号（可选）
   */
  index?: number

  /**
   * 是否显示图片名称（默认 false）
   */
  showName?: boolean

  /**
   * 是否启用点击预览（默认 false）
   */
  enablePreview?: boolean
}
