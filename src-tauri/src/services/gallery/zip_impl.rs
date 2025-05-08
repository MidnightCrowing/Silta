use super::GalleryService;
use crate::models::gallery::{GalleryImageInfo, GalleryThumbnailInfo};
use anyhow::Result;

pub struct ZipGalleryService;

impl GalleryService for ZipGalleryService {
    fn list_images(&self, zip_path: &str) -> Result<Vec<GalleryImageInfo>> {
        // 用 zip crate 读取压缩包内容
        Ok(vec![])
    }

    /// 获取缩略图
    fn get_thumbnail(&self, path: &str, max_size: &i32) -> Result<GalleryThumbnailInfo> {
        println!("path: {:?} ,new:2", path);
        // 解压缩后做缩略图处理
        Ok(GalleryThumbnailInfo::default())
    }

    fn get_images_config(&self, path: &str) -> Result<String> {
        // 获取原图 info
        Ok("".to_string())
    }
}
