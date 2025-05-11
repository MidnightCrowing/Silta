use std::path::PathBuf;

/// 获取指定视频的 CONFIG 文件路径。
///
/// # 参数
/// - `path`: 视频路径。
///
/// # 返回
/// - CONFIG 文件路径，或错误信息。
#[tauri::command]
pub async fn get_local_video_config_path(path: PathBuf) -> Result<String, String> {
    let config_path = path.with_extension("json"); // config 文件为视频文件同名的 json 文件

    if config_path.exists() {
        Ok(config_path.to_string_lossy().into())
    } else {
        Err(format!(
            "{} 文件不存在于路径: {}",
            config_path.display(),
            path.display()
        ))
    }
}
