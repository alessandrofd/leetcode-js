/**
 * @param {number} numRows
 * @return {number[][]}
 */
const generate = (qttyRows) => {
  const triangle = []
  triangle.push([1])

  for (let numRow = 1; numRow < qttyRows; numRow++) {
    const prevRow = triangle[numRow - 1]
    const row = [1]
    for (let i = 1; i < numRow; i++) row.push(prevRow[i - 1] + prevRow[i])
    row.push(1)
    triangle.push(row)
  }
  return triangle
}

numRows = 5
// Output: [[1],[1,1],[1,2,1],[1,3,3,1],[1,4,6,4,1]]

// numRows = 1
// Output: [[1]]

console.log(generate(numRows))
