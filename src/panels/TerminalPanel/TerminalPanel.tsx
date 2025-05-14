import { Tab, TabList, Textarea } from '@fluentui/react-components'

import type { SidebarPanelPropsBase } from '~/layouts'
import { SidebarPanel } from '~/layouts'

export default function TerminalPanel({ ...props }: SidebarPanelPropsBase) {
  return (
    <SidebarPanel
      title="文件"
      staticToolbar={(
        <TabList
          appearance="subtle"
          size="small"
          defaultSelectedValue="tab1"
        >
          <Tab value="tab1">First Tab</Tab>
          <Tab value="tab2">Second Tab</Tab>
          <Tab value="tab3">Third Tab</Tab>
          <Tab value="tab4">Fourth Tab</Tab>
        </TabList>
      )}
      {...props}
    >
      <Textarea
        className="size-full"
        appearance="filled-darker"
      />
    </SidebarPanel>
  )
}
