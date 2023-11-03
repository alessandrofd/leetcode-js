import _ from 'lodash'

const buildArray = (target, n) => {
  const result = []
  let i = 1

  target.forEach((num) => {
    while (i < num) {
      result.push('Push')
      result.push('Pop')
      i += 1
    }
    result.push('Push')
    i += 1
  })

  return result
}

// prettier-ignore
const funcs = [
  buildArray,
]

const data = [
  [[1, 3], 3, ['Push', 'Push', 'Pop', 'Push']],
  [[1, 2, 3], 3, ['Push', 'Push', 'Push']],
  [[1, 2], 4, ['Push', 'Push']],
]

for (const func of funcs) {
  for (const [target, n, expected] of data) {
    console.log(_.isEqual(func(target, n), expected))
  }
}
