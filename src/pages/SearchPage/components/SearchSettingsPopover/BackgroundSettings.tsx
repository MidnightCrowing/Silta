import { Button, Card, CardHeader, Switch, Text } from '@fluentui/react-components'
import { ImageRegular } from '@fluentui/react-icons'
import { convertFileSrc } from '@tauri-apps/api/core'
import { open } from '@tauri-apps/plugin-dialog'
import type { ChangeEvent } from 'react'
import { useCallback } from 'react'

import { isImageDark } from '~/api/image.ts'
import { getBackgroundFilePath, setBackgroundImage } from '~/settings'

import type { BackgroundSettingsProps } from './SearchSettingsPopover.types.ts'

export function BackgroundSettings({
  isBackgroundVisible,
  setBackgroundVisibility,
  setBackgroundUrl,
  backgroundIsDark,
  setBackgroundIsDark,
}: BackgroundSettingsProps) {
  const onChange = useCallback(
    (ev: ChangeEvent<HTMLInputElement>) => {
      setBackgroundVisibility(ev.currentTarget.checked)
    },
    [setBackgroundVisibility],
  )

  const onChangeImage = useCallback(async () => {
    try {
      const selectedFile = await open({
        filters: [{ name: 'Images', extensions: ['png', 'jpg', 'jpeg', 'gif', 'bmp'] }],
      })

      if (!selectedFile)
        return

      const bgPath = await setBackgroundImage('searchPage', selectedFile)
        .then(() => getBackgroundFilePath('searchPage'))

      setBackgroundUrl(bgPath ? convertFileSrc(bgPath) : '')

      if (bgPath) {
        const isDark = await isImageDark(bgPath)
        setBackgroundIsDark(isDark)
      }
    }
    catch (error) {
      console.error('Failed to change background image:', error)
    }
  }, [setBackgroundUrl, setBackgroundIsDark])

  const onChangeDarkMode = useCallback(
    (ev: ChangeEvent<HTMLInputElement>) => {
      setBackgroundIsDark(ev.currentTarget.checked)
    },
    [setBackgroundIsDark],
  )

  return (
    <section>
      <Card appearance="filled-alternative" size="small">
        <CardHeader
          header={<Text weight="semibold">背景</Text>}
          action={(
            <Switch
              checked={isBackgroundVisible}
              label={isBackgroundVisible ? '打开' : '关闭'}
              labelPosition="before"
              onChange={onChange}
            />
          )}
        />

        <Button icon={<ImageRegular />} onClick={onChangeImage}>
          编辑图像
        </Button>

        <div flex="~ row items-center justify-between">
          <Text
            className={!isBackgroundVisible ? 'color-$colorNeutralForegroundDisabled!' : undefined}
          >
            暗色背景
          </Text>
          <Switch
            checked={backgroundIsDark}
            label={backgroundIsDark ? '是' : '否'}
            labelPosition="before"
            onChange={onChangeDarkMode}
            disabled={!isBackgroundVisible}
          />
        </div>
      </Card>
    </section>
  )
}
