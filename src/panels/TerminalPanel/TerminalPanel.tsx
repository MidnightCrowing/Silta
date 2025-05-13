import { Tab, TabList, Textarea } from '@fluentui/react-components'
import { forwardRef, useImperativeHandle } from 'react'

import type { SidebarPanelRef } from '~/layouts/SidebarLayout'

const TerminalPanel = forwardRef<SidebarPanelRef>((_props, ref) => {
  // 向外暴露方法
  useImperativeHandle(ref, () => ({}))

  return (
    <div size-full flex="~ col">
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
      <Textarea
        className="grow"
        appearance="filled-darker"
      />
    </div>
  )
})

export default TerminalPanel
