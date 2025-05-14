import type { MenuProps } from '@fluentui/react-components'
import { Menu, MenuGroup, MenuGroupHeader, MenuItem, MenuItemCheckbox, MenuItemRadio, MenuList, MenuPopover, MenuTrigger } from '@fluentui/react-components'

import type { ShowGroup, SortBy } from '../../FolderPanel.types'

function AppearanceMenu({ showGroup, onShowGroupChange }: {
  showGroup: ShowGroup[]
  onShowGroupChange: (showGroup: ShowGroup[]) => void
}) {
  const onChange: MenuProps['onCheckedValueChange'] = (_e, { checkedItems }) => {
    onShowGroupChange(checkedItems as ShowGroup[])
  }

  return (
    <Menu
      checkedValues={{ appearance: showGroup }}
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

function SortByMenu({ sortBy, onSortByChange }: {
  sortBy: SortBy[]
  onSortByChange: (sortBy: SortBy[]) => void
}) {
  const onChange: MenuProps['onCheckedValueChange'] = (_e, { checkedItems }) => {
    onSortByChange(checkedItems as SortBy[])
  }

  return (
    <Menu
      checkedValues={{ sort: sortBy }}
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
  sortBy: SortBy[]
  setSortBy: (sortBy: SortBy[]) => void
}) {
  return (
    <>
      <AppearanceMenu
        showGroup={showGroup}
        onShowGroupChange={setShowGroup}
      />
      <SortByMenu
        sortBy={sortBy}
        onSortByChange={setSortBy}
      />
    </>
  )
}
