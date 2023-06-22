/**
 * You are given an integer array matches where matches[i] = [winneri, loseri]
 * indicates that the player winneri defeated player loseri in a match.
 *
 * Return a list answer of size 2 where:
 *    answer[0] is a list of all players that have not lost any matches.
 *    answer[1] is a list of all players that have lost exactly one match.
 *
 * The values in the two lists should be returned in increasing order.
 *
 * Note:
 *    You should only consider the players that have played at least one match.
 *    The testcases will be generated such that no two matches will have the
 *    same outcome.
 *
 * Constraints:
 *    1 <= matches.length <= 10^5
 *    matches[i].length == 2
 *    1 <= winneri, loseri <= 10^5
 *    winneri != loseri
 *    All matches[i] are unique.
 */

/**
 * @param {number[][]} matches
 * @return {number[][]}
 */
const findWinners_meu = (matches) => {
  const playersSet = new Set()
  const losersMap = new Map()

  for (const [winner, loser] of matches) {
    playersSet.add(winner)
    playersSet.add(loser)
    losersMap.set(loser, (losersMap.get(loser) ?? 0) + 1)
  }

  const winners = [...playersSet]
    .filter((player) => !losersMap.has(player))
    .sort((a, b) => a - b)
  const losers = [...losersMap]
    .filter(([, losses]) => losses === 1)
    .map(([loser]) => loser)
    .sort((a, b) => a - b)

  return [winners, losers]
}

// Approach 3: Single Hash Map
const findWinners_singleMap = (matches) => {
  const map = new Map()
  for (const [winner, loser] of matches) {
    map.set(winner, map.get(winner) ?? 0)
    map.set(loser, (map.get(loser) ?? 0) + 1)
  }

  const winners = [...map]
    .filter(([, losses]) => losses === 0)
    .map(([winner]) => winner)
    .sort((a, b) => a - b)
  const losers = [...map]
    .filter(([, losses]) => losses === 1)
    .map(([winner]) => winner)
    .sort((a, b) => a - b)

  return [winners, losers]
}

// Approach 4: Counting Sort
const findWinners = (matches) => {
  const count = []
  for (const [winner, loser] of matches) {
    count[winner] = count[winner] ?? 0
    count[loser] = (count[loser] ?? 0) + 1
  }

  const winners = []
  const losers = []
  for (i in count) {
    if (count[i] === 0) winners.push(parseInt(i))
    if (count[i] === 1) losers.push(parseInt(i))
  }

  return [winners, losers]
}

matches = [
  [1, 3],
  [2, 3],
  [3, 6],
  [5, 6],
  [5, 7],
  [4, 5],
  [4, 8],
  [4, 9],
  [10, 4],
  [10, 9],
]
// Output: [[1,2,10],[4,5,7,8]]
// Explanation:
// Players 1, 2, and 10 have not lost any matches.
// Players 4, 5, 7, and 8 each have lost one match.
// Players 3, 6, and 9 each have lost two matches.
// Thus, answer[0] = [1,2,10] and answer[1] = [4,5,7,8].

// matches = [
//   [2, 3],
//   [1, 3],
//   [5, 4],
//   [6, 4],
// ]
// Output: [[1,2,5,6],[]]
// Explanation:
// Players 1, 2, 5, and 6 have not lost any matches.
// Players 3 and 4 each have lost two matches.
// Thus, answer[0] = [1,2,5,6] and answer[1] = [].

console.log(findWinners(matches))
