import { invoke } from '@tauri-apps/api/core'

/**
 * 获取指定视频的 CONFIG 文件路径。
 *
 * @param path - CONFIG 视频路径。
 * @returns CONFIG 文件路径字符串，或抛出错误。
 */
export async function getLocalVideoConfigPath(path: string): Promise<string> {
  return await invoke('get_local_video_config_path', { path })
}
