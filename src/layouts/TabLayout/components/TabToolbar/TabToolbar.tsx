import './TabToolbar.scss'

import type { MenuProps } from '@fluentui/react-components'
import { Button, Menu, MenuDivider, MenuItem, MenuList, MenuPopover, Tooltip } from '@fluentui/react-components'
import {
  ArrowClockwise20Regular,
  ArrowClockwiseDashes20Regular,
  ArrowLeft20Regular,
  ArrowRight20Regular,
  History20Regular,
} from '@fluentui/react-icons'
import type { MouseEvent } from 'react'
import { useEffect, useMemo, useState } from 'react'

import { DefaultTabIcon } from '../SortableTab'
import { AddressBar } from './AddressBar.tsx'
import type { BackButtonProps, ForwardButtonProps, RefreshButtonProps, TabToolbarProps } from './TabToolbar.types'

function BackButton({ activeItemId, activeItem, updatePageData }: BackButtonProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)

  const isBack: boolean = useMemo(
    () => activeItem ? activeItem.historyIndex > 0 : false,
    [activeItem],
  )

  const setBack = () => {
    updatePageData(activeItemId, old => ({
      ...old,
      historyIndex: Math.max(0, old.historyIndex - 1),
    }))
  }

  const handleContextMenu = (e: MouseEvent<HTMLButtonElement>) => {
    if (isBack) {
      e.preventDefault()
      setAnchorEl(e.currentTarget)
      setMenuOpen(true)
    }
  }

  const onOpenChange: MenuProps['onOpenChange'] = (_e, data) => {
    setMenuOpen(data.open)
  }

  return (
    <>
      <Tooltip content="返回" relationship="label" positioning="below">
        <Button
          appearance="subtle"
          icon={<ArrowLeft20Regular />}
          onClick={setBack}
          onContextMenu={handleContextMenu}
          disabled={!isBack}
        />
      </Tooltip>

      <Menu
        hasIcons
        open={menuOpen}
        onOpenChange={onOpenChange}
        positioning={{ target: anchorEl }}
      >
        <MenuPopover>
          <MenuList>
            {activeItem?.history
              ?.slice(
                Math.max(0, activeItem.historyIndex - 10),
                activeItem.historyIndex,
              )
              .reverse()
              .map(({ title, icon: Icon = DefaultTabIcon }, idx) => (
                <MenuItem
                  className="tab-layout tab-toolbar back-button-menu menu-item"
                  key={`${title}-${idx.toString()}`}
                  icon={<Icon />}
                  onClick={() => {
                    updatePageData(activeItemId, old => ({
                      ...old,
                      historyIndex: activeItem.historyIndex - 1 - idx,
                    }))
                  }}
                >
                  {title}
                </MenuItem>
              ))}

            <MenuDivider />
            <MenuItem
              icon={<History20Regular />}
            >
              管理历史记录
            </MenuItem>
          </MenuList>
        </MenuPopover>
      </Menu>
    </>
  )
}

function ForwardButton({ activeItemId, activeItem, updatePageData }: ForwardButtonProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)

  const isForward: boolean = useMemo(
    () => activeItem ? activeItem.historyIndex < activeItem.history.length - 1 : false,
    [activeItem],
  )

  const setForward = () => {
    updatePageData(activeItemId, old => ({
      ...old,
      historyIndex: Math.min(old.history.length - 1, old.historyIndex + 1),
    }))
  }

  const handleContextMenu = (e: MouseEvent<HTMLButtonElement>) => {
    if (isForward) {
      e.preventDefault()
      setAnchorEl(e.currentTarget)
      setMenuOpen(true)
    }
  }

  const onOpenChange: MenuProps['onOpenChange'] = (_e, data) => {
    setMenuOpen(data.open)
  }

  return (
    isForward && (
      <>
        <Tooltip content="前进" relationship="label" positioning="below">
          <Button
            appearance="subtle"
            icon={<ArrowRight20Regular />}
            onClick={setForward}
            onContextMenu={handleContextMenu}
            disabled={!isForward}
          />
        </Tooltip>

        <Menu
          hasIcons
          open={menuOpen}
          onOpenChange={onOpenChange}
          positioning={{ target: anchorEl }}
        >
          <MenuPopover>
            <MenuList>
              {activeItem?.history
                ?.slice(activeItem.historyIndex + 1, activeItem.historyIndex + 11)
                .map(({ title, icon: Icon = DefaultTabIcon }, idx) => (
                  <MenuItem
                    className="tab-layout tab-toolbar forward-button-menu menu-item"
                    key={`${title}-${idx.toString()}`}
                    icon={<Icon />}
                    onClick={() => {
                      updatePageData(activeItemId, old => ({
                        ...old,
                        historyIndex: activeItem.historyIndex + 1 + idx,
                      }))
                    }}
                  >
                    {title}
                  </MenuItem>
                ))}

              <MenuDivider />
              <MenuItem
                icon={<History20Regular />}
              >
                管理历史记录
              </MenuItem>
            </MenuList>
          </MenuPopover>
        </Menu>
      </>
    )
  )
}

function RefreshButton({ refreshPage }: RefreshButtonProps) {
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)

  useEffect(() => {
    if (!isRefreshing)
      return
    const timer = setTimeout(() => setIsRefreshing(false), 300)
    return () => clearTimeout(timer)
  }, [isRefreshing])

  const triggerRefresh = (clearCache: boolean) => {
    setIsRefreshing(true)
    refreshPage(clearCache)
    setMenuOpen(false)
  }

  const handleContextMenu = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setAnchorEl(e.currentTarget)
    setMenuOpen(true)
  }

  const onOpenChange: MenuProps['onOpenChange'] = (_e, data) => {
    setMenuOpen(data.open)
  }

  const RefreshIcon = isRefreshing
    ? <ArrowClockwiseDashes20Regular className="animate-(spin duration-300)" />
    : <ArrowClockwise20Regular />

  return (
    <>
      <Tooltip content="刷新" relationship="label" positioning="below">
        <Button
          appearance="subtle"
          icon={RefreshIcon}
          onClick={() => triggerRefresh(false)}
          onContextMenu={handleContextMenu}
        />
      </Tooltip>

      <Menu
        open={menuOpen}
        onOpenChange={onOpenChange}
        positioning={{ target: anchorEl }}
      >
        <MenuPopover>
          <MenuList>
            <MenuItem onClick={() => triggerRefresh(false)}>正常刷新</MenuItem>
            <MenuItem onClick={() => triggerRefresh(true)}>清空缓存并刷新</MenuItem>
          </MenuList>
        </MenuPopover>
      </Menu>
    </>
  )
}

function HistoryButton() {
  return (
    <Tooltip content="历史记录" relationship="label" positioning="below">
      <Button appearance="subtle" icon={<History20Regular />} />
    </Tooltip>
  )
}

export function TabToolbar({
  activeItemId,
  activeItem,
  updatePageData,
  refreshPage,
}: TabToolbarProps) {
  return (
    <div
      className="TabLayout TabToolbar @container"
      w-full
      flex="~ items-center"
      gap="5px"
      p="x-5px y-3px"
      box-border
    >
      <BackButton activeItemId={activeItemId} activeItem={activeItem} updatePageData={updatePageData} />
      <ForwardButton activeItemId={activeItemId} activeItem={activeItem} updatePageData={updatePageData} />
      <RefreshButton refreshPage={refreshPage} />
      <AddressBar activeItemId={activeItemId} activeItem={activeItem} updatePageData={updatePageData} />
      <HistoryButton />
    </div>
  )
}
