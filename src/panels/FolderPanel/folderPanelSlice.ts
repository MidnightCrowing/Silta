import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

import type { SearchProps, ShowGroup, SortBy, ToolbarValve } from './FolderPanel.types'

interface FolderPanelState {
  toolbarValve: ToolbarValve
  showGroup: ShowGroup[]
  sortBy: SortBy
  searchProps: SearchProps
}

export const initialState: FolderPanelState = {
  toolbarValve: { showSearch: [] },
  showGroup: ['member', 'temporary'],
  sortBy: 'name',
  searchProps: {
    scope: ['folder', 'image', 'video'],
    isCaseSensitive: false,
    isRegex: false,
    isFuzzy: false,
    keyword: '',
  },
}

const folderPanelSlice = createSlice({
  name: 'folderPanel',
  initialState,
  reducers: {
    setToolbarValve(state, action: PayloadAction<Partial<ToolbarValve>>) {
      state.toolbarValve = { ...state.toolbarValve, ...action.payload }
    },
    setShowGroup(state, action: PayloadAction<ShowGroup[]>) {
      state.showGroup = action.payload
    },
    setSortBy(state, action: PayloadAction<SortBy>) {
      state.sortBy = action.payload
    },
    setSearchProps(state, action: PayloadAction<Partial<SearchProps>>) {
      state.searchProps = { ...state.searchProps, ...action.payload }
    },
  },
})

export const { setToolbarValve, setShowGroup, setSortBy, setSearchProps } = folderPanelSlice.actions
export default folderPanelSlice.reducer
