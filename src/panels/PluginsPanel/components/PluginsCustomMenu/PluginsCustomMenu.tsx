import type { MenuProps } from '@fluentui/react-components'
import { Menu, MenuItem, MenuItemCheckbox, MenuList, MenuPopover, MenuTrigger } from '@fluentui/react-components'
import { useState } from 'react'

import type { AccordionItem } from '../../PluginsPanel.types.ts'
import type { PluginsCustomMenuProps, ViewMenuProps } from './PluginsCustomMenu.types.ts'

function ViewMenu({ initialVisibleItems, onVisibleItemsChange }: ViewMenuProps) {
  const [selectedItems, setSelectedItems] = useState<AccordionItem[]>(initialVisibleItems)

  const onChange: MenuProps['onCheckedValueChange'] = (_e, { checkedItems }) => {
    setSelectedItems(checkedItems as AccordionItem[])
    onVisibleItemsChange(checkedItems as AccordionItem[])
  }

  return (
    <Menu
      checkedValues={{ viewOptions: selectedItems }}
      onCheckedValueChange={onChange}
    >
      <MenuTrigger disableButtonEnhancement>
        <MenuItem>视图</MenuItem>
      </MenuTrigger>

      <MenuPopover>
        <MenuList>
          <MenuItemCheckbox name="viewOptions" value="Enabled">已启用</MenuItemCheckbox>
          <MenuItemCheckbox name="viewOptions" value="Disabled">已禁用</MenuItemCheckbox>
          <MenuItemCheckbox name="viewOptions" value="Installed">已安装</MenuItemCheckbox>
        </MenuList>
      </MenuPopover>
    </Menu>
  )
}

export function PluginsCustomMenu({ visibleItems, setVisibleItems }: PluginsCustomMenuProps) {
  return (
    <ViewMenu
      initialVisibleItems={visibleItems}
      onVisibleItemsChange={setVisibleItems}
    />
  )
}
