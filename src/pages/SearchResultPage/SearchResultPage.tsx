import { useEffect } from 'react'

import { useLocation } from '~/contexts/location'

import type { PageProps } from '../PageProps.ts'
import { SearchResultTopBar, SearchResultTopTags } from './components'
import type { SearchResultLocationProps } from './SearchResultPage.types.ts'

export default function SearchResultPage({ className }: PageProps) {
  const { location, props, setLocation } = useLocation<SearchResultLocationProps>()
  const search = props.search

  useEffect(() => {
    const newTitle = `${search} - 搜索`
    if (newTitle !== location.title) {
      setLocation({ title: newTitle })
    }
  }, [location.title, search, setLocation])

  return (
    <div className={`search-result-page p-15px flex-(~ col) gap-10px ${className}`}>
      <SearchResultTopBar />
      <SearchResultTopTags />

      <div w="60%" flex="~ col" gap="10px">
        {/* result cards */}
      </div>

      SearchResultPage:
      {search}

    </div>
  )
}
