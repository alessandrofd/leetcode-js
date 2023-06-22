/**
 * You are the manager of a basketball team. For the upcoming tournament, you
 * want to choose the team with the highest overall score. The score of the team
 * is the sum of scores of all the players in the team.
 *
 * However, the basketball team is not allowed to have conflicts. A conflict
 * exists if a younger player has a strictly higher score than an older player.
 * A conflict does not occur between players of the same age.
 *
 * Given two lists, scores and ages, where each scores[i] and ages[i] represents
 * the score and age of the ith player, respectively, return the highest overall
 * score of all possible basketball teams.
 *
 * Constraints:
 *    1 <= scores.length, ages.length <= 1000
 *    scores.length == ages.length
 *    1 <= scores[i] <= 10^6
 *    1 <= ages[i] <= 1000
 */

// Backtracking - TLE
const bestTeamScore_backtracking = (scores, ages) => {
  const players = [...ages]
    .map((age, i) => [age, scores[i]])
    .sort(([age1, score1], [age2, score2]) =>
      age1 === age2 ? score1 - score2 : age1 - age2
    )

  let highestScore = 0

  const backtrack = (player = 0, prevScore = 0, teamScore = 0) => {
    if (player === players.length) return

    for (let i = player; i < players.length; i++) {
      const currScore = players[i][1]
      if (currScore >= prevScore) {
        teamScore += currScore
        highestScore = Math.max(highestScore, teamScore)
        backtrack(i + 1, currScore, teamScore)
        teamScore -= currScore
      }
    }
  }

  backtrack()
  return highestScore
}

// Dynamic Programming Top-Down
const bestTeamScore_topDown = (scores, ages) => {
  const players = [...ages]
    .map((age, i) => [age, scores[i]])
    .sort(([age1, score1], [age2, score2]) =>
      age1 === age2 ? score1 - score2 : age1 - age2
    )
  const n = players.length
  const memo = []
  memo[n - 1] = players[n - 1][1]

  const dfs = (player) => {
    if (memo[player] !== undefined) return memo[player]

    const currScore = players[player][1]
    memo[player] = currScore
    for (let i = player + 1; i < n; i++) {
      const nextScore = players[i][1]
      if (nextScore >= currScore)
        memo[player] = Math.max(memo[player], currScore + dfs(i))
    }
    return memo[player]
  }

  let highestScore = 0
  for (let i = 0; i < n; i++) highestScore = Math.max(highestScore, dfs(i))
  return highestScore
}

// Dynamic Programming Bottom-Up
const bestTeamScore_bottomUp = (scores, ages) => {
  const players = [...ages]
    .map((age, i) => [age, scores[i]])
    .sort(([age1, score1], [age2, score2]) =>
      age1 === age2 ? score1 - score2 : age1 - age2
    )
  const n = players.length
  const memo = []

  for (let i = 0; i < n; i++) {
    memo[i] = players[i][1]
    for (let j = i - 1; j >= 0; j--) {
      if (players[i][1] >= players[j][1]) {
        memo[i] = Math.max(memo[i], memo[j] + players[i][1])
      }
    }
  }

  return Math.max(...memo)
}

// Approach 3: Binary Indexed Tree (BIT) / Fenwick Tree
const bestTeamScore_binaryIndexedTree = (scores, ages) => {
  const players = [...scores]
    .map((score, i) => [score, ages[i]])
    .sort(([score1, age1], [score2, age2]) =>
      score1 === score2 ? age1 - age2 : score1 - score2
    )

  // Retorna a maior pontuação de uma idade
  const queryBIT = (binIndexedTree, age) => {
    let maxScore = -Infinity
    for (let i = age; i > 0; i -= i & -i)
      maxScore = Math.max(maxScore, binIndexedTree[i])
    return maxScore
  }

  // Atualiza a melhor pontuação para todos os nós de idade maior que a
  // idade dada
  const updateBIT = (binIndexedTree, age, score) => {
    for (let i = age; i < binIndexedTree.length; i += i & -i)
      binIndexedTree[i] = Math.max(binIndexedTree[i], score)
  }

  let result = 0

  const highestAge = Math.max(...ages)
  const bit = new Array(highestAge + 1).fill(0)
  for (const [score, age] of players) {
    const best = score + queryBIT(bit, age)
    updateBIT(bit, age, best)
    result = Math.max(result, best)
  }

  return result
}

scores = [1, 3, 5, 10, 15]
ages = [1, 2, 3, 4, 5]
// Output: 34

scores = [4, 5, 6, 5]
ages = [2, 1, 2, 1]
// Output: 16

scores = [1, 2, 3, 5]
ages = [8, 9, 10, 1]
// Output: 6

scores = [
  596, 277, 897, 622, 500, 299, 34, 536, 797, 32, 264, 948, 645, 537, 83, 589,
  770,
]
ages = [18, 52, 60, 79, 72, 28, 81, 33, 96, 15, 18, 5, 17, 96, 57, 72, 72]
// Expected: 3287

scores = [9, 2, 8, 8, 2]
ages = [4, 1, 3, 3, 5]
// Expected: 27

console.log(bestTeamScore_backtracking(scores, ages))
console.log(bestTeamScore_topDown(scores, ages))
console.log(bestTeamScore_bottomUp(scores, ages))
console.log(bestTeamScore_binaryIndexedTree(scores, ages))
