import { InlineDrawer } from '@fluentui/react-components'
import { Suspense, useCallback, useEffect, useRef, useState } from 'react'
import KeepAlive from 'react-activation'

import { SidebarResize } from '../SidebarResize'
import type { SidebarPanelWrapperProps } from './SidebarPanelWrapper.types.ts'

export function SidebarPanelWrapper({
  className,
  children,
  position,
  activeItem,
  open,
  setDrawerIsResizing,
  hidePanel,
  ...props
}: SidebarPanelWrapperProps) {
  const sidebarRef = useRef<HTMLDivElement>(null)
  const animationFrame = useRef<number>(0)
  const [isResizing, setIsResizing] = useState<boolean>(false)
  const [drawerLength, setDrawerLength] = useState<number>(320)
  const [pointerEnter, setPointerEnter] = useState(false)

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

      if (position === 'start') {
        setDrawerLength(clientX - rect.left)
      }
      else if (position === 'end') {
        setDrawerLength(rect.right - clientX)
      }
      else if (position === 'bottom') {
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
          onMouseDown={startResizingDrawer}
          isResizing={isResizing}
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
          onMouseDown={startResizingDrawer}
          isResizing={isResizing}
        />
      )}

      <InlineDrawer
        ref={sidebarRef}
        surfaceMotion={null}
        className={
          isBottom
            ? 'w-full! min-h-50px'
            : 'h-full! min-w-50px'
        }
        open={open}
        position={position}
        separator
        style={
          isBottom
            ? { height: `min(${drawerLength}px, calc(100vh - 43px))` }
            : { width: `min(${drawerLength}px, calc(100vw - 43px))` }
        }
      >
        <KeepAlive cacheKey={activeItem?.id.toString()}>
          <Suspense>
            {children(hidePanel, pointerEnter)}
          </Suspense>
        </KeepAlive>
      </InlineDrawer>

      {/* Right panel resize component */}
      {open && position === 'start' && (
        <SidebarResize
          absolute
          pos="top-0 bottom-0 right-0"
          w="4px"
          b-r="solid 1px hover:2px $colorNeutralBackground5"
          cursor="col-resize"
          onMouseDown={startResizingDrawer}
          isResizing={isResizing}
        />
      )}
    </div>
  )
}
