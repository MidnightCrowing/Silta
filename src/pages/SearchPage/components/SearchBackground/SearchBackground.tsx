import { Fade, FadeRelaxed } from '@fluentui/react-motion-components-preview'
import { useEffect, useState } from 'react'

import type { SearchBackgroundProps } from './SearchBackground.types.ts'

export function SearchBackground({ showBackground, backgroundUrl: currentBgUrl, isFocused }: SearchBackgroundProps) {
  const [lastBgUrl, setLastBgUrl] = useState<string>('')
  const [isImageLoaded, setIsImageLoaded] = useState<boolean>(false)

  // 当背景图片 URL 变化时，重置加载状态
  useEffect(() => {
    if (!showBackground) {
      // eslint-disable-next-line react-hooks-extra/no-direct-set-state-in-use-effect
      setLastBgUrl('')
    }
    if (currentBgUrl !== lastBgUrl) {
      // eslint-disable-next-line react-hooks-extra/no-direct-set-state-in-use-effect
      setIsImageLoaded(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentBgUrl])

  return (
    <FadeRelaxed visible={showBackground} unmountOnExit>
      <div absolute inset-0 select-none>
        {/* 上一张图 */}
        {currentBgUrl !== lastBgUrl && lastBgUrl !== '' && (
          <img
            absolute
            size-full
            object="center cover"
            src={lastBgUrl}
            alt="current background image"
          />
        )}

        {/* 新图预加载并淡入 */}
        <Fade
          visible={isImageLoaded}
          onMotionFinish={_ => setLastBgUrl(currentBgUrl)}
        >
          <img
            absolute
            size-full
            object="center cover"
            src={currentBgUrl}
            onLoad={_ => setIsImageLoaded(true)}
            alt="next background image"
          />
        </Fade>

        {/* 遮罩 */}
        <div absolute inset-0 bg="$homepage-bg-mask" />
        <div
          className={`absolute inset-0 bg-black transition-(bg duration-300) ${
            isFocused ? 'bg-opacity-60' : 'bg-opacity-0'
          }`}
        />
      </div>
    </FadeRelaxed>
  )
}
