import './VideoPage.scss'

import { Button } from '@fluentui/react-components'
import { convertFileSrc } from '@tauri-apps/api/core'
import { getCurrentWindow } from '@tauri-apps/api/window'
import type { JoLPlayerRef } from 'jol-player'
import JoLPlayer from 'jol-player'
import { useRef } from 'react'

import { useLocation } from '~/contexts/location'
import { TabComponentNameEnum } from '~/layouts'

import type { VideoPageProps } from './VideoPage.types'

// const JoLPlayer = lazy(() => import('jol-player'))

const videoUrl = convertFileSrc('assets/demo.mp4')

export default function VideoPage({ className }: VideoPageProps) {
  const { setLocation } = useLocation()
  const videoRef = useRef<JoLPlayerRef>(null)

  return (
    <div className={`@container overflow-x-hidden ${className}`}>
      <div p="x-20px t-10px" flex="~ col @[800px]:row" gap="10px">
        <JoLPlayer
          ref={videoRef}
          className="size-unset! @[800px]:w-70%!  rounded-5px overflow-hidden"
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

        <div>
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
      </div>
    </div>
  )
}
