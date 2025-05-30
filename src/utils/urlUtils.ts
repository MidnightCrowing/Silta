import type { TabPropsMap } from '~/constants/tabPage.ts'
import { TabPageEnum } from '~/constants/tabPage.ts'

/**
 * 根据 TabItem 对象生成对应的 URL 字符串
 *
 * 功能说明：
 * 1. 从 TabItem 中提取 `name` 和 `props`。
 * 2. 如果 `props` 存在，将其转换为查询参数字符串。
 * 3. 返回格式为 `name?key1=value1&key2=value2` 的 URL 字符串。
 *    - 如果没有 `props`，仅返回 `name`。
 *
 * @returns 生成的 URL 字符串
 */
export function generateUrlFromTabItem<T extends TabPageEnum>({ name, props }: {
  name: T
  props: TabPropsMap[T]
}): string {
  const params = new URLSearchParams()

  if (props) {
    for (const [key, value] of Object.entries(props)) {
      params.append(key, String(value))
    }
  }

  const queryString = params.toString()
  return queryString ? `${name}?${queryString}` : name
}

/**
 * 解析 URL 字符串为组件数据
 *
 * 功能说明：
 * 1. 检查 `name` 是否在 `TabPageEnum` 枚举中。
 *    - 如果不在，则返回 `SearchPage` 作为组件名称，并将原始 URL 放入 `props` 的 `search` 字段中。
 * 2. 如果在枚举中，则解析查询参数为 `props`。
 *
 * @param urlString - 输入的 URL 字符串
 * @returns 包含组件名称和组件参数的对象
 */
export function parseUrlToComponentData<T extends TabPageEnum>(urlString: string): {
  name: T
  props: TabPropsMap[T]
} {
  const [name, queryString] = urlString.split('?')

  // 检查 name 是否在 TabPageEnum 中
  const isValidName: boolean = Object.values(TabPageEnum).includes(name as TabPageEnum)
  if (!isValidName) {
    // 如果不在枚举中，则跳转到 SearchResultPage，并将原始内容放入 props
    return {
      name: TabPageEnum.SearchResultPage as T,
      props: { search: urlString } as TabPropsMap[T],
    }
  }

  // 解析查询参数为 props
  const props = queryString
    ? Object.fromEntries(new URLSearchParams(queryString).entries())
    : {}

  return { name: name as T, props: props as TabPropsMap[T] }
}

/**
 * 将任意 URL 转为规范的自定义 URL
 *
 * 功能说明：
 * 1. 检查输入的 URL 是否符合自定义 URL 的格式。
 * 2. 如果符合，直接返回原始 URL。
 * 3. 如果不符合，将其转换为 `SearchResultPage` 的格式，并将原始 URL 放入 `search` 字段。
 *
 * @param url - 输入的任意 URL 字符串
 * @returns 规范的自定义 URL 字符串
 */
export function normalizeUrl(url: string): string {
  if (!url) {
    return ''
  }

  const [name] = url.split('?')

  // 检查 name 是否在 TabPageEnum 中
  const isValidName: boolean = Object.values(TabPageEnum).includes(name as TabPageEnum)
  if (isValidName) {
    return url // 如果是有效的自定义 URL，直接返回
  }

  // 如果不是有效的自定义 URL，转换为 SearchResultPage 格式
  return `${TabPageEnum.SearchResultPage}?search=${encodeURIComponent(url)}`
}
