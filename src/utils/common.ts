import type { TabItem } from '~/layouts'
import { TabComponentNameEnum } from '~/layouts'

export function generateItemId() {
  return (Date.now() + Math.random()).toString()
}

/**
 * 根据 TabItem 对象生成对应的 URL 字符串
 *
 * 功能说明：
 * 1. 从 TabItem 中提取 `componentName` 和 `componentProps`。
 * 2. 如果 `componentProps` 存在，将其转换为查询参数字符串。
 * 3. 返回格式为 `componentName?key1=value1&key2=value2` 的 URL 字符串。
 *    - 如果没有 `componentProps`，仅返回 `componentName`。
 *
 * @param item - 包含组件名称和组件参数的 TabItem 对象
 * @returns 生成的 URL 字符串
 */
export function generateUrlFromTabItem(item: TabItem): string {
  const { componentName, componentProps } = item

  const params = new URLSearchParams()

  if (componentProps) {
    for (const [key, value] of Object.entries(componentProps)) {
      params.append(key, String(value))
    }
  }

  const queryString = params.toString()
  return queryString ? `${componentName}?${queryString}` : componentName
}

/**
 * 解析 URL 字符串为组件数据
 *
 * 功能说明：
 * 1. 检查 `componentName` 是否在 `TabComponentNameEnum` 枚举中。
 *    - 如果不在，则返回 `SearchPage` 作为组件名称，并将原始 URL 放入 `componentProps` 的 `search` 字段中。
 * 2. 如果在枚举中，则解析查询参数为 `componentProps`。
 *
 * @param urlString - 输入的 URL 字符串
 * @returns 包含组件名称和组件参数的对象
 */
export function parseUrlToComponentData(urlString: string): {
  componentName: TabComponentNameEnum
  componentProps: Record<string, any>
} {
  const [componentName, queryString] = urlString.split('?')

  // 检查 componentName 是否在 TabComponentNameEnum 中
  const isValidComponentName = Object.values(TabComponentNameEnum).includes(componentName as TabComponentNameEnum)
  if (!isValidComponentName) {
    // 如果不在枚举中，则跳转到 SearchPage，并将原始内容放入 componentProps
    return {
      componentName: TabComponentNameEnum.SearchPage,
      componentProps: { search: urlString },
    }
  }

  // 解析查询参数为 componentProps
  const componentProps = queryString
    ? Object.fromEntries(new URLSearchParams(queryString).entries())
    : {}

  return { componentName: componentName as TabComponentNameEnum, componentProps }
}
