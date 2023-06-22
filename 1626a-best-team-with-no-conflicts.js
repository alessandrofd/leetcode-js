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
const bestTeamScore_backtracking = (scores, ages) => {}

// Dynamic Programming Top-Down
const bestTeamScore_topDown = (scores, ages) => {}

// Dynamic Programming Bottom-Up
const bestTeamScore_bottomUp = (scores, ages) => {}

// Approach 3: Binary Indexed Tree (BIT) / Fenwick Tree
const bestTeamScore_binaryIndexedTree = (scores, ages) => {}

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
