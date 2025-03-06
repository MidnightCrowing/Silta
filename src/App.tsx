// 主要布局和全局样式管理
import 'virtual:uno.css'
import 'react-photo-view/dist/react-photo-view.css'
import './App.scss'
import '~/styles/colors.scss'

import { FluentProvider } from '@fluentui/react-components'
import { Suspense } from 'react'
import { AliveScope } from 'react-activation'

import { useTheme } from '~/contexts/theme'
import { MainLayout } from '~/layouts'

function App() {
  const { theme } = useTheme()

  return (
    <FluentProvider theme={theme}>
      <AliveScope>
        <Suspense>
          <MainLayout />
        </Suspense>
      </AliveScope>
    </FluentProvider>
  )
}

export default App
