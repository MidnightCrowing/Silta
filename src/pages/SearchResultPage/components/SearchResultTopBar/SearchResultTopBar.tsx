import './SearchResultTopBar.scss'

import {
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  MenuPopover,
  MenuTrigger,
  Tab,
  TabList,
  Tooltip,
} from '@fluentui/react-components'
import {
  bundleIcon,
  HistoryRegular,
  ImageFilled,
  ImageRegular,
  MicFilled,
  MicRegular,
  NavigationRegular,
  SearchFilled,
  SearchRegular,
  VideoClipFilled,
  VideoClipRegular,
} from '@fluentui/react-icons'

const MicIcon = bundleIcon(MicFilled, MicRegular)
const SearchIcon = bundleIcon(SearchFilled, SearchRegular)
const ImageTabIcon = bundleIcon(ImageFilled, ImageRegular)
const VideoTabIcon = bundleIcon(VideoClipFilled, VideoClipRegular)

export function SearchResultTopBar() {
  return (
    <div className="top-bar" flex="~ row items-center justify-start" gap="10px">
      <div
        flex="~ row items-center"
        w="[calc(100%-300px)]"
        min-w="130px"
        max-w="640px"
        p="x-7px"
        rounded-full
        shadow="md"
        bg="$colorNeutralBackground3 hover:$colorNeutralBackground3Hover"
        transition="all duration-200 ease-in-out"
      >
        <input
          className="search-input mask-edge"
          grow
          min-w="0"
          h="36px"
          b-0
          outline-0
          text="14px center"
          color="$colorneutralforeground1"
          bg-transparent
        />
        <div p="r-5px" flex="~ row items-center" gap="5px">
          <Button appearance="transparent" size="small" icon={<MicIcon className="text-18px" />} />
          <Button appearance="transparent" size="small" icon={<SearchIcon className="text-18px" />} />
        </div>
      </div>

      <TabList appearance="subtle" size="small" defaultSelectedValue="image">
        <Tooltip content="图片" relationship="label">
          <Tab icon={<ImageTabIcon />} value="image" aria-label="Image" />
        </Tooltip>
        <Tooltip content="视频" relationship="label">
          <Tab icon={<VideoTabIcon />} value="video" aria-label="Video" />
        </Tooltip>
      </TabList>

      <Menu hasIcons>
        <MenuTrigger disableButtonEnhancement>
          <MenuButton className="ml-auto!" appearance="transparent" icon={<NavigationRegular />} />
        </MenuTrigger>

        <MenuPopover>
          <MenuList>
            <MenuItem icon={<HistoryRegular />}>搜索历史记录</MenuItem>
          </MenuList>
        </MenuPopover>
      </Menu>
    </div>
  )
}
