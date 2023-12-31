const { canCross_DP_bottomUp, canCross_DP_topDown } = require('./403-frog-jump')

// prettier-ignore
const funcs = [
  canCross_DP_topDown, 
  canCross_DP_bottomUp
]

const data = [
  [[0, 1, 3, 5, 6, 8, 12, 17], true],
  [[0, 1, 2, 3, 4, 8, 9, 11], false],
  [[0, 1, 2147483647], false],
]

test('default test', () => {
  for (const func of funcs) {
    for (const [stones, expected] of data) {
      expect(func(stones)).toBe(expected)
    }
  }
})
