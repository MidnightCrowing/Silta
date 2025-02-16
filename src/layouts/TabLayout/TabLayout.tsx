import './TabLayout.scss'

import type { SelectTabData, SelectTabEvent } from '@fluentui/react-components'
import { Button, Divider, TabList, useIsOverflowGroupVisible } from '@fluentui/react-components'
import { AddRegular, bundleIcon, Dismiss16Regular, TabDesktopNewPageFilled, TabDesktopNewPageRegular } from '@fluentui/react-icons'
import { InteractiveTab } from '@fluentui-contrib/react-interactive-tab'
import type { FC } from 'react'
import { Component, createElement, Fragment, Suspense } from 'react'
import { KeepAlive } from 'react-activation'

import { SearchPage } from '~/pages'
import { generateItemId } from '~/utils/common'

import type { TabItem, TabLayoutProps, TabLayoutState } from './TabLayout.types'

const DefaultIcon = bundleIcon(TabDesktopNewPageFilled, TabDesktopNewPageRegular)
function newTabTemplate(): TabItem {
  return {
    id: generateItemId(),
    label: '新建标签页',
    icon: DefaultIcon,
    component: SearchPage,
  }
}

const TabDivider: FC<{ groupId: string }> = ({ groupId }) => {
  const isGroupVisible = useIsOverflowGroupVisible(groupId)

  if (isGroupVisible === 'hidden') {
    return null
  }

  return (
    <Divider className="grow-0! p-(x-0 py-12px)" vertical />
  )
}

class TabLayout extends Component<TabLayoutProps, TabLayoutState> {
  state: Readonly<TabLayoutState> = {
    activeItem: this.props.items?.[1] || null,
    items: this.props.items || [],
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

  private Tab: FC<{ item: TabItem }> = ({ item }) => {
    const { id, label, icon: Icon = DefaultIcon } = item
    const { activeItem } = this.state

    return (
      <InteractiveTab
        className="@container group max-w-150px flex-1 flex! justify-between p-(l-15px! r-10px!)"
        button={{
          className: 'px-0! shrink! grow justify-start!',
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
            data-selected={activeItem?.id === id}
            onClick={() => this.removeItem(id)}
          />
        )}
      >
        {label}
      </InteractiveTab>
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
    const { Tab, AddNewTab } = this

    return (
      <div className={`TabLayout flex-(~ col items-start) align-start ${className}`} {...props}>

        {/* Tabs */}
        <TabList
          className="w-full h-44px shrink-0 justify-start b-b-(solid 1px $colorNeutralBackground4)"
          selectedValue={activeItem?.id}
          onTabSelect={(_event: SelectTabEvent, data: SelectTabData) => this.onTabSelect(data.value as string)}
        >
          {
            items && items.map((item) => {
              return (
                <Fragment key={item.id}>
                  <Tab item={item} />
                  <TabDivider groupId={item.id} />
                </Fragment>
              )
            })
          }

          <AddNewTab />
        </TabList>

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

export { TabLayout }
