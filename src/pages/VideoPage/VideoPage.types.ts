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

/** 配置文件结构，最新版本配置接口 */
export type VideoConfig = VideoConfigV1

interface VideoConfigBase {
  // 版本号，用于标识配置文件的版本
  version: number
  // 加载页配置，用于指定使用哪个页面加载
  pageType: 'VideoPage'
}

// V1 配置接口
export interface VideoConfigV1 extends VideoConfigBase {
  // 版本号，用于标识配置文件的版本
  version: 1
  // 视频标题
  title: string
  // 标签列表
  tags: string[]
  // 爬取时间
  crawlTime: string
}
