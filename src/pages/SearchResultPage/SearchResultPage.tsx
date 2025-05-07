import { useLocation } from '~/contexts/location'

import type { SearchResultLocationProps, SearchResultPageProps } from './SearchResultPage.types.ts'

export default function SearchResultPage({ className }: SearchResultPageProps) {
  const { getProps } = useLocation()
  const { search } = getProps<SearchResultLocationProps>()

  return (
    <div className={`search-result-page ${className}`}>
      {search}
    </div>
  )
}
