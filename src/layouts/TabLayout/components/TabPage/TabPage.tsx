import { createElement, forwardRef, Suspense, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react'
import KeepAlive from 'react-activation'

import { LocationProvider, useLocation } from '~/contexts/location'

import { componentMap } from '../../shared/componentMap'
import { DefaultTabIcon } from '../../shared/DefaultTabIcon.ts'
import { isLocationEqualToActiveItem } from '../../shared/TabItem.util.ts'
import { TabToolbar } from '../TabToolbar'
import type { LocationState, PageWrapperProps, PageWrapperRef, TabPageProps } from './TabPage.types'

const PageWrapper = forwardRef<PageWrapperRef, PageWrapperProps>(({
  activeItemId,
  activeItem,
  setPageTitle,
  setPageIcon,
  setPageComponentName,
  setPageComponentProps,
  setLocationState,
}, ref) => {
  const { location, isBack, isForward, setLocation, locationBack, locationForward } = useLocation()

  // 更新location时，同步Tab
  useEffect(() => {
    if (!isLocationEqualToActiveItem(location, activeItem)) {
      // console.log(1)
      setPageTitle(activeItemId, location.pageLabel)
      setPageIcon(activeItemId, location.pageIcon ?? DefaultTabIcon)
      setPageComponentName(activeItemId, location.pageComponentName)
      setPageComponentProps(activeItemId, location.pageComponentProps)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location])

  // 更新Tab时，同步location
  useEffect(() => {
    if (!isLocationEqualToActiveItem(location, activeItem)) {
      // console.log(2)
      setLocation({
        pageComponentName: activeItem.componentName,
        pageComponentProps: activeItem.componentProps,
        pageLabel: activeItem.label,
        pageIcon: activeItem.icon,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeItem])

  useEffect(() => {
    setLocationState({ isBack, isForward, locationBack, locationForward })
  }, [setLocationState, isBack, isForward, locationBack, locationForward])

  useImperativeHandle(ref, () => ({
    getLocationState: () => ({ isBack, isForward, locationBack, locationForward }),
  }))

  const Component = useMemo(() => componentMap[location.pageComponentName], [location])

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
        activeItemId={activeItemId}
        activeItem={activeItem}
        refreshPage={refreshPage}
        isBack={locationState.isBack}
        isForward={locationState.isForward}
        locationBack={locationState.locationBack}
        locationForward={locationState.locationForward}
        pageComponent={{ setName: setPageComponentName, setProps: setPageComponentProps }}
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
                activeItem={activeItem}
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
