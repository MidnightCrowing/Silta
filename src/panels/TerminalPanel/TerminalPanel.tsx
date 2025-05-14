import { Tab, TabList, Textarea } from '@fluentui/react-components'
import { forwardRef, useImperativeHandle } from 'react'

import type { SidebarPanelRef } from '~/layouts/SidebarLayout'

const TerminalPanel = forwardRef<SidebarPanelRef>((_props, ref) => {
  // 向外暴露方法
  useImperativeHandle(ref, () => ({
    customStaticToolbar() {
      return (
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
      )
    },
  }))

  return (
    <Textarea
      className="size-full"
      appearance="filled-darker"
    />
  )
})

export default TerminalPanel
