import './SearchResultTopTags.scss'

import type { SelectTabData, SelectTabEvent, TabValue } from '@fluentui/react-components'
import { Divider, Tab, TabList } from '@fluentui/react-components'
import {
  bundleIcon,
  FolderGlobeFilled,
  FolderGlobeRegular,
  GlobeFilled,
  GlobeRegular,
  HardDriveFilled,
  HardDriveRegular,
  SearchFilled,
  SearchRegular,
} from '@fluentui/react-icons'
import { useState } from 'react'

const DriveGlobeIcon = bundleIcon(FolderGlobeFilled, FolderGlobeRegular)
const DriveIcon = bundleIcon(HardDriveFilled, HardDriveRegular)
const GlobeIcon = bundleIcon(GlobeFilled, GlobeRegular)
const SearchIcon = bundleIcon(SearchFilled, SearchRegular)

interface SourceItem {
  value: string
  label: string
}

export function SearchResultTopTags() {
  const sources: SourceItem[] = [
    { value: 'bilibili1', label: 'bilibili' },
    { value: 'bilibili2', label: 'bilibili' },
    { value: 'bilibili3', label: 'bilibili' },
  ]

  const [selectedPlatform, setSelectedPlatform] = useState<TabValue>('all')
  const [selectedSource, setSelectedSource] = useState<TabValue>(null)

  const onTagSelectPlatform = (_event: SelectTabEvent, data: SelectTabData) => {
    setSelectedPlatform(data.value)
  }

  const onTabSelectSource = (_event: SelectTabEvent, data: SelectTabData) => {
    setSelectedSource((prev: TabValue) => prev === data.value ? null : data.value)
  }

  return (
    <div className="top-tags" flex="~ row items-center" gap="10px">
      <TabList appearance="subtle-circular" selectedValue={selectedPlatform} onTabSelect={onTagSelectPlatform}>
        <Tab
          className={selectedPlatform === 'all' ? undefined : 'unselect'}
          value="all"
          aria-label="全部"
          icon={<DriveGlobeIcon />}
        >
          全部
        </Tab>
        <Tab
          className={selectedPlatform === 'local' ? undefined : 'unselect'}
          value="local"
          aria-label="本地"
          icon={<DriveIcon />}
        >
          本地
        </Tab>
        <Tab
          className={selectedPlatform === 'web' ? undefined : 'unselect'}
          value="web"
          aria-label="网络"
          icon={<GlobeIcon />}
        >
          网络
        </Tab>
      </TabList>

      <Divider className="grow-0!" vertical />

      <TabList appearance="subtle-circular" selectedValue={selectedSource} onTabSelect={onTabSelectSource}>
        {sources.map(item => (
          <Tab
            key={item.value}
            className={selectedSource === item.value ? undefined : 'unselect'}
            value={item.value}
            icon={<SearchIcon />}
          >
            {item.label}
          </Tab>
        ))}
      </TabList>
    </div>
  )
}
