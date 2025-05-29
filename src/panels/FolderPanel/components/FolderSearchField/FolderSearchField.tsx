import './FolderSearchField.scss'

import type { InputProps, MenuProps } from '@fluentui/react-components'
import {
  Button,
  CounterBadge,
  Field,
  Input,
  Menu,
  MenuButton,
  MenuGroup,
  MenuGroupHeader,
  MenuItemCheckbox,
  MenuList,
  MenuPopover,
  MenuTrigger,
  Text,
  ToggleButton,
  Tooltip,
} from '@fluentui/react-components'
import {
  CopyRegular,
  DismissRegular,
  FilterRegular,
  SearchRegular,
  TextCaseTitleRegular,
  TextPeriodAsteriskRegular,
} from '@fluentui/react-icons'
import { useCallback, useId } from 'react'

import { initialState } from '../../folderPanelSlice.ts'
import type { FolderSearchFieldProps } from './FolderSearchField.types'

function SearchResultActions() {
  return (
    <div flex="~ row items-center justify-start" gap="5px">
      <Text className="ml-5px">6 个结果</Text>
      <Tooltip content="复制搜索结果" relationship="label" positioning="below">
        <Button
          appearance="subtle"
          size="small"
          icon={<CopyRegular />}
        />
      </Tooltip>
    </div>
  )
}

export function FolderSearchField({ searchProps, setSearchProps }: FolderSearchFieldProps) {
  const initialScope = initialState.searchProps.scope
  const { scope, isCaseSensitive, isRegex, keyword } = searchProps
  const inputId = useId()

  const onInputChange: InputProps['onChange'] = (_ev, data) => {
    setSearchProps({ keyword: data.value })
  }

  const clearInput = useCallback(() => {
    setSearchProps({ keyword: '' })
  }, [setSearchProps])

  const setIsCaseSensitive = useCallback(() => {
    setSearchProps({ isCaseSensitive: !isCaseSensitive })
  }, [isCaseSensitive, setSearchProps])

  const setIsRegex = useCallback(() => {
    setSearchProps({ isRegex: !isRegex })
  }, [isRegex, setSearchProps])

  const onScopeChange: MenuProps['onCheckedValueChange'] = (_e, { name, checkedItems }) => {
    setSearchProps({ [name]: checkedItems })
  }

  const isFilterChange: boolean = scope.length !== initialScope.length
    || !scope.every(item => initialScope.includes(item))

  return (
    <Field
      hint={(
        <div m="y-3px" flex="~ col" gap="3px">
          <SearchResultActions />
        </div>
      )}
    >
      <div flex="~ row items-center" gap="5px">
        <Input
          className="folder-panel__search-box grow w-0"
          appearance="filled-lighter"
          contentBefore={<SearchRegular />}
          contentAfter={(
            <div flex="~ row items-center" gap="5px">
              {keyword && (
                <Button
                  appearance="transparent"
                  size="small"
                  icon={<DismissRegular />}
                  onClick={clearInput}
                />
              )}
              <ToggleButton
                appearance="subtle"
                size="small"
                icon={<TextCaseTitleRegular />}
                checked={isCaseSensitive}
                onClick={setIsCaseSensitive}
              />
              <ToggleButton
                appearance="subtle"
                size="small"
                icon={<TextPeriodAsteriskRegular />}
                checked={isRegex}
                onClick={setIsRegex}
              />
            </div>
          )}
          id={inputId}
          value={keyword}
          onChange={onInputChange}
        />
        <Menu hasCheckmarks checkedValues={{ scope }} onCheckedValueChange={onScopeChange}>
          <MenuTrigger disableButtonEnhancement>
            <MenuButton
              appearance="subtle"
              icon={(
                <div relative>
                  <FilterRegular />
                  {isFilterChange && (
                    <CounterBadge className="absolute! top-0 right-0 bg-$colorPaletteGreenForeground1!" dot />
                  )}
                </div>
              )}
            />
          </MenuTrigger>

          <MenuPopover>
            <MenuList>
              <MenuGroup>
                <MenuGroupHeader>搜索作用域</MenuGroupHeader>
                <MenuItemCheckbox name="scope" value="folder">文件夹</MenuItemCheckbox>
                <MenuItemCheckbox name="scope" value="image">图片</MenuItemCheckbox>
                <MenuItemCheckbox name="scope" value="video">视频</MenuItemCheckbox>
              </MenuGroup>
            </MenuList>
          </MenuPopover>
        </Menu>
      </div>
    </Field>
  )
}
