/**
 * You are given n​​​​​​ tasks labeled from 0 to n - 1 represented by a 2D integer
 * array tasks, where tasks[i] = [enqueueTimei, processingTimei] means that the
 * i​​​​​​th​​​​ task will be available to process at enqueueTimei and will take
 * processingTimei to finish processing.
 *
 * You have a single-threaded CPU that can process at most one task at a time
 * and will act in the following way:
 *
 *    If the CPU is idle and there are no available tasks to process, the CPU
 *    remains idle.
 *
 *    If the CPU is idle and there are available tasks, the CPU will choose the
 *    one with the shortest processing time. If multiple tasks have the same
 *    shortest processing time, it will choose the task with the smallest index.
 *
 *    Once a task is started, the CPU will process the entire task without
 *    stopping.
 *
 *    The CPU can finish a task then start a new one instantly.
 *
 *    Return the order in which the CPU will process the tasks.
 *
 * Constraints:
 *    tasks.length == n
 *    1 <= n <= 10^5
 *    1 <= enqueueTimei, processingTimei <= 10^9
 */

/**
 * @param {number[][]} tasks
 * @return {number[]}
 */
import { MinPriorityQueue } from '@datastructures-js/priority-queue'
const getOrder = (tasks) => {
  const indexedTasks = tasks
    .map((task, i) => [...task, i])
    .sort(([a], [b]) => a - b)

  const queue = new MinPriorityQueue({
    priority: (job) => job.processingTime * 1e6 + job.index,
  })

  const result = []

  let time = 0
  while (result.length < tasks.length) {
    if (queue.isEmpty() && time < indexedTasks[0][0]) time = indexedTasks[0][0]

    while (indexedTasks.length && indexedTasks[0][0] <= time) {
      const [_, processingTime, index] = indexedTasks.shift()
      queue.enqueue({ processingTime, index })
    }

    const { processingTime, index } = queue.dequeue().element
    result.push(index)
    time += processingTime
  }

  return result
}

let tasks = [
  [1, 2],
  [2, 4],
  [3, 2],
  [4, 1],
]
// Output: [0, 2, 3, 1]

// tasks = [
//   [7, 10],
//   [7, 12],
//   [7, 5],
//   [7, 4],
//   [7, 2],
// ]
// Output: [4, 3, 2, 0, 1]

// tasks = [
//   [1, 2],
//   [2, 4],
//   [3, 2],
//   [4, 1],
// ]
// Expected: [0, 2, 3, 1]

console.log(getOrder(tasks))

const a = [[1], [2]]
const x = Math.max(3, a[2]?.[0] ?? 0)
console.log(x)
