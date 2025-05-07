import type { ImageGalleryConfig } from './ImageGalleryPage.types'

// // 迁移函数：V1 -> V2
// function migrateV1ToV2(config: ConfigV1): ConfigV2 {
//   return {
//     ...config,
//     version: 2,
//     tags: [], // 默认值
//   }
// }

export function parseImageGalleryConfig(config: any): ImageGalleryConfig {
  if (!config || typeof config !== 'object' || typeof config.version !== 'number') {
    throw new Error('无效的配置文件')
  }

  const migratedConfig = config

  // 根据版本号逐步迁移
  // if (migratedConfig.version === 1) {
  //   migratedConfig = migrateV1ToV2(migratedConfig)
  // }
  // if (migratedConfig.version === 2) {
  //   migratedConfig = migrateV2ToV3(migratedConfig)
  // }

  // 检查是否为最新版本
  if (migratedConfig.version !== 1) {
    throw new Error(`不支持的配置版本：${migratedConfig.version}`)
  }

  return migratedConfig
}
