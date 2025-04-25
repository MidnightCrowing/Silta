import antfu from '@antfu/eslint-config'
import simpleImportSort from 'eslint-plugin-simple-import-sort'

export default antfu({
  react: true,
  UnoCSS: true,

  formatters: {
    css: 'prettier',
    prettierOptions: {
      printWidth: 120,
      singleQuote: false,
    },
  },

  ignores: [
    'dist',
    'node_modules',
    'public',
    'src/libs',
    'src-tauri',
    'src/tauri-types.ts',
  ],

  plugins: {
    'simple-import-sort': simpleImportSort,
  },

  rules: {
    'no-alert': 'off',
    'import/order': 'off',
    'style/quote-props': 'off',
    'perfectionist/sort-imports': 'off',
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
  },
})
