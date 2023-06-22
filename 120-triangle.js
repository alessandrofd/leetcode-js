/**
 * @param {number[][]} triangle
 * @return {number}
 */
// const minimumTotal = (triangle) => {
//   let col = 0
//   let sum = 0
//   for (const row of triangle) {
//     if (row[col] <= (row[col + 1] ?? Infinity)) {
//       sum += row[col]
//     } else {
//       sum += row[col + 1]
//       col = col + 1
//     }
//   }
//   return sum
// }

const minimumTotal = (triangle) => {
  for (let i = triangle.length - 2; i >= 0; i--)
    for (let j = 0; j < triangle[i].length; j++)
      triangle[i][j] += Math.min(triangle[i + 1][j], triangle[i + 1][j + 1])
  return triangle[0][0]
}

// triangle = [[2], [3, 4], [6, 5, 7], [4, 1, 8, 3]]
triangle = [[-1], [2, 3], [1, -1, -3]]
console.log(minimumTotal(triangle))
