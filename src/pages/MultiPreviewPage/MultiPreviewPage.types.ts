import type { LocationComponentProps } from '~/contexts/location'

import type { PageBaseProps } from '../shared/sharedProps.types'

export interface MultiPreviewPageProps extends PageBaseProps {
}

export interface MultiPreviewPageLocationProps extends LocationComponentProps {
  // 图片路径
  path: string
}
