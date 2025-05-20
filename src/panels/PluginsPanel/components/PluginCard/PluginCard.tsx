import { ListItem, Menu, MenuButton, MenuDivider, MenuItem, MenuList, MenuPopover, MenuTrigger, Text, Tooltip } from '@fluentui/react-components'
import { Box24Regular, Settings16Regular, SettingsRegular } from '@fluentui/react-icons'
import clsx from 'clsx'
import type { FocusEvent } from 'react'
import { useCallback } from 'react'

import type { PluginCardProps } from './PluginCard.types.ts'

export function PluginCard({ item, isSelect, onSelectedItem }: PluginCardProps) {
  const { id, name, description, icon, version, isEnabled } = item

  const onFocus = useCallback((event: FocusEvent<HTMLLIElement>) => {
    // Ignore bubbled up events from the children
    if (event.target !== event.currentTarget) {
      return
    }
    onSelectedItem()
  }, [onSelectedItem])

  return (
    <ListItem
      className={clsx(
        'flex-(~ row items-center) gap-13px p-(x-13px! y-8px!) overflow-hidden!',
        'hover:bg-$colorSubtleBackgroundHover',
        isSelect && 'bg-$colorSubtleBackgroundSelected',
      )}
      key={id}
      value={id}
      data-value={id}
      checkmark={null}
      onFocus={onFocus}
    >
      <Box24Regular
        className={clsx('shrink-0', !isEnabled && 'color-$colorNeutralForegroundDisabled')}
      />

      <div role="gridcell" flex="~ col" grow overflow-hidden>
        <Text
          className={clsx(
            'truncate!',
            !isEnabled && 'color-$colorNeutralForegroundDisabled',
          )}
          weight="semibold"
        >
          {name}
        </Text>
        <Text
          className={clsx(
            'truncate!',
            !isEnabled ? 'color-$colorNeutralForegroundDisabled' : 'color-$colorNeutralForeground3',
          )}
        >
          {description}
        </Text>
      </div>

      <Menu hasIcons>
        <MenuTrigger disableButtonEnhancement>
          <Tooltip content="管理" relationship="label">
            <MenuButton
              className="self-end p-0! b-0! max-w-15px! max-h-15px! min-w-15px! min-h-15px!"
              appearance="subtle"
              size="small"
              icon={<Settings16Regular />}
            />
          </Tooltip>
        </MenuTrigger>
        <MenuPopover>
          <MenuList>
            <MenuItem disabled={isEnabled}>启用</MenuItem>
            <MenuItem disabled={!isEnabled}>禁用</MenuItem>
            <MenuDivider />
            <MenuItem icon={<SettingsRegular />}>插件设置</MenuItem>
          </MenuList>
        </MenuPopover>
      </Menu>
    </ListItem>
  )
}
