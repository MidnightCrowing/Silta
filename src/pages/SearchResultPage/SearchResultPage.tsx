import { Suspense, useEffect } from 'react'

import { ImageCard, ImageCardList } from '~/components/ImageCard'
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
    <div className={`search-result-page @container p-15px flex-(~ col) gap-10px ${className}`}>
      <SearchResultTopBar />
      <SearchResultTopTags />

      {/* result cards */}

      <Suspense>
        <ImageCardList showName>
          <div
            grid="~ @[1100px]:cols-6! @[800px]:cols-5 @[600px]:cols-4 @[400px]:cols-3 @[200px]:cols-2 cols-1"
            gap="20px"
            m="t-10px"
          >
            <ImageCard src="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/AllanMunger.jpg" name="示例1" />
            <ImageCard src="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/AllanMunger.jpg" name="示例2" />
            <ImageCard src="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/AllanMunger.jpg" name="示例3" />
            <ImageCard src="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/AllanMunger.jpg" name="示例4" />
            <ImageCard src="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/AllanMunger.jpg" name="示例5" />
            <ImageCard src="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/AllanMunger.jpg" name="示例6" />
            <ImageCard src="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/AllanMunger.jpg" name="示例7" />
            <ImageCard src="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/AllanMunger.jpg" name="示例8" />
            <ImageCard src="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/AllanMunger.jpg" name="示例9" />
          </div>
        </ImageCardList>
      </Suspense>

      SearchResultPage:
      {search}

    </div>
  )
}
