import { Button, Tooltip } from '@fluentui/react-components'
import { LockOpen16Regular } from '@fluentui/react-icons'
import type { FormEvent, KeyboardEvent, ReactNode } from 'react'
import { useEffect, useMemo, useRef, useState } from 'react'

import { generateUrlFromTabItem, parseUrlToComponentData } from '~/utils/common.ts'

import type { AddressBarProps } from './TabToolbar.types.ts'
import { urlToHtmlParts } from './TabToolbar.util.tsx'

function LockButton() {
  return (
    <Tooltip content="查看站点信息" relationship="label" positioning="below">
      <Button appearance="subtle" size="small" shape="circular" icon={<LockOpen16Regular />} />
    </Tooltip>
  )
}

function AddressBar({ activeItemId, activeItem, pageComponent }: AddressBarProps) {
  const [text, setText] = useState<string>('')
  const textareaRef = useRef<HTMLTextAreaElement | null>(null)
  const displayRef = useRef<HTMLDivElement | null>(null)
  const parsedUrl: ReactNode = useMemo(() => urlToHtmlParts(text), [text])

  useEffect(() => {
    if (activeItem) {
      const urlText = generateUrlFromTabItem(activeItem)
      setText(urlText)
    }
  }, [activeItem])

  // 每次聚焦到隐藏textarea
  useEffect(() => {
    const displayElement = displayRef.current
    const textareaElement = textareaRef.current

    if (displayElement && textareaElement) {
      const handleClick = () => {
        textareaElement.focus()
      }

      displayElement.addEventListener('click', handleClick)

      // 清理函数，移除事件监听器
      return () => {
        displayElement.removeEventListener('click', handleClick)
      }
    }
  }, [])

  const handleInput = (event: FormEvent<HTMLTextAreaElement>) => {
    // 处理按下Enter事件，阻止换行
    const inputValue = (event.target as HTMLTextAreaElement).value.replace(/\n/g, '') // 移除换行符
    setText(inputValue)
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key !== 'Enter') {
      return
    }
    event.preventDefault() // 阻止默认换行行为
    // 在这里执行你的方法
    const { componentName, componentProps } = parseUrlToComponentData(text)
    console.log('回车键被按下', componentName, componentProps)
    pageComponent.setName(activeItemId, componentName)
    pageComponent.setProps(activeItemId, componentProps)
  }

  return (
    <div
      className="@[128px]:flex hidden"
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
      <div relative grow h-full>
        {/* 可见区 */}
        <div
          ref={displayRef}
          h-full
        >
          {parsedUrl}
        </div>

        {/* 隐藏的textarea，捕获输入 */}
        <textarea
          ref={textareaRef}
          value={text}
          onInput={handleInput}
          onKeyDown={handleKeyDown}
          absolute
          opacity-0
          pos="left-0 top-0"
          size-full
          p-0
          b-0
          pointer-events-none
          resize-none
        />
      </div>
    </div>
  )
}

export default AddressBar
