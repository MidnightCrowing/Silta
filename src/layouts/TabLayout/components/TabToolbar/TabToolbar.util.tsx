/**
 * 将 URL 字符串解析成带标记的对象
 * @param urlString URL 字符串
 * @returns 带标记的对象数组
 */
function parseStringToUrl(urlString: string): {
  type: 'protocol' | 'hostname' | 'port' | 'pathname' | 'search' | 'hash' | 'origin'
  text: string
}[] {
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
export function urlToHtmlParts(urlString: string): string {
  const highlightType = ['hostname', 'origin']

  const urlParts = parseStringToUrl(urlString)

  return urlParts
    .map(({ type, text }) => {
      if (!text) {
        return ''
      }

      if (type === 'protocol' && text === 'https:') {
        text += '//'
      }

      return highlightType.includes(type)
        ? `<span data-type="${type}" class="text-$colorNeutralForeground1">${text}</span>`
        : text
    })
    .join('')
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
