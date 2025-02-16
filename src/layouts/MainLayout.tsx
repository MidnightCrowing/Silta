import {
  bundleIcon,
  CalendarWeekStartFilled,
  CalendarWeekStartRegular,
  FolderFilled,
  FolderRegular,
  TagMultipleFilled,
  TagMultipleRegular,
} from '@fluentui/react-icons'

import Settings from '~/components/Settings'
import { MultiPreview, SearchPage, SinglePreview } from '~/pages'
import { FolderPanel, TagsPanel } from '~/panels'
import { generateItemId } from '~/utils/common'

import type { SidebarItem } from './SidebarLayout'
import { SidebarLayout } from './SidebarLayout'
import type { TabItem } from './TabLayout'
import { TabLayout } from './TabLayout'

const SidebarItems: SidebarItem[] = [
  {
    id: 'folder',
    label: '文件',
    icon: bundleIcon(FolderFilled, FolderRegular),
    componentUrl: '/panel/folder',
    position: 'leftTop',
  },
  {
    id: 'tags',
    label: '标签',
    icon: bundleIcon(TagMultipleFilled, TagMultipleRegular),
    componentUrl: '/panel/tags',
    position: 'leftTop',
  },
  {
    id: 'tags1',
    label: '标签',
    componentUrl: '/panel/tags',
    position: 'rightTop',
  },
  {
    id: 'log',
    label: '日志',
    icon: bundleIcon(CalendarWeekStartFilled, CalendarWeekStartRegular),
    componentUrl: '/unknown',
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
    icon: Settings,
    type: 'button',
    position: 'leftBottom',
  },
]
const TabItems: TabItem[] = [
  {
    id: generateItemId(),
    label: '新建标签页',
    component: SearchPage,
  },
  {
    id: generateItemId(),
    label: '“黑豹”速度超过10米秒！中国造出世界最快四足机器人',
    component: MultiPreview,
  },
  {
    id: generateItemId(),
    label: '<UNK1>',
    component: SinglePreview,
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
      <TabLayout items={TabItems} grow overflow-hidden />
    </SidebarLayout>
  )
}

export { MainLayout }
