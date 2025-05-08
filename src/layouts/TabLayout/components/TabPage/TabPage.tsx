import { createElement, Suspense, useMemo, useState } from 'react'
import KeepAlive from 'react-activation'

import { componentMap } from '~/constants/tabPage.ts'
import { LocationProvider, useLocation } from '~/contexts/location'
import { parseUrlToComponentData } from '~/utils/urlUtils.ts'

import { TabToolbar } from '../TabToolbar'
import type { TabPageProps } from './TabPage.types'

function PageWrapper() {
  const { location } = useLocation()

  const Component = useMemo(() => {
    return componentMap[parseUrlToComponentData(location.url).name]
  }, [location])

  return (
    <Suspense>
      {createElement(Component, { className: 'size-full box-border' })}
    </Suspense>
  )
}

export function TabPage({
  activeItemId,
  activeItem,
  updatePageData,
}: TabPageProps) {
  const [showPageWrapper, setShowPageWrapper] = useState<boolean>(true)

  const refreshPage = () => {
    setShowPageWrapper(false) // 先卸载组件
    setTimeout(() => setShowPageWrapper(true), 10) // 等待一段时间后重新加载组件
  }

  return (
    <div size-full flex="~ col">
      <TabToolbar
        activeItemId={activeItemId}
        activeItem={activeItem}
        updatePageData={updatePageData}
        refreshPage={refreshPage}
      />

      <div grow overflow-auto>
        <KeepAlive cacheKey={activeItemId}>
          <LocationProvider
            pageId={activeItemId}
            activeTab={activeItem}
            updatePageData={updatePageData}
          >
            {showPageWrapper && (
              <PageWrapper />
            )}
          </LocationProvider>
        </KeepAlive>
      </div>
    </div>
  )
}
