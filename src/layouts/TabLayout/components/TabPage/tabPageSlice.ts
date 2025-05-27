import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

interface TabPagesState {
  tabPages: Record<string, Record<any, any>>
}

const initialState: TabPagesState = {
  tabPages: {},
}

const tabPagesSlice = createSlice({
  name: 'tabPages',
  initialState,
  reducers: {
    /**
     * 设置指定页面的状态数据，将传入的数据对象与当前页面状态进行浅合并。
     * 用于快速更新页面的多个字段。
     *
     * @param state - 当前的 Redux 状态
     * @param action - 包含 pageId（页面唯一标识）和 data（要合并的键值对）的 action
     */
    setTabPageData(state, action: PayloadAction<{ pageId: string, data: Record<any, any> }>) {
      const { pageId, data } = action.payload
      state.tabPages[pageId] = {
        ...state.tabPages[pageId],
        ...data,
      }
    },

    /**
     * 深度合并指定页面中某个字段的值（通常是 Record 类型）。
     * 如果该字段原本不存在，则会新建该字段；否则按 key 合并 value 中的内容。
     *
     * @param state - 当前的 Redux 状态
     * @param action - 包含 pageId（页面唯一标识）、key（字段名）和 value（待合并的 Record 对象）的 action
     */
    deepMergeTabPageData(state, action: PayloadAction<{ pageId: string, key: string, value: Record<string, any> }>) {
      const { pageId, key, value } = action.payload
      const page = state.tabPages[pageId] ?? {}
      const existing = page[key] ?? {}

      state.tabPages[pageId] = {
        ...page,
        [key]: {
          ...existing,
          ...value,
        },
      }
    },

    /**
     * 清除指定页面的所有状态数据。
     * 通常在页面卸载或重置时使用，防止内存泄漏或数据污染。
     *
     * @param state - 当前的 Redux 状态
     * @param action - 包含要清除的 pageId 的 action
     */
    clearTabPageData(state, action: PayloadAction<string>) {
      const pageId = action.payload
      delete state.tabPages[pageId]
    },
  },
})

export const { setTabPageData, deepMergeTabPageData, clearTabPageData } = tabPagesSlice.actions
export default tabPagesSlice.reducer
