use super::service::GalleryService;
use crate::models::gallery::{ImageInfo, ThumbnailInfo};
use crate::utils;
use crate::utils::cache_paths::get_thumbnail_path;
use anyhow::{Context, Result};
use image::{GenericImageView, ImageFormat, ImageReader};
use natord::compare;
use std::fs;
use std::path::Path;
use utils::image::{get_image_dimensions, is_supported_image};

pub struct FolderGalleryService;

impl GalleryService for FolderGalleryService {
    fn list_images(&self, path: &str) -> Result<Vec<ImageInfo>> {
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
            let img = ImageReader::open(&path)
                .with_context(|| format!("无法打开图片文件: {:?}", path))?;
            let (width, height) = get_image_dimensions(img)?;

            // 将图片信息添加到结果向量
            images.push(ImageInfo {
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

    fn get_thumbnail(&self, path: &str, max_size: &i32) -> Result<ThumbnailInfo> {
        println!("get_thumbnail path: {}", path);
        let path_obj = Path::new(path);
        let name = path_obj
            .file_name()
            .and_then(|n| n.to_str())
            .unwrap_or("unknown")
            .to_string();

        let cached_path = get_thumbnail_path(path, max_size);

        if cached_path.exists() {
            let metadata = fs::metadata(&cached_path)?;
            return Ok(ThumbnailInfo {
                name,
                cache_path: cached_path.to_string_lossy().into(),
                width: 0, // 前端读取图片时获取
                height: 0,
                size: metadata.len(),
            });
        }

        let img = ImageReader::open(path)
            .with_context(|| format!("Failed to open image at path: {}", path))?
            .decode()
            .context("Failed to decode image")?;

        let (orig_width, orig_height) = img.dimensions();
        let scale = (*max_size as f32 / orig_width.max(orig_height) as f32).min(1.0);
        let new_width = (orig_width as f32 * scale) as u32;
        let new_height = (orig_height as f32 * scale) as u32;

        let thumbnail = img.resize(new_width, new_height, image::imageops::FilterType::Lanczos3);

        // 保存到缓存目录
        thumbnail
            .save_with_format(&cached_path, ImageFormat::Png)
            .context("Failed to save thumbnail")?;

        let metadata = fs::metadata(&cached_path)?;

        Ok(ThumbnailInfo {
            name,
            cache_path: cached_path.to_string_lossy().into(),
            width: new_width,
            height: new_height,
            size: metadata.len(),
        })
    }

    fn get_image_info(&self, path: &str) -> Result<ImageInfo> {
        // 返回宽高大小信息
        Ok(ImageInfo::default())
    }
}
