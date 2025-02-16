// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
// #[tauri::command]
// pub fn greet(name: &str) -> String {
//     format!("Hello, {}! You've been greeted from Rust!", name)
// }

use natord::compare;

/// 列出指定文件夹下的所有文件。
///
/// # 参数
///
/// * `folder_path` - 文件夹的路径。
///
/// # 返回值
///
/// 返回一个包含文件路径的字符串向量，如果发生错误，则返回错误信息。
#[tauri::command]
pub fn list_files(folder_path: &str) -> Result<Vec<String>, String> {
    let mut files = Vec::new();

    let entries = std::fs::read_dir(folder_path).map_err(|e| e.to_string())?;
    for entry in entries {
        let entry = entry.map_err(|e| e.to_string())?;
        let path = entry.path();
        if let Some(path_str) = path.to_str() {
            files.push(path_str.to_string());
        }
    }

    files.sort_by(|a, b| compare(a, b)); // 使用自然排序

    Ok(files)
}

// #[tauri::command]
// pub fn list_g00_files(folder_path: &str) -> Result<Vec<String>, String> {
//     let mut g00_files = Vec::new();

//     let entries = std::fs::read_dir(folder_path).map_err(|e| e.to_string())?;
//     for entry in entries {
//         let entry = entry.map_err(|e| e.to_string())?;
//         let path = entry.path();
//         if path
//             .extension()
//             .map_or(false, |ext| ext == "g00")
//         {
//             if let Some(path_str) = path.to_str() {
//                 g00_files.push(path_str.to_string());
//             }
//         }
//     }

//     Ok(g00_files)
// }
