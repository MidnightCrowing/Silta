use super::service::GalleryService;
use crate::models::gallery::{ImageInfo, ThumbnailInfo};
use anyhow::{Context, Result};

pub struct ZipGalleryService;

impl GalleryService for ZipGalleryService {
    fn list_images(&self, zip_path: &str) -> Result<Vec<ImageInfo>> {
        // 用 zip crate 读取压缩包内容
        Ok(vec![])
    }

    /// 获取缩略图
    fn get_thumbnail(&self, path: &str, max_size: &i32) -> Result<ThumbnailInfo> {
        println!("path: {:?} ,new:2", path);
        // 解压缩后做缩略图处理
        Ok(ThumbnailInfo::default())
    }

    fn get_image_info(&self, path: &str) -> Result<ImageInfo> {
        // 获取原图 info
        Ok(ImageInfo::default())
    }
}
