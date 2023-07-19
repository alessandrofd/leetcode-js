/**
 * Given an array of intervals intervals where intervals[i] = [starti, endi],
 * return the minimum number of intervals you need to remove to make the rest of
 * the intervals non-overlapping.
 *
 * Constraints:
 *    1 <= intervals.length <= 10^5
 *    intervals[i].length == 2
 *    -5 * 10^4 <= starti < endi <= 5 * 10^4
 */

// Greedy

/**
 * @param {number[][]} intervals
 * @return {number}
 */
const eraseOverlapIntervals = (intervals) => {
  const n = intervals.length

  intervals.sort(([, a], [, b]) => a - b)

  let end = intervals[0][1]
  let erases = 0
  for (let i = 1; i < n; i++) {
    const [nextStart, nextEnd] = intervals[i]
    if (nextStart >= end) end = nextEnd
    else erases += 1
  }

  return erases
}

// prettier-ignore
intervals = [[1,2],[2,3],[3,4],[1,3]]
// Expected: 1

// prettier-ignore
intervals = [[1,2],[1,2],[1,2]]
// Expected: 2

// prettier-ignore
intervals = [[1,2],[2,3]]
// Expected: 0

console.log(eraseOverlapIntervals(intervals))
