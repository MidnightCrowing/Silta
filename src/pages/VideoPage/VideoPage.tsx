import './VideoPage.scss'

import type { OverflowItemProps } from '@fluentui/react-components'
import {
  Button,
  Caption1,
  Card,
  Menu,
  MenuButton,
  MenuPopover,
  MenuTrigger,
  Overflow,
  OverflowItem,
  Skeleton,
  SkeletonItem,
  Subtitle1,
  Tag,
  Tooltip,
  useIsOverflowItemVisible,
  useOverflowMenu,
} from '@fluentui/react-components'
import { ArrowDownloadRegular } from '@fluentui/react-icons'
import { convertFileSrc } from '@tauri-apps/api/core'
import { getCurrentWindow } from '@tauri-apps/api/window'
import { readTextFile } from '@tauri-apps/plugin-fs'
import type { JoLPlayerRef } from 'jol-player'
import type { FC } from 'react'
import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import KeepAlive from 'react-activation'

import { getLocalVideoConfigPath } from '~/api/video.ts'
import type { VideoCardProps } from '~/components/VideoCard'
import { VideoCard, VideoCardList } from '~/components/VideoCard'
import { useLocation } from '~/contexts/location'

import { parseVideoConfig } from './configParser.ts'
import type { VideoConfig, VideoLocationProps, VideoPageProps, VideoStore } from './VideoPage.types'

const JoLPlayer = lazy(() => import('jol-player'))

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

      <MenuPopover className="ImageGallery-top-bar-effect">
        {itemIds.map((i) => {
          return <OverflowMenuItem key={i} id={i} />
        })}
      </MenuPopover>
    </Menu>
  )
}

export default function VideoPage({ className }: VideoPageProps) {
  const {
    location,
    props,
    store,
    setLocation,
    setStore,
    getAliveName,
  } = useLocation<VideoLocationProps, VideoStore>()
  const videoPath: string = props.src ?? ''

  // 页面信息
  const { videoTitle, tags } = store

  const videoAliveName = getAliveName('video')
  const videoRef = useRef<JoLPlayerRef>(null)
  const videoUrl: string = convertFileSrc(videoPath)

  // const recs: VideoCardProps[] = useMemo(() => {
  //   const count = Math.floor(Math.random() * 0) // 随机生成 0 到 10 的数量
  //   return Array.from({ length: count }, (_, i) => ({
  //     url: `https://example.com/video-${i}`,
  //     cover: 'https://www.minecraft.net/content/dam/minecraftnet/games/minecraft/realms/MCV_soothingscene_cozyfarm_editorial_1280x768.jpg',
  //     title: `视频标题 ${i + 1}`,
  //   }))
  // }, [])
  const recs: VideoCardProps[] = []
  const showDownload: boolean = false

  // 加载页面内容
  useEffect(() => {
    const loadVideoConfig = async () => {
      // 还原默认值
      setLocation({ title: '正在加载...' })

      // 获取视频配置文件内容
      getLocalVideoConfigPath(videoPath)
        .then(async configPath => JSON.parse(await readTextFile(configPath)))
        .then((config: any) => {
          const parsedConfig: VideoConfig = parseVideoConfig(config)

          // 设置页面信息
          setLocation({ title: parsedConfig.title })
          setStore({ videoTitle: config.title, tags: config.tags })
        })
        .catch((error: any) => {
          console.error(`加载配置文件路径 ${videoPath} 时发生错误`, error)
          setLocation({ title: location.url })
          setStore({ videoTitle: null })
        })
    }

    if (store?.videoTitle === undefined) {
      loadVideoConfig()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoPath])

  const [titleTooltipVisible, setTitleTooltipVisible] = useState<boolean>(false)
  const isConfigLoading: boolean = videoTitle === undefined
  const isConfigError: boolean = videoTitle === null
  const hasRecs: boolean = recs.length > 0

  return (
    <div className={`@container overflow-x-hidden ${className}`}>
      <div p="x-20px y-10px" flex={`~ col ${hasRecs ? '@[800px]:row' : 'items-center'}`} gap="10px">
        <div className={hasRecs ? '@[800px]:w-70%' : 'w-75%'} shrink-0 flex="~ col" gap="10px">
          <KeepAlive name={videoAliveName} when>
            <Suspense>
              <JoLPlayer
                ref={videoRef}
                className="size-unset! rounded-5px shadow-xl overflow-hidden"
                onEnterFullScreen={async () => await getCurrentWindow().setFullscreen(true)}
                onExitFullScreen={async () => await getCurrentWindow().setFullscreen(false)}
                option={{
                  videoSrc: videoUrl,
                  mode: 'widthFix',
                  theme: '#FF0033',
                  language: 'zh',
                  pausePlacement: 'center',
                  isShowScreenshot: false,
                  isShowWebFullScreen: true,
                  isProgressFloat: true,
                  isToast: true,
                }}
              />
            </Suspense>
          </KeepAlive>

          <Card>
            <Skeleton aria-label="Loading video info">
              <div flex="~ col" gap="10px">
                <div flex="~ row justify-between items-start" gap="5px">
                  <div flex="~ col" gap="5px" grow>
                    {/* Video Title */}
                    <Tooltip
                      content={videoTitle ?? ''}
                      relationship="label"
                      positioning="below-start"
                      visible={titleTooltipVisible && videoTitle?.length !== undefined && videoTitle.length > 50}
                      onVisibleChange={(_ev, data) => setTitleTooltipVisible(data.visible)}
                    >
                      {
                        isConfigLoading
                          ? (
                              <SkeletonItem className="w-1/2!" size={24} />
                            )
                          : (
                              <Subtitle1
                                className={`line-clamp-2! ${isConfigError ? 'color-$colorPaletteRedForeground1' : ''}`}
                              >
                                {videoTitle ?? 'Error: 获取标题失败'}
                              </Subtitle1>
                            )
                      }
                    </Tooltip>

                    {/* Video Path */}
                    <Caption1 className="text-$colorNeutralForeground3">{videoPath}</Caption1>
                  </div>

                  {showDownload
                    && <Button shape="circular" icon={<ArrowDownloadRegular />}>下载</Button>}
                </div>

                {/* Tags */}
                {tags && tags?.length > 0 && (
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
                )}
              </div>

              <Button onClick={() => {
                setLocation({
                  title: 'Search',
                  url: 'SearchPage',
                })
              }}
              >
                Back
              </Button>
            </Skeleton>
          </Card>
        </div>

        {/* 视频推荐列表 */}
        {hasRecs && (
          <Card className="w-full">
            <Suspense>
              <VideoCardList>
                {/* Video Recommendations */}
                {recs.map(props => (
                  <VideoCard
                    key={props.url}
                    cover={props.cover}
                    title={props.title}
                    url={props.url}
                  />
                ))}
              </VideoCardList>
            </Suspense>
          </Card>
        )}
      </div>
    </div>
  )
}
