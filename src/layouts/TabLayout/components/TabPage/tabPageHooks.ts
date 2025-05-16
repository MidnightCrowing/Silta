import { useDispatch, useSelector } from 'react-redux'

import type { RootState } from '~/store'

import { clearTabPageData, setTabPageData } from './tabPageSlice'

// 获取某个页面的 store
export function useGetTabPageStore<T extends Record<any, any>>(pageId: string): T {
  const tabPages = useSelector((state: RootState) => state.tabPages).tabPages
  return tabPages[pageId] ?? {}
}

// 返回设置某个页面 store 的函数
export function useSetTabPageStore(pageId: string) {
  const dispatch = useDispatch()
  return <T extends Record<any, any>>(data: T) => {
    dispatch(setTabPageData({ pageId, data }))
  }
}

// 返回清空某个页面 store 的函数
export function useClearTabPageStore(pageId: string) {
  const dispatch = useDispatch()
  return () => {
    dispatch(clearTabPageData(pageId))
  }
}
