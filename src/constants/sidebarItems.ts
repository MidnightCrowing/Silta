import {
  AppsFilled,
  AppsRegular,
  bundleIcon,
  FolderFilled,
  FolderRegular,
  TagMultipleFilled,
  TagMultipleRegular,
  WindowConsoleFilled,
  WindowConsoleRegular,
} from '@fluentui/react-icons'
import { v4 as uuidv4 } from 'uuid'

import Settings from '~/components/Settings'
import type { SidebarItem } from '~/layouts'
import { FolderPanel, PluginsPanel, TagsPanel, TerminalPanel } from '~/panels'

export const sidebarItems: SidebarItem[] = [
  {
    id: 'folder',
    label: '文件',
    icon: bundleIcon(FolderFilled, FolderRegular),
    component: FolderPanel,
    position: 'leftTop',
  },
  {
    id: 'tags',
    label: '标签',
    icon: bundleIcon(TagMultipleFilled, TagMultipleRegular),
    component: TagsPanel,
    position: 'leftTop',
  },
  {
    id: 'plugins',
    label: '插件',
    icon: bundleIcon(AppsFilled, AppsRegular),
    component: PluginsPanel,
    position: 'leftTop',
  },
  {
    id: 'terminal',
    label: '终端',
    icon: bundleIcon(WindowConsoleFilled, WindowConsoleRegular),
    component: TerminalPanel,
    position: 'leftBottom',
  },
  {
    id: uuidv4(),
    type: 'divider',
    position: 'leftBottom',
  },
  {
    id: 'settings',
    label: '设置',
    component: Settings,
    type: 'button',
    position: 'leftBottom',
  },
]
