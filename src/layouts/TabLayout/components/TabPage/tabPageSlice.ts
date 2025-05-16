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
    setTabPageData(state, action: PayloadAction<{ pageId: string, data: Record<any, any> }>) {
      const { pageId, data } = action.payload
      state.tabPages[pageId] = { ...state.tabPages[pageId], ...data }
    },
    clearTabPageData(state, action: PayloadAction<string>) {
      const pageId = action.payload
      delete state.tabPages[pageId]
    },
  },
})

export const { setTabPageData, clearTabPageData } = tabPagesSlice.actions
export default tabPagesSlice.reducer
