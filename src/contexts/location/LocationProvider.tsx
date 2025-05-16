import { useCallback, useMemo } from 'react'

import type { TabItemTypes } from '~/layouts/TabLayout'
import { pushTabItemUrl } from '~/layouts/TabLayout'
import { parseUrlToComponentData } from '~/utils/urlUtils.ts'

import type { LocationContextType, LocationProviderProps, LocationState } from './Location.types'
import { LocationContext } from './LocationContext'

export function LocationProvider({
  children,
  pageId,
  activeTab,
  store,
  setStore,
  clearStore,
  updatePageData,
}: LocationProviderProps) {
  const location: LocationState = useMemo(() => ({
    title: activeTab.title,
    icon: activeTab.icon,
    url: activeTab.history[activeTab.historyIndex],
  }), [activeTab])

  const props = useMemo(
    () => parseUrlToComponentData(location.url).props,
    [location],
  )

  const setLocation = useCallback(
    (partial: Partial<LocationState>) => {
      updatePageData(pageId, (old: TabItemTypes) => {
        let updatedTab: TabItemTypes = { ...old }

        if (partial.title) {
          updatedTab.title = partial.title
        }

        if (partial.icon) {
          updatedTab.icon = partial.icon
        }

        if (partial.url) {
          updatedTab = pushTabItemUrl(updatedTab, partial.url)
        }

        return updatedTab
      })
    },
    [pageId, updatePageData, clearStore],
  )

  const getAliveName = useCallback(
    (name: string): string => {
      return `TabPage-${pageId}-${name}`
    },
    [pageId],
  )

  const value = useMemo<LocationContextType>(() => ({
    pageId,
    location,
    props,
    store,
    setLocation,
    setStore,
    clearStore,
    getAliveName,
  }), [pageId, location, store, props, setLocation, setStore, clearStore, getAliveName])

  return (
    <LocationContext.Provider value={value}>
      {children}
    </LocationContext.Provider>
  )
}
