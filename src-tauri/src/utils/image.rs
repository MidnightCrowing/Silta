use anyhow::{Context, Result};
use image::ImageReader;
use std::fs::File;
use std::io::BufReader;
use std::path::Path;

/// 检查文件是否为支持的图片格式
pub fn is_supported_image(path: &Path) -> bool {
    if let Some(ext) = path.extension().and_then(|e| e.to_str()) {
        ["jpg", "png", "jpeg", "webp"].contains(&ext.to_lowercase().as_str())
    } else {
        false
    }
}

/// 获取图片的宽度和高度
pub fn get_image_dimensions(image: ImageReader<BufReader<File>>) -> Result<(u32, u32)> {
    let size = image
        .into_dimensions()
        .with_context(|| "无法获取图片尺寸")?;
    Ok(size)
}
