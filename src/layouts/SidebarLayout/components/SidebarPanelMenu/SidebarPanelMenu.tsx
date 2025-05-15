import type { MenuProps } from '@fluentui/react-components'
import {
  Menu,
  MenuDivider,
  MenuItem,
  MenuItemCheckbox,
  MenuList,
  MenuPopover,
  MenuTrigger,
  ToolbarButton,
  Tooltip,
} from '@fluentui/react-components'
import {
  LayoutRowTwoSplitBottomFocusBottomLeftFilled,
  LayoutRowTwoSplitBottomFocusBottomRightFilled,
  LayoutRowTwoSplitTopFocusTopLeftFilled,
  LayoutRowTwoSplitTopFocusTopRightFilled,
  MoreVertical24Regular,
} from '@fluentui/react-icons'
import { useCallback, useMemo } from 'react'

import { useSidebarPanelWrapperContext } from '../SidebarPanelWrapper'
import type { SidebarPanelMenuProps } from './SidebarPanelMenu.types.ts'

function MovePanelMenu() {
  const { position, setPosition } = useSidebarPanelWrapperContext()

  return (
    <Menu hasIcons>
      <MenuTrigger disableButtonEnhancement>
        <MenuItem>移至</MenuItem>
      </MenuTrigger>

      <MenuPopover>
        <MenuList>
          <MenuItem
            icon={<LayoutRowTwoSplitTopFocusTopLeftFilled />}
            disabled={position === 'leftTop'}
            onClick={() => setPosition('leftTop')}
          >
            左侧 顶部
          </MenuItem>
          <MenuItem
            icon={<LayoutRowTwoSplitBottomFocusBottomLeftFilled />}
            disabled={position === 'leftBottom'}
            onClick={() => setPosition('leftBottom')}
          >
            底部 左侧
          </MenuItem>
          <MenuItem
            icon={<LayoutRowTwoSplitBottomFocusBottomRightFilled />}
            disabled={position === 'rightBottom'}
            onClick={() => setPosition('rightBottom')}
          >
            底部 右侧
          </MenuItem>
          <MenuItem
            icon={<LayoutRowTwoSplitTopFocusTopRightFilled />}
            disabled={position === 'rightTop'}
            onClick={() => setPosition('rightTop')}
          >
            右侧 顶部
          </MenuItem>
        </MenuList>
      </MenuPopover>
    </Menu>
  )
}

function ResizePanelMenu() {
  const { position } = useSidebarPanelWrapperContext()

  const isBottom: boolean = useMemo(() => {
    return position === 'leftBottom' || position === 'rightBottom'
  }, [position])

  return (
    <Menu>
      <MenuTrigger disableButtonEnhancement>
        <MenuItem>调整大小</MenuItem>
      </MenuTrigger>

      <MenuPopover>
        <MenuList>
          <MenuItem disabled={isBottom}>向左侧移动</MenuItem>
          <MenuItem disabled={isBottom}>向右侧移动</MenuItem>
          <MenuItem disabled={!isBottom}>向顶部移动</MenuItem>
          <MenuItem disabled={!isBottom}>向底部移动</MenuItem>
          <MenuItem>最大化工具窗口</MenuItem>
        </MenuList>
      </MenuPopover>
    </Menu>
  )
}

export function SidebarPanelMenu({ customMenu }: SidebarPanelMenuProps) {
  const { isFadeTopbarPinned, setFadeTopbarPinned } = useSidebarPanelWrapperContext()

  const onChange: MenuProps['onCheckedValueChange'] = useCallback((_e: any, { name, checkedItems }: any) => {
    if (name === 'alwaysVisible') {
      setFadeTopbarPinned(checkedItems.includes('always'))
    }
  }, [setFadeTopbarPinned])

  return (
    <Menu
      checkedValues={{ alwaysVisible: isFadeTopbarPinned ? ['always'] : [] }}
      onCheckedValueChange={onChange}
      hasCheckmarks
    >
      <MenuTrigger disableButtonEnhancement>
        <Tooltip content="选项" relationship="label">
          <ToolbarButton
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

          <MenuItemCheckbox name="alwaysVisible" value="always">
            始终显示工具栏
          </MenuItemCheckbox>
        </MenuList>
      </MenuPopover>
    </Menu>
  )
}
