import type { LocationProps } from '~/contexts/location'

/** 页面位置属性 */
export interface VideoLocationProps extends LocationProps {
  // 视频路径
  src: string
}

/** 页面存储属性 */
export interface VideoStore {
  // 视频标题
  videoTitle: string | null
  // 标签列表
  tags: string[]
}
