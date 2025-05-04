use serde::Serialize;
use tauri_types::TauriType;

/// 表示图片的详细信息。
#[derive(Serialize, TauriType, Default)]
pub struct GalleryImageInfo {
    /// 图片的名称。
    pub name: String,
    /// 图片的文件路径。
    pub path: String,
    /// 图片的宽度（以像素为单位）。
    pub width: u32,
    /// 图片的高度（以像素为单位）。
    pub height: u32,
    /// 图片的大小（以字节为单位）。
    pub size: u64,
}

/// 表示图片缩略图的相关信息。
#[derive(Serialize, TauriType, Default)]
pub struct GalleryThumbnailInfo {
    /// 缩略图的名称。
    pub name: String,
    /// 缩略图的缓存路径。
    pub cache_path: String,
    /// 缩略图的宽度（以像素为单位）。
    pub width: u32,
    /// 缩略图的高度（以像素为单位）。
    pub height: u32,
    /// 缩略图的大小（以字节为单位）。
    pub size: u64,
}
