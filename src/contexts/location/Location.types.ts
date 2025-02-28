import type { FluentIcon } from '@fluentui/react-icons'

import type { TabComponentNameEnum } from '~/layouts'

export interface LocationState {
  pageLabel: string
  pageIcon?: FluentIcon
  pageComponentName: TabComponentNameEnum
  pageComponentProps: Record<string, any>
}

export interface LocationContextType {
  location: LocationState
  setLocation: ({ pageLabel, pageIcon, pageComponentName, pageComponentProps }: Partial<LocationState>) => void
}
