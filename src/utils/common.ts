import type { TabItem } from '~/layouts'

export function generateItemId() {
  return (Date.now() + Math.random()).toString()
}

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

export function parseUrl(url: string): { origin: string, search: string } {
  try {
    // 尝试使用 URL 构造函数解析
    const urlObj = new URL(url)
    return {
      origin: urlObj.origin,
      search: urlObj.pathname + urlObj.search + urlObj.hash,
    }
  }
  catch {
    // 如果解析失败，则按自定义 URL 进行解析
    const [origin, search] = url.split('?')
    return {
      origin,
      search: search ? `?${search}` : '',
    }
  }
}
