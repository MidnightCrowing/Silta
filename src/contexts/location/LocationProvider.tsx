import { useCallback, useMemo } from 'react'

import type { TabItem } from '~/layouts/TabLayout'
import { pushTabItemUrl } from '~/layouts/TabLayout'
import { parseUrlToComponentData } from '~/utils/urlUtils.ts'

import type { LocationContextType, LocationProps, LocationProviderProps, LocationState } from './Location.types'
import { LocationContext } from './LocationContext'

export function LocationProvider({ children, pageId, activeTab, updatePageData }: LocationProviderProps) {
  const location: LocationState = useMemo(() => ({
    title: activeTab.title,
    icon: activeTab.icon,
    url: activeTab.history[activeTab.historyIndex],
  }), [activeTab])

  const getProps = useCallback(<T extends LocationProps>(): T => {
    return parseUrlToComponentData(location.url).props as T
  }, [location])

  const setLocation = useCallback((partial: Partial<LocationState>) => {
    updatePageData(pageId, (old: TabItem) => {
      let updatedTab: TabItem = { ...old }

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
  }, [pageId, updatePageData])

  const value = useMemo<LocationContextType>(() => ({
    location,
    getProps,
    setLocation,
  }), [location, getProps, setLocation])

  return (
    <LocationContext.Provider value={value}>
      {children}
    </LocationContext.Provider>
  )
}
