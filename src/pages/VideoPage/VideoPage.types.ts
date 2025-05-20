import type { LocationProps } from '~/contexts/location'

import type { PageBaseProps } from '../shared/sharedProps.types'

/** 页面属性 */
export interface VideoPageProps extends PageBaseProps {
}

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
