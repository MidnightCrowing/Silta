import { Button, Tooltip } from '@fluentui/react-components'
import { LockOpen16Regular } from '@fluentui/react-icons'
import type { KeyboardEvent } from 'react'
import { useEffect, useMemo, useRef, useState } from 'react'

import { pushTabItemUrl } from '~/layouts'

import type { AddressBarProps } from './TabToolbar.types.ts'
import { urlToHtmlParts } from './TabToolbar.util.tsx'

function LockButton() {
  return (
    <Tooltip content="查看站点信息" relationship="label" positioning="below">
      <Button appearance="subtle" size="small" shape="circular" icon={<LockOpen16Regular />} />
    </Tooltip>
  )
}

export function AddressBar({ activeItemId, activeItem, updatePageData }: AddressBarProps) {
  const [shouldRestoreCursor, setShouldRestoreCursor] = useState<boolean>(false)
  const [text, setText] = useState<string>('')
  const parsedUrl = useMemo(() => urlToHtmlParts(text), [text])

  const spanRef = useRef<HTMLSpanElement>(null)

  // 记录字符偏移
  const cursorOffsetRef = useRef<number>(0)

  useEffect(() => {
    if (activeItem) {
      const urlText: string = activeItem.history[activeItem.historyIndex].url
      setText(decodeURIComponent(urlText))
    }
  }, [activeItem])

  const handleInput = () => {
    const selection = window.getSelection()
    const span = spanRef.current
    if (span && selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0)

      const preCaretRange = range.cloneRange()
      preCaretRange.selectNodeContents(span)
      preCaretRange.setEnd(range.endContainer, range.endOffset)

      const textBeforeCaret = preCaretRange.toString()
      cursorOffsetRef.current = textBeforeCaret.length

      const newText = span.textContent ?? ''
      setText(decodeURIComponent(newText))

      setShouldRestoreCursor(true) // 只在输入时触发
    }
  }

  useEffect(() => {
    const span = spanRef.current
    if (!span)
      return

    span.innerHTML = parsedUrl

    if (!shouldRestoreCursor)
      return

    setShouldRestoreCursor(false) // 重置状态

    const setCursorByTextOffset = (el: HTMLElement, offset: number) => {
      const selection = window.getSelection()
      const range = document.createRange()
      let charIndex = 0
      let found = false

      const nodeWalker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null)

      while (nodeWalker.nextNode()) {
        const node = nodeWalker.currentNode as Text
        const nextCharIndex = charIndex + node.length

        if (offset <= nextCharIndex) {
          range.setStart(node, offset - charIndex)
          range.collapse(true)
          selection?.removeAllRanges()
          selection?.addRange(range)
          found = true
          break
        }

        charIndex = nextCharIndex
      }

      if (!found) {
        range.selectNodeContents(el)
        range.collapse(false)
        selection?.removeAllRanges()
        selection?.addRange(range)
      }
    }

    setCursorByTextOffset(span, cursorOffsetRef.current)
  }, [parsedUrl])

  const handleKeyDown = (event: KeyboardEvent<HTMLSpanElement>) => {
    if (event.key !== 'Enter')
      return
    event.preventDefault()
    updatePageData(activeItemId, old => pushTabItemUrl(old, text))
  }

  const handlePaste = (event: React.ClipboardEvent<HTMLSpanElement>) => {
    event.preventDefault() // 阻止默认富文本粘贴行为

    const text = event.clipboardData.getData('text/plain') // 获取纯文本
    document.execCommand('insertText', false, text) // 插入纯文本
  }

  return (
    <div
      className="address-bar @[128px]:flex hidden"
      grow
      h-full
      p="l-6px r-3px y-2px"
      box-border
      border="solid 0.5px $colorNeutralStroke2 hover:$colorNeutralStroke1Hover"
      rounded-full
      bg="$colorNeutralBackground3 hover:$colorNeutralBackground3Hover"
      transition="colors duration-100 ease-in"
      flex="row items-center nowrap"
      gap="3px"
      overflow-hidden
    >
      <LockButton />
      <span
        ref={spanRef}
        className="no-scrollbar"
        grow
        m="r-5px"
        outline-none
        text="$colorNeutralForeground3 nowrap"
        overflow-x-auto
        contentEditable
        suppressContentEditableWarning
        onInput={handleInput}
        onKeyDown={handleKeyDown}
        onPaste={handlePaste}
        spellCheck={false}
      />
    </div>
  )
}
