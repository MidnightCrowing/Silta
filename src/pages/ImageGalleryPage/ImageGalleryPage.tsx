// 多图预览页
import { MessageBar, MessageBarBody, MessageBarTitle, Skeleton } from '@fluentui/react-components'
import { invoke } from '@tauri-apps/api/core'
import { readTextFile } from '@tauri-apps/plugin-fs'
import { Suspense, useEffect, useState } from 'react'
import { PhotoProvider } from 'react-photo-view'

import { ImageCard } from '~/components/ImageCard'
import { useLocation } from '~/contexts/location'
import type { GalleryImageInfo } from '~/tauri-types.ts'

import { ImageGalleryPageTopBar } from './components'
import type { ImageGalleryConfig, ImageGalleryLocationProps, ImageGalleryPageProps } from './ImageGalleryPage.types'

export default function ImageGalleryPage({ className }: ImageGalleryPageProps) {
  const [imageInfos, setImageInfos] = useState<GalleryImageInfo[]>([])
  const [loadError, setLoadError] = useState<string>('')
  const { getProps, setLocation } = useLocation()

  const fullPath: string = getProps<ImageGalleryLocationProps>().path || ''

  // 获取图片列表
  useEffect(() => {
    invoke<GalleryImageInfo[]>('list_images', { path: fullPath })
      .then(setImageInfos)
      .then(() => setLoadError(''))
      .catch((error: any) => {
        console.error(`Error occurred while loading images from path: ${fullPath}`, error)
        setLoadError(`Failed to load images from path: ${fullPath || null}, Error: ${error.message || error}`)
        setImageInfos([])
      })
    invoke<string>('get_images_config', { path: fullPath })
      .then(async cfgPath => JSON.parse(await readTextFile(cfgPath)))
      .then((cfg: ImageGalleryConfig) => {
        console.log(cfg)
      })
  }, [fullPath])

  useEffect(() => {
    setLocation({
      title: fullPath.split('\\').pop() || '',
    })
  }, [fullPath, setLocation])

  const imageTitle = fullPath.split('\\').pop() || ''
  const imageLink = 'https://react-photo-view.vercel.app/'
  const breadcrumbPath = [
    { title: 'Item 1', link: 'Item 1' },
    { title: 'Item 2', link: 'Item 1' },
    { title: 'Item 3', link: 'Item 1' },
    { title: 'Item 4', link: 'Item 1' },
    { title: 'Item 5s', link: 'Item 1' },
  ]
  const publishTime = '2025-02-10 12:30:00'
  const source = '/panel/folder'
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
      <ImageGalleryPageTopBar
        imageTitle={imageTitle}
        imageLink={imageLink}
        breadcrumbPath={breadcrumbPath}
        publishTime={publishTime}
        source={source}
        authorName={authorName}
        imageCount={imageInfos.length}
        description={description}
        tags={tags}
      />

      <Skeleton
        className="absolute size-full overflow-y-auto"
        animation="pulse"
        aria-label="Loading Images"
      >
        <div max-w="1150px" flex="~ col" gap="20px" m="t-40px x-auto" p="15px" box-border>
          {/* Error message */}
          {loadError && (
            <MessageBar intent="error" layout="multiline">
              <MessageBarBody>
                <MessageBarTitle>Loading Error</MessageBarTitle>
                {loadError}
              </MessageBarBody>
            </MessageBar>
          )}

          {/* Images */}
          <PhotoProvider maskOpacity={0.85}>
            <div
              grid="~ @[1100px]:cols-6! @[800px]:cols-5 @[600px]:cols-4 @[400px]:cols-3 @[200px]:cols-2 cols-1"
              gap="20px"
            >
              {imageInfos.map((imageInfo, index) => (
                <Suspense key={imageInfo.name}>
                  <ImageCard
                    index={index}
                    imageInfo={imageInfo}
                  />
                </Suspense>
              ))}
            </div>
          </PhotoProvider>
        </div>
      </Skeleton>
    </div>
  )
}
