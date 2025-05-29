use super::GalleryService;
use crate::models::gallery::GalleryImageInfo;
use crate::utils::image::{get_image_dimensions, is_supported_image};
use anyhow::{anyhow, Context, Result};
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
}
