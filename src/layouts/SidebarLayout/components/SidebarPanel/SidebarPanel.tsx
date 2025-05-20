import type {
  ToolbarProps,
} from '@fluentui/react-components'
import {
  createPresenceComponent,
  DrawerBody,
  DrawerHeader,
  DrawerHeaderNavigation,
  DrawerHeaderTitle,
  motionTokens,
  Toolbar,
  ToolbarButton,
  Tooltip,
} from '@fluentui/react-components'
import { Subtract24Regular } from '@fluentui/react-icons'

import { SidebarPanelMenu } from '../SidebarPanelMenu'
import { useSidebarPanelWrapperContext } from '../SidebarPanelWrapper'
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

function HideButton() {
  const { hidePanel } = useSidebarPanelWrapperContext()

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
  toolbarValve,
  setToolbarValve,
}: SidebarPanelProps) {
  const { pointerEnter, isFadeTopbarPinned } = useSidebarPanelWrapperContext()

  const onToolbarValveChange: ToolbarProps['onCheckedValueChange'] = (_e, { name, checkedItems }) => {
    setToolbarValve?.({ [name]: checkedItems })
  }

  return (
    <div flex="~ col" size-full>
      <DrawerHeader className="p-(t-15px! x-5px!)">
        <DrawerHeaderNavigation className="flex items-center justify-start gap-5px m-(l-10px! r-0!)">
          <DrawerHeaderTitle>
            {title}
          </DrawerHeaderTitle>

          {staticToolbar}

          <ToolbarFade visible={isFadeTopbarPinned || pointerEnter}>
            <Toolbar
              className="ml-auto"
              checkedValues={toolbarValve}
              onCheckedValueChange={onToolbarValveChange}
            >
              {fadeToolbar}
              <SidebarPanelMenu customMenu={customMenu} />
              <HideButton />
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
