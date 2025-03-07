import {
  defineConfig,
  presetAttributify,
  presetTypography,
  presetWind3,
  transformerAttributifyJsx,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

import { generatePreflightCSS, transformerColorVariable } from './src/styles/transformer-color-variable'

export default defineConfig({
  presets: [
    presetWind3(),
    presetAttributify(),
    presetTypography(),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
    transformerAttributifyJsx(),
    transformerColorVariable(),
  ],
  preflights: [
    {
      getCSS: generatePreflightCSS,
    },
  ],
})
