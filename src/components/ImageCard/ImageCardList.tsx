import { Skeleton } from '@fluentui/react-components'
import type { ReactNode } from 'react'

export default function ImageCardList({ className = '', children }: {
  className?: string
  children: ReactNode
}) {
  return (
    <Skeleton
      className={className}
      animation="pulse"
      aria-label="Loading image list"
    >
      {children}
    </Skeleton>
  )
}
