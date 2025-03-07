import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

import type MagicString from 'magic-string'
import type { SourceCodeTransformerEnforce } from 'unocss'

// 存储已使用的颜色变量
const usedColorVariables = new Set<string>()

// 读取 SCSS 文件内容并提取变量名
function loadScssVariables(filePath: string) {
  const scssContent = readFileSync(filePath, 'utf-8')
  const variableRegex = /\$([\w-]+):/g
  for (const match of scssContent.matchAll(variableRegex)) {
    usedColorVariables.add(match[1])
  }
}

// 自定义 Transformer
export function transformerColorVariable() {
  // 加载 SCSS 文件中的变量
  loadScssVariables(resolve(__dirname, 'global-color-variable.scss'))

  return {
    name: 'transformer-color-variable',
    enforce: 'post' as SourceCodeTransformerEnforce,
    transform(code: MagicString) {
      code.replace(/color([A-Za-z0-9]+)-(\d+)/g, (_: string, name: string, percent: string) => {
        const varName = `color${name}-${percent}`
        usedColorVariables.add(varName) // 记录实际使用的变量
        return _
      })
    },
  }
}

export function generatePreflightCSS() {
  if (usedColorVariables.size === 0)
    return ''
  return `
      .fui-FluentProvider {
        ${Array.from(usedColorVariables)
          .map((varName) => {
            const [name, percent] = varName.split('-')
            return `--${varName}: color-mix(in oklab, var(--${name}), transparent ${percent}%);`
          })
          .join('\n')}
      }
    `
}
