/**
 * You want to schedule a list of jobs in d days. Jobs are dependent (i.e To
 * work on the ith job, you have to finish all the jobs j where 0 <= j < i).
 *
 * You have to finish at least one task every day. The difficulty of a job
 * schedule is the sum of difficulties of each day of the d days. The difficulty
 * of a day is the maximum difficulty of a job done on that day.
 *
 * You are given an integer array jobDifficulty and an integer d. The difficulty
 * of the ith job is jobDifficulty[i].
 *
 * Return the minimum difficulty of a job schedule. If you cannot find a
 * schedule for the jobs return -1.
 *
 * Constraints:
 *    1 <= jobDifficulty.length <= 300
 *    0 <= jobDifficulty[i] <= 1000
 *    1 <= d <= 10
 */

/**
 * @param {number[]} jobDifficulty
 * @param {number} d
 * @return {number}
 */

// Approach 1: Top-down DP
const minDifficulty = (jobDifficulty, days) => {
  const n = jobDifficulty.length
  if (n < days) return -1
  if (n === days) return jobDifficulty.reduce((acc, next) => acc + next)

  const memo = new Array(n).fill().map((_) => new Array(days + 1).fill(-1))

  const recurse = (firstTask, daysRemaining) => {
    if (memo[firstTask][daysRemaining] != -1)
      return memo[firstTask][daysRemaining]

    if (daysRemaining === 1)
      return jobDifficulty
        .slice(firstTask)
        .reduce((max, val) => Math.max(max, val))

    let result = Infinity
    let maxDiff = 0
    /** Como os dias remanescentes incluem o dia sob analise temos que somar 1
     * ao limite do laço abaixo. Logo, na primeira iteração (ou recursão, melhor
     * dito), os dias remanescentes serão todos os dias a serem planejados.
     * Portanto, caso não somemos 1 ao limite daremos espaço demasiado para os
     * demais dias.
     */
    for (let i = firstTask; i < n - daysRemaining + 1; i++) {
      maxDiff = Math.max(maxDiff, jobDifficulty[i])
      result = Math.min(result, maxDiff + recurse(i + 1, daysRemaining - 1))
    }
    memo[firstTask][daysRemaining] = result
    return result
  }

  return recurse(0, days)
}

// TODO: Approach 2: Bottom-up 2D DP

// TODO: Approach 3: Bottom-up 1D DP

// TODO: Approach 4: Monotonic Stack - Better Time Complexity

jobDifficulty = [6, 5, 4, 3, 2, 1]
d = 2
// Output: 7
// Explanation: First day you can finish the first 5 jobs, total difficulty = 6.
// Second day you can finish the last job, total difficulty = 1.
// The difficulty of the schedule = 6 + 1 = 7

// jobDifficulty = [9, 9, 9]
// d = 4
// Output: -1
// Explanation: If you finish a job per day you will still have a free day. you
// cannot find a schedule for the given jobs.

// jobDifficulty = [1, 1, 1]
// d = 3
// Output: 3
// Explanation: The schedule is one job per day. total difficulty will be 3.

console.log(minDifficulty(jobDifficulty, d))
