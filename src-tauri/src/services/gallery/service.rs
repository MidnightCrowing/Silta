use crate::models::gallery::{GalleryImageInfo, GalleryThumbnailInfo};
use anyhow::Result;

/// `GalleryService` 是一个用于管理图片库的服务接口。
/// 它定义了与图片库相关的操作方法。
pub trait GalleryService {
    /// 列出指定路径下的所有图片信息。
    ///
    /// # 参数
    /// - `path`: 图片所在的目录路径。
    ///
    /// # 返回值
    /// 返回一个包含 `ImageInfo` 的向量，表示路径下的所有图片信息。
    ///
    /// # 错误
    /// 如果无法访问路径或读取图片信息，将返回错误。
    fn list_images(&self, path: &str) -> Result<Vec<GalleryImageInfo>>;

    /// 获取指定图片的缩略图信息。
    ///
    /// # 参数
    /// - `path`: 图片文件的路径。
    /// - `max_size`: 缩略图的最大尺寸（宽或高）。
    ///
    /// # 返回值
    /// 返回一个 `ThumbnailInfo` 对象，包含缩略图的相关信息。
    ///
    /// # 错误
    /// 如果无法生成缩略图或读取图片，将返回错误。
    fn get_thumbnail(&self, path: &str, max_size: &i32) -> Result<GalleryThumbnailInfo>;

    /// 获取指定路径下的 `config` 文件内容。
    ///
    /// # 参数
    /// - `path`: `config` 文件所在的目录路径。
    ///
    /// # 返回值
    /// 返回一个字符串，表示 `config` 文件的内容。
    ///
    /// # 错误
    /// 如果无法找到或读取 `config` 文件，将返回错误。
    fn get_images_config(&self, path: &str) -> Result<String>;
}
