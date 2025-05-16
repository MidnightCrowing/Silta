import { configureStore } from '@reduxjs/toolkit'

import { tabPagesReducer } from '~/layouts'
import { folderPanelReducer, pluginsPanelReducer, terminalPanelReducer } from '~/panels'

export const store = configureStore({
  reducer: {
    // Panels
    folderPanel: folderPanelReducer,
    pluginsPanel: pluginsPanelReducer,
    terminalPanel: terminalPanelReducer,

    // Tabs
    tabPages: tabPagesReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
