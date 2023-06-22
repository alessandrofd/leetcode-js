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
const jobScheduling_topDownDP = (startTime, endTime, profit) => {
  const memo = new Array(5 * 10 ** 4 + 1)

  const findMaxProfit = (currentJob) => {
    const findNextJob = (currentEndTime) => {
      let start = 0
      let end = startTime.length - 1
      let nextJob = startTime.length

      while (start <= end) {
        let mid = ((start + end) / 2) | 0
        if (startTime[mid] >= currentEndTime) {
          nextJob = mid
          end = mid - 1
        } else {
          start = mid + 1
        }
      }
      return nextJob
    }

    if (currentJob === startTime.length) return 0

    if (memo[currentJob]) return memo[currentJob]

    const [, currentEndTime, currentProfit] = jobs[currentJob]
    const nextJob = findNextJob(currentEndTime)
    const maxProfit = Math.max(
      findMaxProfit(currentJob + 1),
      currentProfit + findMaxProfit(nextJob)
    )

    return (memo[currentJob] = maxProfit)
  }

  const jobs = []
  for (let i = 0; i < startTime.length; i++)
    jobs.push([startTime[i], endTime[i], profit[i]])
  jobs.sort(([a], [b]) => a - b)

  for (let i = 0; i < startTime.length; i++) startTime[i] = jobs[i][0]

  return findMaxProfit(0)
}

// Approach 2: Bottom-Up Dynamic Programming + Binary Search
const jobScheduling_bottomUpDP = (startTimes, endTimes, profits) => {
  const memo = new Array(5 * 10 ** 4 + 1)

  const jobs = []
  for (let i = 0; i < startTimes.length; i++)
    jobs.push([startTimes[i], endTimes[i], profits[i]])
  jobs.sort(([a], [b]) => a - b)

  for (let i = 0; i < startTimes.length; i++) startTimes[i] = jobs[i][0]

  const findMaxProfit = () => {
    const findNextJob = (endTime) => {
      let start = 0
      let end = startTimes.length - 1
      let nextJob = startTimes.length

      while (start <= end) {
        const mid = ((start + end) / 2) | 0
        if (startTimes[mid] >= endTime) {
          nextJob = mid
          end = mid - 1
        } else {
          start = mid + 1
        }
      }
      return nextJob
    }

    const length = startTimes.length

    for (let currJob = length - 1; currJob >= 0; currJob--) {
      let [, currEndTime, currProfit] = jobs[currJob]
      const nextJob = findNextJob(currEndTime)
      currProfit += nextJob === length ? 0 : memo[nextJob]
      memo[currJob] =
        currJob === length - 1
          ? currProfit
          : Math.max(currProfit, memo[currJob + 1])
    }

    return memo[0]
  }

  return findMaxProfit()
}

// Approach 3: Sorting + Priority Queue
import { MinPriorityQueue } from '@datastructures-js/priority-queue'

const jobScheduling = (startTimes, endTimes, profits) => {
  const jobs = []
  const length = startTimes.length
  for (let i = 0; i < length; i++)
    jobs.push([startTimes[i], endTimes[i], profits[i]])
  jobs.sort(([a], [b]) => a - b)

  const findMaxProfit = () => {
    const jobQueue = new MinPriorityQueue({ priority: (job) => job[0] })
    let maxProfit = 0

    for (const [start, end, profit] of jobs) {
      jobQueue.size()
      while (!jobQueue.isEmpty() && start >= jobQueue.front().priority)
        maxProfit = Math.max(maxProfit, jobQueue.dequeue().element[1])
      jobQueue.enqueue([end, profit + maxProfit])
    }

    while (!jobQueue.isEmpty())
      maxProfit = Math.max(maxProfit, jobQueue.dequeue().element[1])

    return maxProfit
  }

  return findMaxProfit()
}

let startTime = [1, 2, 3, 3]
let endTime = [3, 4, 5, 6]
let profit = [50, 10, 40, 70]
// Output: 120

// let startTime = [1, 2, 3, 4, 6]
// let endTime = [3, 5, 10, 6, 9]
// let profit = [20, 20, 100, 70, 60]
// Output: 150

// startTime = [1, 1, 1]
// endTime = [2, 3, 4]
// profit = [5, 6, 4]
// Output: 6

console.log(jobScheduling(startTime, endTime, profit))
