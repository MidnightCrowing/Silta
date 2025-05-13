import { BaseDirectory, dirname } from '@tauri-apps/api/path'
import { exists, mkdir, readTextFile, writeTextFile } from '@tauri-apps/plugin-fs'

type Config = Record<string, any>

// 加载配置文件
async function loadConfig<T extends Config>(
  configPath: string,
  defaultConfig: T = {} as T,
  baseDir: BaseDirectory = BaseDirectory.AppConfig,
): Promise<T> {
  const configExists = await exists(configPath, { baseDir })

  if (!configExists) {
    return defaultConfig // 配置文件不存在，返回默认配置
  }

  const configContent = await readTextFile(configPath, { baseDir })

  // 配置文件为空时返回默认配置
  if (!configContent.trim()) {
    return defaultConfig
  }

  try {
    return JSON.parse(configContent)
  }
  catch {
    console.error('配置文件解析失败，返回默认配置')
    return defaultConfig
  }
}

// 更新背景配置文件
async function updateConfig<T extends Config>(
  configPath: string,
  data: T,
  baseDir: BaseDirectory = BaseDirectory.AppConfig,
): Promise<void> {
  const configExists = await exists(configPath, { baseDir })
  if (!configExists) {
    const dirPath = await dirname(configPath)
    await mkdir(dirPath, { recursive: true, baseDir })
  }
  const contents = JSON.stringify(data, null, 2)
  await writeTextFile(configPath, contents, { baseDir })
}

export { loadConfig, updateConfig }
