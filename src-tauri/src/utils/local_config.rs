use crate::models::PageType;
use anyhow::{Context, Result};
use std::fs;
use std::path::Path;

// 写入配置到 JSON 文件
fn save_config<P: AsRef<Path>>(path: P, config: &PageType) -> Result<()> {
    let json = serde_json::to_string_pretty(config).context("序列化配置为 JSON 时出错")?;
    fs::write(&path, json).context(format!("写入配置到文件 {} 时出错", path.as_ref().display()))?;
    Ok(())
}

// 从 JSON 文件读取配置
fn load_config<P: AsRef<Path>>(path: P) -> Result<PageType> {
    let json = fs::read_to_string(&path)
        .context(format!("读取文件 {} 时出错", path.as_ref().display()))?;
    let config: PageType = serde_json::from_str(&json).context("反序列化 JSON 为配置时出错")?;
    Ok(config)
}
