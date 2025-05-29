use anyhow::Result;
use image::{GenericImageView, Pixel};

/// 判断图像是否偏暗。
pub fn is_image_dark(path: &str) -> Result<bool> {
    let img = image::open(path)?;

    let resized = img.thumbnail(64, 64);

    let mut total_luminance = 0.0;
    let mut count = 0;

    for pixel in resized.pixels() {
        let rgb = pixel.2.to_rgb();
        let [r, g, b] = rgb.0;
        let luminance = 0.299 * (r as f32) + 0.587 * (g as f32) + 0.114 * (b as f32);
        total_luminance += luminance;
        count += 1;
    }

    let avg_luminance = total_luminance / count as f32;
    Ok(avg_luminance < 128.0)
}