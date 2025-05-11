import { appConfigDir, BaseDirectory, extname, join } from '@tauri-apps/api/path'
import { copyFile, create, exists, mkdir, readTextFile, remove } from '@tauri-apps/plugin-fs'

// 背景图片存储目录和配置文件路径
const BACKGROUND_DIR = 'backgrounds'
const CONFIG_FILE_NAME = 'config.json'
const CONFIG_FILE_PATH = `${BACKGROUND_DIR}/${CONFIG_FILE_NAME}`

// 背景配置接口
interface BackgroundConfig {
  searchPage?: string
}

// 背景文件命名映射
const BACKGROUND_FILE_NAMES: Record<keyof BackgroundConfig, string> = {
  searchPage: 'search-page',
}

// 加载背景配置文件
async function loadConfig(): Promise<BackgroundConfig> {
  const configExists = await exists(CONFIG_FILE_PATH, { baseDir: BaseDirectory.AppConfig })

  if (!configExists) {
    return {} // 配置文件不存在，返回空配置
  }

  const configContent = await readTextFile(CONFIG_FILE_PATH, { baseDir: BaseDirectory.AppConfig })

  // 配置文件为空时返回空配置
  if (!configContent.trim()) {
    return {}
  }

  try {
    return JSON.parse(configContent)
  }
  catch {
    console.error('配置文件解析失败，返回空配置')
    return {}
  }
}

// 更新背景配置文件
async function updateConfig(key: keyof BackgroundConfig, filePath: string): Promise<void> {
  const currentConfig = await loadConfig()
  currentConfig[key] = filePath

  const configFile = await create(CONFIG_FILE_PATH, { baseDir: BaseDirectory.AppConfig })
  await configFile.write(new TextEncoder().encode(JSON.stringify(currentConfig, null, 2)))
  await configFile.close()
}

// 获取背景图片存储路径
async function getBackgroundFilePath(key: keyof BackgroundConfig): Promise<string | null> {
  const config = await loadConfig()
  const fileName = config[key]
  if (!fileName) {
    return null
  }
  return join(await appConfigDir(), BACKGROUND_DIR, fileName)
}

// 设置背景图片
async function setBackgroundImage(key: keyof BackgroundConfig, sourceFilePath: string): Promise<void> {
  const fileExtension = await extname(sourceFilePath)
  const appDataBackgroundDir = await join(await appConfigDir(), BACKGROUND_DIR)
  const targetFileName = `${BACKGROUND_FILE_NAMES[key]}_${Date.now()}.${fileExtension}`
  const targetFilePath = await join(appDataBackgroundDir, targetFileName)

  // 确保背景目录存在
  await mkdir(appDataBackgroundDir, { recursive: true })

  // 检查并删除先前的图片
  const existingFileName = await getBackgroundFilePath(key)
  if (existingFileName) {
    await remove(existingFileName, { baseDir: BaseDirectory.AppConfig })
  }

  // 复制文件到目标路径
  await copyFile(sourceFilePath, targetFilePath)

  // 更新配置文件
  await updateConfig(key, targetFileName)
}

export { getBackgroundFilePath, setBackgroundImage }
export type { BackgroundConfig }
