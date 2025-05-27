import type { LocationProps } from '~/contexts/location'

/** 页面位置属性 */
export interface SearchResultLocationProps extends LocationProps {
  search: string
}
