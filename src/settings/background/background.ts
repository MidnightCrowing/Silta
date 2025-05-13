import { appConfigDir, BaseDirectory, extname, join } from '@tauri-apps/api/path'
import { copyFile, mkdir, remove } from '@tauri-apps/plugin-fs'

import { loadConfig, updateConfig } from '../shared'
import type { BackgroundConfig } from './background.types.ts'

const MODEL_DIR = 'backgrounds'
const CONFIG_FILE_NAME = 'config.json'

const defaultBackgroundConfig: BackgroundConfig = {}

const BACKGROUND_FILE_NAMES: Record<keyof BackgroundConfig, string> = {
  searchPage: 'search-page',
}

// 缓存
let cachedBackgroundConfig: BackgroundConfig | null = null
let cachedConfigPath: string | null = null

// 获取配置文件路径（缓存）
async function getConfigPath(): Promise<string> {
  if (!cachedConfigPath) {
    const configDir = await appConfigDir()
    cachedConfigPath = await join(configDir, MODEL_DIR, CONFIG_FILE_NAME)
  }
  return cachedConfigPath
}

// 加载配置
export async function loadBackgroundConfig(): Promise<BackgroundConfig> {
  if (!cachedBackgroundConfig) {
    const path = await getConfigPath()
    cachedBackgroundConfig = await loadConfig<BackgroundConfig>(path, defaultBackgroundConfig)
  }
  return cachedBackgroundConfig
}

// 更新配置
export async function updateBackgroundConfig<K extends keyof BackgroundConfig>(
  key: K,
  value: BackgroundConfig[K],
): Promise<void> {
  const config = await loadBackgroundConfig()
  config[key] = value
  const path = await getConfigPath()
  await updateConfig<BackgroundConfig>(path, config)
  cachedBackgroundConfig = config
}

// 获取图片路径
export async function getBackgroundFilePath(key: keyof BackgroundConfig): Promise<string | null> {
  const config = await loadBackgroundConfig()
  const fileName = config[key]
  if (!fileName)
    return null
  return join(await appConfigDir(), MODEL_DIR, fileName)
}

// 设置背景图
export async function setBackgroundImage(key: keyof BackgroundConfig, sourceFilePath: string): Promise<void> {
  const fileExt = await extname(sourceFilePath) // 不含点，例如 "png"
  const timestamp = Date.now()
  const targetFileName = `${BACKGROUND_FILE_NAMES[key]}_${timestamp}.${fileExt}`
  const backgroundDir = await join(await appConfigDir(), MODEL_DIR)
  const targetFilePath = await join(backgroundDir, targetFileName)

  await mkdir(backgroundDir, { recursive: true })
  await removeOldFileIfExists(key)
  await copyFile(sourceFilePath, targetFilePath)
  await updateBackgroundConfig(key, targetFileName)
}

// 删除旧文件（如果存在）
async function removeOldFileIfExists(key: keyof BackgroundConfig): Promise<void> {
  const oldPath = await getBackgroundFilePath(key)
  if (oldPath) {
    try {
      await remove(oldPath, { baseDir: BaseDirectory.AppConfig })
    }
    catch (e) {
      console.warn(`删除旧文件失败: ${oldPath}`, e)
    }
  }
}
