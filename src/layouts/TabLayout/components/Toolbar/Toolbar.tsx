import type { FC } from 'react'

import type { TabItem } from '../../shared/TabItem.types'
import type { ToolbarProps } from './Toolbar.types'

function generateUrlFromTabItem(item: TabItem): string {
  const { componentName, componentProps } = item

  const params = new URLSearchParams()

  if (componentProps) {
    for (const [key, value] of Object.entries(componentProps)) {
      params.append(key, String(value))
    }
  }

  const queryString = params.toString()
  return queryString ? `${componentName}?${queryString}` : componentName
}

export const Toolbar: FC<ToolbarProps> = ({ activeItem }) => {
  return (
    <div>
      {activeItem ? generateUrlFromTabItem(activeItem) : ''}
    </div>
  )
}
