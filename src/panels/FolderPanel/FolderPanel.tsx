import { ToolbarButton, ToolbarDivider, Tooltip, Tree, TreeItem, TreeItemLayout } from '@fluentui/react-components'
import {
  ChevronDownUpRegular,
  ChevronUpDownRegular,
  DocumentTargetRegular,
  Folder20Regular,
  Image20Regular,
  VideoClip20Regular,
} from '@fluentui/react-icons'
import { useState } from 'react'
import KeepAlive from 'react-activation'

import { SidebarPanel } from '~/layouts'

import { FolderCustomMenu } from './components'
import type { ShowGroup, SortBy } from './FolderPanel.types.ts'

export default function FolderPanel() {
  const [showGroup, setShowGroup] = useState<ShowGroup[]>(['member', 'temporary'])
  const [sortBy, setSortBy] = useState<SortBy[]>(['name'])

  return (
    <SidebarPanel
      title="文件"
      fadeToolbar={(
        <>
          <Tooltip content="选择打开的文件" relationship="label">
            <ToolbarButton
              aria-label="Select open files"
              appearance="subtle"
              icon={<DocumentTargetRegular />}
            />
          </Tooltip>
          <ToolbarDivider />
          <Tooltip content="扩展所选" relationship="label">
            <ToolbarButton
              aria-label="Expand selected"
              appearance="subtle"
              icon={<ChevronUpDownRegular />}
            />
          </Tooltip>
          <Tooltip content="全部收起" relationship="label">
            <ToolbarButton
              aria-label="Collapse all"
              appearance="subtle"
              icon={<ChevronDownUpRegular />}
            />
          </Tooltip>
        </>
      )}
      customMenu={(
        <FolderCustomMenu
          showGroup={showGroup}
          setShowGroup={setShowGroup}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />
      )}
    >
      <KeepAlive name="folder-panel">
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
      </KeepAlive>
    </SidebarPanel>
  )
}
