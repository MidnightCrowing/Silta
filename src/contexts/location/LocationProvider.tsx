import type { FluentIcon } from '@fluentui/react-icons'
import type { ReactNode } from 'react'
import { useCallback, useMemo, useState } from 'react'

import { TabComponentNameEnum } from '~/layouts'

import type { LocationState } from './Location.types'
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

  const setLocation = useCallback((newState: Partial<LocationState>) => {
    setLocationState(prevState => ({ ...prevState, ...newState }))
  }, [])

  const value = useMemo(() => ({ location, setLocation }), [location, setLocation])

  return (
    <LocationContext.Provider value={value}>
      {children}
    </LocationContext.Provider>
  )
};
