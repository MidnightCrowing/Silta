import { createElement, forwardRef, Suspense, useEffect, useImperativeHandle, useRef, useState } from 'react'
import KeepAlive from 'react-activation'

import { LocationProvider, useLocation } from '~/contexts/location'

import { componentMap } from '../../shared/componentMap'
import { DefaultTabIcon } from '../../shared/DefaultTabIcon'
import { TabToolbar } from '../TabToolbar'
import type { LocationState, PageWrapperProps, PageWrapperRef, TabPageProps } from './TabPage.types'

const PageWrapper = forwardRef<PageWrapperRef, PageWrapperProps>(({
  activeItemId,
  setPageTitle,
  setPageIcon,
  setPageComponentName,
  setPageComponentProps,
  setLocationState,
}, ref) => {
  const { location, isBack, isForward, locationBack, locationForward } = useLocation()

  useEffect(() => {
    setPageTitle(activeItemId, location.pageLabel)
    setPageIcon(activeItemId, location.pageIcon ?? DefaultTabIcon)
    setPageComponentName(activeItemId, location.pageComponentName)
    setPageComponentProps(activeItemId, location.pageComponentProps)
  }, [
    activeItemId,
    location,
    setPageTitle,
    setPageIcon,
    setPageComponentName,
    setPageComponentProps,
  ])

  useEffect(() => {
    setLocationState({ isBack, isForward, locationBack, locationForward })
  }, [setLocationState, isBack, isForward, locationBack, locationForward])

  useImperativeHandle(ref, () => ({
    getLocationState: () => ({ isBack, isForward, locationBack, locationForward }),
  }))

  const Component = componentMap[location.pageComponentName]

  return (
    <Suspense>
      {createElement(Component, { className: 'size-full box-border' })}
    </Suspense>
  )
})

export function TabPage({
  activeItemId,
  activeItem,
  setPageTitle,
  setPageIcon,
  setPageComponentName,
  setPageComponentProps,
}: TabPageProps) {
  const pageWrapperRef = useRef<PageWrapperRef | null>(null)
  const [showPageWrapper, setShowPageWrapper] = useState<boolean>(true)
  const [locationState, setLocationState] = useState<LocationState>({
    isBack: false,
    isForward: false,
    locationBack: () => {},
    locationForward: () => {},
  })

  const refreshPage = () => {
    setShowPageWrapper(false) // 先卸载组件
    setTimeout(() => setShowPageWrapper(true), 10) // 等待一段时间后重新加载组件
  }

  const updateLocationState = () => {
    const newState = pageWrapperRef.current?.getLocationState()
    if (newState) {
      setLocationState(newState)
    }
  }

  useEffect(() => {
    updateLocationState()
  }, [activeItemId])

  return (
    <div size-full flex="~ col">
      <TabToolbar
        activeItem={activeItem}
        refreshPage={refreshPage}
        isBack={locationState.isBack}
        isForward={locationState.isForward}
        locationBack={locationState.locationBack}
        locationForward={locationState.locationForward}
      />

      <div grow overflow-auto>
        <KeepAlive cacheKey={activeItemId}>
          <LocationProvider
            pageLabel={activeItem.label}
            pageIcon={activeItem.icon}
            pageComponentName={activeItem.componentName}
            pageComponentProps={activeItem.componentProps}
          >
            {showPageWrapper && (
              <PageWrapper
                ref={pageWrapperRef}
                activeItemId={activeItemId}
                setPageTitle={setPageTitle}
                setPageIcon={setPageIcon}
                setPageComponentName={setPageComponentName}
                setPageComponentProps={setPageComponentProps}
                setLocationState={setLocationState}
              />
            )}
          </LocationProvider>
        </KeepAlive>
      </div>
    </div>
  )
}
