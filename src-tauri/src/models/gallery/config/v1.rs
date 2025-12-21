use serde::{Deserialize, Serialize};
use std::collections::HashMap;

// 面包屑路径结构
#[derive(Serialize, Deserialize, Debug)]
pub struct GalleryBreadcrumb {
    pub title: String,
    pub link: String,
}

#[derive(Serialize, Deserialize, Debug)]
#[serde(rename_all = "camelCase")]
pub struct ImageGalleryConfigV1 {
    /// 图片标题
    pub title: String,

    /// 爬取链接
    pub link: String,

    /// 面包屑路径
    pub breadcrumb_path: Vec<GalleryBreadcrumb>,

    /// 发布时间（格式：YYYY-MM-DD HH:mm:ss）
    pub publish_time: String,

    /// 来源
    pub source: String,

    /// 作者名称
    pub author_name: String,

    /// 描述信息
    pub description: String,

    /// 标签列表
    pub tags: Vec<String>,

    /// 爬取时间，时间戳 Date.now()
    pub crawl_time: u64,

    /// 爬取各图片的链接（key为图片名称，值为图片链接）
    pub image_links: HashMap<String, String>,
}
