import { createContext } from 'react'

import type { LocationContextType } from './Location.types'

export const LocationContext = createContext<LocationContextType | undefined>(undefined)
