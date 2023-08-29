const { bestClosingTime } = require('./2483-minimum-penalty-for-a-shop')

// prettier-ignore
const funcs = [
  bestClosingTime
]

const data = [
  ['YYNY', 2],
  ['NNNNN', 0],
  ['YYYY', 4],
]

test('default test', () => {
  for (const func of funcs) {
    for (const [customers, expected] of data) {
      expect(func(customers)).toBe(expected)
    }
  }
})
