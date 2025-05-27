import { sidebarItems } from '~/constants/sidebarItems'

import { SidebarLayout } from './SidebarLayout'
import type { TabItemTypes } from './TabLayout'
import { TabLayout } from './TabLayout'

const TabItems: TabItemTypes[] = [
  {
    history: [
      {
        title: '新建标签页',
        url: 'NewPage',
      },
      {
        title: '',
        url: 'abab',
      },
    ],
    historyIndex: 1,
  },
  {
    history: [
      {
        title: '<UNK1>',
        url: 'VideoPage',
      },
      {
        title: '<UNK1>',
        url: 'VideoPage?src=C:\\Users\\lenovo\\Downloads\\video\\总之就是非常可爱_第二季第14集-番剧-全集-高清独家在线观看-bilibili-哔哩哔哩.mp4',
      },
    ],
    historyIndex: 0,
  },
  {
    history: [
      {
        title: '<UNK2>',
        url: 'ImageGalleryPage?path=C:\\Users\\lenovo\\Downloads\\国产蓝莓为何几年内爆炸式增长？【主播说三农】',
      },
    ],
    historyIndex: 0,
  },
]

function MainLayout() {
  return (
    <SidebarLayout
      items={sidebarItems}
      leftTopActiveItemId="folder"
      size-full
      overflow-hidden
    >
      <TabLayout className="grow overflow-hidden" items={TabItems} />
    </SidebarLayout>
  )
}

export { MainLayout }
