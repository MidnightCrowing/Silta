import { invoke } from '@tauri-apps/api/core'

export async function isImageDark(path: string): Promise<boolean> {
  return await invoke<boolean>('image_is_dark', { path })
}
