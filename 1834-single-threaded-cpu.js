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
  const sortedTasks = tasks.map((x, i) => [...x, i]).sort(([a], [b]) => a - b)

  const nextTask = new MinPriorityQueue({
    priority: (task) => task[1] * 1e6 + task[2],
  })

  const processingOrder = []

  let time = 0
  let index = 0

  while (index < tasks.length || !nextTask.isEmpty()) {
    if (nextTask.isEmpty() && time < sortedTasks[index][0])
      time = sortedTasks[index][0]

    while (index < tasks.length && time >= sortedTasks[index][0]) {
      nextTask.enqueue(sortedTasks[index])
      index++
    }

    const [, taskTime, taskIndex] = nextTask.dequeue().element
    time += taskTime
    processingOrder.push(taskIndex)
  }

  return processingOrder
}

let tasks = [
  [1, 2],
  [2, 4],
  [3, 2],
  [4, 1],
]
// Output: [0, 2, 3, 1]

tasks = [
  [7, 10],
  [7, 12],
  [7, 5],
  [7, 4],
  [7, 2],
]
// Output: [4, 3, 2, 0, 1]

console.log(getOrder(tasks))
