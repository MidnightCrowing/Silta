import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'

import { ThemeProvider } from '~/contexts/theme'

import App from './App'
import { store } from './store'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </ThemeProvider>
  </React.StrictMode>,
)
