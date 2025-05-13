import { Menu, MenuButton, MenuDivider, MenuItem, MenuList, MenuPopover, MenuTrigger, Tooltip } from '@fluentui/react-components'
import {
  LayoutRowTwoSplitBottomFocusBottomLeftFilled,
  LayoutRowTwoSplitBottomFocusBottomRightFilled,
  LayoutRowTwoSplitTopFocusTopLeftFilled,
  LayoutRowTwoSplitTopFocusTopRightFilled,
  MoreVertical24Regular,
} from '@fluentui/react-icons'

import type { SidebarPanelMenuProps } from './SidebarPanelMenu.types.ts'

function MovePanelMenu() {
  return (
    <Menu hasIcons>
      <MenuTrigger disableButtonEnhancement>
        <MenuItem>移至</MenuItem>
      </MenuTrigger>

      <MenuPopover>
        <MenuList>
          <MenuItem icon={<LayoutRowTwoSplitTopFocusTopLeftFilled />} disabled>左侧 顶部</MenuItem>
          <MenuItem icon={<LayoutRowTwoSplitBottomFocusBottomLeftFilled />}>底部 左侧</MenuItem>
          <MenuItem icon={<LayoutRowTwoSplitBottomFocusBottomRightFilled />}>底部 右侧</MenuItem>
          <MenuItem icon={<LayoutRowTwoSplitTopFocusTopRightFilled />}>右侧 顶部</MenuItem>
        </MenuList>
      </MenuPopover>
    </Menu>
  )
}

function ResizePanelMenu() {
  return (
    <Menu>
      <MenuTrigger disableButtonEnhancement>
        <MenuItem>调整大小</MenuItem>
      </MenuTrigger>

      <MenuPopover>
        <MenuList>
          <MenuItem>向左侧移动</MenuItem>
          <MenuItem>向右侧移动</MenuItem>
          <MenuItem disabled>向顶部移动</MenuItem>
          <MenuItem disabled>向底部移动</MenuItem>
          <MenuItem>最大化工具窗口</MenuItem>
        </MenuList>
      </MenuPopover>
    </Menu>
  )
}

export function SidebarPanelMenu({ customMenu }: SidebarPanelMenuProps) {
  return (
    <Menu>
      <MenuTrigger disableButtonEnhancement>
        <Tooltip content="选项" relationship="label">
          <MenuButton
            aria-label="More options"
            appearance="subtle"
            icon={<MoreVertical24Regular />}
          />
        </Tooltip>
      </MenuTrigger>
      <MenuPopover>
        <MenuList>
          {customMenu && (
            <>
              {customMenu}
              <MenuDivider />
            </>
          )}
          <MovePanelMenu />
          <ResizePanelMenu />
        </MenuList>
      </MenuPopover>
    </Menu>
  )
}
