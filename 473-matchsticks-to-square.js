/**
 * @param {number[]} matchsticks
 * @return {boolean}
 */
// Approach 2: Dynamic Programming
const makesquare = (matchsticks) => {
  if (!matchsticks || matchsticks.length === 0) return false

  const perimeter = matchsticks.reduce((acc, nxt) => acc + nxt)
  if (perimeter % 4) return false
  const side = perimeter / 4

  const memo = new Map()

  const recurse = (remainingMatches, sidesDone) => {
    const key = JSON.stringify({ remainingMatches, sidesDone })

    let sumUsedMatches = 0
    for (let i = matchsticks.length - 1; i >= 0; i--)
      if ((remainingMatches & (1 << i)) === 0)
        sumUsedMatches += matchsticks[matchsticks.length - 1 - i]

    if (sumUsedMatches > 0 && sumUsedMatches % side === 0) sidesDone++
    if (sidesDone === 3) return true
    if (memo.has(key)) return memo.get(key)
  

    let result = false
    const formedSides = Math.floor(sumUsedMatches / side)
    const lacksCurrentSide = side * (formedSides + 1) - sumUsedMatches

    for (let i = matchsticks.length - 1; i >= 0; i--) {
      if (
        matchsticks[matchsticks.length - 1 - i] <= lacksCurrentSide &&
        remainingMatches & (1 << i)
      )
        if (recurse(remainingMatches ^ (1 << i), sidesDone)) {
          result = true
          break
        }
    }
    memo.set(key, result)
    return result
  }
  console.log(memo)
  return recurse((1 << matchsticks.length) - 1, 0)
}

matchsticks = [12, 8, 12, 16, 20, 24, 28, 32, 36, 40, 44, 48, 52, 56, 60]
console.log(makesquare(matchsticks))
