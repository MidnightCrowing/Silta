import type { AttributifyAttributes } from '@unocss/preset-attributify'
import type { ReactNode } from 'react'

// SkeletonItemProps.size 属性的类型
declare type SkeletonItemSize = 8 | 12 | 16 | 20 | 24 | 28 | 32 | 36 | 40 | 48 | 56 | 64 | 72 | 96 | 120 | 128

declare module 'react' {
  interface HTMLAttributes<T> extends Omit<AttributifyAttributes, 'icon'> {
    // 扩展 icon 属性，支持 ReactNode 和 UnoCSS 的字符串
    icon?: ReactNode | string
    duration?: string
    top?: string
    translate?: string
    height?: string
    object?: string
    left?: string
    aspect?: string
    delay?: string
    brightness?: string
    size?: string | SkeletonItemSize
  }
}
