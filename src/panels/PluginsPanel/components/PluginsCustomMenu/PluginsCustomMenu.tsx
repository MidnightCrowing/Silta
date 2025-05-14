import type { MenuProps } from '@fluentui/react-components'
import { Menu, MenuItem, MenuItemCheckbox, MenuList, MenuPopover, MenuTrigger } from '@fluentui/react-components'

import type { AccordionItem } from '../../PluginsPanel.types.ts'
import type { PluginsCustomMenuProps, ViewMenuProps } from './PluginsCustomMenu.types.ts'

function ViewMenu({ visibleItems, setVisibleItems }: ViewMenuProps) {
  const onChange: MenuProps['onCheckedValueChange'] = (_e, { checkedItems }) => {
    setVisibleItems(checkedItems as AccordionItem[])
  }

  return (
    <Menu
      checkedValues={{ viewOptions: visibleItems }}
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
      visibleItems={visibleItems}
      setVisibleItems={setVisibleItems}
    />
  )
}
