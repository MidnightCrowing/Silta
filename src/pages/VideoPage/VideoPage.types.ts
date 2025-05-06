import type { LocationProps } from '~/contexts/location'

import type { PageBaseProps } from '../shared/sharedProps.types'

export interface VideoPageProps extends PageBaseProps {
}

export interface VideoLocationProps extends LocationProps {
  // 视频路径
  src: string
}
