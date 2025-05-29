import { invoke } from '@tauri-apps/api/core'

import type { GalleryThumbnailInfo } from '~/tauri-types.ts'

export async function isImageDark(path: string): Promise<boolean> {
  return await invoke<boolean>('image_is_dark', { path })
}

/**
 * 获取指定本地路径下图片的缩略图信息。
 *
 * @param path - 图片的路径。
 * @returns 缩略图的 Base64 编码字符串，或抛出错误。
 */
export async function generateImageThumbnail(path: string): Promise<GalleryThumbnailInfo> {
  return await invoke('generate_image_thumbnail', { path })
}
