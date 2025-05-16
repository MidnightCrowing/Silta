import { Button } from '@fluentui/react-components'
import { useEffect } from 'react'
import { useAliveController } from 'react-activation'

import { useLocation } from '~/contexts/location'

import type { SearchResultLocationProps, SearchResultPageProps } from './SearchResultPage.types.ts'

export default function SearchResultPage({ className }: SearchResultPageProps) {
  const { location, props, setLocation } = useLocation<SearchResultLocationProps>()
  const search = props.search

  const { getCachingNodes } = useAliveController()

  useEffect(() => {
    setLocation({ title: search })
  }, [search])

  return (
    <div className={`search-result-page ${className}`}>
      SearchResultPage:
      {search}
      {'   '}
      {location.url}

      <Button onClick={() => { console.log(getCachingNodes()) }}>123</Button>
    </div>
  )
}
