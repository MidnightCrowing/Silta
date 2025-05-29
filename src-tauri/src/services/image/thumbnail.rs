use crate::models::gallery::GalleryThumbnailInfo;
use crate::utils::cache_paths::get_thumbnail_path;
use anyhow::{Context, Result};
use image::{GenericImageView, ImageFormat, ImageReader};
use once_cell::sync::Lazy;
use std::fs;
use std::path::Path;
use tokio::sync::Semaphore;

pub static THUMBNAIL_SEMAPHORE: Lazy<Semaphore> = Lazy::new(|| Semaphore::new(5));

/// 生成图片缩略图。
pub fn generate_image_thumbnail(path: &Path, max_size: &u32) -> Result<GalleryThumbnailInfo> {
    let path_obj = Path::new(path);
    let name = path_obj
        .file_name()
        .and_then(|n| n.to_str())
        .unwrap_or("unknown")
        .to_string();

    let cache_path = get_thumbnail_path(path, max_size);

    if cache_path.exists() {
        let metadata = fs::metadata(&cache_path)
            .with_context(|| format!("无法读取缓存文件元数据: {}", cache_path.display()))?;
        return Ok(GalleryThumbnailInfo {
            name,
            cache_path: cache_path.to_string_lossy().to_string(),
            width: 0,
            height: 0,
            size: metadata.len(),
        });
    }

    let img = ImageReader::open(path)
        .with_context(|| format!("无法打开图片文件: {}", path.display()))?
        .with_guessed_format()
        .with_context(|| format!("无法猜测图片格式: {}", path.display()))?
        .decode()
        .with_context(|| format!("图片解码失败: {}", path.display()))?;

    let (orig_width, orig_height) = img.dimensions();
    let scale = (*max_size as f32 / orig_width.max(orig_height) as f32).min(1.0);
    let new_width = (orig_width as f32 * scale) as u32;
    let new_height = (orig_height as f32 * scale) as u32;

    let thumbnail = img.resize(new_width, new_height, image::imageops::FilterType::Lanczos3);

    thumbnail
        .save_with_format(&cache_path, ImageFormat::Png)
        .with_context(|| format!("无法保存缩略图到缓存路径: {}", cache_path.display()))?;

    let metadata = fs::metadata(&cache_path)
        .with_context(|| format!("无法读取缩略图文件元数据: {}", cache_path.display()))?;

    Ok(GalleryThumbnailInfo {
        name,
        cache_path: cache_path.to_string_lossy().to_string(),
        width: new_width,
        height: new_height,
        size: metadata.len(),
    })
}
