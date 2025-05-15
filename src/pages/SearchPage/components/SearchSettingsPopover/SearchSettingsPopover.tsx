import type { PopoverProps } from '@fluentui/react-components'
import { Button, FluentProvider, Popover, PopoverSurface, PopoverTrigger } from '@fluentui/react-components'
import { SettingsRegular } from '@fluentui/react-icons'
import { useEffect, useState } from 'react'

import { useTheme, useThemeByMode } from '~/contexts/theme'
import { getSearchConfig, updateSearchConfig } from '~/settings'

import type { SearchPageSettingsPopoverProps } from './SearchSettingsPopover.types.ts'
import { SettingsContent } from './SettingsContent.tsx'

export function SearchSettingsPopover({ className, pageSettings, onSettingsChange }: SearchPageSettingsPopoverProps) {
  const [open, setOpen] = useState<boolean>(false)
  const [backgroundIsDark, setBackgroundIsDark] = useState<boolean>(false)
  const handleOpenChange: PopoverProps['onOpenChange'] = (_e, data) => setOpen(data.open || false)

  const themeByMode = useThemeByMode(backgroundIsDark)
  const { theme } = useTheme()
  const triggerTheme = pageSettings.showBackground ? themeByMode : theme

  // 从配置文件中获取设置
  useEffect(() => {
    getSearchConfig()
      .then((config) => {
        setBackgroundIsDark(config.bgIsDark)
      })
  })

  const setBgIsDark = async (isDark: boolean) => {
    setBackgroundIsDark(isDark)
    await updateSearchConfig('bgIsDark', isDark)
  }

  return (
    <Popover positioning="below-end" size="small" open={open} onOpenChange={handleOpenChange}>
      <FluentProvider theme={triggerTheme}>
        <PopoverTrigger disableButtonEnhancement>
          <Button
            className={className}
            appearance="subtle"
            shape="circular"
            icon={<SettingsRegular />}
            iconPosition="after"
          />
        </PopoverTrigger>
      </FluentProvider>

      <PopoverSurface tabIndex={-1}>
        <SettingsContent
          onClose={() => { setOpen(false) }}
          backgroundIsDark={backgroundIsDark}
          setBackgroundIsDark={setBgIsDark}
          pageSettings={pageSettings}
          onSettingsChange={onSettingsChange}
        />
      </PopoverSurface>
    </Popover>
  )
}
