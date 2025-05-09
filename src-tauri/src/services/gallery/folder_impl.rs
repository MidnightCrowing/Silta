use super::GalleryService;
use crate::models::gallery::{GalleryImageInfo, GalleryThumbnailInfo};
use crate::utils::cache_paths::get_thumbnail_path;
use crate::utils::image::{get_image_dimensions, is_supported_image};
use anyhow::{anyhow, Context, Result};
use image::{GenericImageView, ImageFormat, ImageReader};
use natord::compare;
use std::fs;
use std::path::Path;

pub struct FolderGalleryService;

impl GalleryService for FolderGalleryService {
    fn list_images(&self, path: &str) -> Result<Vec<GalleryImageInfo>> {
        // 用于存储图片信息的向量
        let mut images = Vec::new();

        // 读取目录内容
        let entries = fs::read_dir(path).with_context(|| format!("无法读取目录: {}", path))?;

        for entry in entries {
            let entry = entry.with_context(|| "读取目录项失败")?;
            let path = entry.path();

            // 检查文件扩展名是否为支持的图片格式
            if !is_supported_image(&path) {
                continue;
            }

            // 获取文件元数据
            let metadata =
                fs::metadata(&path).with_context(|| format!("无法读取文件元数据: {:?}", path))?;

            // 提取文件信息
            let size = metadata.len();
            let name = path
                .file_name()
                .and_then(|n| n.to_str())
                .unwrap_or("")
                .to_string();
            let path_str = path.to_str().unwrap_or("").to_string();

            // 获取图片宽高
            let (width, height) = get_image_dimensions(&path)?;

            // 将图片信息添加到结果向量
            images.push(GalleryImageInfo {
                name,
                path: path_str,
                width,
                height,
                size,
            });
        }

        // 按文件名进行自然排序
        images.sort_by(|a, b| compare(&a.name, &b.name));

        Ok(images)
    }

    fn get_thumbnail(&self, path: &str, max_size: &i32) -> Result<GalleryThumbnailInfo> {
        let path_obj = Path::new(path);
        let name = path_obj
            .file_name()
            .and_then(|n| n.to_str())
            .unwrap_or("unknown")
            .to_string();

        let cached_path = get_thumbnail_path(path, max_size);

        if cached_path.exists() {
            let metadata = fs::metadata(&cached_path)
                .with_context(|| format!("无法读取缓存文件元数据: {}", cached_path.display()))?;
            return Ok(GalleryThumbnailInfo {
                name,
                cache_path: cached_path.to_string_lossy().into(),
                width: 0, // 前端读取图片时获取
                height: 0,
                size: metadata.len(),
            });
        }

        let img = ImageReader::open(path)
            .with_context(|| format!("无法打开图片文件: {}", path))?
            .with_guessed_format()
            .with_context(|| format!("无法猜测图片格式: {}", path))?
            .decode()
            .with_context(|| format!("图片解码失败: {}", path))?;

        let (orig_width, orig_height) = img.dimensions();
        let scale = (*max_size as f32 / orig_width.max(orig_height) as f32).min(1.0);
        let new_width = (orig_width as f32 * scale) as u32;
        let new_height = (orig_height as f32 * scale) as u32;

        let thumbnail = img.resize(new_width, new_height, image::imageops::FilterType::Lanczos3);

        thumbnail
            .save_with_format(&cached_path, ImageFormat::Png)
            .with_context(|| format!("无法保存缩略图到缓存路径: {}", cached_path.display()))?;

        let metadata = fs::metadata(&cached_path)
            .with_context(|| format!("无法读取缩略图文件元数据: {}", cached_path.display()))?;

        Ok(GalleryThumbnailInfo {
            name,
            cache_path: cached_path.to_string_lossy().into(),
            width: new_width,
            height: new_height,
            size: metadata.len(),
        })
    }

    fn get_images_config(&self, path: &str) -> Result<String> {
        let config_path = Path::new(path).join("config.json");

        if config_path.exists() {
            Ok(config_path.to_string_lossy().into())
        } else {
            Err(anyhow!("config.json 文件不存在于路径: {}", path))
        }
    }
}
