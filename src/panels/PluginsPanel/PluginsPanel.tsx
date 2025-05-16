import type { AccordionToggleEventHandler, SelectionItemId } from '@fluentui/react-components'
import { Accordion, Divider } from '@fluentui/react-components'
import { useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { SidebarPanel } from '~/layouts'
import type { RootState } from '~/store'

import { CustomAccordionItem, PluginCard, PluginsCustomMenu } from './components'
import type { AccordionItem } from './PluginsPanel.types.ts'
import { setOpenItems, setVisibleItems } from './pluginsPanelSlice.ts'
import type { PluginItemTypes } from './shared/PluginItem.types.ts'

const plugins: PluginItemTypes[] = [
  {
    id: '1',
    name: 'Plugin Alpha',
    description: 'Alpha plugin for testing',
    icon: 'alpha.png',
    version: '2.1.0',
    isEnabled: true,
  },
  {
    id: '2',
    name: 'Plugin Beta',
    description: 'Beta plugin with advanced features',
    icon: 'beta.png',
    version: '1.5.3',
    isEnabled: false,
  },
  {
    id: '3',
    name: 'Plugin Gamma',
    description: 'Gamma plugin for analytics',
    icon: 'gamma.png',
    version: '3.0.0',
    isEnabled: true,
  },
  {
    id: '4',
    name: 'Plugin Delta',
    description: 'Delta plugin for debugging',
    icon: 'delta.png',
    version: '1.2.1',
    isEnabled: false,
  },
  {
    id: '5',
    name: 'Plugin Epsilon',
    description: 'Epsilon plugin for optimization',
    icon: 'epsilon.png',
    version: '4.0.0',
    isEnabled: true,
  },
  {
    id: '6',
    name: 'Plugin Zeta',
    description: 'Zeta plugin for monitoring',
    icon: 'zeta.png',
    version: '1.0.0',
    isEnabled: false,
  },
  {
    id: '7',
    name: 'Plugin Eta',
    description: 'Eta plugin for security',
    icon: 'eta.png',
    version: '2.3.4',
    isEnabled: true,
  },
  {
    id: '8',
    name: 'Plugin Theta',
    description: 'Theta plugin for performance',
    icon: 'theta.png',
    version: '3.1.2',
    isEnabled: false,
  },
  {
    id: '9',
    name: 'Plugin Iota',
    description: 'Iota plugin for integration',
    icon: 'iota.png',
    version: '4.5.6',
    isEnabled: true,
  },
  {
    id: '10',
    name: 'Plugin Kappa',
    description: 'Kappa plugin for testing',
    icon: 'kappa.png',
    version: '1.0.1',
    isEnabled: false,
  },
  {
    id: '11',
    name: 'Plugin Lambda',
    description: 'Lambda plugin for automation',
    icon: 'lambda.png',
    version: '2.2.2',
    isEnabled: true,
  },
  {
    id: '12',
    name: 'Plugin Mu',
    description: 'Mu plugin for data processing',
    icon: 'mu.png',
    version: '3.3.3',
    isEnabled: false,
  },
  {
    id: '13',
    name: 'Plugin Nu',
    description: 'Nu plugin for visualization',
    icon: 'nu.png',
    version: '4.4.4',
    isEnabled: true,
  },
  {
    id: '14',
    name: 'Plugin Xi',
    description: 'Xi plugin for debugging',
    icon: 'xi.png',
    version: '1.1.1',
    isEnabled: false,
  },
  {
    id: '15',
    name: 'Plugin Omicron',
    description: 'Omicron plugin for analytics',
    icon: 'omicron.png',
    version: '2.0.0',
    isEnabled: true,
  },
  {
    id: '16',
    name: 'Plugin Pi',
    description: 'Pi plugin for optimization',
    icon: 'pi.png',
    version: '3.0.1',
    isEnabled: false,
  },
  {
    id: '17',
    name: 'Plugin Rho',
    description: 'Rho plugin for monitoring',
    icon: 'rho.png',
    version: '4.1.0',
    isEnabled: true,
  },
  {
    id: '18',
    name: 'Plugin Sigma',
    description: 'Sigma plugin for security',
    icon: 'sigma.png',
    version: '1.2.3',
    isEnabled: false,
  },
  {
    id: '19',
    name: 'Plugin Tau',
    description: 'Tau plugin for performance',
    icon: 'tau.png',
    version: '2.3.4',
    isEnabled: true,
  },
  {
    id: '20',
    name: 'Plugin Upsilon',
    description: 'Upsilon plugin for integration',
    icon: 'upsilon.png',
    version: '3.4.5',
    isEnabled: false,
  },
]

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
