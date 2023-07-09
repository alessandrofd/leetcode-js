/**
 * You are given an array coordinates, coordinates[i] = [x, y], where [x, y]
 * represents the coordinate of a point. Check if these points make a straight
 * line in the XY plane.
 *
 * Constraints:
 *    2 <= coordinates.length <= 1000
 *    coordinates[i].length == 2
 *    -10^4 <= coordinates[i][0], coordinates[i][1] <= 10^4
 *    coordinates contains no duplicate point.
 */

// Cuidado com o caso em que deltaY = 0 Infinity !== -Infinity

// Ao invés de comparar a inclinação (deltaX / deltaY) é melhor comparar
// os componentes deltaX0 * deltaY1 === deltaX1 * deltaY0

/**
 * @param {number[][]} coordinates
 * @return {boolean}
 */
const checkStraightLine = (coordinates) => {
  const n = coordinates.length

  if (n === 2) return true

  const [x0, y0] = coordinates[0]
  const [x1, y1] = coordinates[1]
  const [dx, dy] = [x1 - x0, y1 - y0]

  for (let i = 2; i < n; i++) {
    const [xi, yi] = coordinates[i]
    if (dx * (yi - y0) !== dy * (xi - x0)) return false
  }

  return true
}

// prettier-ignore
coordinates = [[1,2],[2,3],[3,4],[4,5],[5,6],[6,7]]
// Expected: true

// prettier-ignore
// coordinates = [[1,1],[2,2],[3,4],[4,5],[5,6],[7,7]]
// Expected: false

// prettier-ignore
// coordinates = [[1,2],[1,3],[1,4],[1,5],[1,6],[6,7]]
// Expected: false

// prettier-ignore
// coordinates = [[-3,-2],[-1,-2],[2,-2],[-2,-2],[0,-2]]
// Expected: true

console.log(checkStraightLine(coordinates))
