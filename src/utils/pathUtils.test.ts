import { describe, expect, it } from 'vitest'

import { isLocalFilePath } from './pathUtils'

describe('isLocalFilePath', () => {
  it('应返回 true 对于 Windows 绝对路径', () => {
    expect(isLocalFilePath('C:/Users/User/file.txt')).toBe(true)
    expect(isLocalFilePath('D:/Projects/test/file.txt')).toBe(true)
    expect(isLocalFilePath('C:\\Users\\User\\file.txt')).toBe(true)
    expect(isLocalFilePath('D:\\Projects\\test\\file.txt')).toBe(true)
  })

  it('应返回 true 对于 Windows UNC 路径', () => {
    expect(isLocalFilePath('\\\\server\\share\\file.txt')).toBe(true)
  })

  it('应返回 true 对于类 Unix 绝对路径', () => {
    expect(isLocalFilePath('/usr/local/bin')).toBe(true)
    expect(isLocalFilePath('/home/user/file.txt')).toBe(true)
  })

  it('应返回 true 对于 file 协议的 URL', () => {
    expect(isLocalFilePath('file:///C:/path/to/file')).toBe(true)
    expect(isLocalFilePath('file:///usr/local/bin')).toBe(true)
  })

  it('应返回 false 对于 HTTP URL', () => {
    expect(isLocalFilePath('http://example.com')).toBe(false)
    expect(isLocalFilePath('https://example.com')).toBe(false)
  })

  it('应返回 false 对于非路径结构的字符串', () => {
    expect(isLocalFilePath('randomstring')).toBe(false)
    expect(isLocalFilePath('not/a/path')).toBe(false)
  })

  it('应返回 false 对于空字符串', () => {
    expect(isLocalFilePath('')).toBe(false)
  })
})
