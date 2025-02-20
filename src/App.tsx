// 主要布局和全局样式管理
import 'virtual:uno.css'
import 'react-photo-view/dist/react-photo-view.css'
import './App.scss'
import '~/styles/colors.scss'

import { createDOMRenderer, FluentProvider, RendererProvider } from '@fluentui/react-components'
import * as React from 'react'
import KeepAlive, { AliveScope } from 'react-activation'
import { BrowserRouter, Route, RouterProvider, Routes } from 'react-router-dom'

import { useTheme } from '~/theme/useTheme'

import { MainLayout } from './layouts'
import { FolderPanel, TagsPanel } from './panels'
import router from './routes'

function MyComponent(props) {
  const { theme } = useTheme()
  const { children, targetDocument } = props
  const renderer = React.useMemo(() => createDOMRenderer(targetDocument), [targetDocument])

  return (
    <FluentProvider targetDocument={targetDocument} theme={theme}>
      {children}
    </FluentProvider>
  )
}

function App() {
  const { theme } = useTheme()
  return (
    // FluentProvider 需要在最外层以保证组件和样式正确加载
    <FluentProvider targetDocument={document} theme={theme}>
      <BrowserRouter>
        <AliveScope>
          <Routes>
            <Route path="/" element={<MainLayout />} />
            <Route path="/panel">
              <Route path="folder" element={<KeepAlive><FolderPanel /></KeepAlive>} />
              <Route path="tags" element={<TagsPanel />} />
            </Route>
          </Routes>
        </AliveScope>
      </BrowserRouter>
    </FluentProvider>
  )
}

export default App
