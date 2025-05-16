import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

interface TerminalPanelState {
  tabSelect: string
}

const initialState: TerminalPanelState = {
  tabSelect: 'tab1',
}

const terminalPanelSlice = createSlice({
  name: 'terminalPanel',
  initialState,
  reducers: {
    setTabSelect(state, action: PayloadAction<string>) {
      state.tabSelect = action.payload
    },
  },
})

export const { setTabSelect } = terminalPanelSlice.actions
export default terminalPanelSlice.reducer
