mod v1;

use crate::models::PageConfig;
use serde::{Deserialize, Serialize};

/// 图片画廊配置枚举，支持不同版本的配置
#[derive(Serialize, Deserialize, Debug)]
#[serde(tag = "version")]
pub enum ImageGalleryConfigEnum {
    #[serde(rename = "1")]
    V1(v1::ImageGalleryConfigV1),
}

/// 当前最新版本的图片画廊配置类型
pub type ImageGalleryConfig = v1::ImageGalleryConfigV1;

/// 将配置迁移到最新版本
impl ImageGalleryConfigEnum {
    pub fn to_latest(self) -> ImageGalleryConfig {
        match self {
            ImageGalleryConfigEnum::V1(v1) => v1, // 已是最新版本
        }
    }
}

/////////////////////////////////////////////////////////////////////////////
// 各版本配置转换为页面配置
/////////////////////////////////////////////////////////////////////////////
impl From<v1::ImageGalleryConfigV1> for PageConfig {
    fn from(v: v1::ImageGalleryConfigV1) -> Self {
        PageConfig::ImageGallery(ImageGalleryConfigEnum::V1(v))
    }
}
