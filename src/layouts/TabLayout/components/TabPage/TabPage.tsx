import { createElement, Suspense, useEffect } from 'react'
import KeepAlive from 'react-activation'

import { LocationProvider, useLocation } from '~/contexts/location'
import { MultiPreviewPage, SearchPage, SinglePreviewPage, VideoPage } from '~/pages'

import { TabComponentNameEnum } from '../../shared/TabItem.types'
import { DefaultTabIcon } from '../SortableTab'
import type { ComponentMapType, PageWrapperProps, TabPageProps } from './TabPage.types'

const componentMap: ComponentMapType = {
  [TabComponentNameEnum.NewPage]: SearchPage,
  [TabComponentNameEnum.SearchPage]: SearchPage,
  [TabComponentNameEnum.MultiPreviewPage]: MultiPreviewPage,
  [TabComponentNameEnum.SinglePreviewPage]: SinglePreviewPage,
  [TabComponentNameEnum.VideoPage]: VideoPage,
}

function PageWrapper({
  activeItemId,
  setPageTitle,
  setPageIcon,
  setPageComponentName,
  setPageComponentProps,
}: PageWrapperProps) {
  const { location } = useLocation()

  useEffect(() => {
    setPageTitle(activeItemId, location.pageLabel)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pageLabel])

  useEffect(() => {
    setPageIcon(activeItemId, location.pageIcon ?? DefaultTabIcon)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pageIcon])

  useEffect(() => {
    setPageComponentName(activeItemId, location.pageComponentName)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pageComponentName])

  useEffect(() => {
    setPageComponentProps(activeItemId, location.pageComponentProps)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pageComponentProps])

  const Component = componentMap[location.pageComponentName]

  return (
    <Suspense>
      {createElement(Component, { className: 'size-full box-border' })}
    </Suspense>
  )
}

export function TabPage({
  activeItemId,
  activeItem,
  setPageTitle,
  setPageIcon,
  setPageComponentName,
  setPageComponentProps,
}: TabPageProps) {
  return (
    <KeepAlive cacheKey={activeItemId}>
      <LocationProvider
        pageLabel={activeItem.label}
        pageIcon={activeItem.icon}
        pageComponentName={activeItem.componentName}
        pageComponentProps={activeItem.componentProps}
      >
        <PageWrapper
          activeItemId={activeItemId}
          setPageTitle={setPageTitle}
          setPageIcon={setPageIcon}
          setPageComponentName={setPageComponentName}
          setPageComponentProps={setPageComponentProps}
        />
      </LocationProvider>
    </KeepAlive>
  )
}
