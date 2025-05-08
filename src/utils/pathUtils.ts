export function isLocalFilePath(input: string): boolean {
  // 如果是 file:// 协议
  try {
    const url = new URL(input)
    if (url.protocol === 'file:')
      return true
  }
  catch {
    // 如果不能构建 URL，说明可能是本地路径，不做处理
  }

  // 判断 Windows 本地路径
  if (/^[a-z]:[\\/]/i.test(input))
    return true // C:\ 或 C:/
  if (/^\\\\[^\\]+\\[^\\]+/.test(input))
    return true // 网络路径 \\server\share

  // 判断 Unix 路径（以 / 开头）
  if (/^\/\S/.test(input))
    return true // /usr/local/bin

  return false
}
