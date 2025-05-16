import type { SelectTabData, SelectTabEvent } from '@fluentui/react-components'
import { Tab, TabList, Textarea } from '@fluentui/react-components'
import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { SidebarPanel } from '~/layouts'
import type { RootState } from '~/store'

import { setTabSelect } from './terminalPanelSlice'

export default function TerminalPanel() {
  const dispatch = useDispatch()
  const { tabSelect } = useSelector((state: RootState) => state.terminalPanel)

  const handleTabSelect = useCallback((_event: SelectTabEvent, data: SelectTabData) => {
    dispatch(setTabSelect(data.value as string))
  }, [dispatch])

  return (
    <SidebarPanel
      title="终端"
      staticToolbar={(
        <TabList
          appearance="subtle"
          size="small"
          selectedValue={tabSelect}
          onTabSelect={handleTabSelect}
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
