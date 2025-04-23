import './SearchPage.scss'

import { Button } from '@fluentui/react-components'
import { Dismiss16Regular, Search24Regular } from '@fluentui/react-icons'
import { convertFileSrc } from '@tauri-apps/api/core'
import clsx from 'clsx'
import { useRef, useState } from 'react'

import { useLocation } from '~/contexts/location'
import { TabComponentNameEnum } from '~/layouts'

import type { SearchPageProps } from './SearchPage.types'

const searchBg: boolean = false // 是否显示搜索标签页背景图片
const bgUrl = convertFileSrc('assets/background.jpg')
const logoUrl = convertFileSrc('assets/logo.svg')

export default function SearchPage({ className }: SearchPageProps) {
  const [isFocused, setIsFocused] = useState<boolean>(false)
  const [inputValue, setInputValue] = useState<string>('')
  const inputRef = useRef<HTMLInputElement>(null)
  const { setLocation } = useLocation()

  const clearInputAndFocus = () => {
    setInputValue('')
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  return (
    <div className={`search-page ${className}`} relative>
      {/* Background image */}
      {searchBg && (
        <div absolute inset-0 select-none>
          <img absolute size-full object="center cover" src={bgUrl} alt="background image" />
          <div absolute inset-0 bg="$homepage-bg-mask" />
          <div
            className={`absolute inset-0 bg-black transition-(bg duration-300) ${
              isFocused ? 'bg-opacity-60' : 'bg-opacity-0'
            }`}
          />
        </div>
      )}

      <div flex="~ col items-center justify-end" gap="42px" absolute inset-0 translate-y="-45%">
        {/* logo */}
        <div className="logo-glowing" select-none>
          <img src={logoUrl} alt="logo" />
        </div>

        <div
          className={clsx(
            'group',
            isFocused ? 'b-$colorCompoundBrandForeground1' : 'b-$colorNeutralBackground1Selected',
            isFocused && 'input-focus-effect',
          )}
          relative
          flex="~ justify-between items-center"
          w="[calc(100%-300px)]"
          min-w="315px"
          max-w="640px"
          p="5px"
          rounded="6px"
          shadow="lg"
          light:bg="$colorNeutralBackground6-60 hover:$colorNeutralBackground1-60"
          dark:bg="$colorNeutralBackground6-20 hover:$colorNeutralBackground1-20"
          backdrop="blur-20px saturate-180% brightness-120%"
          transition="all duration-200"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        >
          <Search24Regular
            className={`m-(l-15px r-10px) transition-(colors duration-200) ${
              !isFocused && 'color-$colorCompoundBrandForeground1'
            }`}
          />
          {inputValue && (
            <Dismiss16Regular
              data-testid="clear-button"
              className={
                'absolute top-1/2 right-115px translate-y--1/2 '
                + 'group-hover:hover:color-$colorCompoundBrandForeground1 '
                + 'rounded-1/2 p-3px outline-0 '
                + 'cursor-pointer'
              }
              tabIndex={0}
              onClick={clearInputAndFocus}
            />
          )}
          <input
            ref={inputRef}
            w="[calc(100%-160px)]"
            h="36px"
            text="18px"
            m="r-40px"
            b-0
            outline-0
            color="$colorneutralforeground1"
            bg-transparent
            type="text"
            placeholder="输入关键词搜索"
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
          />
          <Button
            className="w-100px h-38px select-none bg-$colorBrandBackground-20!"
            appearance="primary"
            onClick={() => setLocation({
              pageLabel: 'Video',
              pageComponentName: TabComponentNameEnum.VideoPage,
              pageComponentProps: { keyword: inputValue },
            })}
          >
            搜索
          </Button>
        </div>
      </div>
    </div>
  )
}
