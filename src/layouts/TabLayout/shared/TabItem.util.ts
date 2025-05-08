import { normalizeUrl } from '~/utils/urlUtils.ts'

import type { TabItem } from './TabItem.types.ts'

export function pushTabItemUrl(tabItem: TabItem, url: string): TabItem {
  const newHistory = tabItem.history.slice(0, tabItem.historyIndex + 1)
  newHistory.push(normalizeUrl(url))
  return {
    ...tabItem,
    history: newHistory,
    historyIndex: newHistory.length - 1,
  }
}
