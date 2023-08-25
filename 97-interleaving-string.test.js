const {
  isInterleave_DP_topDown,
  isInterleave_DP_bottomUp,
} = require('./97-interleaving-string')

const data = [
  ['aabcc', 'dbbca', 'aadbbcbcac', true],
  ['aabcc', 'dbbca', 'aadbbbaccc', false],
  ['', '', '', true],
  ['a', 'b', 'a', false],
  ['a', '', 'a', true],
]

// prettier-ignore
const funcs = [
  isInterleave_DP_topDown, 
  isInterleave_DP_bottomUp
]

test('default test', () => {
  for (const func of funcs)
    for (const [s1, s2, s3, expected] of data)
      expect(func(s1, s2, s3)).toBe(expected)
})
