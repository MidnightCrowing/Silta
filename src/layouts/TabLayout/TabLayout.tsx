import type { DragEndEvent } from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import { Component } from 'react'
import { withAliveScope } from 'react-activation'
import { v4 as uuidv4 } from 'uuid'

import { CustomTabList, TabPage } from './components'
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
    const { activeItem } = this

    return (
      <div className={`tab-layout flex-(~ col items-start) align-start ${className}`}>
        {/* Tabs */}
        <CustomTabList
          items={items}
          activeItemId={activeItemId}
          onTabSelect={this.onTabSelect}
          onDragEnd={this.handleDragEnd}
          addItem={this.addItem}
          removeItem={this.removeItem}
          updatePageData={this.updatePageData}
        />

        {/* Toolbar && Pages */}
        <div grow w-full overflow-hidden>
          {activeItemId && activeItem && (
            <TabPage
              activeItemId={activeItemId}
              activeItem={activeItem}
              allTabIds={Object.keys(items)}
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
}
