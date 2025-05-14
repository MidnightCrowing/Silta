import { Tree, TreeItem, TreeItemLayout } from '@fluentui/react-components'
import { Folder20Regular, Image20Regular, VideoClip20Regular } from '@fluentui/react-icons'
import { forwardRef, useImperativeHandle, useState } from 'react'

import type { SidebarPanelRef } from '~/layouts/SidebarLayout'

import { FolderCustomMenu } from './components'
import type { ShowGroup, SortBy } from './FolderPanel.types.ts'

const FolderPanel = forwardRef<SidebarPanelRef>((_props, ref) => {
  const [showGroup, setShowGroup] = useState<ShowGroup[]>(['member', 'temporary'])
  const [sortBy, setSortBy] = useState<SortBy>('name')

  // 向外暴露方法
  useImperativeHandle(ref, () => ({
    customStaticToolbar() {
      return (
        <span className="text-sm font-semibold">Folder</span>
      )
    },
    customFadeToolbar() {
      return (
        <span className="text-sm font-semibold">Folder</span>
      )
    },
    customMenu() {
      return (
        <FolderCustomMenu
          showGroup={showGroup}
          setShowGroup={setShowGroup}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />
      )
    },
  }))

  return (
    <Tree className="select-none!" aria-label="Default">
      <TreeItem itemType="branch">
        <TreeItemLayout iconBefore={<Folder20Regular />}>
          {showGroup}
          {' '}
          {sortBy}
        </TreeItemLayout>
        <Tree>
          <TreeItem itemType="leaf">
            <TreeItemLayout iconBefore={<Image20Regular />}>level 2, item 1</TreeItemLayout>
          </TreeItem>
          <TreeItem itemType="leaf">
            <TreeItemLayout iconBefore={<Image20Regular />}>level 2, item 2</TreeItemLayout>
          </TreeItem>
          <TreeItem itemType="leaf">
            <TreeItemLayout iconBefore={<VideoClip20Regular />}>level 2, item 3</TreeItemLayout>
          </TreeItem>
        </Tree>
      </TreeItem>
      <TreeItem itemType="branch">
        <TreeItemLayout iconBefore={<Folder20Regular />}>level 1, item 2</TreeItemLayout>
        <Tree>
          <TreeItem itemType="branch">
            <TreeItemLayout iconBefore={<Folder20Regular />}>level 2, item 1</TreeItemLayout>
            <Tree>
              <TreeItem itemType="leaf">
                <TreeItemLayout iconBefore={<VideoClip20Regular />}>level 3, item 1</TreeItemLayout>
              </TreeItem>
            </Tree>
          </TreeItem>
        </Tree>
      </TreeItem>
      <TreeItem itemType="leaf">
        <TreeItemLayout iconBefore={<Folder20Regular />}>level 1, item 3</TreeItemLayout>
      </TreeItem>
    </Tree>
  )
})

export default FolderPanel
