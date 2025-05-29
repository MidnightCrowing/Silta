use crate::models::gallery::GalleryImageInfo;
use crate::services::gallery::{
    create_gallery_service, GalleryService, INFO_SEMAPHORE
    ,
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
