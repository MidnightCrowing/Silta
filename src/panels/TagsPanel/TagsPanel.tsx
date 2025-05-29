import { CounterBadge, ToolbarButton, ToolbarDivider, Tooltip, Tree, TreeItem, TreeItemLayout } from '@fluentui/react-components'
import { ChevronDownUpRegular, ChevronUpDownRegular, SearchRegular } from '@fluentui/react-icons'
import KeepAlive from 'react-activation'

import { SidebarPanel } from '~/layouts'

function AsideContent({ count }: { count: number }) {
  return <CounterBadge count={count} appearance="ghost" size="small" />
}

export default function TagsPanel() {
  return (
    <SidebarPanel
      className="tags-panel"
      title="标签"
      fadeToolbar={(
        <>
          <Tooltip content="搜索" relationship="label">
            <ToolbarButton
              aria-label="Search"
              appearance="subtle"
              icon={<SearchRegular />}
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
    >
      <KeepAlive name="tags-panel" cacheKey="tags-panel">
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
      </KeepAlive>
    </SidebarPanel>
  )
}
