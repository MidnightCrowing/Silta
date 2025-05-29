import { InlineDrawer } from '@fluentui/react-components'
import clsx from 'clsx'
import { Suspense, useCallback, useEffect, useMemo, useRef, useState } from 'react'

import type { SidebarPosition } from '../../shared/SidebarItem.types.ts'
import { SidebarResize } from '../SidebarResize'
import type { SidebarPanelWrapperProps } from './SidebarPanelWrapper.types.ts'
import type { SidebarPanelWrapperContextType } from './SidebarPanelWrapperContext.ts'
import { SidebarPanelWrapperContext } from './SidebarPanelWrapperContext.ts'

export function SidebarPanelWrapper({
  className,
  children,
  position,
  activeItem,
  isFadeTopbarPinned,
  open,
  setDrawerIsResizing,
  setFadeTopbarPinned,
  setItemPosition,
  hidePanel,
  ...props
}: SidebarPanelWrapperProps) {
  const sidebarRef = useRef<HTMLDivElement>(null)
  const animationFrame = useRef<number>(0)
  const [isResizing, setIsResizing] = useState<boolean>(false)
  const [drawerLength, setDrawerLength] = useState<number>(320)
  const [pointerEnter, setPointerEnter] = useState<boolean>(false)

  const startResizingDrawer = useCallback(() => {
    setDrawerIsResizing(true)
    setIsResizing(true)
  }, [setDrawerIsResizing])

  const stopResizing = useCallback(() => {
    setDrawerIsResizing(false)
    setIsResizing(false)
  }, [setDrawerIsResizing])

  const resizeDrawer = useCallback(({ clientX, clientY }: MouseEvent) => {
    requestAnimationFrame(() => {
      if (!isResizing || !sidebarRef.current)
        return

      const rect = sidebarRef.current.getBoundingClientRect()

      if (position === 'leftTop') {
        setDrawerLength(clientX - rect.left)
      }
      else if (position === 'rightTop') {
        setDrawerLength(rect.right - clientX)
      }
      else {
        setDrawerLength(rect.bottom - clientY)
      }
    })
  }, [isResizing, position])

  const handlePointerEnter = useCallback(() => {
    setPointerEnter(true)
  }, [])

  const handlePointerLeave = useCallback((e: PointerEvent) => {
    if (!sidebarRef.current?.contains(e.relatedTarget as Node)) {
      setPointerEnter(false)
    }
  }, [])

  useEffect(() => {
    window.addEventListener('mousemove', resizeDrawer)
    window.addEventListener('mouseup', stopResizing)

    return () => {
      cancelAnimationFrame(animationFrame.current)
      window.removeEventListener('mousemove', resizeDrawer)
      window.removeEventListener('mouseup', stopResizing)
    }
  }, [resizeDrawer, stopResizing])

  useEffect(() => {
    const sidebar = sidebarRef.current
    if (sidebar) {
      sidebar.addEventListener('pointerenter', handlePointerEnter)
      sidebar.addEventListener('pointerleave', handlePointerLeave)
    }

    return () => {
      if (sidebar) {
        sidebar.removeEventListener('pointerenter', handlePointerEnter)
        sidebar.removeEventListener('pointerleave', handlePointerLeave)
      }
    }
  }, [handlePointerEnter, handlePointerLeave, open])

  const drawerPosition = useMemo<'start' | 'end' | 'bottom'>(() => {
    switch (position) {
      case 'leftTop':
        return 'start'
      case 'rightTop':
        return 'end'
      default:
        return 'bottom'
    }
  }, [position])

  const isBottom: boolean = useMemo(() => {
    return position === 'leftBottom' || position === 'rightBottom'
  }, [position])

  const setPosition = useCallback((newPosition: SidebarPosition) => {
    if (activeItem) {
      setItemPosition(activeItem?.id, newPosition)
    }
  }, [activeItem, setItemPosition])

  const contextValue: SidebarPanelWrapperContextType = useMemo(() => ({
    position,
    pointerEnter,
    hidePanel,
    isFadeTopbarPinned,
    setPosition,
    setFadeTopbarPinned,
  }), [position, pointerEnter, hidePanel, isFadeTopbarPinned, setPosition, setFadeTopbarPinned])

  return (
    <div className={className} relative {...props}>
      {/* Right panel resize component */}
      {open && position === 'rightTop' && (
        <SidebarResize
          absolute
          pos="top-0 bottom-0 left-0"
          w="4px"
          b-l="solid 2px transparent hover:(2px $colorBrandBackgroundHover)"
          m="t-49px b-6px"
          cursor="col-resize"
          onMouseDown={startResizingDrawer}
          isResizing={isResizing}
        />
      )}

      {/* Bottom panel resize component */}
      {open && isBottom && (
        <SidebarResize
          absolute
          pos="top-0 left-0 right-0"
          h="4px"
          b-t="solid 2px transparent hover:(2px $colorBrandBackground)"
          cursor="row-resize"
          onMouseDown={startResizingDrawer}
          isResizing={isResizing}
        />
      )}

      <InlineDrawer
        ref={sidebarRef}
        surfaceMotion={null}
        className={clsx(
          'bg-transparent!',
          isBottom ? 'w-full! min-h-50px' : 'h-full! min-w-50px',
          isBottom && 'b-t-(solid 2px! $colorNeutralBackground1!)',
        )}
        open={open}
        position={drawerPosition}
        style={
          isBottom
            ? { height: `min(${drawerLength}px, calc(100vh - 43px))` }
            : { width: `min(${drawerLength}px, calc(100vw - 43px))` }
        }
      >
        <SidebarPanelWrapperContext.Provider value={contextValue}>
          <Suspense>
            {children}
          </Suspense>
        </SidebarPanelWrapperContext.Provider>
      </InlineDrawer>

      {/* Left panel resize component */}
      {open && position === 'leftTop' && (
        <SidebarResize
          absolute
          pos="top-0 bottom-0 right-0"
          w="4px"
          b-r="solid 2px transparent hover:(2px $colorBrandBackgroundHover)"
          m="t-45px b-6px"
          cursor="col-resize"
          onMouseDown={startResizingDrawer}
          isResizing={isResizing}
        />
      )}
    </div>
  )
}
