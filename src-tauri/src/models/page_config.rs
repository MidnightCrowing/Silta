use crate::models::gallery::ImageGalleryConfigEnum;
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug)]
#[serde(tag = "type")]
pub enum PageConfig {
    ImageGallery(ImageGalleryConfigEnum),
}
