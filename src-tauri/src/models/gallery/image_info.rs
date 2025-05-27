use serde::Serialize;
use tauri_types::TauriType;

/// 表示图片的详细信息。
#[derive(Serialize, TauriType, Default)]
pub struct GalleryImageInfo {
    pub name: String, // 文件名
    pub path: String, // 文件路径
    pub width: u32,   // 宽度（像素）
    pub height: u32,  // 高度（像素）
    pub size: u64,    // 文件大小（字节）
}

/// 表示图片缩略图的相关信息。
#[derive(Serialize, TauriType, Default)]
pub struct GalleryThumbnailInfo {
    pub name: String,       // 文件名
    pub cache_path: String, // 缓存文件路径
    pub width: u32,         // 宽度（像素）
    pub height: u32,        // 高度（像素）
    pub size: u64,          // 缓存文件大小（字节）
}
