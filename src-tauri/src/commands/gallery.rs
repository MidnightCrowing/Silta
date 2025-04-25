use crate::concurrency::limiter::THUMBNAIL_SEMAPHORE;
use crate::models::gallery::{ImageInfo, ThumbnailInfo};
use crate::services::gallery::{FolderGalleryService, GalleryService, ZipGalleryService};
use std::path::Path;

#[tauri::command]
pub async fn list_images(path: String) -> Result<Vec<ImageInfo>, String> {
    // 可以用 `map_err` 把 anyhow 错误转成字符串
    let path_obj = Path::new(&path);

    let service: Box<dyn GalleryService> = if path_obj.is_file() {
        Box::new(ZipGalleryService)
    } else if path_obj.is_dir() {
        Box::new(FolderGalleryService)
    } else {
        return Err("传入的路径既不是文件也不是目录".into());
    };

    service.list_images(&path).map_err(|e| e.to_string())
}

#[tauri::command]
pub async fn get_image_thumbnail(path: String, max_size: Option<i32>) -> Result<ThumbnailInfo, String> {
    let max_size = max_size.unwrap_or(100); // 默认值设为 100

    // 尝试获取一个令牌，超时防止卡住
    let permit = THUMBNAIL_SEMAPHORE
        .acquire()
        .await
        .map_err(|_| "Semaphore 错误".to_string())?;

    // 获取到了 permit，继续处理缩略图
    let path_obj = Path::new(&path);
    let service: Box<dyn GalleryService> = if path_obj.is_file() {
        Box::new(FolderGalleryService)
    } else if path_obj.is_dir() {
        Box::new(FolderGalleryService)
    } else {
        return Err("传入的路径既不是文件也不是目录".into());
    };

    let result = service
        .get_thumbnail(&path, &max_size)
        .map_err(|e| e.to_string());

    // 自动释放 permit，当这个函数结束
    drop(permit);

    result
}
