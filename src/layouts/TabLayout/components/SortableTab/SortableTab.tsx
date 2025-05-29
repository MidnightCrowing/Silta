import './SortableTab.scss'

import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import type { MenuProps } from '@fluentui/react-components'
import { Avatar, Button, Text } from '@fluentui/react-components'
import { bundleIcon, Dismiss16Regular, Pin20Regular, TabDesktopNewPageFilled, TabDesktopNewPageRegular } from '@fluentui/react-icons'
import clsx from 'clsx'
import type { FC, MouseEvent } from 'react'
import { useEffect, useState } from 'react'

import { TabMenu } from '../TabMenu'
import type { SortableTabProps } from './SortableTab.types'

export const DefaultTabIcon = bundleIcon(TabDesktopNewPageFilled, TabDesktopNewPageRegular)

export const SortableTab: FC<SortableTabProps> = ({
  id,
  item,
  isSelect,
  allTabIds,
  onSelect,
  addItem,
  removeItem,
  updatePageData,
}) => {
  const { history, historyIndex, showAddAnimation = true, isPinned = false } = item
  const { title, icon: Icon = DefaultTabIcon } = history[historyIndex]
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id })
  const [open, setOpen] = useState<boolean>(!showAddAnimation)
  const [menuOpen, setMenuOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)

  useEffect(() => {
    const id = setTimeout(() => {
      setOpen(true)
    }, 0)
    return () => clearTimeout(id)
  }, [])

  const closeTab = () => {
    if (isPinned) {
      return
    }

    setOpen(false)

    setTimeout(() => {
      removeItem((items) => {
        const { [id]: _, ...rest } = items
        return rest
      })
    }, 100)
  }

  const handleContextMenu = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    setAnchorEl(e.currentTarget)
    setMenuOpen(true)
  }

  const onOpenChange: MenuProps['onOpenChange'] = (_e, data) => {
    setMenuOpen(data.open)
  }

  return (
    <>
      <div
        ref={setNodeRef}
        className={clsx(
          'tab-layout__sortable-tab @container group',
          'flex-1 overflow-hidden max-w-0 opacity-0 rounded-t-5px p-3px',
          'transition-([max-width,opacity] duration-100 ease-in-out) transform-gpu',
          open && 'max-w-180px opacity-100',
          isSelect && 'bg-$colorNeutralBackground1',
          isDragging && 'bg-transparent z-1000 cursor-move',
        )}
        style={{ transform: CSS.Transform.toString(transform), transition }}
        onClick={onSelect}
        onDoubleClick={closeTab}
        onContextMenu={handleContextMenu}
        {...attributes}
        {...listeners}
      >
        <div
          className={
            isDragging ? 'bg-$colorNeutralBackground1Hover! cursor-move' : undefined
          }
          w-full
          flex="~ row items-center"
          gap="5px"
          p="2px"
          b-0
          rounded="5px"
          bg="hover:$colorNeutralBackground1"
          box-border
          cursor-pointer
          select-none
        >
          <Avatar
            icon={<Icon />}
            shape="square"
            size={24}
          />
          <Text className="text-nowrap! truncate! mr-auto">{title}</Text>
          {
            isPinned
              ? <Pin20Regular />
              : (
                  <Button
                    role="tab"
                    className="tab-layout__tab-close-button size-20px min-w-20px! group-hover:flex!"
                    size="small"
                    appearance="subtle"
                    icon={<Dismiss16Regular />}
                    data-selected={isSelect}
                    onClick={(e) => {
                      e.stopPropagation()
                      closeTab()
                    }}
                    onDoubleClick={(e) => {
                      e.stopPropagation()
                    }}
                  />
                )
          }
        </div>
      </div>

      <TabMenu
        menuOpen={menuOpen}
        onOpenChange={onOpenChange}
        anchorEl={anchorEl}
        tabId={id}
        item={item}
        addItem={addItem}
        removeItem={removeItem}
        allTabIds={allTabIds}
        updatePageData={updatePageData}
      />
    </>
  )
}
