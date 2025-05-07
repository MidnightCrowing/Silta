import type { LocationProps } from '~/contexts/location'

import type { PageBaseProps } from '../shared/sharedProps.types'

/** 页面属性 */
export interface SearchResultPageProps extends PageBaseProps {
}

/** 页面位置属性 */
export interface SearchResultLocationProps extends LocationProps {
  search: string
}
