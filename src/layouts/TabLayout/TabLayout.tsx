import type { DragEndEvent } from '@dnd-kit/core'
import { arrayMove, horizontalListSortingStrategy, SortableContext } from '@dnd-kit/sortable'
import type { SelectTabData, SelectTabEvent } from '@fluentui/react-components'
import { Button, TabList } from '@fluentui/react-components'
import { AddRegular } from '@fluentui/react-icons'
import type { FC } from 'react'
import { Component, Fragment } from 'react'
import { withAliveScope } from 'react-activation'
import { v4 as uuidv4 } from 'uuid'

import { SortableTab, TabDivider, TabDndContextWrapper, TabPage } from './components'
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
    const { activeItem, AddNewTab } = this

    return (
      <div className={`tab-layout flex-(~ col items-start) align-start ${className}`}>

        {/* Tabs */}
        <TabDndContextWrapper onDragEnd={this.handleDragEnd}>
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
                        allTabIds={Object.keys(items)}
                        addItem={this.addItem}
                        removeItem={updater => this.removeItem(updater)}
                        updatePageData={this.updatePageData}
                      />
                      <TabDivider groupId={id} />
                    </Fragment>
                  )
                })
              }
              <AddNewTab />
            </TabList>
          </SortableContext>
        </TabDndContextWrapper>

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

  /**
   * 添加新 tab item，可指定插入位置（默认末尾）。
   * @param newItem 新的 TabItemTypes
   * @param active 是否激活新 tab
   * @param insertIndex 插入位置（0-based），默认末尾
   */
  private addItem = (
    newItem: TabItemTypes = newTabTemplate,
    active: boolean = true,
    insertIndex?: number,
  ) => {
    const id = uuidv4()
    this.setState((prevState) => {
      const entries = Object.entries(prevState.items)
      const index = insertIndex !== undefined
        ? Math.max(0, Math.min(insertIndex, entries.length))
        : entries.length
      // 插入新项
      entries.splice(index, 0, [id, newItem])
      const newItems = Object.fromEntries(entries)
      return {
        items: newItems,
        activeItemId: active ? id : prevState.activeItemId,
      }
    })
  }

  private removeItem = (updater: (items: TabLayoutState['items']) => TabLayoutState['items']) => {
    this.setState((prevState) => {
      const oldItems = prevState.items
      const newItems = updater(oldItems)

      // 找出被删除的 tab id
      const removedIds = Object.keys(oldItems).filter(id => !(id in newItems))
      // 清理缓存
      removedIds.forEach((id) => {
        this.props.dropScope?.(new RegExp(`^TabPage-${id}-`))
      })

      // 处理 activeId
      let newActiveItemId = prevState.activeItemId
      if (removedIds.includes(prevState.activeItemId!)) {
        const remainIds = Object.keys(newItems)
        newActiveItemId = remainIds[0] || null
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
}
