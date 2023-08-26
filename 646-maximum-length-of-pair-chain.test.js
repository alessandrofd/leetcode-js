const {
  findLongestChain_DP_TopDown,
  findLongestChain_DP_BottomUp,
  findLongestChain_greedy,
} = require('./646-maximum-length-of-pair-chain')

const data = [
  [
    // prettier-ignore
    [ [1, 2], [2, 3], [3, 4], ],
    2,
  ],
  [
    // prettier-ignore
    [ [1, 2], [7, 8], [4, 5], ],
    3,
  ],
]

// prettier-ignore
const funcs = [
  findLongestChain_DP_TopDown, 
  findLongestChain_DP_BottomUp,
  findLongestChain_greedy
]

test('default test', () => {
  for (const func of funcs) {
    for (const [pairs, expected] of data) {
      expect(func(pairs)).toBe(expected)
    }
  }
})
