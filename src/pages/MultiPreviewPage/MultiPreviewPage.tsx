// 多图预览页
import './MultiPreviewPage.scss'

import type { OverflowItemProps } from '@fluentui/react-components'
import {
  Link,
  Menu,
  MenuButton,
  MenuPopover,
  MenuTrigger,
  MessageBar,
  MessageBarBody,
  MessageBarTitle,
  Overflow,
  OverflowItem,
  Skeleton,
  Tag,
  Text,
  ToggleButton,
  useIsOverflowItemVisible,
  useOverflowMenu,
} from '@fluentui/react-components'
import {
  bundleIcon,
  ChevronDown20Regular,
  Pin20Filled,
  Pin20Regular,
} from '@fluentui/react-icons'
import { invoke } from '@tauri-apps/api/core'
import type { FC } from 'react'
import { Suspense, useEffect, useState } from 'react'
import { PhotoProvider } from 'react-photo-view'

import { ImageCard } from '~/components/ImageCard'

import type { TopBarProps } from './MultiPreviewPage.types'

const PinIcon = bundleIcon(Pin20Filled, Pin20Regular)

const path = 'assets/demo-test'

async function listFiles(folderPath: string): Promise<string[]> {
  return await invoke('list_files', { folderPath })
}

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
        <MenuButton ref={ref} appearance="transparent" size="small" shape="circular">
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

const TopBar: FC<TopBarProps> = ({ imageTitle, imageLink, publishTime, sourceUrl, authorName, imageCount, description, tags }) => {
  return (
    <div
      absolute
      className="MultiPreview-top-bar MultiPreview-top-bar-effect"
      w="[calc(100%-15px)]"
      max-h="40px"
      p="x-10px"
      flex="~ col"
      overflow-hidden
      z="1"
      transition="all delay-150 duration-200 ease-in-out"
      box-border
    >
      <div shrink-0 flex="~ row justify-between items-center" gap="3px" h="38px">
        <h3 m-0 line-clamp-2>{imageTitle}</h3>

        <div flex="~ row items-center" gap="3px">
          <ToggleButton className="pin-button hidden!" icon={<PinIcon />} appearance="transparent" />
          <div className="chevron-down-wrapper" flex duration="200">
            <ChevronDown20Regular />
          </div>
        </div>
      </div>

      <div
        shrink-0
        grid="~ cols-[auto_1fr] items-center"
        gap="x-5px y-10px"
        m="y-10px"
        max-h="302px"
        truncate
        overflow-y="auto!"
        box-border
      >
        <Text>链接：</Text>
        <Link className="w-fit" href={imageLink}>
          {imageLink}
        </Link>
        <Text>发布时间：</Text>
        <Text className="w-fit">{publishTime}</Text>
        <Text>来源：</Text>
        <Link className="w-fit" href={sourceUrl}>
          {sourceUrl}
        </Link>
        <Text>作者：</Text>
        <Text className="w-fit">{authorName}</Text>
        <Text>数量：</Text>
        <Text className="w-fit">{imageCount}</Text>
        <Text className="self-start">描述：</Text>
        <Text className="whitespace-pre-wrap!">
          {description}
        </Text>
        <Text>标签：</Text>
        <Overflow>
          <div flex="~ row items-center" gap="5px" overflow-hidden>
            {tags.map(tag => (
              <OverflowItem key={tag} id={tag}>
                <Tag key={tag} appearance="brand" size="small" shape="circular">
                  {tag}
                </Tag>
              </OverflowItem>
            ))}
            <OverflowMenu itemIds={tags} />
          </div>
        </Overflow>
      </div>
    </div>
  )
}

export default function MultiPreviewPage({ className }: { className: string }) {
  const [imagePaths, setImagePaths] = useState<string[]>([])
  const [loadError, setLoadError] = useState<string>('')

  useEffect(() => {
    const loadImages = async () => {
      try {
        setImagePaths(await listFiles(path))
        setLoadError('')
      }
      catch (error: any) {
        console.error(error)
        setLoadError(error)
      }
    }
    loadImages()
  }, [])

  const imageTitle = '“黑豹”速度超过10米秒！中国造出世界最快四足机器人'
  const imageLink = 'https://react-photo-view.vercel.app/'
  const publishTime = '2025-02-10 12:30:00'
  const sourceUrl = '/panel/folder'
  const authorName = '渣暴风StorM'
  const description = `联合国首次启动《行星安全协议》？这玩意儿真的存在吗？国际法对于小行星的防御有什么规定？普通人要不要早做准备？今天带大家一探究竟！
            ——
            受访专家：
            苏金远：武汉大学国际法研究所教授，外层空间法领域专家
            李老师水煮宇宙：科普作家、《调皮的小行星》作者`.split('\n').map(line => line.trim()).join('\n')
  const tags = [
    '哪吒之魔童闹海',
    '影视',
    '预告·资讯',
    '彩蛋',
    '短片',
    '动画电影',
    '搞笑',
    '动画',
    '喜剧',
    '哪吒2',
    '新年',
    '魔童闹海',
    '电影《哪吒之魔童闹海》二创征稿',
  ]

  return (
    <div className={`@container relative ${className}`}>
      <TopBar
        imageTitle={imageTitle}
        imageLink={imageLink}
        publishTime={publishTime}
        sourceUrl={sourceUrl}
        authorName={authorName}
        imageCount={imagePaths.length}
        description={description}
        tags={tags}
      />

      <div absolute size-full overflow-y-scroll>
        <Skeleton animation="pulse" aria-label="Loading Images">
          <PhotoProvider maskOpacity={0.85}>
            <div flex="~ col" gap="20px" m="t-40px" p="15px" box-border>
              {/* Error message */}
              {loadError && (
                <MessageBar intent="error">
                  <MessageBarBody>
                    <MessageBarTitle>Loading Error</MessageBarTitle>
                    {loadError}
                  </MessageBarBody>
                </MessageBar>
              )}

              {/* Images */}
              <div
                grid="~ @7xl:cols-7 @5xl:cols-6 @3xl:cols-5 @xl:cols-4 @lg:cols-3 @md:cols-2 @sm:cols-1"
                gap="20px"
              >
                {imagePaths.map((imagePath, index) => (
                  <Suspense key={imagePath}>
                    <ImageCard
                      index={index}
                      imagePath={imagePath}
                    />
                  </Suspense>
                ))}
              </div>
            </div>
          </PhotoProvider>
        </Skeleton>
      </div>
    </div>
  )
}
