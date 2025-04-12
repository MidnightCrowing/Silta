import type { HTMLAttributes } from 'react'

export interface VideoCardProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * @description 视频链接
   */
  url: string

  /**
   * @description 视频封面url
   */
  cover: string

  /**
   * @description 视频标题
   */
  title: string
}
