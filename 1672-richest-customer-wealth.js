const maximumWealth = (accounts) => {
  return accounts
    .map((a) => a.reduce((acc, n) => acc + n, 0))
    .sort((a, b) => b - a)[0]
}

console.log(
  maximumWealth([
    [1, 2, 3],
    [3, 2, 1],
  ])
)

console.log(
  maximumWealth([
    [1, 5],
    [7, 3],
    [3, 5],
  ])
)

console.log(
  maximumWealth([
    [2, 8, 7],
    [7, 1, 3],
    [1, 9, 5],
  ])
)
