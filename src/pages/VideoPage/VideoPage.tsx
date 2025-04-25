import './VideoPage.scss'

import type { OverflowItemProps } from '@fluentui/react-components'
import {
  Button,
  List,
  Menu,
  MenuButton,
  MenuPopover,
  MenuTrigger,
  Overflow,
  OverflowItem,
  Subtitle1,
  Tag,
  Tooltip,
  useIsOverflowItemVisible,
  useOverflowMenu,
} from '@fluentui/react-components'
import { ArrowDownloadRegular } from '@fluentui/react-icons'
import { convertFileSrc } from '@tauri-apps/api/core'
import { getCurrentWindow } from '@tauri-apps/api/window'
import type { JoLPlayerRef } from 'jol-player'
import type { FC } from 'react'
import { lazy, Suspense, useRef, useState } from 'react'

import { VideoCard, VideoCardList } from '~/components/VideoCard'
import { useLocation } from '~/contexts/location'
import { TabComponentNameEnum } from '~/layouts'

import type { VideoPageProps } from './VideoPage.types'

const JoLPlayer = lazy(() => import('jol-player'))

const videoUrl = convertFileSrc('C:\\Users\\lenovo\\Downloads\\夏日口袋第3集-番剧-高清独家在线观看-bilibili-哔哩哔哩.mp4')
const coverUrl = convertFileSrc('assets/cover-0.avif')

const OverflowMenuItem: FC<Pick<OverflowItemProps, 'id'>> = (props) => {
  const { id } = props
  const isVisible = useIsOverflowItemVisible(id)

  if (isVisible) {
    return null
  }

  return (
    <Tag key={id} className="m-(x-2.5px y-4px)" appearance="brand" size="small" shape="circular">
      {id}
    </Tag>
  )
}

const OverflowMenu: FC<{ itemIds: string[] }> = ({ itemIds }) => {
  const { ref, overflowCount, isOverflowing } = useOverflowMenu<HTMLButtonElement>()

  if (!isOverflowing) {
    return null
  }

  return (
    <Menu>
      <MenuTrigger disableButtonEnhancement>
        <MenuButton
          ref={ref}
          className={
            'bg-$colorBrandBackground2! color-$colorBrandForeground2! '
            + 'hover:(bg-$colorBrandBackground2Hover! color-$colorCompoundBrandForeground1Hover!) '
            + 'active:(bg-$colorBrandBackground2Pressed! color-$colorCompoundBrandForeground1Pressed!) '
            + 'min-w-unset!'
          }
          appearance="transparent"
          size="medium"
          shape="circular"
        >
          +
          {overflowCount}
        </MenuButton>
      </MenuTrigger>

      <MenuPopover className="MultiPreview-top-bar-effect">
        {itemIds.map((i) => {
          return <OverflowMenuItem key={i} id={i} />
        })}
      </MenuPopover>
    </Menu>
  )
}

export default function VideoPage({ className }: VideoPageProps) {
  const { setLocation } = useLocation()
  const videoRef = useRef<JoLPlayerRef>(null)

  const [visible, setVisible] = useState<boolean>(false)

  const videoTitle = '时隔两年～再次翻唱《Ivory Tower》_《最后的旅行》 P1 Ivory Tower'
  const tags = ['发现《IVORY TOWER》', '龙族', '翻唱', '上杉绘梨衣', '龙族卡塞尔之门', '龙族史上最热闹的春节', '龙族首届新春会']
  const showDownload: boolean = true

  return (
    <div className={`@container overflow-x-hidden ${className}`}>
      <div p="x-20px y-10px" flex="~ col @[800px]:row" gap="10px">
        <div className="@[800px]:w-70%" shrink-0 flex="~ col" gap="10px">
          <Suspense>
            <JoLPlayer
              ref={videoRef}
              className="size-unset! rounded-5px shadow-xl overflow-hidden"
              onEnterFullScreen={async () => await getCurrentWindow().setFullscreen(true)}
              onExitFullScreen={async () => await getCurrentWindow().setFullscreen(false)}
              option={{
                videoSrc: videoUrl,
                mode: 'widthFix',
                language: 'zh',
                pausePlacement: 'center',
                isShowScreenshot: false,
                isShowWebFullScreen: true,
                isProgressFloat: true,
                isToast: true,
              }}
            />
          </Suspense>

          <div flex="~ col" gap="10px">
            <div flex="~ row justify-between items-start" gap="5px">
              {/* Video Title */}
              <Tooltip
                content={videoTitle}
                relationship="label"
                positioning="below-start"
                visible={videoTitle.length > 50 && visible}
                onVisibleChange={(_ev, data) => setVisible(data.visible)}
              >
                <Subtitle1 className="line-clamp-2!">{videoTitle}</Subtitle1>
              </Tooltip>

              {showDownload && <Button shape="circular" icon={<ArrowDownloadRegular />}>下载</Button>}
            </div>

            {/* Tags */}
            <Overflow padding={25}>
              <div flex="~ row items-center" gap="5px" overflow-hidden>
                {tags.map(tag => (
                  <OverflowItem key={tag} id={tag}>
                    <Tag key={tag} appearance="brand" shape="circular">
                      {tag}
                    </Tag>
                  </OverflowItem>
                ))}
                <OverflowMenu itemIds={tags} />
              </div>
            </Overflow>
          </div>

          <Button onClick={() => {
            setLocation({
              pageLabel: 'Search',
              pageComponentName: TabComponentNameEnum.SearchPage,
            })
          }}
          >
            Back
          </Button>
        </div>

        {/* 视频推荐列表 */}
        <Suspense>
          <VideoCardList>
            {/* Video Recommendations */}
            <List navigationMode="items">
              {Array.from({ length: 10 }).map((_, index) => (
                <VideoCard
                  key={index}
                  cover={coverUrl}
                  title={`携手同行的人，不止是朋友还有你呀 ${index + 1}`}
                  url=""
                />
              ))}
            </List>
          </VideoCardList>
        </Suspense>
      </div>
    </div>
  )
}
