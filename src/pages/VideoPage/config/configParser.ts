import type { VideoConfig } from './index.ts'

export function parseConfig(config: any): VideoConfig {
  if (!config || typeof config !== 'object' || typeof config.version !== 'number') {
    throw new Error('无效的配置文件')
  }

  const migratedConfig = config

  // 检查是否为最新版本
  if (migratedConfig.version !== 1) {
    throw new Error(`不支持的配置版本：${migratedConfig.version}`)
  }

  return migratedConfig
}
