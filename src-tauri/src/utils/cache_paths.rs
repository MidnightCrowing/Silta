use dirs_next::cache_dir;
use sha2::{Digest, Sha256};
use std::fs;
use std::path::{Path, PathBuf};

/// 获取缩略图缓存目录路径
pub fn get_thumbnail_cache_dir() -> PathBuf {
    let mut dir = cache_dir().expect("无法获取系统缓存目录");
    dir.push("Silta");
    dir.push("thumbnails");
    fs::create_dir_all(&dir).expect("无法创建缩略图缓存目录");
    dir
}

/// 根据图片路径生成唯一缩略图路径（通过 SHA256 哈希）
pub fn get_thumbnail_path(original_path: &Path, max_size: &u32) -> PathBuf {
    let mut hasher = Sha256::new();
    hasher.update(format!("{}{}", original_path.display(), max_size).as_bytes());
    let hash = format!("{:x}", hasher.finalize());

    let mut path = get_thumbnail_cache_dir();
    path.push(format!("{}.png", hash));
    path
}
