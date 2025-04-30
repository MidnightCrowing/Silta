import type { ReactNode } from 'react'

/**
 * 将 URL 字符串解析成带标记的对象
 * @param urlString URL 字符串
 * @returns 带标记的对象数组
 */
function parseStringToUrl(urlString: string): { type: string, text: string }[] {
  try {
    // 尝试用 URL 构造函数解析
    const url = new URL(urlString)
    return [
      { type: 'protocol', text: url.protocol },
      { type: 'hostname', text: url.hostname },
      { type: 'port', text: url.port ? `:${url.port}` : '' },
      { type: 'pathname', text: url.pathname },
      { type: 'search', text: url.search },
      { type: 'hash', text: url.hash },
    ]
  }
  catch {
    // 如果解析失败，则按自定义 URL 进行解析
    const match = urlString.match(/[?/]/)
    if (!match) {
      // 没有 ? 或 /，全部归 origin
      return [
        { type: 'origin', text: urlString },
      ]
    }

    const index = match.index
    return [
      { type: 'origin', text: urlString.slice(0, index) },
      { type: 'search', text: urlString.slice(index) },
    ]
  }
}

/**
 * 将url字符串转成带标记的 React 节点
 */
export function urlToHtmlParts(urlString: string): ReactNode {
  const typeClassNameMap: Record<string, string> = {
    protocol: 'text-$colorNeutralForeground3',
    hostname: 'text-$colorNeutralForeground1',
    origin: 'text-$colorNeutralForeground1',
    port: 'text-$colorNeutralForeground3',
    pathname: 'text-$colorNeutralForeground3',
    search: 'text-$colorNeutralForeground3',
    hash: 'text-$colorNeutralForeground3',
  }

  const urlParts = parseStringToUrl(urlString)

  return (
    <>
      {urlParts.map(({ type, text }) =>
        text
          ? (
              <span key={type} data-type={type} className={`whitespace-nowrap ${typeClassNameMap[type]}`}>
                {text}
              </span>
            )
          : null,
      )}
    </>
  )
}

/*
/!**
 * 将 HTML 字符串解析成 URL 字符串
 *
 * 注意：只简单按 <span> 的 textContent 顺序拼接
 *!/
export function htmlPartsToUrl(htmlElement: HTMLDivElement): string {
  const spans = htmlElement.querySelectorAll('span[data-type]')
  let url = ''

  spans.forEach((span) => {
    url += span.textContent || ''
  })

  return url
}
*/
