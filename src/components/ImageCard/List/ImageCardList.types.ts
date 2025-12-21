import type { ReactNode } from 'react'

export interface ImageCardListProps {
  className?: string
  children: ReactNode

  /**
   * PhotoProvider背景透明度
   * 设置 null 背景不响应下拉变化
   * @defaultValue 0.85
   */
  maskOpacity?: number | null

  /**
   * 是否显示图片名称
   * @defaultValue false
   */
  showName?: boolean

  /**
   * 是否启用点击预览
   * @defaultValue false
   */
  enablePreview?: boolean
}
