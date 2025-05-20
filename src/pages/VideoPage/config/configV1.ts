// V1 配置接口
import type { VideoConfigBase } from './configBase.ts'

export interface VideoConfigV1 extends VideoConfigBase {
  // 版本号，用于标识配置文件的版本
  version: 1
  // 视频标题
  title: string
  // 爬取链接
  link: string
  // 标签列表
  tags: string[]
  // 爬取时间
  crawlTime: string
}
