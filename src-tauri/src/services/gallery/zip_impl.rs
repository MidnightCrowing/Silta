use super::GalleryService;
use crate::models::gallery::{GalleryImageInfo, GalleryThumbnailInfo};
use anyhow::Result;
use std::path::{Path, PathBuf};

pub struct ZipGalleryService;

impl GalleryService for ZipGalleryService {
    fn list_images(&self, path: &Path) -> Result<Vec<PathBuf>> {
        // 用 zip crate 读取压缩包内容
        Ok(vec![])
    }

    fn get_images_config(&self, path: &Path) -> Result<PathBuf> {
        // 获取原图 info
        Ok(Default::default())
    }

    fn get_image_info(&self, path: &Path) -> Result<GalleryImageInfo> {
        // 获取原图 info
        Ok(GalleryImageInfo::default())
    }

    fn get_image_thumbnail(&self, path: &Path, max_size: &u32) -> Result<GalleryThumbnailInfo> {
        println!("path: {:?} ,new:2", path);
        // 解压缩后做缩略图处理
        Ok(GalleryThumbnailInfo::default())
    }
}
