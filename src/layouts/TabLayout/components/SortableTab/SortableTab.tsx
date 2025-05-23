import './SortableTab.scss'

import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Button } from '@fluentui/react-components'
import { bundleIcon, Dismiss16Regular, TabDesktopNewPageFilled, TabDesktopNewPageRegular } from '@fluentui/react-icons'
import { InteractiveTab } from '@fluentui-contrib/react-interactive-tab'
import clsx from 'clsx'
import type { FC } from 'react'
import { useEffect, useState } from 'react'

import type { SortableTabProps } from './SortableTab.types'

export const DefaultTabIcon = bundleIcon(TabDesktopNewPageFilled, TabDesktopNewPageRegular)

export const SortableTab: FC<SortableTabProps> = ({ id, item, isSelect, removeItem }) => {
  const { history, historyIndex, showAddAnimation = true } = item
  const { title, icon: Icon = DefaultTabIcon } = history[historyIndex]
  const [open, setOpen] = useState<boolean>(!showAddAnimation)
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id })

  useEffect(() => {
    const id = setTimeout(() => {
      setOpen(true)
    }, 0)
    return () => clearTimeout(id)
  }, [])

  const closeTab = () => {
    setOpen(false)

    setTimeout(() => {
      removeItem()
    }, 100)
  }

  return (
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
      {...attributes}
      {...listeners}
    >
      <InteractiveTab
        className="flex! justify-between p-(l-15px! r-10px!) h-full"
        button={{
          className: `px-0! shrink! grow justify-start! ${transform && 'cursor-move!'}`,
        }}
        icon={<Icon />}
        value={id}
        contentAfter={(
          <Button
            role="tab"
            className="close-button size-20px min-w-20px! group-hover:flex!"
            size="small"
            appearance="subtle"
            icon={<Dismiss16Regular />}
            data-selected={isSelect}
            onClick={closeTab}
          />
        )}
      >
        {title}
      </InteractiveTab>
    </div>
  )
}
