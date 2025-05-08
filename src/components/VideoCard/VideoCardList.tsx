import { List, Skeleton } from '@fluentui/react-components'
import type { ReactNode } from 'react'

export default function VideoCardList({ className = '', children }: {
  className?: string
  children: ReactNode
}) {
  return (
    <Skeleton
      className={`grow flex-col gap-2px ${className}`}
      aria-label="Loading video list"
    >
      <List navigationMode="items">
        {children}
      </List>
    </Skeleton>
  )
}
