export interface SearchPageSettings {
  showBackground: boolean
  backgroundUrl: string
  // showLogo: boolean
  // showSearchBox: boolean
}

export interface BackgroundSettingsProps {
  isBackgroundVisible: boolean
  setBackgroundVisibility: (isVisible: boolean) => void
  setBackgroundUrl: (url: string) => void
  backgroundIsDark: boolean
  setBackgroundIsDark: (isDark: boolean) => void
}

type onSettingsChange = (settings: Partial<SearchPageSettings>) => void

export interface SettingsContentProps {
  onClose: () => void
  backgroundIsDark: boolean
  setBackgroundIsDark: (isDark: boolean) => void
  pageSettings: SearchPageSettings
  onSettingsChange: onSettingsChange
}

export interface SearchPageSettingsPopoverProps {
  /**
   * @description 自定义类名，仅应用于 PopoverTrigger 按钮
   */
  className?: string

  /**
   * @description 是否显示设置按钮
   */
  showSettingsButton?: boolean

  /**
   * @description 页面设置
   */
  pageSettings: SearchPageSettings

  /**
   * @description 设置回调函数
   */
  onSettingsChange: onSettingsChange
}
