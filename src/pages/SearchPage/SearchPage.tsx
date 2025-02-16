import './SearchPage.scss'

import { Button } from '@fluentui/react-components'
import { Dismiss16Regular, Search24Regular } from '@fluentui/react-icons'
import { convertFileSrc } from '@tauri-apps/api/core'
import clsx from 'clsx'
import { useRef, useState } from 'react'

const searchBg: boolean = false // 是否显示搜索标签页背景图片
const bgUrl = convertFileSrc('assets/background.jpg')
const logoUrl = convertFileSrc('assets/logo.svg')

export default function SearchPage({ className }: { className: string }) {
  const [isFocused, setIsFocused] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const clearInputAndFocus = () => {
    setInputValue('')
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  return (
    <div className={className} relative>
      {/* Background image */}
      {searchBg && (
        <div absolute inset-0 select-none>
          <img absolute size-full object="center cover" src={bgUrl} alt="background image" />
          <div
            className={clsx(
              'absolute inset-0 bg-$colorNeutralBackground1 transition-(all duration-300)',
              isFocused ? 'opacity-55' : 'opacity-10',
            )}
          />
        </div>
      )}

      <div flex="~ col items-center justify-end" gap="42px" absolute inset-0 translate-y="-45%">
        {/* logo */}
        <div className="SearchPage-logo-glowing" select-none>
          <img src={logoUrl} alt="logo" />
        </div>

        <div
          className={clsx(
            'group',
            isFocused ? 'b-$colorCompoundBrandForeground1' : 'b-$colorNeutralBackground1Selected',
            isFocused && 'SearchPage-input-focus-effect',
          )}
          relative
          flex="~ justify-between items-center"
          w="[calc(100%-300px)]"
          min-w="315px"
          max-w="640px"
          p="5px"
          border="1px solid"
          rounded="6px"
          bg="$colorNeutralBackground6 hover:$colorNeutralBackground1"
          transition="all duration-200"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        >
          <Search24Regular
            className={clsx(
              'm-(l-15px r-10px) transition-(color duration-200)',
              !isFocused && 'color-$colorCompoundBrandForeground1',
            )}
          />
          {inputValue && (
            <Dismiss16Regular
              className={clsx(
                'absolute top-1/2 right-115px translate-y--1/2',
                'group-hover:hover:color-$colorCompoundBrandForeground1',
                'group-hover:(bg-$colorNeutralBackgroundStatic active:bg-$colorNeutralBackground6)',
                'rounded-1/2 p-3px outline-0',
                'cursor-pointer',
              )}
              tabIndex={0}
              onClick={clearInputAndFocus}
            />
          )}
          <input
            ref={inputRef}
            w="[calc(100%-160px)]"
            h="36px"
            text="18px"
            mr="40px"
            b-0
            outline-0
            color="$colorneutralforeground1"
            bg-transparent
            type="text"
            placeholder="输入关键词搜索"
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
          />
          <Button className="w-100px h-38px select-none" appearance="primary">搜索</Button>
        </div>
      </div>
    </div>
  )
}
