import { Tab, TabList, Textarea } from '@fluentui/react-components'

import { SidebarPanel } from '~/layouts'

export default function TerminalPanel() {
  return (
    <SidebarPanel
      title="终端"
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
    >
      <Textarea
        className="size-full"
        appearance="filled-darker"
      />
    </SidebarPanel>
  )
}
