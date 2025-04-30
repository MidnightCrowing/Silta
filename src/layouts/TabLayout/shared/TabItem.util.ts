import isEqual from 'lodash.isequal'

import type { LocationState } from '~/contexts/location'

import { DefaultTabIcon } from './DefaultTabIcon'
import type { TabItem } from './TabItem.types'

export function isLocationEqualToActiveItem(location: LocationState, activeItem: TabItem): boolean {
  return (
    location.pageLabel === (activeItem.label ?? '')
    && location.pageIcon === (activeItem.icon ?? DefaultTabIcon)
    && location.pageComponentName === activeItem.componentName
    && isEqual(location.pageComponentProps, activeItem.componentProps)
  )
}
