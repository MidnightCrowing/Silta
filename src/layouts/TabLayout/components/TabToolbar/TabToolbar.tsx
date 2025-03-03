import { Button, Text, Tooltip } from '@fluentui/react-components'
import {
  ArrowClockwise20Regular,
  ArrowClockwiseDashes20Regular,
  ArrowLeft20Regular,
  ArrowRight20Regular,
  History20Regular,
  LockOpen16Regular,
} from '@fluentui/react-icons'
import type { ClipboardEvent, KeyboardEvent } from 'react'
import { useEffect, useRef, useState } from 'react'
import type { createRoot } from 'react-dom/client'

import { generateUrlFromTabItem, parseUrl } from '~/utils/common'

import type {
  BackButtonProps,
  ForwardButtonProps,
  RefreshButtonProps,
  TabToolbarProps,
  UrlInputProps,
} from './TabToolbar.types'

function BackButton({ isBack, setBack }: BackButtonProps) {
  return (
    <Tooltip content="返回" relationship="label" positioning="below">
      <Button appearance="subtle" disabled={!isBack} icon={<ArrowLeft20Regular />} onClick={setBack} />
    </Tooltip>
  )
}

function ForwardButton({ isForward, setForward }: ForwardButtonProps) {
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

function UrlInputLockButton() {
  return (
    <Tooltip content="查看站点信息" relationship="label" positioning="below">
      <Button appearance="subtle" size="small" shape="circular" icon={<LockOpen16Regular />} />
    </Tooltip>
  )
}

function UrlInput({ activeItem }: UrlInputProps) {
  const [url, setUrl] = useState<string>('')
  const [parsedUrl, setParsedUrl] = useState<React.ReactNode>('')
  const divRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (activeItem) {
      const newUrl = generateUrlFromTabItem(activeItem)
      setUrl(newUrl)
    }
  }, [activeItem])

  // 解析 URL，并返回带颜色的 HTML
  const parseUrlToHtml = (url: string): React.ReactNode => {
    try {
      const { origin, search } = parseUrl(url)
      return (
        <>
          <span className="text-$colorNeutralForeground1 flex-shrink-0">{origin}</span>
          <span className="text-$colorNeutralForeground3 truncate">{search}</span>
        </>
      )
    }
    catch {
      return (
        <Text className="text-$colorNeutralForeground3 line-clamp-1!">{url}</Text>
      ) // 非法 URL 显示灰色
    }
  }

  useEffect(() => {
    setParsedUrl(parseUrlToHtml(url))
  }, [url]) // 监听 URL 变化

  // 处理输入
  const handleBlur = () => {
    if (!divRef.current)
      return
    // 获取纯文本，避免 HTML 注入
    setUrl(divRef.current.textContent || '')
  }

  // 处理按下Enter事件，阻止换行
  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault() // 阻止默认换行行为
      if (!divRef.current)
        return
      // 获取纯文本，避免 HTML 注入
      setUrl(divRef.current.textContent || '')
    }
  }

  // 处理获取焦点时选中所有文本
  // const handleFocus = () => {
  //   if (divRef.current) {
  //     const range = document.createRange()
  //     const selection = window.getSelection()
  //     range.selectNodeContents(divRef.current) // 选中所有内容
  //     if (selection) {
  //       selection.removeAllRanges() // 移除所有选区
  //       selection.addRange(range) // 添加新的选区
  //     }
  //   }
  // }

  // 处理粘贴事件，防止插入 HTML
  const handlePaste = (event: ClipboardEvent<HTMLDivElement>) => {
    event.preventDefault()
    const pastedText = event.clipboardData.getData('text/plain') // 仅获取纯文本
    document.execCommand('insertText', false, pastedText) // 插入纯文本
  }

  return (
    <div
      grow
      h-full
      p="l-6px r-3px y-2px"
      box-border
      border="solid 0.5px $colorNeutralStroke2 hover:$colorNeutralStroke1Hover"
      rounded-full
      bg="$colorNeutralBackground3 hover:$colorNeutralBackground3Hover"
      transition="colors duration-100 ease-in"
      flex="~ row items-center nowrap"
      gap="3px"
      overflow-hidden
    >
      <UrlInputLockButton />
      <div
        ref={divRef}
        contentEditable
        grow
        inline-flex="~ items-center justify-start"
        truncate
        outline-0
        whitespace-nowrap
        onBlur={handleBlur} // 在失去焦点时更新
        onKeyDown={handleKeyDown} // 按下 Enter 时更新
        // onFocus={handleFocus} // 获取焦点时选中所有文本
        onPaste={handlePaste} // 处理粘贴事件
        suppressContentEditableWarning
      >
        {parsedUrl}
      </div>
    </div>
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
  activeItem,
  refreshPage,
  isBack,
  isForward,
  locationBack,
  locationForward,
}: TabToolbarProps) {
  return (
    <div className="TabLayout TabToolbar" w-full flex="~ items-center" gap="5px" p="x-5px y-3px" box-border>
      <BackButton isBack={isBack} setBack={locationBack} />
      <ForwardButton isForward={isForward} setForward={locationForward} />
      <RefreshButton refreshPage={refreshPage} />
      <UrlInput activeItem={activeItem} />
      <HistoryButton />
    </div>
  )
}
