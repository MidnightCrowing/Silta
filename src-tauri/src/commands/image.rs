use crate::models::gallery::GalleryThumbnailInfo;
use crate::services::image;
use crate::services::image::{is_image_dark, THUMBNAIL_SEMAPHORE};
use std::path::Path;

#[tauri::command]
pub async fn image_is_dark(path: &str) -> Result<bool, String> {
    is_image_dark(path).map_err(|e| e.to_string())
}

/// 获取指定本地路径下图片的缩略图，并返回缩略图信息。
///
/// # 参数
/// - `path`: 图片的路径。
/// - `max_size`: 缩略图的最大尺寸（可选，默认为 100）。
///
/// # 返回
/// 缩略图信息 `ThumbnailInfo`，或错误信息。
#[tauri::command]
pub async fn generate_image_thumbnail(
    path: &Path,
    max_size: Option<u32>,
) -> anyhow::Result<GalleryThumbnailInfo, String> {
    let max_size = max_size.unwrap_or(100); // 默认值设为 100

    // 尝试获取一个令牌，超时防止卡住
    let permit = THUMBNAIL_SEMAPHORE
        .acquire()
        .await
        .map_err(|_| "Semaphore 错误".to_string())?;

    let result = image::generate_image_thumbnail(path, &max_size).map_err(|e| e.to_string());

    // 自动释放 permit，当这个函数结束
    drop(permit);

    result
}
