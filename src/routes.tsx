import { createDOMRenderer, FluentProvider, RendererProvider } from '@fluentui/react-components'
import * as React from 'react'
import KeepAlive, { AliveScope } from 'react-activation'
import { createBrowserRouter } from 'react-router-dom'

import { MainLayout } from '~/layouts'
import { useTheme } from '~/theme/useTheme'

import { FolderPanel, TagsPanel } from './panels'

function MyComponent(props) {
  const { theme } = useTheme()
  const { children, targetDocument } = props
  const renderer = React.useMemo(() => createDOMRenderer(targetDocument), [targetDocument])

  return (
    <RendererProvider renderer={renderer} targetDocument={targetDocument}>
      <FluentProvider targetDocument={targetDocument} theme={theme}>
        {children}
      </FluentProvider>
    </RendererProvider>
  )
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
  },
  {
    path: '/unknown',
    element: <KeepAlive><div>Unknown</div></KeepAlive>,
  },
  {
    path: '/panel',
    children: [
      {
        path: 'folder',
        element: <FolderPanel />,
      },
      {
        path: 'tags',
        element: <TagsPanel />,
      },
    ],
  },
])

export default router
