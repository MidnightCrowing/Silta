import { Button, Tooltip } from '@fluentui/react-components'
import {
  ArrowClockwise20Regular,
  ArrowClockwiseDashes20Regular,
  ArrowLeft20Regular,
  ArrowRight20Regular,
  History20Regular,
} from '@fluentui/react-icons'
import { useEffect, useMemo, useState } from 'react'

import AddressBar from './AddressBar.tsx'
import type {
  BackButtonProps,
  ForwardButtonProps,
  RefreshButtonProps,
  TabToolbarProps,
} from './TabToolbar.types'

function BackButton({ activeItemId, activeItem, updatePageData }: BackButtonProps) {
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

  return (
    <Tooltip content="返回" relationship="label" positioning="below">
      <Button appearance="subtle" disabled={!isBack} icon={<ArrowLeft20Regular />} onClick={setBack} />
    </Tooltip>
  )
}

function ForwardButton({ activeItemId, activeItem, updatePageData }: ForwardButtonProps) {
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

  return (
    isForward && (
      <Tooltip content="前进" relationship="label" positioning="below">
        <Button appearance="subtle" icon={<ArrowRight20Regular />} onClick={setForward} />
      </Tooltip>
    )
  )
}

function RefreshButton({ refreshPage }: RefreshButtonProps) {
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false)

  useEffect(() => {
    if (isRefreshing) {
      const timer = setTimeout(() => {
        setIsRefreshing(false)
      }, 300)

      return () => clearTimeout(timer)
    }
  }, [isRefreshing])

  const handleRefresh = () => {
    setIsRefreshing(true)
    refreshPage()
  }

  const RefreshIcon = isRefreshing
    ? <ArrowClockwiseDashes20Regular className="animate-(spin duration-300)" />
    : <ArrowClockwise20Regular />

  return (
    <Tooltip content="刷新" relationship="label" positioning="below">
      <Button
        appearance="subtle"
        icon={RefreshIcon}
        onClick={handleRefresh}
      />
    </Tooltip>
  )
}

function HistoryButton() {
  return (
    <Tooltip content="历史记录" relationship="label" positioning="below">
      <Button appearance="subtle" icon={<History20Regular />} />
    </Tooltip>
  )
}

export function TabToolbar({ activeItemId, activeItem, updatePageData, refreshPage }: TabToolbarProps) {
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
