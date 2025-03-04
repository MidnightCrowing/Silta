import { Button } from '@fluentui/react-components'
import { convertFileSrc } from '@tauri-apps/api/core'
import { getCurrentWindow } from '@tauri-apps/api/window'
import type { JoLPlayerRef } from 'jol-player'
import { lazy, Suspense, useRef } from 'react'

import { useLocation } from '~/contexts/location'
import { TabComponentNameEnum } from '~/layouts'

const JoLPlayer = lazy(() => import('jol-player'))

const videoUrl = convertFileSrc('assets/demo.mp4')

export default function VideoPage() {
  const { setLocation } = useLocation()
  const videoRef = useRef<JoLPlayerRef>(null)

  return (
    <div>
      <div>
        <Suspense>
          <JoLPlayer
            ref={videoRef}
            onEnterFullScreen={async () => await getCurrentWindow().setFullscreen(true)}
            onExitFullScreen={async () => await getCurrentWindow().setFullscreen(false)}
            option={{
              videoSrc: videoUrl,
              width: 550,
              mode: 'widthFix',
              language: 'zh',
              pausePlacement: 'center',
              isShowScreenshot: false,
              isShowWebFullScreen: true,
              isProgressFloat: true,
            }}
          />
        </Suspense>
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
