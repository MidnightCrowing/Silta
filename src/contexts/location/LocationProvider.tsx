import { useCallback, useMemo } from 'react'

import type { TabItemTypes } from '~/layouts'
import { pushTabItemUrl } from '~/layouts'
import { parseUrlToComponentData } from '~/utils/urlUtils.ts'

import type { LocationContextType, LocationProviderProps, LocationState } from './Location.types'
import { LocationContext } from './LocationContext'

export function LocationProvider({
  children,
  pageId,
  activeTab,
  storeHandlers,
  updatePageData,
}: LocationProviderProps) {
  const location: LocationState = useMemo(() => activeTab.history[activeTab.historyIndex], [activeTab])

  const props = useMemo(
    () => parseUrlToComponentData(location.url).props,
    [location],
  )

  const { store, setStore, deepMergeStore, clearStore } = storeHandlers

  const setLocation = useCallback(
    (partial: Partial<LocationState>) => {
      updatePageData(pageId, (oldTab: TabItemTypes) => {
        // 克隆旧的 tab 数据，避免直接修改
        const updatedTab: TabItemTypes = { ...oldTab }

        // 获取当前历史项
        const currentHistory = updatedTab.history[updatedTab.historyIndex]

        // 更新 title
        if (partial.title !== undefined && partial.title !== currentHistory.title) {
          currentHistory.title = partial.title
        }

        // 更新 icon
        if (partial.icon !== undefined && partial.icon !== currentHistory.icon) {
          currentHistory.icon = partial.icon
        }

        // 更新 url（会自动推进历史）
        if (partial.url !== undefined && partial.url !== currentHistory.url) {
          return pushTabItemUrl(updatedTab, partial.url)
        }

        return updatedTab
      })
    },
    [pageId, updatePageData],
  )

  const getAliveName = useCallback(
    (name: string): string => {
      return `TabPage-${pageId}-${name}`
    },
    [pageId],
  )

  const value = useMemo<LocationContextType>(() => (
    { pageId, location, props, store, setLocation, setStore, deepMergeStore, clearStore, getAliveName }
  ), [pageId, location, props, store, setLocation, setStore, deepMergeStore, clearStore, getAliveName])

  return (
    <LocationContext.Provider value={value}>
      {children}
    </LocationContext.Provider>
  )
}
