import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

import type { ShowGroup, SortBy } from './FolderPanel.types'

interface FolderPanelState {
  showGroup: ShowGroup[]
  sortBy: SortBy
}

const initialState: FolderPanelState = {
  showGroup: ['member', 'temporary'],
  sortBy: 'name',
}

const folderPanelSlice = createSlice({
  name: 'folderPanel',
  initialState,
  reducers: {
    setShowGroup(state, action: PayloadAction<ShowGroup[]>) {
      state.showGroup = action.payload
    },
    setSortBy(state, action: PayloadAction<SortBy>) {
      state.sortBy = action.payload
    },
  },
})

export const { setShowGroup, setSortBy } = folderPanelSlice.actions
export default folderPanelSlice.reducer
