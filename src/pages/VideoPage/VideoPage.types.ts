import type { LocationComponentProps } from '~/contexts/location'

import type { PageBaseProps } from '../shared/sharedProps.types'

export interface VideoPageProps extends PageBaseProps {
}

export interface VideoPageLocationProps extends LocationComponentProps {
  // 视频路径
  src: string
}
