import { join } from '@tauri-apps/api/path'

import { loadConfig, updateConfig } from '../shared/configUtils.ts'
import type { SearchConfig } from './search.types.ts'

const MODEL_DIR = './'
const CONFIG_FILE_NAME = 'search.json'

// 默认配置
const defaultSearchConfig: SearchConfig = {
  showBg: false,
  bgIsDark: false,
}

// 缓存
let cachedSearchConfig: SearchConfig | null = null
let resolvedConfigPath: string | null = null

// 获取配置文件路径
async function getSearchConfigPath(): Promise<string> {
  if (!resolvedConfigPath) {
    resolvedConfigPath = await join(MODEL_DIR, CONFIG_FILE_NAME)
  }
  return resolvedConfigPath
}

// 获取配置对象（使用缓存）
export async function getSearchConfig(): Promise<SearchConfig> {
  if (!cachedSearchConfig) {
    const path = await getSearchConfigPath()
    cachedSearchConfig = await loadConfig<SearchConfig>(path, defaultSearchConfig)
  }
  return cachedSearchConfig
}

// 更新某一项配置
export async function updateSearchConfig<K extends keyof SearchConfig>(
  key: K,
  value: SearchConfig[K],
  writeToDisk: boolean = true,
): Promise<void> {
  const config = await getSearchConfig()
  config[key] = value

  if (writeToDisk) {
    const path = await getSearchConfigPath()
    await updateConfig<SearchConfig>(path, config)
  }

  cachedSearchConfig = config
}

// 强制保存当前缓存到磁盘
export async function saveSearchConfigToDisk(): Promise<void> {
  if (cachedSearchConfig) {
    const path = await getSearchConfigPath()
    await updateConfig<SearchConfig>(path, cachedSearchConfig)
  }
}
