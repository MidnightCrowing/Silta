pub mod gallery;

use tauri::ipc::Invoke;

pub fn all_commands() -> impl Fn(Invoke) -> bool + Send + Sync + 'static {
    tauri::generate_handler![
        gallery::list_images,
        gallery::get_image_thumbnail,
        gallery::get_images_config,
    ]
}
