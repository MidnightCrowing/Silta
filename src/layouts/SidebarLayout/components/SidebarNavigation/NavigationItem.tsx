import type { MenuProps } from '@fluentui/react-components'
import { Menu, MenuDivider, MenuItemCheckbox, MenuList, MenuPopover, ToggleButton, Tooltip } from '@fluentui/react-components'
import { bundleIcon, GridFilled, GridRegular } from '@fluentui/react-icons'
import type { MouseEvent } from 'react'
import { useState } from 'react'

import { MovePanelMenu } from '../SidebarPanelMenu'
import type { NavigationItemProps } from './SidebarNavigation.types.ts'

const DefaultSidebarIcon = bundleIcon(GridFilled, GridRegular)

export function NavigationItem({ itemPosition, item, checked, onClick, setItemPosition }: NavigationItemProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const { label, icon: Icon = DefaultSidebarIcon } = item

  const handleContextMenu = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setAnchorEl(e.currentTarget)
    setMenuOpen(true)
  }

  const onOpenChange: MenuProps['onOpenChange'] = (_e, data) => {
    setMenuOpen(data.open)
  }

  return (
    <>
      <Tooltip content={label} relationship="label" positioning="after" withArrow>
        <ToggleButton
          checked={checked}
          icon={<Icon />}
          appearance="subtle"
          onClick={onClick}
          onContextMenu={handleContextMenu}
        />
      </Tooltip>

      <Menu
        hasCheckmarks
        open={menuOpen}
        onOpenChange={onOpenChange}
        positioning={{ target: anchorEl }}
      >
        <MenuPopover>
          <MenuList>
            <MovePanelMenu position={itemPosition} setPosition={setItemPosition} />
            <MenuDivider />

            <MenuItemCheckbox name="showToolWindowName" value="showToolWindowName">
              显示工具窗口名称
            </MenuItemCheckbox>
          </MenuList>
        </MenuPopover>
      </Menu>
    </>
  )
}
