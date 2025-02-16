import { createBrowserRouter } from 'react-router-dom'

import { MainLayout } from '~/layouts'

import { FolderPanel, TagsPanel } from './panels'

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
  },
  {
    path: '/unknown',
    element: <div>Unknown</div>,
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
