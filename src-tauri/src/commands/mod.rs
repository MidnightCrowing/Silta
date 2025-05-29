mod image;
mod local_gallery;
mod local_video;

use tauri::ipc::Invoke;

pub fn all_commands() -> impl Fn(Invoke) -> bool + Send + Sync + 'static {
    tauri::generate_handler![
        image::image_is_dark,
        image::generate_image_thumbnail,
        local_gallery::list_local_gallery_images,
        local_gallery::get_local_gallery_config_path,
        local_gallery::get_local_gallery_image_info,
        local_video::get_local_video_config_path,
    ]
}
