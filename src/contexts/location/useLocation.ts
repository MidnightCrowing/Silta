import { useContext } from 'react'

import type { LocationContextType, LocationProps } from './Location.types.ts'
import { LocationContext } from './LocationContext'

export function useLocation<
  P extends LocationProps = LocationProps,
  S extends Record<any, any> = Record<any, any>,
>() {
  const context = useContext(LocationContext) as LocationContextType<P, S>
  if (!context) {
    throw new Error('useLocation must be used within a LocationProvider')
  }
  return context
}
