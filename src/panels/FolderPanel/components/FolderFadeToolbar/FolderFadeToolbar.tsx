import { ToolbarButton, ToolbarDivider, ToolbarToggleButton, Tooltip } from '@fluentui/react-components'
import { ChevronDownUpRegular, ChevronUpDownRegular, DocumentTargetRegular, SearchRegular } from '@fluentui/react-icons'

export function FolderFadeToolbar() {
  return (
    <>
      <Tooltip content="选择打开的文件" relationship="label">
        <ToolbarButton
          aria-label="Select open files"
          appearance="subtle"
          icon={<DocumentTargetRegular />}
        />
      </Tooltip>
      <ToolbarToggleButton
        aria-label="Search"
        appearance="subtle"
        icon={<SearchRegular />}
        name="showSearch"
        value="true"
      />
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
  )
}
