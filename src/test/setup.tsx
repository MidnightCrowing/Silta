import '@testing-library/jest-dom'

import React from 'react'
import { vi } from 'vitest'

// 模拟 react-activation
vi.mock('react-activation', () => {
  const KeepAlive = ({ children }: { children: React.ReactNode }) => <>{children}</>
  return {
    AliveScope: ({ children }: { children: React.ReactNode }) => <>{children}</>,
    KeepAlive,
    default: KeepAlive,
  }
})
