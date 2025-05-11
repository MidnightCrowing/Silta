use image::{GenericImageView, Pixel};

#[tauri::command]
pub async fn image_is_dark(path: &str) -> Result<bool, String> {
    let img = image::open(path).map_err(|e| e.to_string())?;

    // 将图像缩放到 64x64（或更小）
    let resized = img.thumbnail(64, 64); // 快速缩略图，无需保持精度

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
    Ok(avg_luminance < 128.0) // true = dark
}

