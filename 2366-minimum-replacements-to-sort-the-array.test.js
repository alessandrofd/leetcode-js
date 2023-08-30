const {
  minimumReplacement,
} = require('./2366-minimum-replacements-to-sort-the-array')

// prettier-ignore
const funcs = [
  minimumReplacement,
]

const data = [
  [[3, 9, 3], 2],
  [[1, 2, 3, 4, 5], 0],
  [[12, 9, 7, 6, 17, 19, 21], 6],
  [[7, 6, 15, 6, 11, 14, 10], 10],
]

test('default test', () => {
  for (const func of funcs) {
    for (const [nums, expected] of data) {
      expect(func(nums)).toBe(expected)
    }
  }
})
