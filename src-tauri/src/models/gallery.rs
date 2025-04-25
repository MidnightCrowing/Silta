use serde::Serialize;
use tauri_types::TauriType;

#[derive(Serialize, TauriType, Default)]
pub struct ImageInfo {
    pub name: String,
    pub path: String,
    pub width: u32,
    pub height: u32,
    pub size: u64,
}

#[derive(Serialize, TauriType, Default)]
pub struct ThumbnailInfo {
    pub name: String,
    pub cache_path: String, // 缩略图路径
    pub width: u32,
    pub height: u32,
    pub size: u64,
}
