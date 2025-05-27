import './SortableTab.scss'

import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import type { MenuProps } from '@fluentui/react-components'
import { Avatar, Button } from '@fluentui/react-components'
import { bundleIcon, Dismiss16Regular, Pin20Regular, TabDesktopNewPageFilled, TabDesktopNewPageRegular } from '@fluentui/react-icons'
import { InteractiveTab } from '@fluentui-contrib/react-interactive-tab'
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
  addItem,
  removeItem,
  allTabIds,
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
          'tab-layout sortable-tab @container group',
          'flex-1 overflow-hidden max-w-0 opacity-0',
          'transition-([max-width,opacity] duration-100 ease-in-out) transform-gpu',
          open && 'max-w-150px opacity-100',
          isDragging && 'bg-$colorNeutralBackground1Hover rounded-5px z-1000 cursor-move',
        )}
        style={{ transform: CSS.Transform.toString(transform), transition }}
        onDoubleClick={closeTab}
        onContextMenu={handleContextMenu}
        {...attributes}
        {...listeners}
      >
        <InteractiveTab
          className="flex! justify-between p-(l-15px! r-10px!) h-full"
          button={{
            className: `px-0! shrink! grow justify-start! ${transform && 'cursor-move!'}`,
          }}
          icon={<Avatar icon={<Icon />} shape="square" size={28} />}
          value={id}
          contentAfter={
            isPinned
              ? <Pin20Regular />
              : (
                  <Button
                    role="tab"
                    className="close-button size-20px min-w-20px! group-hover:flex!"
                    size="small"
                    appearance="subtle"
                    icon={<Dismiss16Regular />}
                    data-selected={isSelect}
                    onClick={closeTab}
                  />
                )
          }
        >
          {title}
        </InteractiveTab>
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
