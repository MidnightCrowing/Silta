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
import { FolderPanel, TagsPanel } from '~/panels'
import { generateItemId } from '~/utils/common'

import type { SidebarItem } from './SidebarLayout'
import { SidebarLayout } from './SidebarLayout'
import type { TabItem } from './TabLayout'
import { TabComponentNameEnum, TabLayout } from './TabLayout'

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
const TabItems: TabItem[] = [
  {
    label: '新建标签页',
    componentName: TabComponentNameEnum.SearchPage,
  },
  {
    label: '“黑豹”速度超过10米秒！中国造出世界最快四足机器人',
    componentName: TabComponentNameEnum.MultiPreviewPage,
  },
  {
    label: '<UNK1>',
    componentName: TabComponentNameEnum.SinglePreviewPage,
  },
  {
    label: '<UNK1>',
    componentName: TabComponentNameEnum.VideoPage,
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
