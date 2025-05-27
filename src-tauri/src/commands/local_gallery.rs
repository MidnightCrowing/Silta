use crate::models::gallery::{GalleryImageInfo, GalleryThumbnailInfo};
use crate::services::gallery::{
    create_gallery_service, FolderGalleryService, GalleryService, INFO_SEMAPHORE,
    THUMBNAIL_SEMAPHORE,
};
use anyhow::Result;
use std::path::{Path, PathBuf};

/// 列出指定本地路径下的所有图片信息。
///
/// # 参数
/// - `path`: 图片集所在的路径。
///
/// # 返回
/// 图片绝对路径列表，或错误信息。
#[tauri::command]
pub async fn list_local_gallery_images(path: &Path) -> Result<Vec<PathBuf>, String> {
    let service = create_gallery_service(path).map_err(|e| e.to_string())?;
    service.list_images(path).map_err(|e| e.to_string())
}

/// 获取指定本地路径下的 CONFIG 文件路径。
///
/// # 参数
/// - `path`: CONFIG 文件所在的目录路径。
///
/// # 返回
/// CONFIG 文件路径，或错误信息。
#[tauri::command]
pub async fn get_local_gallery_config_path(path: &Path) -> Result<PathBuf, String> {
    let service = create_gallery_service(path).map_err(|e| e.to_string())?;
    service.get_images_config(path).map_err(|e| e.to_string())
}

/// 获取指定本地路径下图片的详细信息。
/// # 参数
/// - `path`: 图片的路径。
/// # 返回
/// 图片详细信息 `GalleryImageInfo`，或错误信息。
#[tauri::command]
pub async fn get_local_gallery_image_info(path: &Path) -> Result<GalleryImageInfo, String> {
    // 尝试获取一个令牌，超时防止卡住
    let permit = INFO_SEMAPHORE
        .acquire()
        .await
        .map_err(|_| "Semaphore 错误".to_string())?;

    let service = create_gallery_service(path).map_err(|e| e.to_string())?;
    let result = service.get_image_info(path).map_err(|e| e.to_string());

    // 自动释放 permit，当这个函数结束
    drop(permit);

    result
}

/// 获取指定本地路径下图片的缩略图信息。
///
/// # 参数
/// - `path`: 图片的路径。
/// - `max_size`: 缩略图的最大尺寸（可选，默认为 100）。
///
/// # 返回
/// 缩略图信息 `ThumbnailInfo`，或错误信息。
#[tauri::command]
pub async fn get_local_gallery_thumbnail(
    path: &Path,
    max_size: Option<u32>,
) -> Result<GalleryThumbnailInfo, String> {
    let max_size = max_size.unwrap_or(100); // 默认值设为 100

    // 尝试获取一个令牌，超时防止卡住
    let permit = THUMBNAIL_SEMAPHORE
        .acquire()
        .await
        .map_err(|_| "Semaphore 错误".to_string())?;

    // 获取到了 permit，继续处理缩略图
    let service: Box<dyn GalleryService> = Box::new(FolderGalleryService);

    let result = service
        .get_image_thumbnail(path, &max_size)
        .map_err(|e| e.to_string());

    // 自动释放 permit，当这个函数结束
    drop(permit);

    result
}
