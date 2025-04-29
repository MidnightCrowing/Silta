import { Button, Tooltip } from '@fluentui/react-components'
import {
  ArrowClockwise20Regular,
  ArrowClockwiseDashes20Regular,
  ArrowLeft20Regular,
  ArrowRight20Regular,
  History20Regular,
} from '@fluentui/react-icons'
import { useEffect, useState } from 'react'

import AddressBar from './AddressBar.tsx'
import type {
  BackButtonProps,
  ForwardButtonProps,
  RefreshButtonProps,
  TabToolbarProps,
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

// function UrlInput({ activeItem }: AddressBarProps) {
//   const [url, setUrl] = useState<string>('')
//   const divRef = useRef<HTMLDivElement>(null)
//   const parsedUrl: ReactNode = useMemo(() => urlToHtmlParts(url), [url])
//
//   useEffect(() => {
//     if (activeItem) {
//       const newUrl = generateUrlFromTabItem(activeItem)
//       setUrl(newUrl)
//     }
//   }, [activeItem])
//
//   function getCursorPosition(container: HTMLElement) {
//     const selection = window.getSelection()
//     if (!selection || !selection.anchorNode)
//       return -1
//
//     let position = 0
//     const node = selection.anchorNode
//     const offset = selection.anchorOffset
//
//     function countTextLengthUpTo(targetNode: Node): boolean {
//       if (targetNode === node) {
//         position += offset
//         return true
//       }
//       if (targetNode.nodeType === Node.TEXT_NODE) {
//         position += targetNode.textContent?.length ?? 0
//       }
//       for (const child of Array.from(targetNode.childNodes)) {
//         if (countTextLengthUpTo(child)) {
//           return true
//         }
//       }
//       return false
//     }
//
//     countTextLengthUpTo(container)
//     return position
//   }
//
//   function setCursorPosition(container: HTMLElement, position: number) {
//     const selection = window.getSelection()
//     if (!selection)
//       return
//
//     let currentPos = 0
//     let found = false
//
//     function setPosInNode(node: Node) {
//       if (found)
//         return
//       if (node.nodeType === Node.TEXT_NODE) {
//         const textLength = node.textContent?.length ?? 0
//         if (currentPos + textLength >= position) {
//           const offset = position - currentPos
//           const range = document.createRange()
//           range.setStart(node, offset)
//           range.collapse(true)
//           selection.removeAllRanges()
//           selection.addRange(range)
//           found = true
//         }
//         else {
//           currentPos += textLength
//         }
//       }
//       else {
//         for (const child of Array.from(node.childNodes)) {
//           setPosInNode(child)
//           if (found)
//             return
//         }
//       }
//     }
//
//     setPosInNode(container)
//   }
//
//   // 处理按下Enter事件，阻止换行
//   const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
//     if (event.key === 'Enter') {
//       event.preventDefault() // 阻止默认换行行为
//       if (!divRef.current)
//         return
//
//       const cursorPos = getCursorPosition(divRef.current)
//       console.log('光标位置：', cursorPos)
//
//       // 更新 URL
//       setUrl(htmlPartsToUrl(divRef.current))
//
//       // 等待 URL 更新后设置光标位置
//       setTimeout(() => {
//         if (!divRef.current)
//           return
//         setCursorPosition(divRef.current, cursorPos)
//       }, 0)
//     }
//   }
//
//   // 处理获取焦点时选中所有文本
//   // const handleFocus = () => {
//   //   if (divRef.current) {
//   //     const range = document.createRange()
//   //     const selection = window.getSelection()
//   //     range.selectNodeContents(divRef.current) // 选中所有内容
//   //     if (selection) {
//   //       selection.removeAllRanges() // 移除所有选区
//   //       selection.addRange(range) // 添加新的选区
//   //     }
//   //   }
//   // }
//
//   // 处理粘贴事件，防止插入 HTML
//   const handlePaste = (event: ClipboardEvent<HTMLDivElement>) => {
//     event.preventDefault()
//     const pastedText = event.clipboardData.getData('text/plain') // 获取纯文本
//
//     const selection = window.getSelection()
//     if (!selection || selection.rangeCount === 0)
//       return
//
//     const range = selection.getRangeAt(0) // 获取当前选区
//     range.deleteContents() // 删除选区内容
//     const textNode = document.createTextNode(pastedText)
//     range.insertNode(textNode) // 插入纯文本
//
//     // 设置光标位置到插入文本的末尾
//     range.setStartAfter(textNode)
//     range.setEndAfter(textNode)
//     selection.removeAllRanges()
//     selection.addRange(range)
//   }
//
//   return (
//     <div
//       className="@[128px]:flex hidden"
//       grow
//       h-full
//       p="l-6px r-3px y-2px"
//       box-border
//       border="solid 0.5px $colorNeutralStroke2 hover:$colorNeutralStroke1Hover"
//       rounded-full
//       bg="$colorNeutralBackground3 hover:$colorNeutralBackground3Hover"
//       transition="colors duration-100 ease-in"
//       flex="row items-center nowrap"
//       gap="3px"
//       overflow-hidden
//     >
//       {parsedUrl}
//       <UrlInputLockButton />
//       <div
//         ref={divRef}
//         contentEditable
//         grow
//         inline-flex="~ items-center justify-start"
//         truncate
//         outline-0
//         whitespace-nowrap
//         // onBlur={handleBlur} // 在失去焦点时更新
//         onKeyDown={handleKeyDown} // 按下 Enter 时更新
//         // onFocus={handleFocus} // 获取焦点时选中所有文本
//         onPaste={handlePaste} // 处理粘贴事件
//         suppressContentEditableWarning
//       >
//         {parsedUrl}
//       </div>
//     </div>
//   )
// }

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
  refreshPage,
  isBack,
  isForward,
  locationBack,
  locationForward,
  pageComponent,
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
      <BackButton isBack={isBack} setBack={locationBack} />
      <ForwardButton isForward={isForward} setForward={locationForward} />
      <RefreshButton refreshPage={refreshPage} />
      <AddressBar activeItemId={activeItemId} activeItem={activeItem} pageComponent={pageComponent} />
      <HistoryButton />
    </div>
  )
}
