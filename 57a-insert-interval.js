/**
 * Daily Challenge 16/01/2023
 *
 * You are given an array of non-overlapping intervals intervals where
 * intervals[i] = [starti, endi] represent the start and the end of the
 * ith interval and intervals is sorted in ascending order by starti. You are
 * also given an interval newInterval = [start, end] that represents the start
 * and end of another interval.
 *
 * Insert newInterval into intervals such that intervals is still sorted in
 * ascending order by starti and intervals still does not have any overlapping
 * intervals (merge overlapping intervals if necessary).
 *
 * Return intervals after the insertion.
 *
 * Constraints:
 *    0 <= intervals.length <= 10^4
 *    intervals[i].length == 2
 *    0 <= starti <= endi <= 10^5
 *    intervals is sorted by starti in ascending order.
 *    newInterval.length == 2
 *    0 <= start <= end <= 105
 */

/**
 * @param {number[][]} intervals
 * @param {number[]} newInterval
 * @return {number[][]}
 */
const insert = (intervals, newInterval) => {
  const n = intervals.length

  let [newStart, newEnd] = newInterval

  let lo = 0
  let hi = n
  while (lo < hi) {
    const mid = ((lo + hi) / 2) | 0

    if (newStart > intervals[mid][0]) lo = mid + 1
    else hi = mid
  }

  let index = Math.max(0, lo - 1)
  let left = [...intervals.slice(0, index)]
  while (index < n) {
    const [start, end] = intervals[index]

    if (start > newEnd) break

    if (end < newStart) {
      left.push(intervals[index])
    } else {
      newStart = Math.min(newStart, start)
      newEnd = Math.max(newEnd, end)
    }
    index++
  }
  return [...left, [newStart, newEnd], ...intervals.slice(index)]
}

intervals = [
  [1, 3],
  [6, 9],
]
newInterval = [2, 5]
// Output: [[1,5],[6,9]]

intervals = [
  [1, 2],
  [3, 5],
  [6, 7],
  [8, 10],
  [12, 16],
]
newInterval = [4, 8]
// Output: [[1,2],[3,10],[12,16]]
// Explanation: Because the new interval [4,8] overlaps with [3,5],[6,7],[8,10].

intervals = [[1, 5]]
newInterval = [2, 3]

intervals = []
newInterval = [2, 3]

// intervals = [[1, 5]]
// newInterval = [1, 7]

console.log(insert(intervals, newInterval))

const a = [[1], [2], [3]]
console.log(Infinity >= a[3]?.[0])
