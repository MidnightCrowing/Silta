import { describe, expect, it } from 'vitest'

import { generateItemId } from './common'

describe('common utils', () => {
  describe('generateItemId', () => {
    it('应该生成唯一的字符串ID', () => {
      const id1 = generateItemId()
      const id2 = generateItemId()

      expect(typeof id1).toBe('string')
      expect(id1).not.toBe(id2)
    })

    it('生成的ID应该是数字字符串', () => {
      const id = generateItemId()
      expect(id).toMatch(/^\d+(\.\d+)?$/)
    })
  })
})
