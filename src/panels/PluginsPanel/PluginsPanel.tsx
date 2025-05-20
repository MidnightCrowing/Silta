import type { AccordionToggleEventHandler, SelectionItemId } from '@fluentui/react-components'
import { Accordion, Divider } from '@fluentui/react-components'
import { useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { plugins } from '~/constants/plugins.ts'
import { SidebarPanel } from '~/layouts'
import type { RootState } from '~/store'

import { CustomAccordionItem, PluginCard, PluginsCustomMenu } from './components'
import type { AccordionItem } from './PluginsPanel.types.ts'
import { setOpenItems, setVisibleItems } from './pluginsPanelSlice.ts'

export default function PluginsPanel() {
  const dispatch = useDispatch()
  const { visibleItems, openItems } = useSelector((state: RootState) => state.pluginsPanel)

  // 延迟应用的打开状态（用于控制布局伸缩动画）
  const [committedOpenItems, setCommittedOpenItems] = useState<AccordionItem[]>(openItems)

  const handleSetVisibleItems = useCallback((newItems: AccordionItem[]) => {
    dispatch(setVisibleItems(newItems))
  }, [dispatch])

  // 延迟同步 committedOpenItems，以配合 flex-1 动画
  const handleAccordionToggle = useCallback<AccordionToggleEventHandler<AccordionItem>>((_, data) => {
    dispatch(setOpenItems(data.openItems))
    setTimeout(() => setCommittedOpenItems(data.openItems), 100)
  }, [dispatch])

  const enabledPlugins = plugins.filter(item => item.isEnabled)
  const disabledPlugins = plugins.filter(item => !item.isEnabled)

  // 选中项
  const [selectedItems, setSelectedItems] = useState<SelectionItemId[]>([])
  const onSelectedItem = useCallback((value: SelectionItemId) => {
    setSelectedItems([value])
  }, [])

  return (
    <SidebarPanel
      title="插件"
      customMenu={<PluginsCustomMenu visibleItems={visibleItems} setVisibleItems={handleSetVisibleItems} />}
    >
      <Accordion
        className="h-full flex-(~ col) overflow-hidden"
        multiple
        collapsible
        openItems={openItems}
        onToggle={handleAccordionToggle}
      >
        {visibleItems.includes('Enabled') && (
          <CustomAccordionItem
            value="Enabled"
            title="已启用"
            count={enabledPlugins.length}
            committedOpenItems={committedOpenItems}
          >
            {enabledPlugins.map(item => (
              <PluginCard
                key={item.id}
                item={item}
                isSelect={selectedItems.includes(item.id)}
                onSelectedItem={() => {
                  onSelectedItem(item.id)
                }}
              />
            ))}
          </CustomAccordionItem>
        )}

        {['Enabled', 'Disabled'].every(item => visibleItems.includes(item as AccordionItem)) && (
          <Divider className="grow-0!" />
        )}

        {visibleItems.includes('Disabled') && (
          <CustomAccordionItem
            value="Disabled"
            title="已禁用"
            count={disabledPlugins.length}
            committedOpenItems={committedOpenItems}
          >
            {disabledPlugins.map(item => (
              <PluginCard
                key={item.id}
                item={item}
                isSelect={selectedItems.includes(item.id)}
                onSelectedItem={() => { onSelectedItem(item.id) }}
              />
            ))}
          </CustomAccordionItem>
        )}

        {['Disabled', 'Installed'].every(item => visibleItems.includes(item as AccordionItem)) && (
          <Divider className="grow-0!" />
        )}

        {visibleItems.includes('Installed') && (
          <CustomAccordionItem
            value="Installed"
            title="已安装"
            count={plugins.length}
            committedOpenItems={committedOpenItems}
          >
            {plugins.map(item => (
              <PluginCard
                key={item.id}
                item={item}
                isSelect={selectedItems.includes(item.id)}
                onSelectedItem={() => { onSelectedItem(item.id) }}
              />
            ))}
          </CustomAccordionItem>
        )}
      </Accordion>
    </SidebarPanel>
  )
}
