// 主要布局和全局样式管理
import 'virtual:uno.css'
import 'react-photo-view/dist/react-photo-view.css'
import './App.scss'
import '~/styles/colors.scss'

import { FluentProvider } from '@fluentui/react-components'
import { AliveScope } from 'react-activation'

import { MainLayout } from '~/layouts'
import { useTheme } from '~/theme/useTheme'

function App() {
  const { theme } = useTheme()

  return (
    <FluentProvider theme={theme}>
      <AliveScope>
        <MainLayout />
      </AliveScope>
    </FluentProvider>
  )
}

export default App
