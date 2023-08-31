const {
  minTaps_dp,
  minTaps_greedy,
} = require('./1326-minimum-number-of-taps-to-open-to-water-a-garden')

// prettier-ignore
const funcs = [
  minTaps_greedy,
  minTaps_dp,
]

const data = [
  [5, [3, 4, 1, 1, 0, 0], 1],
  [3, [0, 0, 0, 0], -1],
  [7, [1, 2, 1, 0, 2, 1, 0, 1], 3],
  [
    35,
    [
      1, 0, 4, 0, 4, 1, 4, 3, 1, 1, 1, 2, 1, 4, 0, 3, 0, 3, 0, 3, 0, 5, 3, 0, 0,
      1, 2, 1, 2, 4, 3, 0, 1, 0, 5, 2,
    ],
    6,
  ],
]

test('default test', () => {
  for (const func of funcs) {
    for (const [n, ranges, expected] of data) {
      expect(func(n, ranges)).toBe(expected)
    }
  }
})
