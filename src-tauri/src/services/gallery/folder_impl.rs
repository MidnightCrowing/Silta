use super::GalleryService;
use crate::models::gallery::{GalleryImageInfo, GalleryThumbnailInfo};
use crate::utils::cache_paths::get_thumbnail_path;
use crate::utils::image::{get_image_dimensions, is_supported_image};
use anyhow::{anyhow, Context, Result};
use image::{GenericImageView, ImageFormat, ImageReader};
use natord::compare;
use std::fs;
use std::path::{Path, PathBuf};

pub struct FolderGalleryService;

impl GalleryService for FolderGalleryService {
    fn list_images(&self, path: &Path) -> Result<Vec<PathBuf>> {
        // 用于存储图片绝对路径的向量
        let mut image_paths = Vec::new();

        // 读取目录内容
        let entries =
            fs::read_dir(path).with_context(|| format!("无法读取目录: {}", path.display()))?;

        for entry in entries {
            let entry = entry.with_context(|| "读取目录项失败")?;
            let path = entry.path();

            // 检查文件扩展名是否为支持的图片格式
            if !is_supported_image(&path) {
                continue;
            }

            // 获取图片的绝对路径字符串
            let abs_path = path
                .canonicalize()
                .with_context(|| format!("无法获取文件绝对路径: {:?}", path))?;

            image_paths.push(abs_path);
        }

        // 对路径进行自然排序
        image_paths.sort_by(|a, b| compare(&a.to_string_lossy(), &b.to_string_lossy()));

        Ok(image_paths)
    }

    fn get_images_config(&self, path: &Path) -> Result<PathBuf> {
        let config_path = path.join("config.json");

        if config_path.exists() {
            Ok(config_path)
        } else {
            Err(anyhow!("config.json 文件不存在于路径: {}", path.display()))
        }
    }

    fn get_image_info(&self, path: &Path) -> Result<GalleryImageInfo> {
        let path_obj = Path::new(path);
        let name = path_obj
            .file_name()
            .and_then(|n| n.to_str())
            .unwrap_or("unknown")
            .to_string();

        // 检查文件是否存在
        if !path_obj.exists() {
            return Err(anyhow!("图片文件不存在: {}", path.display()));
        }

        // 获取文件元数据
        let metadata = fs::metadata(&path_obj)
            .with_context(|| format!("无法读取文件元数据: {}", path.display()))?;

        let size = metadata.len();

        // 获取图片宽高
        let (width, height) = get_image_dimensions(&path)?;

        Ok(GalleryImageInfo {
            name,
            path: path.to_string_lossy().to_string(),
            width,
            height,
            size,
        })
    }

    fn get_image_thumbnail(&self, path: &Path, max_size: &u32) -> Result<GalleryThumbnailInfo> {
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
                width: 0, // 前端读取图片时获取
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
}
