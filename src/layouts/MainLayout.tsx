import {
  AppsFilled,
  AppsRegular,
  bundleIcon,
  FolderFilled,
  FolderRegular,
  TabDesktopNewPageFilled,
  TabDesktopNewPageRegular,
  TagMultipleFilled,
  TagMultipleRegular,
  WindowConsoleFilled,
  WindowConsoleRegular,
} from '@fluentui/react-icons'
import { v4 as uuidv4 } from 'uuid'

import Settings from '~/components/Settings'
import { FolderPanel, PluginsPanel, TagsPanel, TerminalPanel } from '~/panels'

import type { SidebarItem } from './SidebarLayout'
import { SidebarLayout } from './SidebarLayout'
import type { TabItemTypes } from './TabLayout'
import { TabLayout } from './TabLayout'

const SidebarItems: SidebarItem[] = [
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
const icon = bundleIcon(TabDesktopNewPageFilled, TabDesktopNewPageRegular)
const TabItems: TabItemTypes[] = [
  {
    title: '新建标签页',
    icon,
    history: ['NewPage'],
    historyIndex: 0,
  },
  {
    title: '<UNK1>',
    icon,
    history: ['VideoPage', 'VideoPage?src=C:\\Users\\lenovo\\Downloads\\video\\总之就是非常可爱_第二季第14集-番剧-全集-高清独家在线观看-bilibili-哔哩哔哩.mp4'],
    historyIndex: 0,
  },
  {
    title: '<UNK2>',
    icon,
    history: ['ImageGalleryPage?path=C:\\Users\\lenovo\\Downloads\\国产蓝莓为何几年内爆炸式增长？【主播说三农】'],
    historyIndex: 0,
  },
]

function MainLayout() {
  return (
    <SidebarLayout
      items={SidebarItems}
      leftTopActiveItemId="folder"
      size-full
      overflow-hidden
    >
      <TabLayout className="grow overflow-hidden" items={TabItems} />
    </SidebarLayout>
  )
}

export { MainLayout }
