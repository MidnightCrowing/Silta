// 主要布局和全局样式管理
import 'virtual:uno.css'
import 'react-photo-view/dist/react-photo-view.css'
import './App.scss'
import '~/styles/colors.scss'

import { createDOMRenderer, FluentProvider, RendererProvider } from '@fluentui/react-components'
import * as React from 'react'
import { AliveScope } from 'react-activation'
import { RouterProvider } from 'react-router-dom'

import { MainLayout } from '~/layouts'
import { useTheme } from '~/theme/useTheme'

import router from './routes'

function MyComponent(props) {
  const { theme } = useTheme()
  const { children, targetDocument } = props
  const renderer = React.useMemo(() => createDOMRenderer(targetDocument), [targetDocument])

  return (
    <RendererProvider renderer={renderer} targetDocument={targetDocument}>
      <FluentProvider targetDocument={targetDocument} theme={theme}>{children}</FluentProvider>
    </RendererProvider>
  )
}

function App() {
  return (
    // FluentProvider 需要在最外层以保证组件和样式正确加载
    <AliveScope>
      <MyComponent>
        <RouterProvider router={router} />
      </MyComponent>
    </AliveScope>
  )
}

export default App
