import type { MenuProps } from '@fluentui/react-components'
import { Menu, MenuGroup, MenuGroupHeader, MenuItem, MenuItemCheckbox, MenuItemRadio, MenuList, MenuPopover, MenuTrigger } from '@fluentui/react-components'
import { useState } from 'react'

import type { ShowGroup, SortBy } from '../../FolderPanel.types'

function AppearanceMenu({ initialShowGroup, onShowGroupChange }: {
  initialShowGroup: ShowGroup[]
  onShowGroupChange: (showGroup: ShowGroup[]) => void
}) {
  const [selectedGroup, setSelectedGroup] = useState<ShowGroup[]>(initialShowGroup)

  const onChange: MenuProps['onCheckedValueChange'] = (_e, { checkedItems }) => {
    setSelectedGroup(checkedItems as ShowGroup[])
    onShowGroupChange(checkedItems as ShowGroup[])
  }

  return (
    <Menu
      checkedValues={{ appearance: selectedGroup }}
      onCheckedValueChange={onChange}
    >
      <MenuTrigger disableButtonEnhancement>
        <MenuItem>外观</MenuItem>
      </MenuTrigger>
      <MenuPopover>
        <MenuList>
          <MenuGroup>
            <MenuGroupHeader>显示</MenuGroupHeader>
            <MenuItemCheckbox name="appearance" value="member">成员</MenuItemCheckbox>
            <MenuItemCheckbox name="appearance" value="excluded">排除的文件</MenuItemCheckbox>
            <MenuItemCheckbox name="appearance" value="temporary">临时文件</MenuItemCheckbox>
            <MenuItemCheckbox name="appearance" value="details">文件详细信息</MenuItemCheckbox>
          </MenuGroup>
        </MenuList>
      </MenuPopover>
    </Menu>
  )
}

function SortByMenu({ initialSortBy, onSortByChange }: {
  initialSortBy: SortBy
  onSortByChange: (sortBy: SortBy) => void
}) {
  const [selected, setSelected] = useState<SortBy[]>([initialSortBy])

  const onChange: MenuProps['onCheckedValueChange'] = (_e, { checkedItems }) => {
    setSelected(checkedItems as SortBy[])
    onSortByChange(checkedItems[0] as SortBy)
  }

  return (
    <Menu
      checkedValues={{ sort: selected }}
      onCheckedValueChange={onChange}
    >
      <MenuTrigger disableButtonEnhancement>
        <MenuItem>排序</MenuItem>
      </MenuTrigger>
      <MenuPopover>
        <MenuList>
          <MenuItemRadio name="sort" value="name">名称</MenuItemRadio>
          <MenuItemRadio name="sort" value="type">类型</MenuItemRadio>
          <MenuItemRadio name="sort" value="dateAsc">修改时间(从新到旧)</MenuItemRadio>
          <MenuItemRadio name="sort" value="dateDesc">修改时间(从旧到新)</MenuItemRadio>
        </MenuList>
      </MenuPopover>
    </Menu>
  )
}

export function FolderCustomMenu({ showGroup, setShowGroup, sortBy, setSortBy }: {
  showGroup: ShowGroup[]
  setShowGroup: (showGroup: ShowGroup[]) => void
  sortBy: SortBy
  setSortBy: (sortBy: SortBy) => void
}) {
  return (
    <>
      <AppearanceMenu
        initialShowGroup={showGroup}
        onShowGroupChange={setShowGroup}
      />
      <SortByMenu
        initialSortBy={sortBy}
        onSortByChange={setSortBy}
      />
    </>
  )
}
