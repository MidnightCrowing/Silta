import { normalizeUrl } from '~/utils/urlUtils.ts'

import type { TabItemTypes } from './TabItem.types.ts'

export function pushTabItemUrl(tabItem: TabItemTypes, url: string): TabItemTypes {
  const newHistory = tabItem.history.slice(0, tabItem.historyIndex + 1)
  newHistory.push({
    title: url || '空页面',
    url: normalizeUrl(url),
  })
  return {
    ...tabItem,
    history: newHistory,
    historyIndex: newHistory.length - 1,
  }
}
