use crate::models::page_type::PageType;
use serde::{Deserialize, Serialize};
use std::collections::HashMap;

// 面包屑路径结构
#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct Breadcrumb {
    pub title: String,
    pub link: String,
}

/// 配置文件结构体应与前端最新的配置文件格式保持一致。
#[derive(Serialize, Deserialize, Debug)]
#[serde(rename_all = "camelCase")]
pub struct ImageGalleryConfig {
    /// 版本号，用于标识配置文件的版本
    pub version: u32,
    /// 加载页配置，用于指定使用哪个页面加载
    pub page_type: PageType,
    /// 图片标题
    pub title: String,
    /// 爬取链接
    pub link: String,
    /// 面包屑路径
    pub breadcrumb_path: Vec<Breadcrumb>,
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

impl Default for ImageGalleryConfig {
    fn default() -> Self {
        Self {
            version: 1,
            page_type: PageType::ImageGalleryPage,
            title: String::new(),
            link: String::new(),
            breadcrumb_path: Vec::new(),
            publish_time: String::new(),
            source: String::new(),
            author_name: String::new(),
            description: String::new(),
            tags: Vec::new(),
            crawl_time: 0,
            image_links: HashMap::new(),
        }
    }
}
