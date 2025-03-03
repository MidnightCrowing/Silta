import { Button } from '@fluentui/react-components'
import { convertFileSrc } from '@tauri-apps/api/core'
import { getCurrentWindow } from '@tauri-apps/api/window'
import type { JoLPlayerRef } from 'jol-player'
import JoLPlayer from 'jol-player'
import { useEffect, useRef } from 'react'

import { useLocation } from '~/contexts/location'
import { TabComponentNameEnum } from '~/layouts'

const videoUrl = convertFileSrc('assets/时隔两年～再次翻唱《Ivory Tower》_《最后的旅行》 P1 Ivory Tower.mp4')

export default function VideoPage() {
  const { setLocation } = useLocation()
  const videoRef = useRef<JoLPlayerRef>(null)

  useEffect(() => {
    const handleFullScreenChange = async () => {
      if (await getCurrentWindow().isFullscreen()) {
        await getCurrentWindow().setFullscreen(false)
        console.log('退出全屏')
      }
      else {
        await getCurrentWindow().setFullscreen(true)
        console.log('进入全屏')
      }
    }

    document.addEventListener('fullscreenchange', handleFullScreenChange)
    document.addEventListener('webkitfullscreenchange', handleFullScreenChange)
    document.addEventListener('mozfullscreenchange', handleFullScreenChange)
    document.addEventListener('MSFullscreenChange', handleFullScreenChange)

    return () => {
      document.removeEventListener('fullscreenchange', handleFullScreenChange)
      document.removeEventListener('webkitfullscreenchange', handleFullScreenChange)
      document.removeEventListener('mozfullscreenchange', handleFullScreenChange)
      document.removeEventListener('MSFullscreenChange', handleFullScreenChange)
    }
  }, [])

  return (
    <div>
      <div>
        <JoLPlayer
          ref={videoRef}
          option={{
            videoSrc: videoUrl,
            width: 550,
            mode: 'widthFix',
            language: 'zh',
            pausePlacement: 'center',
            isShowWebFullScreen: true,
            isProgressFloat: true,
          }}
        />
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
  )
}
