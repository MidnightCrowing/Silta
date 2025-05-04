use crate::concurrency::limiter::THUMBNAIL_SEMAPHORE;
use crate::models::gallery::{GalleryImageInfo, GalleryThumbnailInfo};
use crate::services::gallery::{FolderGalleryService, GalleryService, ZipGalleryService};
use anyhow::{anyhow, Result};
use std::path::{Path, PathBuf};

/// 创建一个 `GalleryService` 实例，根据传入的路径类型选择具体的服务实现。
///
/// # 参数
/// - `path`: 文件或目录的路径。
///
/// # 返回
/// - 如果路径是文件，返回 `ZipGalleryService`。
/// - 如果路径是目录，返回 `FolderGalleryService`。
/// - 如果路径既不是文件也不是目录，返回错误。
fn create_gallery_service(path: &Path) -> Result<Box<dyn GalleryService>> {
    if path.is_file() {
        Ok(Box::new(ZipGalleryService))
    } else if path.is_dir() {
        Ok(Box::new(FolderGalleryService))
    } else {
        Err(anyhow!("传入的路径既不是文件也不是目录"))
    }
}

/// 列出指定路径下的所有图片信息。
///
/// # 参数
/// - `path`: 图片所在的路径。
///
/// # 返回
/// - 包含图片信息的 `Vec<ImageInfo>`，或错误信息。
#[tauri::command]
pub async fn list_images(path: PathBuf) -> Result<Vec<GalleryImageInfo>, String> {
    let service = create_gallery_service(&path).map_err(|e| e.to_string())?;
    service
        .list_images(path.to_string_lossy().as_ref())
        .map_err(|e| e.to_string())
}

/// 获取指定路径下图片的缩略图信息。
///
/// # 参数
/// - `path`: 图片的路径。
/// - `max_size`: 缩略图的最大尺寸（可选，默认为 100）。
///
/// # 返回
/// - 缩略图信息 `ThumbnailInfo`，或错误信息。
#[tauri::command]
pub async fn get_image_thumbnail(
    path: String,
    max_size: Option<i32>,
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
        .get_thumbnail(&path, &max_size)
        .map_err(|e| e.to_string());

    // 自动释放 permit，当这个函数结束
    drop(permit);

    result
}

/// 获取指定路径下的 CONFIG 文件内容。
///
/// # 参数
/// - `path`: CONFIG 文件所在的路径。
///
/// # 返回
/// - CONFIG 文件内容的字符串，或错误信息。
#[tauri::command]
pub async fn get_images_config(path: PathBuf) -> Result<String, String> {
    let service = create_gallery_service(&path).map_err(|e| e.to_string())?;
    service
        .get_images_config(path.to_string_lossy().as_ref())
        .map_err(|e| e.to_string())
}
