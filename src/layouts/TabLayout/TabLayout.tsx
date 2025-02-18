import './TabLayout.scss'

import type { DragEndEvent } from '@dnd-kit/core'
import { closestCenter, DndContext, MouseSensor, useSensor, useSensors } from '@dnd-kit/core'
import { restrictToHorizontalAxis, restrictToParentElement } from '@dnd-kit/modifiers'
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import type { SelectTabData, SelectTabEvent } from '@fluentui/react-components'
import { Button, Divider, TabList, useIsOverflowGroupVisible } from '@fluentui/react-components'
import { AddRegular, bundleIcon, Dismiss16Regular, TabDesktopNewPageFilled, TabDesktopNewPageRegular } from '@fluentui/react-icons'
import { InteractiveTab } from '@fluentui-contrib/react-interactive-tab'
import clsx from 'clsx'
import type { FC, ReactNode } from 'react'
import { Component, createElement, Fragment, Suspense, useEffect, useState } from 'react'
import { KeepAlive } from 'react-activation'

import { SearchPage } from '~/pages'
import { generateItemId } from '~/utils/common'

import type { SortableTabProps, TabDividerProps, TabItem, TabLayoutProps, TabLayoutState } from './TabLayout.types'

const DefaultIcon = bundleIcon(TabDesktopNewPageFilled, TabDesktopNewPageRegular)

function newTabTemplate(): TabItem {
  return {
    id: generateItemId(),
    label: '新建标签页',
    icon: DefaultIcon,
    component: SearchPage,
  }
}

const TabDivider: FC<TabDividerProps> = ({ groupId }) => {
  const isGroupVisible = useIsOverflowGroupVisible(groupId)

  if (isGroupVisible === 'hidden') {
    return null
  }

  return (
    <Divider className="grow-0! p-(x-0 py-12px)" vertical />
  )
}

const SortableTab: FC<SortableTabProps> = ({ item, isSelect, removeItem }) => {
  const [open, setOpen] = useState<boolean>(item.new === false)
  const { id, label, icon: Icon = DefaultIcon } = item
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id })

  useEffect(() => {
    requestAnimationFrame(() => {
      setOpen(true)
    })
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
        '@container group',
        'flex-1 max-w-0 transition-(max-width duration-100 ease-in-out) transform-gpu',
        open && 'max-w-150px',
        isDragging && 'bg-$colorNeutralBackground1Hover rounded-5px z-1000 cursor-move',
      )}
      style={{ transform: CSS.Transform.toString(transform), transition }}
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
            className="TabLayout-close-button size-20px min-w-20px!"
            size="small"
            appearance="subtle"
            icon={<Dismiss16Regular />}
            data-selected={isSelect}
            onClick={closeTab}
          />
        )}
      >
        {label}
      </InteractiveTab>
    </div>
  )
}

class TabLayout extends Component<TabLayoutProps, TabLayoutState> {
  state: Readonly<TabLayoutState> = {
    activeItem: this.props.items?.[0] || null,
    items: this.props.items?.map(item => ({ ...item, new: false })) || [],
  }

  private onTabSelect = (itemId: string) => {
    this.setState(prevState => ({
      activeItem: prevState.items?.find(item => item.id === itemId) ?? null,
    }))
  }

  private addItem = (newItem: TabItem = newTabTemplate(), active: boolean = true) => {
    this.setState(prevState => ({
      items: prevState.items.concat(newItem),
      activeItem: active ? newItem : prevState.activeItem,
    }))
  }

  private removeItem = (itemId: string) => {
    this.setState((prevState) => {
      const newItems = prevState.items.filter(i => i.id !== itemId)
      let newActiveItem = prevState.activeItem

      if (prevState.activeItem?.id === itemId) {
        const currentIndex = prevState.items.findIndex(i => i.id === itemId)
        newActiveItem = newItems[currentIndex] || newItems[currentIndex - 1] || null
      }

      return {
        items: newItems,
        activeItem: newActiveItem,
      }
    })
  }

  private handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (over && active.id !== over.id) {
      this.setState((prevState) => {
        const oldIndex = prevState.items.findIndex(item => item.id === active.id)
        const newIndex = prevState.items.findIndex(item => item.id === over.id)

        return {
          items: arrayMove(prevState.items, oldIndex, newIndex),
        }
      })
    }
  }

  private DndContextWrapper: FC<{ children: ReactNode }> = ({ children }) => {
    const sensors = useSensors(
      useSensor(MouseSensor, {
        activationConstraint: {
          distance: 5, // 按住不动移动5px 时 才进行拖拽, 这样就可以触发点击事件
        },
      }),
    )

    return (
      <DndContext
        collisionDetection={closestCenter}
        onDragEnd={this.handleDragEnd}
        sensors={sensors}
        modifiers={[
          restrictToHorizontalAxis, // 限制只能在水平方向上移动
          restrictToParentElement, // 不能超出父组件
        ]}
      >
        {children}
      </DndContext>
    )
  }

  private AddNewTab: FC = () => {
    return (
      <div flex="~ items-center" p="x-5px">
        <Button
          className="size-30px!"
          icon={<AddRegular />}
          appearance="subtle"
          onClick={() => { this.addItem() }}
        />
      </div>
    )
  }

  render() {
    const { className, items: _, ...props } = this.props
    const { activeItem, items } = this.state
    const { DndContextWrapper, AddNewTab } = this

    return (
      <div className={`TabLayout flex-(~ col items-start) align-start ${className}`} {...props}>

        {/* Tabs */}
        <DndContextWrapper>
          <SortableContext items={items} strategy={verticalListSortingStrategy}>
            <TabList
              className="w-full h-44px shrink-0 justify-start b-b-(solid 1px $colorNeutralBackground4)"
              selectedValue={activeItem?.id}
              onTabSelect={(_event: SelectTabEvent, data: SelectTabData) => this.onTabSelect(data.value as string)}
            >
              {
                items && items.map((item) => {
                  return (
                    <Fragment key={item.id}>
                      <SortableTab
                        item={item}
                        isSelect={activeItem === item}
                        removeItem={() => { this.removeItem(item.id) }}
                      />
                      <TabDivider groupId={item.id} />
                    </Fragment>
                  )
                })
              }

              <AddNewTab />
            </TabList>
          </SortableContext>
        </DndContextWrapper>

        {/* Pages */}
        <div grow w-full overflow-hidden>
          {activeItem && (
            <KeepAlive key={activeItem.id} cacheKey={activeItem.id}>
              <Suspense>
                {createElement(activeItem.component, { className: 'size-full box-border' })}
              </Suspense>
            </KeepAlive>
          )}
        </div>
      </div>
    )
  }
}

export default TabLayout
