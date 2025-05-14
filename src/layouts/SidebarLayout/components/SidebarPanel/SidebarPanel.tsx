import {
  createPresenceComponent,
  DrawerBody,
  DrawerHeader,
  DrawerHeaderNavigation,
  DrawerHeaderTitle,
  motionTokens,
  Toolbar,
  ToolbarButton,
  ToolbarGroup,
  Tooltip,
} from '@fluentui/react-components'
import { Subtract24Regular } from '@fluentui/react-icons'

import { SidebarPanelMenu } from '../SidebarPanelMenu'
import type { SidebarPanelProps } from './SidebarPanel.types'

const ToolbarFade = createPresenceComponent({
  enter: {
    keyframes: [{ opacity: 0 }, { opacity: 1 }],
    easing: motionTokens.curveEasyEase,
    duration: motionTokens.durationNormal,
  },
  exit: {
    keyframes: [{ opacity: 1 }, { opacity: 0 }],
    easing: motionTokens.curveEasyEase,
    duration: motionTokens.durationNormal,
  },
})

function HideButton({ hidePanel }: { hidePanel: () => void }) {
  return (
    <Tooltip content="隐藏" relationship="label">
      <ToolbarButton
        aria-label="Close panel"
        appearance="subtle"
        icon={<Subtract24Regular />}
        onClick={hidePanel}
      />
    </Tooltip>
  )
}

export function SidebarPanel({
  children,
  title,
  staticToolbar,
  fadeToolbar,
  customMenu,
  pointerEnter,
  hidePanel,
}: SidebarPanelProps) {
  return (
    <div flex="~ col" size-full>
      <DrawerHeader className="p-(t-15px! x-5px!)">
        <DrawerHeaderNavigation className="flex items-center justify-start gap-5px m-(l-10px! r-0!)">
          <DrawerHeaderTitle>
            {title}
          </DrawerHeaderTitle>

          {staticToolbar}

          <ToolbarFade visible={pointerEnter}>
            <Toolbar className="ml-auto">
              <ToolbarGroup className="flex items-center gap-2px">
                {fadeToolbar}
                <SidebarPanelMenu customMenu={customMenu} />
                <HideButton hidePanel={hidePanel} />
              </ToolbarGroup>
            </Toolbar>
          </ToolbarFade>
        </DrawerHeaderNavigation>
      </DrawerHeader>

      <DrawerBody className="grow p-0!">
        {children}
      </DrawerBody>
    </div>
  )
}
