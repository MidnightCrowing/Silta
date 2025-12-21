import { createContext, useContext } from 'react'

export interface ImageCardListContextType {
  /**
   * 是否显示图片名称
   * @defaultValue false
   */
  showName: boolean

  /**
   * 是否启用点击预览
   * @defaultValue false
   */
  enablePreview: boolean
}

export const ImageCardListContextContext = createContext<ImageCardListContextType | null>(null)

export function useImageCardListContextContext() {
  const ctx = useContext(ImageCardListContextContext)
  if (!ctx)
    throw new Error('useImageCardListContextContext must be used within ImageCardList')
  return ctx
}
