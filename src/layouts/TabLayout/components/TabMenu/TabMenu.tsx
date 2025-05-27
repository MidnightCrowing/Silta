import type { SelectionItemId } from '@fluentui/react-components'
import {
  List,
  ListItem,
  Menu,
  MenuDivider,
  MenuItem,
  MenuList,
  MenuPopover,
  MenuTrigger,
  Popover,
  PopoverSurface,
  Text,
} from '@fluentui/react-components'
import {
  CopyRegular,
  DismissRegular,
  PinOffRegular,
  PinRegular,
  TabDesktop20Regular,
  TabDesktopCopyRegular,
  WindowConsoleRegular,
} from '@fluentui/react-icons'
import type { SyntheticEvent } from 'react'
import { useCallback, useState } from 'react'

import { TabPageEnum } from '~/constants/tabPage'
import { generateUrlFromTabItem, parseUrlToComponentData } from '~/utils/urlUtils'

import { pushTabItemUrl } from '../../shared/TabItem.util'
import type { OpenAsPopoverProps, TabMenuProps } from './TabMenu.types.ts'

// 打开为其他页面类型
function OpenAsPopover({ anchorEl, open, setOpen, tabId, item, updatePageData }: OpenAsPopoverProps) {
  const { history, historyIndex } = item
  const { name, props } = parseUrlToComponentData(history[historyIndex].url)

  const [selectedItems, setSelectedItems] = useState<TabPageEnum[]>(
    [name === TabPageEnum.NewPage ? TabPageEnum.SearchPage : name],
  )

  const onSelectionChange = useCallback(
    (_: SyntheticEvent | Event, data: { selectedItems: SelectionItemId[] }) => {
      const selected = data.selectedItems as TabPageEnum[]
      const [newName] = selected
      setSelectedItems(selected)
      if (newName) {
        const newUrl = generateUrlFromTabItem({ name: newName, props })
        updatePageData(tabId, old => pushTabItemUrl(old, newUrl))
      }
      setOpen(false)
    },
    [props, setOpen, tabId, updatePageData],
  )

  return (
    <Popover
      appearance="inverted"
      size="small"
      withArrow
      open={open}
      onOpenChange={(_event, data) => setOpen(data.open)}
      positioning={{ position: 'below', align: 'center', target: anchorEl }}
    >
      <PopoverSurface tabIndex={-1}>
        <div flex="~ col items-stretch">
          <Text className="m-b-5px" weight="semibold" align="center">选择页面类型</Text>

          <div max-h="500px" overflow-auto>
            <List
              className="flex-(~ col) gap-2px"
              selectionMode="single"
              selectedItems={selectedItems}
              onSelectionChange={onSelectionChange}
            >
              {Object.entries(TabPageEnum)
                .filter(([key]) => key !== 'NewPage')
                .map(([key, value]) => (
                  <ListItem
                    key={key}
                    value={value}
                    className={`flex-(~ row items-center) gap-3px p-(l-3px! r-5px! y-3px!) rounded-3px ${
                      selectedItems.includes(value)
                        ? 'bg-$colorBrandBackground'
                        : 'hover:bg-$colorBrandBackground-60'
                    }`}
                    data-value={value}
                    aria-label={value}
                    checkmark={null}
                  >
                    <TabDesktop20Regular />
                    <Text>{value}</Text>
                  </ListItem>
                ))}
            </List>
          </div>
        </div>
      </PopoverSurface>
    </Popover>
  )
}

// 打开于
function OpenInSubMenu() {
  return (
    <Menu hasIcons>
      <MenuTrigger disableButtonEnhancement>
        <MenuItem>打开于</MenuItem>
      </MenuTrigger>
      <MenuPopover>
        <MenuList>
          <MenuItem>文件资源管理器</MenuItem>
          <MenuItem icon={<WindowConsoleRegular />}>终端</MenuItem>
        </MenuList>
      </MenuPopover>
    </Menu>
  )
}

export function TabMenu({
  menuOpen,
  onOpenChange,
  anchorEl,
  tabId,
  item,
  addItem,
  removeItem,
  allTabIds,
  updatePageData,
}: TabMenuProps) {
  const [openPopover, setOpenPopover] = useState<boolean>(false)
  const { isPinned } = item

  const closeTab = () => {
    if (isPinned) {
      return
    }
    removeItem((items) => {
      const { [tabId]: _, ...rest } = items
      return rest
    })
  }

  const closeOtherTabs = () => {
    removeItem((items) => {
      const newItems: typeof items = {}
      Object.keys(items).forEach((id) => {
        if ((id === tabId || items[id].isPinned)) {
          newItems[id] = items[id]
        }
      })
      return newItems
    })
  }

  const closeLeftTabs = () => {
    removeItem((items) => {
      const newItems: typeof items = {}
      allTabIds?.forEach((id) => {
        if (
          (id === tabId || items[id].isPinned)
          || allTabIds.indexOf(id) > allTabIds.indexOf(tabId)
        ) {
          newItems[id] = items[id]
        }
      })
      return newItems
    })
  }

  const closeRightTabs = () => {
    removeItem((items) => {
      const newItems: typeof items = {}
      allTabIds?.forEach((id) => {
        if (
          (id === tabId || items[id].isPinned)
          || allTabIds.indexOf(id) < allTabIds.indexOf(tabId)
        ) {
          newItems[id] = items[id]
        }
      })
      return newItems
    })
  }

  const closeAllTabs = () => {
    removeItem((items) => {
      const newItems: typeof items = {}
      Object.keys(items).forEach((id) => {
        if (items[id].isPinned) {
          newItems[id] = items[id]
        }
      })
      return newItems
    })
  }

  const copyTab = () => {
    const newTab = { ...item, showAddAnimation: undefined, isPinned: undefined }
    const currentIndex = allTabIds?.indexOf(tabId) ?? -1
    addItem(newTab, true, currentIndex >= 0 ? currentIndex + 1 : undefined)
  }

  const pinTab = () => {
    updatePageData(tabId, old => ({ ...old, isPinned: !old.isPinned }))
  }

  return (
    <>
      <Menu
        hasIcons
        open={menuOpen}
        onOpenChange={onOpenChange}
        positioning={{ position: 'below', align: 'start', target: anchorEl }}
      >
        <MenuPopover>
          <MenuList>
            {/* 标签页操作 */}
            <MenuItem
              icon={<DismissRegular />}
              onClick={closeTab}
              disabled={isPinned}
              aria-label="关闭"
            >
              关闭
            </MenuItem>
            <MenuItem
              onClick={closeOtherTabs}
              disabled={allTabIds?.length === 1}
              aria-label="关闭其他"
            >
              关闭其他
            </MenuItem>
            <MenuItem
              onClick={closeLeftTabs}
              disabled={!allTabIds || allTabIds.indexOf(tabId) === 0}
              aria-label="关闭左侧标签页"
            >
              关闭左侧标签页
            </MenuItem>
            <MenuItem
              onClick={closeRightTabs}
              disabled={!allTabIds || allTabIds.indexOf(tabId) === allTabIds.length - 1}
              aria-label="关闭右侧标签页"
            >
              关闭右侧标签页
            </MenuItem>
            <MenuItem
              onClick={closeAllTabs}
              aria-label="全部关闭"
            >
              全部关闭
            </MenuItem>

            <MenuDivider />

            <MenuItem
              icon={<TabDesktopCopyRegular />}
              onClick={copyTab}
              aria-label="复制标签页"
            >
              复制标签页
            </MenuItem>
            <MenuItem
              icon={isPinned ? <PinOffRegular /> : <PinRegular />}
              onClick={pinTab}
              aria-label={isPinned ? '取消固定标签页' : '固定标签页'}
            >
              <Text>{isPinned ? '取消固定标签页' : '固定标签页'}</Text>
            </MenuItem>
            <MenuItem
              onClick={() => setOpenPopover(true)}
              aria-label="以其他页面类型打开"
            >
              以其他页面类型打开
            </MenuItem>

            {false && (
              <>
                <MenuDivider />

                <MenuItem icon={<CopyRegular />}>复制路径</MenuItem>
                <OpenInSubMenu />
              </>
            )}
          </MenuList>
        </MenuPopover>
      </Menu>

      <OpenAsPopover
        anchorEl={anchorEl}
        open={openPopover}
        setOpen={setOpenPopover}
        tabId={tabId}
        item={item}
        updatePageData={updatePageData}
      />
    </>
  )
}
