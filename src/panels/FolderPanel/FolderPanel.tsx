import { ToolbarButton, ToolbarDivider, Tooltip, Tree, TreeItem, TreeItemLayout } from '@fluentui/react-components'
import {
  ChevronDownUpRegular,
  ChevronUpDownRegular,
  DocumentTargetRegular,
  Folder20Regular,
  Image20Regular,
  VideoClip20Regular,
} from '@fluentui/react-icons'
import { useCallback } from 'react'
import KeepAlive from 'react-activation'
import { useDispatch, useSelector } from 'react-redux'

import { SidebarPanel } from '~/layouts'
import type { RootState } from '~/store'

import { FolderCustomMenu } from './components'
import type { ShowGroup, SortBy } from './FolderPanel.types.ts'
import { setShowGroup, setSortBy } from './folderPanelSlice.ts'

export default function FolderPanel() {
  const dispatch = useDispatch()
  const { showGroup, sortBy } = useSelector((state: RootState) => state.folderPanel)

  const handleSetShowGroup = useCallback((newShowGroup: ShowGroup[]) => {
    dispatch(setShowGroup(newShowGroup))
  }, [dispatch])

  const handleSetSortBy = useCallback((newSortBy: SortBy) => {
    dispatch(setSortBy(newSortBy))
  }, [dispatch])

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
          sortBy={sortBy}
          onSetShowGroup={handleSetShowGroup}
          onSetSortBy={handleSetSortBy}
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
