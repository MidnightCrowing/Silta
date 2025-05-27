import { createElement, Suspense, useCallback, useMemo } from 'react'
import { useAliveController } from 'react-activation'

import { componentMap } from '~/constants/tabPage.ts'
import { LocationProvider, useLocation } from '~/contexts/location'
import type { TabItemTypes, updatePageData } from '~/layouts'
import { parseUrlToComponentData } from '~/utils/urlUtils.ts'

import { TabToolbar } from '../TabToolbar'
import type { TabPageProps } from './TabPage.types'
import { useClearTabPageStore, useDeepMergeTabPageStore, useGetTabPageStore, useSetTabPageStore } from './tabPageHooks'

function PageWrapper() {
  const { location } = useLocation()

  const Component = useMemo(() => {
    if (!location.url) {
      return () => <div /> // 返回一个空组件
    }
    return componentMap[parseUrlToComponentData(location.url).name]
  }, [location])

  return (
    <Suspense>
      {createElement(Component, { className: 'size-full box-border' })}
    </Suspense>
  )
}

export function TabPage({ activeItemId, activeItem, updatePageData }: TabPageProps) {
  const store = useGetTabPageStore(activeItemId)
  const setStore = useSetTabPageStore(activeItemId)
  const deepMergeStore = useDeepMergeTabPageStore(activeItemId)
  const clearStore = useClearTabPageStore(activeItemId)
  const { dropScope } = useAliveController()

  const refreshPage = useCallback(async (isClearStore: boolean) => {
    const { history, historyIndex } = activeItem

    updatePageData(activeItemId, _ => ({
      ...activeItem,
      history: history.map((entry, index) =>
        index === historyIndex ? { ...entry, url: '' } : entry,
      ),
    }))

    if (isClearStore) {
      clearStore() // 清空页面Store缓存
      await dropScope(new RegExp(`^TabPage-${activeItemId}-`)) // 清理KeepAlive缓存
    }
    // else {
    //   await refreshScope(new RegExp(`^TabPage-${activeItemId}-`)) // 刷新KeepAlive缓存
    // }

    requestAnimationFrame(() => {
      updatePageData(activeItemId, _ => activeItem)
    })
  }, [activeItem, activeItemId, clearStore, dropScope, updatePageData])

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

  const storeHandlers = useMemo(() => ({
    store,
    setStore,
    deepMergeStore,
    clearStore,
  }), [store, setStore, deepMergeStore, clearStore])

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
          storeHandlers={storeHandlers}
          updatePageData={handleUpdatePageData}
        >
          <PageWrapper />
        </LocationProvider>
      </div>
    </div>
  )
}
