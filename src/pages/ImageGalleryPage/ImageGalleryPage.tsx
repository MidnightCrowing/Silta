import { MessageBar, MessageBarBody, MessageBarTitle } from '@fluentui/react-components'
import { readTextFile } from '@tauri-apps/plugin-fs'
import { Suspense, useEffect } from 'react'
import { PhotoProvider } from 'react-photo-view'

import { getLocalGalleryConfigPath, listLocalGalleryImages } from '~/api/gallery.ts'
import { ImageCard, ImageCardList } from '~/components/ImageCard'
import { useLocation } from '~/contexts/location'

import { GalleryTopBar } from './components'
import type { ImageGalleryConfig } from './config'
import { parseConfig } from './config'
import type { ImageGalleryLocationProps, ImageGalleryPageProps, ImageGalleryStore } from './ImageGalleryPage.types'

export default function ImageGalleryPage({ className }: ImageGalleryPageProps) {
  // 获取页面位置传参
  const {
    location,
    props,
    store,
    setLocation,
    setStore,
  } = useLocation<ImageGalleryLocationProps, ImageGalleryStore>()
  const fullPath: string = props.path ?? ''

  const {
    imageInfos,
    loadError,
    imageTitle,
    imageLink,
    breadcrumbPath,
    publishTime,
    source,
    authorName,
    description,
    tags,
  } = store

  // 加载页面内容
  useEffect(() => {
    const loadGalleryContent = async () => {
      // 还原默认值
      setLocation({ title: '正在加载...' })
      setStore({ loadError: null })

      // 获取图片集配置文件内容
      getLocalGalleryConfigPath(fullPath)
        .then(async configPath => JSON.parse(await readTextFile(configPath)))
        .then((config: any) => {
          const parsedConfig: ImageGalleryConfig = parseConfig(config)

          // 设置页面信息
          setLocation({ title: parsedConfig.title })
          setStore({
            imageTitle: parsedConfig.title,
            imageLink: parsedConfig.link,
            breadcrumbPath: parsedConfig.breadcrumbPath,
            publishTime: parsedConfig.publishTime,
            source: parsedConfig.source,
            authorName: parsedConfig.authorName,
            description: parsedConfig.description,
            tags: parsedConfig.tags,
          })
        })
        .catch((error: any) => {
          console.error(`加载配置文件路径 ${fullPath} 时发生错误`, error)
          setLocation({ title: location.url })
          setStore({
            loadError: `无法加载配置文件路径: ${fullPath || null}，错误信息: ${error.message || error}`,
            imageTitle: null,
          })
        })
      // 获取图片列表
      listLocalGalleryImages(fullPath)
        .then(imageInfos => setStore({ imageInfos }))
        .catch((error: any) => {
          console.error(`加载路径 ${fullPath} 的图片时发生错误`, error)
          setStore({
            loadError: `无法加载路径 ${fullPath || null} 的图片，错误信息: ${error.message || error}`,
          })
        })
    }

    if (store?.loadError === undefined) {
      loadGalleryContent()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fullPath])

  return (
    <div className={`image-gallery @container relative ${className}`}>
      <GalleryTopBar
        imageTitle={imageTitle}
        imageLink={imageLink}
        breadcrumbPath={breadcrumbPath}
        publishTime={publishTime}
        source={source}
        authorName={authorName}
        imageCount={imageInfos?.length}
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
                  imageInfos === undefined && !loadError && (
                    Array.from({ length: 12 }, (_, index) => (
                      <Suspense key={index}>
                        <ImageCard index={index} />
                      </Suspense>
                    )))
                }

                {/* Image cards */}
                {imageInfos?.map((imageInfo, index) => (
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
