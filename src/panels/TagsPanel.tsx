import { CounterBadge, Tree, TreeItem, TreeItemLayout } from '@fluentui/react-components'

function AsideContent({ count }: { count: number }) {
  return <CounterBadge count={count} appearance="ghost" size="small" />
}

export function TagsPanel() {
  return (
    <Tree aria-label="Default">
      <TreeItem itemType="branch">
        <TreeItemLayout aside={<AsideContent count={3} />}>level 1, item 1</TreeItemLayout>
        <Tree>
          <TreeItem itemType="leaf">
            <TreeItemLayout aside={<AsideContent count={1} />}>level 2, item 1</TreeItemLayout>
          </TreeItem>
          <TreeItem itemType="leaf">
            <TreeItemLayout aside={<AsideContent count={1} />}>level 2, item 2</TreeItemLayout>
          </TreeItem>
          <TreeItem itemType="leaf">
            <TreeItemLayout aside={<AsideContent count={1} />}>level 2, item 3</TreeItemLayout>
          </TreeItem>
        </Tree>
      </TreeItem>
      <TreeItem itemType="branch">
        <TreeItemLayout aside={<AsideContent count={1} />}>level 1, item 2</TreeItemLayout>
        <Tree>
          <TreeItem itemType="branch">
            <TreeItemLayout aside={<AsideContent count={1} />}>level 2, item 1</TreeItemLayout>
            <Tree>
              <TreeItem itemType="leaf">
                <TreeItemLayout aside={<AsideContent count={1} />}>level 3, item 1</TreeItemLayout>
              </TreeItem>
            </Tree>
          </TreeItem>
        </Tree>
      </TreeItem>
      <TreeItem itemType="leaf">
        <TreeItemLayout aside={<AsideContent count={1} />}>level 1, item 3</TreeItemLayout>
      </TreeItem>
    </Tree>
  )
}
