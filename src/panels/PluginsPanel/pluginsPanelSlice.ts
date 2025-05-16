import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

import type { AccordionItem } from './PluginsPanel.types.ts'

interface PluginsPanelState {
  visibleItems: AccordionItem[]
  openItems: AccordionItem[]
}

const initialState: PluginsPanelState = {
  visibleItems: ['Enabled', 'Disabled', 'Installed'],
  openItems: ['Enabled'],
}

const pluginsPanelSlice = createSlice({
  name: 'pluginsPanel',
  initialState,
  reducers: {
    setVisibleItems(state, action: PayloadAction<AccordionItem[]>) {
      state.visibleItems = action.payload
    },
    setOpenItems(state, action: PayloadAction<AccordionItem[]>) {
      state.openItems = action.payload
    },
  },
})

export const { setVisibleItems, setOpenItems } = pluginsPanelSlice.actions
export default pluginsPanelSlice.reducer
