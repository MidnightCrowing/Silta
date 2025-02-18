import {
  createPresenceComponent,
  Divider,
  DrawerBody,
  DrawerHeader,
  DrawerHeaderNavigation,
  DrawerHeaderTitle,
  InlineDrawer,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  MenuPopover,
  MenuTrigger,
  motionTokens,
  ToggleButton,
  Toolbar,
  ToolbarButton,
  ToolbarGroup,
  Tooltip,
} from '@fluentui/react-components'
import {
  bundleIcon,
  GridFilled,
  GridRegular,
  MoreVertical24Regular,
  Subtract24Regular,
} from '@fluentui/react-icons'
import clsx from 'clsx'
import type { FC } from 'react'
import { Component, createElement, createRef, Fragment, memo, Suspense } from 'react'
import KeepAlive from 'react-activation'

import type {
  ResizeComponentProps,
  SidebarActiveItem,
  SidebarActiveItemId,
  SidebarButton,
  SidebarItem,
  SidebarLayoutProps,
  SidebarLayoutState,
  SidebarNavigationProps,
  SidebarNavItem,
  SidebarPanelProps,
  SidebarPanelState,
  SidebarPosition,
} from './SidebarLayout.types'

const DefaultIcon = bundleIcon(GridFilled, GridRegular)

const ToolbarFade = createPresenceComponent({
  enter: {
    keyframes: [{ opacity: 0 }, { opacity: 1 }],
    easing: motionTokens.curveEasyEase,
    duration: motionTokens.durationNormal,
  },
  exit: {
    keyframes: [{ opacity: 1 }, { opacity: 0 }],
    easing: motionTokens.curveEasyEase,
    duration: motionTokens.durationNormal,
  },
})

const ResizeComponent: FC<ResizeComponentProps> = memo(({ isResizing, onMouseDown, ...props }) => (
  <div
    className={isResizing ? 'b-r-(3px $colorNeutralBackground5Pressed)' : ''}
    z="3"
    onMouseDown={onMouseDown}
    {...props}
  />
))

class SidebarNavigation extends Component<SidebarNavigationProps> {
  private changeActiveItem(position: 'top' | 'bottom', id: SidebarActiveItemId) {
    const setActiveItemId = position === 'top' ? this.props.setTopActiveItemId : this.props.setBottomActiveItemId
    setActiveItemId(id)
  }

  private SideBarItemButton: FC<{ position: 'top' | 'bottom', item: SidebarItem }> = ({ position, item }) => {
    const { topActiveItemId, bottomActiveItemId } = this.props
    const { id, type = 'item' } = item

    switch (type) {
      case 'item': {
        const { label, icon: Icon = DefaultIcon } = item as SidebarNavItem

        return (
          <Tooltip content={label} relationship="label" positioning="after" withArrow>
            <ToggleButton
              checked={topActiveItemId === id || bottomActiveItemId === id}
              icon={<Icon />}
              appearance="subtle"
              onClick={() => this.changeActiveItem(position, id)}
            />
          </Tooltip>
        )
      }

      case 'divider':
        return <Divider />

      case 'button': {
        const { component: Component = Fragment } = item as SidebarButton

        return <Component />
      }

      default:
        throw new Error(`Unknown sidebar item type: ${type}`)
    }
  }

  render() {
    const {
      children,
      className,
      position,
      topItems,
      bottomItems,
      topActiveItemId,
      bottomActiveItemId,
      setTopActiveItemId,
      setBottomActiveItemId,
      ...props
    } = this.props
    const { SideBarItemButton } = this

    return (
      <div
        className={clsx(
          position === 'left'
            ? 'b-r-(solid 1px $colorNeutralBackground5)'
            : 'b-l-(solid 1px $colorNeutralBackground5)',
          className,
        )}
        flex="~ col justify-between"
        gap="8px"
        p="5px"
        {...props}
      >
        {([
          { position: 'top', items: topItems },
          { position: 'bottom', items: bottomItems },
        ] as const).map(({ position, items }) => (
          <div key={position} flex="~ col" gap="8px">
            {items?.map(item => <SideBarItemButton key={item.id} position={position} item={item} />)}
          </div>
        ))}
      </div>
    )
  }
}

class SidebarPanel extends Component<SidebarPanelProps, SidebarPanelState> {
  private panelRef = createRef<HTMLDivElement>()
  private animationFrame: number = 0

  state: Readonly<SidebarPanelState> = {
    drawerWidth: 320,
    drawerHeight: 320,
    drawerIsResizing: false,
    toolbarVisible: false,
  }

  // #region 显示/隐藏工具栏
  private handlePointerEnter = () => {
    this.setState({ toolbarVisible: true })
  }

  private handlePointerLeave = (e: PointerEvent) => {
    if (!this.panelRef.current?.contains(e.relatedTarget as Node)) {
      this.setState({ toolbarVisible: false })
    }
  }
  // #endregion

  // #region 调整抽屉大小
  private resizeDrawer = ({ clientX, clientY }: MouseEvent) => {
    this.animationFrame = requestAnimationFrame(() => {
      if (!this.state.drawerIsResizing || !this.panelRef.current)
        return

      const rect = this.panelRef.current.getBoundingClientRect()
      const { position } = this.props

      if (position === 'start') {
        this.setState({ drawerWidth: clientX - rect.left })
      }
      else if (position === 'end') {
        this.setState({ drawerWidth: rect.right - clientX })
      }
      else if (position === 'bottom') {
        this.setState({ drawerHeight: rect.bottom - clientY })
      }
    })
  }

  private startResizingDrawer = () => {
    this.setState({ drawerIsResizing: true })
    this.props.setDrawerIsResizing(true)
  }

  private stopResizingDrawer = () => {
    this.setState({ drawerIsResizing: false })
    this.props.setDrawerIsResizing(false)
  }
  // #endregion

  // 在组件挂载后添加事件监听
  componentDidMount() {
    document.addEventListener('mousemove', this.resizeDrawer)
    document.addEventListener('mouseup', this.stopResizingDrawer)

    this.onOpen()
  }

  componentDidUpdate(prevProps: SidebarPanelProps) {
    if (!prevProps.open && this.props.open) {
      this.onOpen()
    }
    else if (prevProps.open && !this.props.open) {
      this.onClose()
    }
  }

  // 在组件卸载前移除事件监听并清理动画帧
  componentWillUnmount() {
    cancelAnimationFrame(this.animationFrame)
    document.removeEventListener('mousemove', this.resizeDrawer)
    document.removeEventListener('mouseup', this.stopResizingDrawer)

    this.onClose()
  }

  private onOpen = () => {
    // 在这里执行打开时的逻辑，比如绑定某些事件或初始化状态

    const sidebar = this.panelRef.current
    if (sidebar) {
      sidebar.addEventListener('pointerenter', this.handlePointerEnter)
      sidebar.addEventListener('pointerleave', this.handlePointerLeave)
    }
  }

  private onClose = () => {
    // 在这里执行关闭时的逻辑，比如清理状态或解绑事件

    const sidebar = this.panelRef.current
    if (sidebar) {
      sidebar.removeEventListener('pointerenter', this.handlePointerEnter)
      sidebar.removeEventListener('pointerleave', this.handlePointerLeave)
    }
  }

  private MoreOptionsButton: FC = () => (
    <Menu>
      <MenuTrigger disableButtonEnhancement>
        <Tooltip content="选项" relationship="label">
          <MenuButton
            aria-label="More options"
            appearance="subtle"
            icon={<MoreVertical24Regular />}
          />
        </Tooltip>
      </MenuTrigger>
      <MenuPopover>
        <MenuList>
          <MenuItem>Item a</MenuItem>
          <MenuItem>Item b</MenuItem>
        </MenuList>
      </MenuPopover>
    </Menu>
  )

  private HideButton: FC = () => (
    <Tooltip content="隐藏" relationship="label">
      <ToolbarButton
        aria-label="Close panel"
        appearance="subtle"
        icon={<Subtract24Regular />}
        onClick={this.props.hidePanel}
      />
    </Tooltip>
  )

  render() {
    const { children, className, position, activeItem, open, setDrawerIsResizing, hidePanel, ...props } = this.props
    const { drawerWidth, drawerHeight, drawerIsResizing, toolbarVisible } = this.state
    const { MoreOptionsButton, HideButton } = this
    const isBottom = position === 'bottom'

    return (
      <div className={className} relative {...props}>
        {/* Left panel resize component */}
        {open && position === 'end' && (
          <ResizeComponent
            absolute
            pos="top-0 bottom-0 left-0"
            w="4px"
            b-l="solid 1px hover:2px $colorNeutralBackground5"
            cursor="col-resize"
            onMouseDown={this.startResizingDrawer}
            isResizing={drawerIsResizing}
          />
        )}

        {/* Bottom panel resize component */}
        {open && position === 'bottom' && (
          <ResizeComponent
            absolute
            pos="top-0 left-0 right-0"
            h="4px"
            b-t="solid 1px hover:2px $colorNeutralBackground5"
            cursor="row-resize"
            onMouseDown={this.startResizingDrawer}
            isResizing={drawerIsResizing}
          />
        )}

        <InlineDrawer
          surfaceMotion={null}
          className={
            isBottom
              ? 'w-full! min-h-50px'
              : 'h-full! min-w-50px'
          }
          position={position}
          separator
          ref={this.panelRef}
          open={open}
          style={
            isBottom
              ? { height: `min(${drawerHeight}px, calc(100vh - 43px))` }
              : { width: `min(${drawerWidth}px, calc(100vw - 43px))` }
          }
        >
          <DrawerHeader className="p-(t-15px! x-5px!)">
            <DrawerHeaderNavigation className="flex justify-between m-(l-10px! r-0!)">
              <DrawerHeaderTitle>
                {activeItem?.label}
              </DrawerHeaderTitle>

              <ToolbarFade visible={toolbarVisible}>
                <Toolbar>
                  <ToolbarGroup className="flex">
                    <MoreOptionsButton />
                    <HideButton />
                  </ToolbarGroup>
                </Toolbar>
              </ToolbarFade>
            </DrawerHeaderNavigation>
          </DrawerHeader>

          <DrawerBody className="p-(x-10px! b-11px!)">
            <KeepAlive cacheKey={activeItem?.id.toString() ?? ''}>
              <Suspense>
                {children}
              </Suspense>
            </KeepAlive>
          </DrawerBody>
        </InlineDrawer>

        {/* Right panel resize component */}
        {open && position === 'start' && (
          <ResizeComponent
            absolute
            pos="top-0 bottom-0 right-0"
            w="4px"
            b-r="solid 1px hover:2px $colorNeutralBackground5"
            cursor="col-resize"
            onMouseDown={this.startResizingDrawer}
            isResizing={drawerIsResizing}
          />
        )}
      </div>
    )
  }
}

class SidebarLayout extends Component<SidebarLayoutProps, SidebarLayoutState> {
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

    const { items, leftTopActiveItemId, leftBottomActiveItemId, rightTopActiveItemId, rightBottomActiveItemId } = this.props

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

    this.state = { ...this.state, ...newState }
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
          <div flex="~ row" grow>
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
              <ResizeComponent
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
}

export default SidebarLayout
