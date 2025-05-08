import { useEffect } from 'react'

import { useLocation } from '~/contexts/location'

import type { SearchResultLocationProps, SearchResultPageProps } from './SearchResultPage.types.ts'

export default function SearchResultPage({ className }: SearchResultPageProps) {
  const { location, getProps, setLocation } = useLocation()
  const { search } = getProps<SearchResultLocationProps>()

  useEffect(() => {
    setLocation({ title: search })
  }, [search])

  return (
    <div className={`search-result-page ${className}`}>
      SearchResultPage:
      {search}
      {'   '}
      {location.url}
    </div>
  )
}
