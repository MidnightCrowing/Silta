import { MessageBar, MessageBarBody, MessageBarTitle } from '@fluentui/react-components'
import { invoke } from '@tauri-apps/api/core'
import { readTextFile } from '@tauri-apps/plugin-fs'
import { Suspense, useEffect, useRef, useState } from 'react'
import { PhotoProvider } from 'react-photo-view'

import { ImageCard, ImageCardList } from '~/components/ImageCard'
import { useLocation } from '~/contexts/location'
import type { GalleryImageInfo } from '~/tauri-types.ts'

import { ImageGalleryPageTopBar } from './components'
import { parseImageGalleryConfig } from './configParser.ts'
import type { ImageGalleryConfig, ImageGalleryLocationProps, ImageGalleryPageProps } from './ImageGalleryPage.types'

export default function ImageGalleryPage({ className }: ImageGalleryPageProps) {
  // 获取页面位置传参
  const { getProps, setLocation } = useLocation()
  const props = getProps<ImageGalleryLocationProps>()
  const fullPath: string = props.path ?? ''

  const [imageInfos, setImageInfos] = useState<GalleryImageInfo[]>([])
  const [loadError, setLoadError] = useState<string>('')

  // 页面信息
  const imageTitleRef = useRef<string | null>(undefined)
  const imageLinkRef = useRef<string>(undefined)
  const breadcrumbPathRef = useRef<Array<{ title: string, link: string }>>(undefined)
  const publishTimeRef = useRef<string>(undefined)
  const sourceRef = useRef<string>(undefined)
  const authorNameRef = useRef<string>(undefined)
  const descriptionRef = useRef<string>(undefined)
  const tagsRef = useRef<string[]>(undefined)

  // 设置页面标题
  useEffect(() => {
    setLocation({
      title: fullPath.split('\\').pop() ?? '',
    })
  }, [fullPath, setLocation])

  // 获取图片列表
  useEffect(() => {
    // 还原默认值
    setImageInfos([])
    setLoadError('')
    imageTitleRef.current = undefined
    imageLinkRef.current = undefined
    breadcrumbPathRef.current = undefined
    publishTimeRef.current = undefined
    sourceRef.current = undefined
    authorNameRef.current = undefined
    descriptionRef.current = undefined
    tagsRef.current = undefined

    invoke<GalleryImageInfo[]>('list_images', { path: fullPath })
      .then(setImageInfos)
      .catch((error: any) => {
        console.error(`加载路径 ${fullPath} 的图片时发生错误`, error)
        setLoadError(`无法加载路径 ${fullPath || null} 的图片，错误信息: ${error.message || error}`)
      })
    invoke<string>('get_images_config', { path: fullPath })
      .then(async configPath => JSON.parse(await readTextFile(configPath)))
      .then((config: any) => {
        const parsedConfig: ImageGalleryConfig = parseImageGalleryConfig(config)

        // 设置页面信息
        imageTitleRef.current = parsedConfig.title
        imageLinkRef.current = parsedConfig.link
        breadcrumbPathRef.current = parsedConfig.breadcrumbPath
        publishTimeRef.current = parsedConfig.publishTime
        sourceRef.current = parsedConfig.source
        authorNameRef.current = parsedConfig.authorName
        descriptionRef.current = parsedConfig.description
        tagsRef.current = parsedConfig.tags
      })
      .catch((error: any) => {
        console.error(`加载配置文件路径 ${fullPath} 时发生错误`, error)
        setLoadError(`无法加载配置文件路径: ${fullPath || null}，错误信息: ${error.message || error}`)
        imageTitleRef.current = null
      })
  }, [fullPath])

  return (
    <div className={`image-gallery @container relative ${className}`}>
      <ImageGalleryPageTopBar
        imageTitle={imageTitleRef.current}
        imageLink={imageLinkRef.current}
        breadcrumbPath={breadcrumbPathRef.current}
        publishTime={publishTimeRef.current}
        source={sourceRef.current}
        authorName={authorNameRef.current}
        imageCount={imageInfos.length}
        description={descriptionRef.current}
        tags={tagsRef.current}
      />

      <Suspense>
        <ImageCardList className="absolute size-full overflow-y-auto">
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
                {/* Loading placeholder */}
                {
                  imageInfos.length === 0 && !loadError && (
                    Array.from({ length: 12 }, (_, index) => (
                      <Suspense key={index}>
                        <ImageCard index={index} />
                      </Suspense>
                    )))
                }

                {/* Image cards */}
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
        </ImageCardList>
      </Suspense>
    </div>
  )
}
