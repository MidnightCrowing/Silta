import { MessageBar, MessageBarBody, MessageBarTitle } from '@fluentui/react-components'
import { invoke } from '@tauri-apps/api/core'
import { readTextFile } from '@tauri-apps/plugin-fs'
import { Suspense, useEffect, useState } from 'react'
import { PhotoProvider } from 'react-photo-view'

import { ImageCard, ImageCardList } from '~/components/ImageCard'
import { useLocation } from '~/contexts/location'
import type { GalleryImageInfo } from '~/tauri-types.ts'

import { ImageGalleryPageTopBar } from './components'
import { parseImageGalleryConfig } from './configParser.ts'
import type { ImageGalleryConfig, ImageGalleryLocationProps, ImageGalleryPageProps } from './ImageGalleryPage.types'

export default function ImageGalleryPage({ className }: ImageGalleryPageProps) {
  // 获取页面位置传参
  const { location, getProps, setLocation } = useLocation()
  const props = getProps<ImageGalleryLocationProps>()
  const fullPath: string = props.path ?? ''

  const [imageInfos, setImageInfos] = useState<GalleryImageInfo[]>([])
  const [loadError, setLoadError] = useState<string>('')

  // 页面信息
  const [imageTitle, setImageTitle] = useState<string | null | undefined>(undefined)
  const [imageLink, setImageLink] = useState<string | undefined>(undefined)
  const [breadcrumbPath, setBreadcrumbPath] = useState<Array<{ title: string, link: string }> | undefined>(undefined)
  const [publishTime, setPublishTime] = useState<string | undefined>(undefined)
  const [source, setSource] = useState<string | undefined>(undefined)
  const [authorName, setAuthorName] = useState<string | undefined>(undefined)
  const [description, setDescription] = useState<string | undefined>(undefined)
  const [tags, setTags] = useState<string[] | undefined>(undefined)

  // 加载页面内容
  useEffect(() => {
    const loadGalleryContent = async () => {
      // 还原默认值
      setLocation({ title: '正在加载...' })
      setImageInfos([])
      setLoadError('')
      setImageTitle(undefined)
      setImageLink(undefined)
      setBreadcrumbPath(undefined)
      setPublishTime(undefined)
      setSource(undefined)
      setAuthorName(undefined)
      setDescription(undefined)
      setTags(undefined)

      // 获取图片集配置文件内容
      invoke<string>('get_images_config', { path: fullPath })
        .then(async configPath => JSON.parse(await readTextFile(configPath)))
        .then((config: any) => {
          const parsedConfig: ImageGalleryConfig = parseImageGalleryConfig(config)

          // 设置页面信息
          setLocation({ title: parsedConfig.title })
          setImageTitle(parsedConfig.title)
          setImageLink(parsedConfig.link)
          setBreadcrumbPath(parsedConfig.breadcrumbPath)
          setPublishTime(parsedConfig.publishTime)
          setSource(parsedConfig.source)
          setAuthorName(parsedConfig.authorName)
          setDescription(parsedConfig.description)
          setTags(parsedConfig.tags)
        })
        .catch((error: any) => {
          console.error(`加载配置文件路径 ${fullPath} 时发生错误`, error)
          setLoadError(`无法加载配置文件路径: ${fullPath || null}，错误信息: ${error.message || error}`)
          setLocation({ title: location.url })
          setImageTitle(null)
        })
      // 获取图片列表
      invoke<GalleryImageInfo[]>('list_images', { path: fullPath })
        .then(setImageInfos)
        .catch((error: any) => {
          console.error(`加载路径 ${fullPath} 的图片时发生错误`, error)
          setLoadError(`无法加载路径 ${fullPath || null} 的图片，错误信息: ${error.message || error}`)
        })
    }

    loadGalleryContent().then(() => {})
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fullPath])

  return (
    <div className={`image-gallery @container relative ${className}`}>
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
