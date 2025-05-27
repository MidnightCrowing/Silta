use anyhow::{Context, Result};
use image::{GenericImageView, ImageReader};
use std::path::Path;

/// 检查文件是否为支持的图片格式
pub fn is_supported_image(path: &Path) -> bool {
    matches!(
        path.extension()
            .and_then(|e| e.to_str())
            .map(str::to_ascii_lowercase)
            .as_deref(),
        Some("jpg" | "jpeg" | "png" | "webp")
    )
}

/// 获取图片的宽度和高度（不依赖扩展名）
pub fn get_image_dimensions<P: AsRef<Path>>(path: P) -> Result<(u32, u32)> {
    let reader = ImageReader::open(&path)
        .with_context(|| format!("无法打开图片: {}", path.as_ref().display()))?
        .with_guessed_format()
        .with_context(|| format!("无法猜测图片格式: {}", path.as_ref().display()))?;

    let image = reader
        .decode()
        .with_context(|| format!("无法解码图片: {}", path.as_ref().display()))?;
    Ok(image.dimensions())
}
