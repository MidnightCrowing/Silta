import { Tree, TreeItem, TreeItemLayout } from '@fluentui/react-components'
import { Folder20Regular, Image20Regular, VideoClip20Regular } from '@fluentui/react-icons'

export default function FolderPanel() {
  return (
    <Tree className="select-none!" aria-label="Default">
      <TreeItem itemType="branch">
        <TreeItemLayout iconBefore={<Folder20Regular />}>level 1, item 1</TreeItemLayout>
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
}
