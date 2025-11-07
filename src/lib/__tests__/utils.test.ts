import { cn } from '../utils'

describe('Utils', () => {
  describe('cn - className utility', () => {
    it('should merge class names', () => {
      const result = cn('class1', 'class2')
      expect(result).toBe('class1 class2')
    })

    it('should handle conditional classes', () => {
      const isActive = true
      const result = cn('base', isActive && 'active')
      expect(result).toBe('base active')
    })

    it('should filter out false/null/undefined values', () => {
      const result = cn('class1', false, null, undefined, 'class2')
      expect(result).toBe('class1 class2')
    })

    it('should handle Tailwind class conflicts', () => {
      const result = cn('px-2 py-1', 'px-4')
      // Should use the last px value
      expect(result).toContain('px-4')
      expect(result).toContain('py-1')
    })

    it('should handle empty input', () => {
      const result = cn()
      expect(result).toBe('')
    })

    it('should handle arrays of classes', () => {
      const result = cn(['class1', 'class2'], 'class3')
      expect(result).toContain('class1')
      expect(result).toContain('class2')
      expect(result).toContain('class3')
    })

    it('should handle objects with boolean values', () => {
      const result = cn({
        'class1': true,
        'class2': false,
        'class3': true,
      })
      expect(result).toContain('class1')
      expect(result).not.toContain('class2')
      expect(result).toContain('class3')
    })
  })
})
