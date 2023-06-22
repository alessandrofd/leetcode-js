/**
 * @param {number[][]} coordinates
 * @return {boolean}
 */
const checkStraightLine1 = (coordinates) => {
  const set = new Set()
  coordinates.sort(([x1, y1], [x2, y2]) => x1 - x2 || y1 - y2)
  for (i = 1; i < coordinates.length; i++) {
    const [x1, y1] = coordinates[i - 1]
    const [x2, y2] = coordinates[i]
    const m = (y2 - y1) / (x2 - x1)
    set.add(m)
  }
  return set.size === 1
}

const checkStraightLine2 = (coordinates) => {
  const set = new Set()
  for (i = 1; i < coordinates.length; i++) {
    const [x1, y1] = coordinates[i - 1]
    const [x2, y2] = coordinates[i]
    const m = (y2 - y1) / (x2 - x1)
    set.add(m === -Infinity ? Infinity : m)
  }
  return set.size === 1
}

const checkStraightLine3 = (coordinates) => {
  const absInfinity = (n) => (n === -Infinity ? Infinity : n)

  if (coordinates.length <= 2) return true

  const [x0, y0] = coordinates[0]
  const [x1, y1] = coordinates[1]
  const slope = absInfinity((y1 - y0) / (x1 - x0))

  for (i = 2; i < coordinates.length; i++) {
    const [xi, yi] = coordinates[i]
    const slopei = absInfinity((yi - y0) / (xi - x0))
    if (slopei !== slope) return false
  }
  return true
}

const checkStraightLine = (c) => {
  const absInfinity = (n) => (n === -Infinity ? Infinity : n)

  if (c.length <= 2) return true

  const slope = absInfinity((c[1][1] - c[0][1]) / (c[1][0] - c[0][0]))

  for (i = 2; i < c.length; i++) {
    if (absInfinity((c[i][1] - c[0][1]) / (c[i][0] - c[0][0])) !== slope)
      return false
  }
  return true
}

// Input: coordinates = [[1,2],[2,3],[3,4],[4,5],[5,6],[6,7]]
// Output: true
console.log(
  checkStraightLine([
    [1, 2],
    [2, 3],
    [3, 4],
    [4, 5],
    [5, 6],
    [6, 7],
  ])
)

// Input: coordinates = [[1,1],[2,2],[3,4],[4,5],[5,6],[7,7]]
// Output: false
// console.log(
console.log(
  checkStraightLine([
    [1, 1],
    [2, 2],
    [3, 4],
    [4, 5],
    [5, 6],
    [7, 7],
  ])
)

// Input: coordinates = [[-3,-2],[-1,-2],[2,-2],[-2,-2],[0,-2]]
// Output: true
console.log(
  checkStraightLine([
    [-3, -2],
    [-1, -2],
    [2, -2],
    [-2, -2],
    [0, -2],
  ])
)

// Input: coordinates = [[[1,-8],[2,-3],[1,2]]]
// Output: false
console.log(
  checkStraightLine([
    [1, -8],
    [2, -3],
    [1, 2],
  ])
)

// Input: coordinates = [[([0, 0], [0, 1], [0, -1])]]
// Output: true
console.log(
  checkStraightLine([
    [0, 0],
    [0, 1],
    [0, -1],
  ])
)
