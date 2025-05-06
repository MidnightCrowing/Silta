import {
  bundleIcon,
  CalendarWeekStartFilled,
  CalendarWeekStartRegular,
  FolderFilled,
  FolderRegular,
  TabDesktopNewPageFilled,
  TabDesktopNewPageRegular,
  TagMultipleFilled,
  TagMultipleRegular,
} from '@fluentui/react-icons'

import Settings from '~/components/Settings'
import { FolderPanel, TagsPanel } from '~/panels'

import type { SidebarItem } from './SidebarLayout'
import { SidebarLayout } from './SidebarLayout'
import type { TabItem } from './TabLayout'
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
    id: 'tags1',
    label: '标签',
    component: TagsPanel,
    position: 'rightTop',
  },
  {
    id: 'log',
    label: '日志',
    icon: bundleIcon(CalendarWeekStartFilled, CalendarWeekStartRegular),
    component: () => <div>Unknown</div>,
    position: 'leftBottom',
  },
  {
    id: 'divider2',
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
const TabItems: TabItem[] = [
  {
    title: '新建标签页',
    icon,
    history: ['NewPage'],
    historyIndex: 0,
  },
  {
    title: '<UNK1>',
    icon,
    history: ['VideoPage'],
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
      size-full
      overflow-hidden
    >
      <TabLayout items={TabItems} grow overflow-hidden />
    </SidebarLayout>
  )
}

export { MainLayout }
