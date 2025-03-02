import type { FluentIcon } from '@fluentui/react-icons'
import type { ReactNode } from 'react'
import { useCallback, useMemo, useState } from 'react'

import { TabComponentNameEnum } from '~/layouts'

import type { LocationContextType, LocationState } from './Location.types'
import { LocationContext } from './LocationContext'

export function LocationProvider({ children, pageLabel, pageIcon, pageComponentName, pageComponentProps }: {
  children: ReactNode
  pageLabel?: string
  pageIcon?: FluentIcon
  pageComponentName?: TabComponentNameEnum
  pageComponentProps?: Record<string, any>
}) {
  const [location, setLocationState] = useState<LocationState>({
    pageLabel: pageLabel || '',
    pageIcon: pageIcon || undefined,
    pageComponentName: pageComponentName || TabComponentNameEnum.NewPage,
    pageComponentProps: pageComponentProps || {},
  })

  const [locationHistory, setLocationHistory] = useState<LocationState[]>([location])
  const [historyIndex, setHistoryIndex] = useState<number>(0)

  const setLocation = useCallback((newState: Partial<LocationState>) => {
    setLocationState((prevState) => {
      const updatedLocation = { ...prevState, ...newState }
      const newHistory = locationHistory.slice(0, historyIndex + 1)
      newHistory.push(updatedLocation)
      setLocationHistory(newHistory)
      setHistoryIndex(newHistory.length - 1)
      return updatedLocation
    })
  }, [locationHistory, historyIndex])

  const locationBack = useCallback(() => {
    if (historyIndex > 0) {
      setHistoryIndex(prevIndex => prevIndex - 1)
      setLocationState(locationHistory[historyIndex - 1])
    }
  }, [historyIndex, locationHistory])

  const locationForward = useCallback(() => {
    if (historyIndex < locationHistory.length - 1) {
      setHistoryIndex(prevIndex => prevIndex + 1)
      setLocationState(locationHistory[historyIndex + 1])
    }
  }, [historyIndex, locationHistory])

  const isBack = historyIndex > 0
  const isForward = historyIndex < locationHistory.length - 1

  const value = useMemo<LocationContextType>(() => ({
    location,
    locationHistory,
    isBack,
    isForward,
    locationBack,
    locationForward,
    setLocation,
  }), [location, locationHistory, isBack, isForward, locationBack, locationForward, setLocation])

  return (
    <LocationContext.Provider value={value}>
      {children}
    </LocationContext.Provider>
  )
}
