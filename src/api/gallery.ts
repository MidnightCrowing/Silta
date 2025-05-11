import { invoke } from '@tauri-apps/api/core'

import type { GalleryImageInfo } from '~/tauri-types.ts'

/**
 * 列出指定本地路径下的所有图片信息。
 *
 * @param path - 图片集所在的路径。
 * @returns 包含图片信息的 `GalleryImageInfo[]`，或抛出错误。
 */
export async function listLocalGalleryImages(path: string): Promise<GalleryImageInfo[]> {
  return await invoke('list_local_gallery_images', { path })
}

/**
 * 获取指定本地路径下图片的缩略图信息。
 *
 * @param path - 图片的路径。
 * @returns 缩略图的 Base64 编码字符串，或抛出错误。
 */
export async function getLocalGalleryThumbnail(path: string): Promise<string> {
  return await invoke('get_local_gallery_thumbnail', { path })
}

/**
 * 获取指定本地路径下的 CONFIG 文件路径。
 *
 * @param path - CONFIG 文件所在的目录路径。
 * @returns CONFIG 文件路径字符串，或抛出错误。
 */
export async function getLocalGalleryConfigPath(path: string): Promise<string> {
  return await invoke('get_local_gallery_config_path', { path })
}
