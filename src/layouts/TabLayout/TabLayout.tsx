import type { DragEndEvent } from '@dnd-kit/core'
import { closestCenter, DndContext, MouseSensor, useSensor, useSensors } from '@dnd-kit/core'
import { restrictToHorizontalAxis, restrictToParentElement } from '@dnd-kit/modifiers'
import { arrayMove, horizontalListSortingStrategy, SortableContext } from '@dnd-kit/sortable'
import type { SelectTabData, SelectTabEvent } from '@fluentui/react-components'
import { Button, Divider, TabList, useIsOverflowGroupVisible } from '@fluentui/react-components'
import { AddRegular } from '@fluentui/react-icons'
import type { FC, ReactNode } from 'react'
import { Component, Fragment } from 'react'
import { withAliveScope } from 'react-activation'
import { v4 as uuidv4 } from 'uuid'

import { SortableTab, TabPage } from './components'
import type { TabItemTypes } from './shared/TabItem.types.ts'
import type { TabLayoutProps, TabLayoutState, updatePageData } from './TabLayout.types'

const newTabTemplate: TabItemTypes = {
  history: [{
    title: '新建标签页',
    url: 'NewPage',
  }],
  historyIndex: 0,
}

@withAliveScope
export default class TabLayout extends Component<TabLayoutProps, TabLayoutState> {
  constructor(props: TabLayoutProps) {
    super(props)

    this.state = this.initializeState(props.items)
  }

  private get activeItem(): TabItemTypes | null {
    const { activeItemId, items } = this.state
    return activeItemId ? items[activeItemId] : null
  }

  render() {
    const { className } = this.props
    const { activeItemId, items } = this.state
    const { activeItem, DndContextWrapper, AddNewTab, TabDivider } = this

    return (
      <div className={`tab-layout flex-(~ col items-start) align-start ${className}`}>

        {/* Tabs */}
        <DndContextWrapper>
          <SortableContext items={Object.keys(items)} strategy={horizontalListSortingStrategy}>
            <TabList
              className="w-full h-44px shrink-0 justify-start b-b-(solid 1px $colorNeutralBackground4)"
              selectedValue={activeItemId}
              onTabSelect={(_event: SelectTabEvent, data: SelectTabData) => this.onTabSelect(data.value as string)}
            >
              {
                Object.entries(items).map(([id, item]) => {
                  return (
                    <Fragment key={id}>
                      <SortableTab
                        id={id}
                        item={item}
                        isSelect={activeItemId === id}
                        removeItem={() => {
                          this.removeItem(id)
                        }}
                      />
                      <TabDivider groupId={id} />
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
          {activeItemId && activeItem && (
            <TabPage
              activeItemId={activeItemId}
              activeItem={activeItem}
              updatePageData={this.updatePageData}
            />
          )}
        </div>
      </div>
    )
  }

  private initializeState(items: TabItemTypes[] = []): TabLayoutState {
    const itemsWithId = items.reduce((acc, item) => {
      const id = uuidv4()
      item.showAddAnimation = false
      acc[id] = item
      return acc
    }, {} as { [id: string]: TabItemTypes })

    return {
      activeItemId: items.length > 0 ? Object.keys(itemsWithId)[0] : null,
      items: itemsWithId,
    }
  }

  private onTabSelect = (itemId: string) => {
    this.setState({ activeItemId: itemId })
  }

  private addItem = (newItem: TabItemTypes = newTabTemplate, active: boolean = true) => {
    const id = uuidv4()
    this.setState(prevState => ({
      items: { ...prevState.items, [id]: newItem },
      activeItemId: active ? id : prevState.activeItemId,
    }))
  }

  private removeItem = (itemId: string) => {
    // 删除页面时, 删除页面的组件缓存
    this.props.dropScope?.(new RegExp(`^TabPage-${itemId}-`))

    this.setState((prevState) => {
      const { [itemId]: _, ...newItems } = prevState.items
      let newActiveItemId = prevState.activeItemId

      if (prevState.activeItemId === itemId) {
        const itemIds = Object.keys(prevState.items)
        const currentIndex = itemIds.indexOf(itemId)
        newActiveItemId = itemIds[currentIndex + 1] || itemIds[currentIndex - 1] || null
      }

      return {
        items: newItems,
        activeItemId: newActiveItemId,
      }
    })
  }

  private updatePageData: updatePageData = (pageId, updater) => {
    this.setState(prevState => ({
      items: {
        ...prevState.items,
        [pageId]: updater(prevState.items[pageId]),
      },
    }))
  }

  private handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (over && active.id !== over.id) {
      this.setState((prevState) => {
        const oldIndex = Object.keys(prevState.items).indexOf(active.id as string)
        const newIndex = Object.keys(prevState.items).indexOf(over.id as string)
        const newItems = arrayMove(Object.entries(prevState.items), oldIndex, newIndex)
          .reduce((acc, [id, item]) => {
            acc[id] = item
            return acc
          }, {} as { [id: string]: TabItemTypes })

        return {
          items: newItems,
        }
      })
    }
  }

  private DndContextWrapper: FC<{ children: ReactNode }> = ({ children }) => {
    const sensors = useSensors(
      useSensor(MouseSensor, {
        activationConstraint: {
          distance: 5, // 按住不动移动5px时才进行拖拽, 这样就可以触发点击事件
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

  private TabDivider: FC<{ groupId: string }> = ({ groupId }) => {
    const isGroupVisible = useIsOverflowGroupVisible(groupId)

    if (isGroupVisible === 'hidden') {
      return null
    }

    return (
      <Divider className="grow-0! p-(x-0 py-12px) h-1/2 m-y-auto" vertical />
    )
  }

  private AddNewTab: FC = () => {
    return (
      <div flex="~ items-center" p="x-5px">
        <Button
          className="size-30px!"
          icon={<AddRegular />}
          appearance="subtle"
          onClick={() => {
            this.addItem()
          }}
        />
      </div>
    )
  }
}
