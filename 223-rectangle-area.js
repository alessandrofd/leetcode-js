/**
 * Given the coordinates of two rectilinear rectangles in a 2D plane, return the
 * total area covered by the two rectangles.
 *
 * The first rectangle is defined by its bottom-left corner (ax1, ay1) and its
 * top-right corner (ax2, ay2).
 *
 * The second rectangle is defined by its bottom-left corner (bx1, by1) and its
 * top-right corner (bx2, by2).
 *
 * Constraints:
 *    -10^4 <= ax1 <= ax2 <= 10^4
 *    -10^4 <= ay1 <= ay2 <= 10^4
 *    -10^4 <= bx1 <= bx2 <= 10^4
 *    -10^4 <= by1 <= by2 <= 10^4
 */

const computeArea = (ax1, ay1, ax2, ay2, bx1, by1, bx2, by2) => {
  const areaA = (ax2 - ax1) * (ay2 - ay1)
  const areaB = (bx2 - bx1) * (by2 - by1)

  // horizontal overlap
  const left = Math.max(ax1, bx1)
  const right = Math.min(ax2, bx2)
  const horOverlap = right - left

  // vertical overlap
  const bottom = Math.max(ay1, by1)
  const top = Math.min(ay2, by2)
  const vertOverlap = top - bottom

  const areaOverlap =
    horOverlap > 0 && vertOverlap > 0 ? horOverlap * vertOverlap : 0

  return areaA + areaB - areaOverlap
}

ax1 = -3
ay1 = 0
ax2 = 3
ay2 = 4
bx1 = 0
by1 = -1
bx2 = 9
by2 = 2
// Output: 45

// ax1 = -2
// ay1 = -2
// ax2 = 2
// ay2 = 2
// bx1 = -2
// by1 = -2
// bx2 = 2
// by2 = 2
// Output: 16

console.log(computeArea(ax1, ay1, ax2, ay2, bx1, by1, bx2, by2))
