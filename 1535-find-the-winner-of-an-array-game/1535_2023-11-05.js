const getWinner_number_of_wins = (arr, k) => {
  const n = arr.length
  const maxElement = Math.max(...arr)

  if (k > n) return maxElement

  let wins = 0
  let defending = arr.shift()
  while (defending !== maxElement && wins < k) {
    const opponent = arr.shift()

    if (defending > opponent) {
      wins += 1
      arr.push(opponent)
    } else {
      wins = 1
      arr.push(defending)
      defending = opponent
    }
  }

  return defending
}

const getWinner = (arr, k) => {
  const n = arr.length

  let wins = 0
  let defending = arr[0]
  for (let i = 1; i < n; i++) {
    const opponent = arr[i]
    if (defending > opponent) {
      wins += 1
    } else {
      wins = 1
      defending = opponent
    }

    if (wins === k) break
  }

  return defending
}

// prettier-ignore
const funcs = [
  getWinner,
]

const data = [
  [[2, 1, 3, 5, 4, 6, 7], 2, 5],
  [[3, 2, 1], 10, 3],
]

for (const func of funcs) {
  for (const [arr, k, expected] of data) {
    console.log(func(arr, k) === expected)
  }
}
