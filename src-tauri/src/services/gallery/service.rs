use super::{FolderGalleryService, GalleryService, ZipGalleryService};
use anyhow::{anyhow, Result};
use once_cell::sync::Lazy;
use std::path::Path;
use tokio::sync::Semaphore;

pub static INFO_SEMAPHORE: Lazy<Semaphore> = Lazy::new(|| Semaphore::new(5));
pub static THUMBNAIL_SEMAPHORE: Lazy<Semaphore> = Lazy::new(|| Semaphore::new(5));

/// 创建一个 `GalleryService` 实例，根据传入的路径类型选择具体的服务实现。
///
/// # 参数
/// - `path`: 文件或目录的路径。
///
/// # 返回
/// - 如果路径是文件，返回 `ZipGalleryService`。
/// - 如果路径是目录，返回 `FolderGalleryService`。
/// - 如果路径既不是文件也不是目录，返回错误。
pub fn create_gallery_service(path: &Path) -> Result<Box<dyn GalleryService>> {
    let path_str = path.to_string_lossy();

    if path.is_file() && path_str.ends_with(".zip") {
        // 如果路径是一个 ZIP 文件
        Ok(Box::new(ZipGalleryService))
    } else if path_str.contains(".zip/") {
        // 如果路径在 ZIP 文件内部
        Ok(Box::new(ZipGalleryService))
    } else {
        Ok(Box::new(FolderGalleryService))
    }
}
