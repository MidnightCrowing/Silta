import { createElement, Suspense, useCallback, useMemo, useState } from 'react'

import { componentMap } from '~/constants/tabPage.ts'
import { LocationProvider, useLocation } from '~/contexts/location'
import type { TabItemTypes, updatePageData } from '~/layouts/TabLayout'
import { parseUrlToComponentData } from '~/utils/urlUtils.ts'

import { TabToolbar } from '../TabToolbar'
import type { TabPageProps } from './TabPage.types'
import { useClearTabPageStore, useGetTabPageStore, useSetTabPageStore } from './tabPageHooks'

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

export function TabPage({ activeItemId, activeItem, updatePageData }: TabPageProps) {
  const [showPageWrapper, setShowPageWrapper] = useState<boolean>(true)

  const store = useGetTabPageStore(activeItemId)
  const setStore = useSetTabPageStore(activeItemId)
  const clearStore = useClearTabPageStore(activeItemId)

  const refreshPage = useCallback((isClearStore: boolean) => {
    setShowPageWrapper(false) // 先卸载组件
    if (isClearStore) {
      clearStore() // 清空页面数据
    }
    setTimeout(() => setShowPageWrapper(true), 10) // 等待一段时间后重新加载组件
  }, [clearStore])

  const handleUpdatePageData: updatePageData = useCallback(
    (pageId: string, updater: (oldTab: TabItemTypes) => TabItemTypes) => {
      // 包装 updater，检测 URL 是否变更
      updatePageData(pageId, (oldTab) => {
        const newTab = updater(oldTab)

        // 只有当前 tab 被更新，且 URL 发生改变，才清除缓存
        if (
          pageId === activeItemId
          && oldTab.history?.[oldTab.historyIndex] !== newTab.history?.[newTab.historyIndex]
        ) {
          clearStore()
        }

        return newTab
      })
    },
    [updatePageData, activeItemId, clearStore],
  )

  return (
    <div size-full flex="~ col">
      <TabToolbar
        activeItemId={activeItemId}
        activeItem={activeItem}
        updatePageData={handleUpdatePageData}
        refreshPage={refreshPage}
      />

      <div grow overflow-auto>
        <LocationProvider
          pageId={activeItemId}
          activeTab={activeItem}
          store={store}
          setStore={setStore}
          clearStore={clearStore}
          updatePageData={handleUpdatePageData}
        >
          {showPageWrapper && (
            <PageWrapper />
          )}
        </LocationProvider>
      </div>
    </div>
  )
}
