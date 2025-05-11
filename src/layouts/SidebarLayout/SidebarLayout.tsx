import clsx from 'clsx'
import { Component, createElement, Fragment } from 'react'

import { SidebarNavigation, SidebarPanel, SidebarResize } from './components'
import type {
  SidebarActiveItem,
  SidebarActiveItemId,
  SidebarItem,
  SidebarNavItem,
  SidebarPosition,
} from './shared/SidebarItem.types'
import type { SidebarLayoutProps, SidebarLayoutState } from './SidebarLayout.types'

export default class SidebarLayout extends Component<SidebarLayoutProps, SidebarLayoutState> {
  state: Readonly<SidebarLayoutState> = {
    leftTopActiveItem: null,
    leftBottomActiveItem: null,
    rightTopActiveItem: null,
    rightBottomActiveItem: null,
    drawerIsResizing: false,
    bottomDrawersIsResizing: false,
  }

  constructor(props: SidebarLayoutProps) {
    super(props)

    this.state = { ...this.state, ...this.initializeState(props) }
  }

  render() {
    const {
      children,
      className,
      items,
      leftTopActiveItemId,
      leftBottomActiveItemId,
      rightTopActiveItemId,
      rightBottomActiveItemId,
      ...props
    } = this.props
    const {
      leftTopActiveItem,
      leftBottomActiveItem,
      rightTopActiveItem,
      rightBottomActiveItem,
      drawerIsResizing,
      bottomDrawersIsResizing,
    } = this.state

    const itemGroups: Record<SidebarItem['position'], SidebarItem[]> = {
      leftTop: [],
      leftBottom: [],
      rightTop: [],
      rightBottom: [],
    }

    items?.forEach((item) => {
      itemGroups[item.position].push(item)
    })

    const {
      leftTop: leftTopItems,
      leftBottom: leftBottomItems,
      rightTop: rightTopItems,
      rightBottom: rightBottomItems,
    } = itemGroups

    const leftTopPanelOpen = this.isPanelOpen(leftTopActiveItem)
    const leftBottomPanelOpen = this.isPanelOpen(leftBottomActiveItem)
    const rightTopPanelOpen = this.isPanelOpen(rightTopActiveItem)
    const rightBottomPanelOpen = this.isPanelOpen(rightBottomActiveItem)

    return (
      <div
        className={clsx(
          drawerIsResizing ? 'select-none' : 'select-auto',
          className,
        )}
        flex="~ row"
        {...props}
      >
        {/* Left Sidebar Navigation */}
        {(leftTopItems.length > 0 || leftBottomItems.length > 0) && (
          <SidebarNavigation
            position="left"
            topItems={leftTopItems}
            bottomItems={leftBottomItems}
            topActiveItemId={leftTopActiveItem?.id ?? null}
            bottomActiveItemId={leftBottomActiveItem?.id ?? null}
            setTopActiveItemId={this.setLeftTopActiveItem}
            setBottomActiveItemId={this.setLeftBottomActiveItem}
          />
        )}

        <div flex="~ col" grow overflow-hidden>
          <div flex="~ row" grow overflow-hidden>
            {/* Left Sidebar Panel */}
            <SidebarPanel
              position="start"
              activeItem={leftTopActiveItem}
              open={leftTopPanelOpen}
              setDrawerIsResizing={this.setDrawerIsResizing}
              hidePanel={this.hideLeftTopPanel}
            >
              {createElement(leftTopActiveItem?.component ?? Fragment)}
            </SidebarPanel>

            {children}

            {/* Right Sidebar Panel */}
            <SidebarPanel
              position="end"
              activeItem={rightTopActiveItem}
              open={rightTopPanelOpen}
              setDrawerIsResizing={this.setDrawerIsResizing}
              hidePanel={this.hideRightTopPanel}
            >
              {createElement(rightTopActiveItem?.component ?? Fragment)}
            </SidebarPanel>
          </div>

          {/* Bottom Sidebar Panel */}
          <div flex="~ row">
            <SidebarPanel
              className="has-[.fui-InlineDrawer]:flex-1"
              position="bottom"
              activeItem={leftBottomActiveItem}
              open={leftBottomPanelOpen}
              setDrawerIsResizing={this.setDrawerIsResizing}
              hidePanel={this.hideLeftBottomPanel}
            >
              {createElement(leftBottomActiveItem?.component ?? Fragment)}
            </SidebarPanel>

            {leftBottomPanelOpen && rightBottomPanelOpen && (
              <SidebarResize
                w="4px"
                b-t="solid 1px $colorNeutralBackground5"
                b-l="solid 1px hover:2px $colorNeutralBackground5"
                cursor="col-resize"
                onMouseDown={this.startResizingBottomDrawers}
                isResizing={bottomDrawersIsResizing}
              />
            )}

            <SidebarPanel
              className="has-[.fui-InlineDrawer]:flex-1"
              position="bottom"
              activeItem={rightBottomActiveItem}
              open={rightBottomPanelOpen}
              setDrawerIsResizing={this.setDrawerIsResizing}
              hidePanel={this.hideRightBottomPanel}
            >
              {createElement(rightBottomActiveItem?.component ?? Fragment)}
            </SidebarPanel>
          </div>
        </div>

        {/* Right Sidebar Navigation */}
        {(rightTopItems.length > 0 || rightBottomItems.length > 0) && (
          <SidebarNavigation
            position="right"
            topItems={rightTopItems}
            bottomItems={rightBottomItems}
            topActiveItemId={rightTopActiveItem?.id ?? null}
            bottomActiveItemId={rightBottomActiveItem?.id ?? null}
            setTopActiveItemId={this.setRightTopActiveItem}
            setBottomActiveItemId={this.setRightBottomActiveItem}
          />
        )}
      </div>
    )
  }

  private initializeState(props: SidebarLayoutProps): Partial<SidebarLayoutState> {
    const {
      items,
      leftTopActiveItemId,
      leftBottomActiveItemId,
      rightTopActiveItemId,
      rightBottomActiveItemId,
    } = props

    const newState: Partial<SidebarLayoutState> = {}

    items?.forEach((item) => {
      switch (item.id) {
        case leftTopActiveItemId:
          newState.leftTopActiveItem = item as SidebarNavItem
          break
        case leftBottomActiveItemId:
          newState.leftBottomActiveItem = item as SidebarNavItem
          break
        case rightTopActiveItemId:
          newState.rightTopActiveItem = item as SidebarNavItem
          break
        case rightBottomActiveItemId:
          newState.rightBottomActiveItem = item as SidebarNavItem
          break
      }
    })

    return newState
  }

  private setActiveItem(position: SidebarPosition, activeItemId: SidebarActiveItemId) {
    const activeItem = this.props.items?.find(item => item.id === activeItemId) as SidebarNavItem ?? null
    const stateKey = `${position}ActiveItem` as keyof SidebarLayoutState

    this.setState(prevState => ({
      ...prevState,
      [stateKey]: (prevState[stateKey] as SidebarNavItem)?.id !== activeItemId ? activeItem : null,
    }))
  }

  private setLeftTopActiveItem = (id: SidebarActiveItemId) => this.setActiveItem('leftTop', id)

  private setLeftBottomActiveItem = (id: SidebarActiveItemId) => this.setActiveItem('leftBottom', id)

  private setRightTopActiveItem = (id: SidebarActiveItemId) => this.setActiveItem('rightTop', id)

  private setRightBottomActiveItem = (id: SidebarActiveItemId) => this.setActiveItem('rightBottom', id)

  private hideLeftTopPanel = () => this.setActiveItem('leftTop', null)

  private hideLeftBottomPanel = () => this.setActiveItem('leftBottom', null)

  private hideRightTopPanel = () => this.setActiveItem('rightTop', null)

  private hideRightBottomPanel = () => this.setActiveItem('rightBottom', null)

  private isPanelOpen(activeItem: SidebarActiveItem): boolean {
    return activeItem !== null
  };

  private setDrawerIsResizing = (state: boolean) => {
    this.setState({ drawerIsResizing: state })
  }

  private startResizingBottomDrawers = () => {
    this.setState({ bottomDrawersIsResizing: true })
  }
}
