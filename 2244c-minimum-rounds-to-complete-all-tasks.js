/**
 * You are given a 0-indexed integer array tasks, where tasks[i] represents the
 * difficulty level of a task. In each round, you can complete either 2 or 3
 * tasks of the same difficulty level.
 *
 * Return the minimum rounds required to complete all the tasks, or -1 if it is
 * not possible to complete all the tasks.
 *
 * Constraints:
 *    1 <= tasks.length <= 10^5
 *    1 <= tasks[i] <= 10^9
 */

/**
 * @param {number[]} tasks
 * @return {number}
 */
const minimumRounds = (tasks) => {
  const n = tasks.length
  const freqs = new Map()

  for (const task of tasks) {
    freqs.set(task, (freqs.get(task) ?? 0) + 1)
  }

  let rounds = 0
  for (const [task, freq] of freqs) {
    if (freq === 1) return -1
    rounds += Math.ceil(freq / 3)
  }

  return rounds
}

tasks = [2, 2, 3, 3, 2, 4, 4, 4, 4, 4]
// Output: 4

tasks = [2, 3, 3]
// Output: -1

tasks = [5, 5, 5, 5]
// Output: 2

console.log(minimumRounds(tasks))
