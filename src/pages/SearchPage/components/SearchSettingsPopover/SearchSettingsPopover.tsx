import type { PopoverProps } from '@fluentui/react-components'
import { Button, FluentProvider, Popover, PopoverSurface, PopoverTrigger } from '@fluentui/react-components'
import { SettingsRegular } from '@fluentui/react-icons'
import { useState } from 'react'

import { useTheme, useThemeByMode } from '~/contexts/theme'

import type { SearchPageSettingsPopoverProps } from './SearchSettingsPopover.types.ts'
import { SettingsContent } from './SettingsContent.tsx'

export function SearchSettingsPopover({ className, pageSettings, onSettingsChange }: SearchPageSettingsPopoverProps) {
  const [open, setOpen] = useState<boolean>(false)
  const [backgroundIsDark, setBackgroundIsDark] = useState<boolean>(false)
  const handleOpenChange: PopoverProps['onOpenChange'] = (_e, data) => setOpen(data.open || false)

  const themeByMode = useThemeByMode(backgroundIsDark)
  const { theme } = useTheme()
  const triggerTheme = pageSettings.showBackground ? themeByMode : theme

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
          setBackgroundIsDark={setBackgroundIsDark}
          pageSettings={pageSettings}
          onSettingsChange={onSettingsChange}
        />
      </PopoverSurface>
    </Popover>
  )
}
