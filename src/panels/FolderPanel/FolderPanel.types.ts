// member: 成员
// excluded: 排除的文件
// temporary: 临时文件
// details: 文件详细信息
export type ShowGroup = 'member' | 'excluded' | 'temporary' | 'details'

// 名称
// 类型
// 修改时间(从新到旧)
// 修改时间(从旧到新)
export type SortBy = 'name' | 'type' | 'dateAsc' | 'dateDesc'

export interface ToolbarValve {
  showSearch: string[]
}

// folder: 文件夹
// image: 图片
// video: 视频
export type SearchScope = 'folder' | 'image' | 'video'

export interface SearchProps {
  /**
   * 搜索作用域
   */
  scope: SearchScope[]

  /**
   * 区分大小写
   */
  isCaseSensitive: boolean

  /**
   * 正则表达式
   */
  isRegex: boolean

  /**
   * 是否模糊搜索
   */
  isFuzzy: boolean

  /**
   * 搜索关键字
   */
  keyword: string
}
