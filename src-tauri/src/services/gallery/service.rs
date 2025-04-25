use crate::models::gallery::{ImageInfo, ThumbnailInfo};
use anyhow::Result;

pub trait GalleryService {
    fn list_images(&self, path: &str) -> Result<Vec<ImageInfo>>;
    fn get_thumbnail(&self, path: &str, max_size: &i32) -> Result<ThumbnailInfo>;
    fn get_image_info(&self, path: &str) -> Result<ImageInfo>;
}
