import clsx from 'clsx'
import { Component, createElement, Fragment } from 'react'

import { SidebarNavigation, SidebarPanelWrapper, SidebarResize } from './components'
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
    isFadeTopbarPinned: false,
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
      isFadeTopbarPinned,
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

    const leftTopElement = leftTopActiveItem?.component ?? Fragment
    const leftBottomElement = leftBottomActiveItem?.component ?? Fragment
    const rightTopElement = rightTopActiveItem?.component ?? Fragment
    const rightBottomElement = rightBottomActiveItem?.component ?? Fragment

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
            <SidebarPanelWrapper
              position="leftTop"
              activeItem={leftTopActiveItem}
              isFadeTopbarPinned={isFadeTopbarPinned}
              open={leftTopPanelOpen}
              setDrawerIsResizing={this.setDrawerIsResizing}
              setFadeTopbarPinned={this.setFadeTopbarPinned}
              setItemPosition={this.setItemPosition}
              hidePanel={this.hideLeftTopPanel}
            >
              {createElement(leftTopElement)}
            </SidebarPanelWrapper>

            {children}

            {/* Right Sidebar Panel */}
            <SidebarPanelWrapper
              position="rightTop"
              activeItem={rightTopActiveItem}
              isFadeTopbarPinned={isFadeTopbarPinned}
              open={rightTopPanelOpen}
              setDrawerIsResizing={this.setDrawerIsResizing}
              setFadeTopbarPinned={this.setFadeTopbarPinned}
              setItemPosition={this.setItemPosition}
              hidePanel={this.hideRightTopPanel}
            >
              { createElement(rightTopElement)}
            </SidebarPanelWrapper>
          </div>

          {/* Bottom Sidebar Panel */}
          <div flex="~ row">
            <SidebarPanelWrapper
              className="has-[.fui-InlineDrawer]:flex-1"
              position="leftBottom"
              activeItem={leftBottomActiveItem}
              isFadeTopbarPinned={isFadeTopbarPinned}
              open={leftBottomPanelOpen}
              setDrawerIsResizing={this.setDrawerIsResizing}
              setFadeTopbarPinned={this.setFadeTopbarPinned}
              setItemPosition={this.setItemPosition}
              hidePanel={this.hideLeftBottomPanel}
            >
              {createElement(leftBottomElement)}
            </SidebarPanelWrapper>

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

            <SidebarPanelWrapper
              className="has-[.fui-InlineDrawer]:flex-1"
              position="rightBottom"
              activeItem={rightBottomActiveItem}
              isFadeTopbarPinned={isFadeTopbarPinned}
              open={rightBottomPanelOpen}
              setDrawerIsResizing={this.setDrawerIsResizing}
              setFadeTopbarPinned={this.setFadeTopbarPinned}
              setItemPosition={this.setItemPosition}
              hidePanel={this.hideRightBottomPanel}
            >
              { createElement(rightBottomElement)}
            </SidebarPanelWrapper>
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

  private setFadeTopbarPinned = (value: boolean) => {
    this.setState({ isFadeTopbarPinned: value })
  }

  private setItemPosition = (itemId: SidebarActiveItemId, newPosition: SidebarPosition) => {
    const item = this.props.items?.find(item => item.id === itemId)
    if (item !== undefined) {
      item.position = newPosition

      this.setState((prevState) => {
        const newState: Partial<SidebarLayoutState> = {}

        if (itemId === prevState.leftTopActiveItem?.id || newPosition === 'leftTop') {
          newState.leftTopActiveItem = newPosition === 'leftTop' ? (item as SidebarNavItem) : null
        }
        if (itemId === prevState.leftBottomActiveItem?.id || newPosition === 'leftBottom') {
          newState.leftBottomActiveItem = newPosition === 'leftBottom' ? (item as SidebarNavItem) : null
        }
        if (itemId === prevState.rightTopActiveItem?.id || newPosition === 'rightTop') {
          newState.rightTopActiveItem = newPosition === 'rightTop' ? (item as SidebarNavItem) : null
        }
        if (itemId === prevState.rightBottomActiveItem?.id || newPosition === 'rightBottom') {
          newState.rightBottomActiveItem = newPosition === 'rightBottom' ? (item as SidebarNavItem) : null
        }

        return { ...prevState, ...newState }
      })
    }
  }
}
