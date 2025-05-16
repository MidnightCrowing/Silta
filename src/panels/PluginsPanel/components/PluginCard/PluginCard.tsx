import { ListItem, Menu, MenuButton, MenuItem, MenuList, MenuPopover, MenuTrigger, Text, Tooltip } from '@fluentui/react-components'
import { Box24Regular, Settings16Regular } from '@fluentui/react-icons'
import clsx from 'clsx'
import type { FocusEvent } from 'react'
import { useCallback } from 'react'

import type { PluginItemTypes } from '../../shared/PluginItem.types.ts'

export function PluginCard({ item, isSelect, onSelectedItem }: { item: PluginItemTypes, isSelect: boolean, onSelectedItem: () => void }) {
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
      key={item.id}
      value={item.id}
      data-value={item.id}
      checkmark={null}
      onFocus={onFocus}
    >
      <Box24Regular
        className={clsx('shrink-0', !item.isEnabled && 'color-$colorNeutralForegroundDisabled')}
      />

      <div role="gridcell" flex="~ col" grow overflow-hidden>
        <Text
          className={clsx(
            'truncate!',
            !item.isEnabled && 'color-$colorNeutralForegroundDisabled',
          )}
          weight="semibold"
        >
          {item.name}
        </Text>
        <Text
          className={clsx(
            'truncate!',
            !item.isEnabled ? 'color-$colorNeutralForegroundDisabled' : 'color-$colorNeutralForeground3',
          )}
        >
          {item.description}
        </Text>
      </div>

      <Menu>
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
            <MenuItem>Item a</MenuItem>
            <MenuItem>Item b</MenuItem>
          </MenuList>
        </MenuPopover>
      </Menu>
    </ListItem>
  )
}
