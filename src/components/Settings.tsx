import {
  Button,
  Dialog,
  DialogActions,
  DialogBody,
  DialogContent,
  DialogSurface,
  DialogTitle,
  DialogTrigger,
} from '@fluentui/react-components'
import { SettingsRegular } from '@fluentui/react-icons'

import { useTheme } from '~/theme/useTheme.ts'

function SettingsDialog() {
  const { themeName, setTheme } = useTheme()

  return (
    <Dialog>
      <DialogTrigger disableButtonEnhancement>
        <Button icon={<SettingsRegular />} appearance="subtle" />
      </DialogTrigger>
      <DialogSurface>
        <DialogBody>
          <DialogTitle>Settings</DialogTitle>
          <DialogContent>
            <div>
              <div>
                当前主题：
                {themeName}
              </div>
              <Button onClick={() => setTheme('teamsDark')}>深色模式</Button>
              <Button onClick={() => setTheme('teamsLight')}>浅色模式</Button>
              <Button onClick={() => setTheme('webDark')}>Web 深色</Button>
              <Button onClick={() => setTheme('webLight')}>Web 浅色</Button>
            </div>
          </DialogContent>
          <DialogActions>
            <DialogTrigger disableButtonEnhancement>
              <Button appearance="secondary">Close</Button>
            </DialogTrigger>
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  )
}

export default SettingsDialog
