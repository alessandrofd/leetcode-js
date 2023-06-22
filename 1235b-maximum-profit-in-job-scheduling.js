/**
 * We have n jobs, where every job is scheduled to be done from startTime[i] to
 * endTime[i], obtaining a profit of profit[i].
 *
 * You're given the startTime, endTime and profit arrays, return the maximum
 * profit you can take such that there are no two jobs in the subset with
 * overlapping time range.
 *
 * If you choose a job that ends at time X you will be able to start another job
 * that starts at time X.
 *
 *  Constraints:
 *    1 <= startTime.length == endTime.length == profit.length <= 5 * 10^4
 *    1 <= startTime[i] < endTime[i] <= 10^9
 *    1 <= profit[i] <= 10^4
 */

/**
 * @param {number[]} startTime
 * @param {number[]} endTime
 * @param {number[]} profit
 * @return {number}
 */
// Approach 1: Top-Down Dynamic Programming + Binary Search
const jobScheduling_topDownDP = (starts, ends, profits) => {
  // const jobScheduling = (starts, ends, profits) => {
  const length = starts.length

  const jobs = []
  for (let i = 0; i < length; i++)
    jobs.push({ start: starts[i], end: ends[i], profit: profits[i] })
  jobs.sort(({ start: a }, { start: b }) => a - b)

  const memo = []

  const findNextJob = (end) => {
    let left = 0
    let right = length - 1
    let nextJob = length

    while (left <= right) {
      const mid = ((left + right) / 2) | 0
      if (jobs[mid].start >= end) {
        right = mid - 1
        nextJob = mid
      } else {
        left = mid + 1
      }
    }

    return nextJob
  }

  const findMaxProfit = (job) => {
    if (job === length) return 0
    if (memo[job]) return memo[job]

    const { end, profit } = jobs[job]
    return (memo[job] = Math.max(
      profit + findMaxProfit(findNextJob(end)),
      findMaxProfit(job + 1)
    ))
  }

  return findMaxProfit(0)
}

// Approach 2: Bottom-Up Dynamic Programming + Binary Search
const jobScheduling_bottomUpDP = (starts, ends, profits) => {
  // const jobScheduling = (starts, ends, profits) => {
  const length = starts.length

  const jobs = []
  for (let i = 0; i < length; i++)
    jobs.push({ start: starts[i], end: ends[i], profit: profits[i] })
  jobs.sort(({ start: a }, { start: b }) => a - b)

  const findNextJob = (end) => {
    let left = 0
    let right = length - 1
    let nextJob = length

    while (left <= right) {
      const mid = ((left + right) / 2) | 0
      if (jobs[mid].start >= end) {
        right = mid - 1
        nextJob = mid
      } else {
        left = mid + 1
      }
    }
    return nextJob
  }

  const memo = []

  for (let job = length - 1; job >= 0; job--) {
    let { end, profit } = jobs[job]
    memo[job] = Math.max(
      profit + (memo[findNextJob(end)] ?? 0),
      memo[job + 1] ?? 0
    )
  }

  return memo[0]
}

// Approach 3: Sorting + Priority Queue
import { MinPriorityQueue } from '@datastructures-js/priority-queue'

// const jobScheduling_sortingPriorityQueue = (starts, ends, profits) => {
const jobScheduling = (starts, ends, profits) => {
  const length = starts.length

  const jobs = []
  for (let i = 0; i < length; i++)
    jobs.push({ start: starts[i], end: ends[i], profit: profits[i] })
  jobs.sort(({ start: a }, { start: b }) => a - b)

  const jobQueue = new MinPriorityQueue({ priority: (job) => job.end })

  let maxProfit = 0

  for (const { start, end, profit } of jobs) {
    while (!jobQueue.isEmpty() && jobQueue.front().priority <= start)
      maxProfit = Math.max(maxProfit, jobQueue.dequeue().element.profit)
    jobQueue.enqueue({ end, profit: profit + maxProfit })
  }

  while (!jobQueue.isEmpty())
    maxProfit = Math.max(maxProfit, jobQueue.dequeue().element.profit)

  return maxProfit
}

// let startTime = [1, 2, 3, 3]
// let endTime = [3, 4, 5, 6]
// let profit = [50, 10, 40, 70]
// Output: 120

// let startTime = [1, 2, 3, 4, 6]
// let endTime = [3, 5, 10, 6, 9]
// let profit = [20, 20, 100, 70, 60]
// Output: 150

// let startTime = [1, 1, 1]
// let endTime = [2, 3, 4]
// let profit = [5, 6, 4]
// Output: 6

// let startTime = [1, 2, 2]
// let endTime = [2, 5, 3]
// let profit = [1, 5, 10]
// Output: 11

console.log(jobScheduling(startTime, endTime, profit))
