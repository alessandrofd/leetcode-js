/**
 * Given an array of points where points[i] = [xi, yi] represents a point on
 * the X-Y plane, return the maximum number of points that lie on the same
 * straight line.
 *
 * Constraints:
 *    1 <= points.length <= 300
 *    points[i].length == 2
 *    -10^4 <= xi, yi <= 10^4
 *    All the points are unique.
 */

/**
 * @param {number[][]} points
 * @return {number}
 */
const maxPoints = (points) => {
  const n = points.length
  if (n <= 2) return n

  let result = 0

  for (let i = 0; i < n; i++) {
    const map = new Map()
    for (let j = 0; j < n; j++) {
      if (i !== j) {
        const angle = Math.atan2(
          points[j][0] - points[i][0],
          points[j][1] - points[i][1]
        )
        map.set(angle, (map.get(angle) ?? 1) + 1)
      }
    }
    result = Math.max(result, ...map.values())
  }
  return result
}

points = [
  [1, 1],
  [2, 2],
  [3, 3],
]
// Output: 3

points = [
  [1, 1],
  [3, 2],
  [5, 3],
  [4, 1],
  [2, 3],
  [1, 4],
]
// Output: 4

console.log(maxPoints(points))
