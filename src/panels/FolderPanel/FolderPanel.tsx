import { Divider, Tree, TreeItem, TreeItemLayout } from '@fluentui/react-components'
import { Document20Regular, Folder20Regular, Image20Regular, VideoClip20Regular } from '@fluentui/react-icons'
import { Collapse } from '@fluentui/react-motion-components-preview'
import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { SidebarPanel } from '~/layouts'
import type { RootState } from '~/store'

import { FolderCustomMenu, FolderFadeToolbar, FolderSearchField } from './components'
import type { FileSystemNode } from './fileSysyem.types.ts'
import type { SearchProps, ShowGroup, SortBy, ToolbarValve } from './FolderPanel.types.ts'
import { setSearchProps, setShowGroup, setSortBy, setToolbarValve } from './folderPanelSlice.ts'

const projectRoot: FileSystemNode[] = [
  {
    type: 'directory',
    name: `showGroup sortBy`, // 来自你代码中的动态文本
    createdAt: new Date(),
    updatedAt: new Date(),
    children: [
      {
        type: 'file',
        name: 'level 2, item 1',
        extension: 'png', // 假设是图像
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        type: 'file',
        name: 'level 2, item 2',
        extension: 'png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        type: 'file',
        name: 'level 2, item 3',
        extension: 'mp4', // 假设是视频
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
  },
  {
    type: 'directory',
    name: 'level 1, item 2',
    createdAt: new Date(),
    updatedAt: new Date(),
    children: [
      {
        type: 'directory',
        name: 'level 2, item 1',
        createdAt: new Date(),
        updatedAt: new Date(),
        children: [
          {
            type: 'file',
            name: 'level 3, item 1',
            extension: 'mp4',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ],
      },
    ],
  },
  {
    type: 'file',
    name: 'level 1, item 3',
    extension: 'folder',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

function getIconByExtension(ext: string | undefined) {
  if (!ext)
    return <Document20Regular />
  const extLower = ext.toLowerCase()
  if (['png', 'jpg', 'jpeg', 'gif'].includes(extLower))
    return <Image20Regular />
  if (['mp4', 'avi', 'mov'].includes(extLower))
    return <VideoClip20Regular />
  return <Document20Regular />
}

function renderTreeNode(node: FileSystemNode, path: string = ''): React.ReactNode {
  const key = `${path}/${node.name}`
  if (node.type === 'directory') {
    return (
      <TreeItem key={key} itemType="branch">
        <TreeItemLayout icon={<Folder20Regular />}>{node.name}</TreeItemLayout>
        <Tree>
          {node.children.map(child => renderTreeNode(child, key))}
        </Tree>
      </TreeItem>
    )
  }
  else {
    return (
      <TreeItem key={key} itemType="leaf">
        <TreeItemLayout iconBefore={getIconByExtension(node.extension)}>
          {node.name}
        </TreeItemLayout>
      </TreeItem>
    )
  }
}

export default function FolderPanel() {
  const dispatch = useDispatch()
  const { toolbarValve, showGroup, sortBy, searchProps } = useSelector((state: RootState) => state.folderPanel)

  const handleSetToolbarValve = useCallback((newValue: Partial<ToolbarValve>) => {
    dispatch(setToolbarValve(newValue))
  }, [dispatch])

  const handleSetShowGroup = useCallback((newShowGroup: ShowGroup[]) => {
    dispatch(setShowGroup(newShowGroup))
  }, [dispatch])

  const handleSetSortBy = useCallback((newSortBy: SortBy) => {
    dispatch(setSortBy(newSortBy))
  }, [dispatch])

  const handleSetSearchProps = useCallback((newProps: Partial<SearchProps>) => {
    dispatch(setSearchProps(newProps))
  }, [dispatch])

  return (
    <SidebarPanel
      className="folder-panel"
      title="文件"
      fadeToolbar={<FolderFadeToolbar />}
      customMenu={(
        <FolderCustomMenu
          showGroup={showGroup}
          sortBy={sortBy}
          onSetShowGroup={handleSetShowGroup}
          onSetSortBy={handleSetSortBy}
        />
      )}
      toolbarValve={toolbarValve}
      setToolbarValve={handleSetToolbarValve}
    >
      <Collapse
        visible={toolbarValve.showSearch.includes('true')}
        unmountOnExit
      >
        <div m="x-7px y-5px">
          <FolderSearchField searchProps={searchProps} setSearchProps={handleSetSearchProps} />

          <Divider className="m-t-5px" />
        </div>
      </Collapse>

      <Tree className="select-none!" aria-label="Default">
        {projectRoot.map(child => renderTreeNode(child, ''))}
      </Tree>
    </SidebarPanel>
  )
}
