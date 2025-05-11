import { Button, Text } from '@fluentui/react-components'
import { Dismiss16Regular } from '@fluentui/react-icons'

import { BackgroundSettings } from './BackgroundSettings.tsx'
import type { SettingsContentProps } from './SearchSettingsPopover.types.ts'

export function SettingsContent({
  onClose,
  backgroundIsDark,
  setBackgroundIsDark,
  pageSettings,
  onSettingsChange,
}: SettingsContentProps) {
  return (
    <div w="295px">
      <header p="b-10px" flex="~ row items-center justify-between" gap="5px">
        <Text weight="semibold">页面设置</Text>
        <Button appearance="subtle" size="small" icon={<Dismiss16Regular />} onClick={onClose} />
      </header>

      <BackgroundSettings
        isBackgroundVisible={pageSettings.showBackground}
        setBackgroundVisibility={(isVisible: boolean) => onSettingsChange({ showBackground: isVisible })}
        setBackgroundUrl={(url: string) => onSettingsChange({ backgroundUrl: url })}
        backgroundIsDark={backgroundIsDark}
        setBackgroundIsDark={setBackgroundIsDark}
      />
    </div>
  )
}
