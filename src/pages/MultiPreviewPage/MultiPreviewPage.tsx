// 多图预览页
import { MessageBar, MessageBarBody, MessageBarTitle, Skeleton } from '@fluentui/react-components'
import { invoke } from '@tauri-apps/api/core'
import { Suspense, useEffect, useState } from 'react'
import { PhotoProvider } from 'react-photo-view'

import { ImageCard } from '~/components/ImageCard'

import { MultiPreviewPageTopBar } from './components'
import type { MultiPreviewPageProps } from './MultiPreviewPage.types'

const path = 'assets/demo-test'

async function listFiles(folderPath: string): Promise<string[]> {
  return await invoke('list_files', { folderPath })
}

export default function MultiPreviewPage({ className }: MultiPreviewPageProps) {
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
      <MultiPreviewPageTopBar
        imageTitle={imageTitle}
        imageLink={imageLink}
        publishTime={publishTime}
        sourceUrl={sourceUrl}
        authorName={authorName}
        imageCount={imagePaths.length}
        description={description}
        tags={tags}
      />

      <div absolute size-full overflow-y-auto>
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
                grid="~ @[1200px]:cols-7 @[1000px]:cols-6 @[800px]:cols-5 @[600px]:cols-4 @[400px]:cols-3 @[200px]:cols-2 cols-1"
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
