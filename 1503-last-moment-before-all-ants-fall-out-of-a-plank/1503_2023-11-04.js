const getLastMoment = (n, left, right) => {
  return Math.max(n - Math.min(...right), Math.max(...left))
}

// prettier-ignore
const funcs = [
  getLastMoment,
]

const data = [
  [4, [4, 3], [0, 1], 4],
  [7, [], [0, 1, 2, 3, 4, 5, 6, 7], 7],
  [7, [0, 1, 2, 3, 4, 5, 6, 7], [], 7],
]

for (const func of funcs) {
  for (const [n, left, right, expected] of data) {
    console.log(func(n, left, right) === expected)
  }
}
