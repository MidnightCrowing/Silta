import {
  createPresenceComponent,
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
  Toolbar,
  ToolbarButton,
  ToolbarGroup,
  Tooltip,
} from '@fluentui/react-components'
import { MoreVertical24Regular, Subtract24Regular } from '@fluentui/react-icons'
import type { FC } from 'react'
import { Component, createRef, Suspense } from 'react'
import KeepAlive from 'react-activation'

import { SidebarResize } from '../SidebarResize'
import type { SidebarPanelProps, SidebarPanelState } from './SidebarPanel.types'

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

export class SidebarPanel extends Component<SidebarPanelProps, SidebarPanelState> {
  private panelRef = createRef<HTMLDivElement>()
  private animationFrame: number = 0

  state: Readonly<SidebarPanelState> = {
    drawerLength: 320,
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
        this.setState({ drawerLength: clientX - rect.left })
      }
      else if (position === 'end') {
        this.setState({ drawerLength: rect.right - clientX })
      }
      else if (position === 'bottom') {
        this.setState({ drawerLength: rect.bottom - clientY })
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
    const { drawerLength, drawerIsResizing, toolbarVisible } = this.state
    const { MoreOptionsButton, HideButton } = this
    const isBottom = position === 'bottom'

    return (
      <div className={className} relative {...props}>
        {/* Left panel resize component */}
        {open && position === 'end' && (
          <SidebarResize
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
          <SidebarResize
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
              ? { height: `min(${drawerLength}px, calc(100vh - 43px))` }
              : { width: `min(${drawerLength}px, calc(100vw - 43px))` }
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
            <KeepAlive cacheKey={activeItem?.id.toString()}>
              <Suspense>
                {children}
              </Suspense>
            </KeepAlive>
          </DrawerBody>
        </InlineDrawer>

        {/* Right panel resize component */}
        {open && position === 'start' && (
          <SidebarResize
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
