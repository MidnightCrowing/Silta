import type { AttributifyAttributes } from '@unocss/preset-attributify'
import type { ReactNode } from 'react'

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
  }
}
