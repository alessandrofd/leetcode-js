/**
 * @param {number[][]} mat
 * @param {number} r
 * @param {number} c
 * @return {number[][]}
 */
const matrixReshape1 = (mat, r, c) => {
  const flattenArray = (a) => {
    return a.reduce(
      (acc, element) =>
        acc.concat(Array.isArray(element) ? flattenArray(element) : element),
      []
    )
  }

  const flat = flattenArray(mat)
  if (flat.length !== r * c) return mat
  const reshaped = []
  for (let i = 0; i < r; i++) {
    const row = []
    for (let j = 0; j < c; j++) {
      row.push(flat.shift())
    }
    reshaped.push(row)
  }
  return reshaped
}


const matrixReshape = (mat, r, c) => {

  const flat = mat.flat()
  if (flat.length !== r * c) return mat
  
  const reshaped = []
  while (flat.length) reshaped.push(flat.splice(0, c))
  
  return reshaped
}

/* 
Input: mat = [[1,2],[3,4]], r = 1, c = 4
Output: [[1,2,3,4]] 
*/
console.log(matrixReshape([[1, 2], [3, 4]], 1, 4))

/*
Input: mat = [[1,2],[3,4]], r = 2, c = 4
Output: [[1,2],[3,4]]
 */
console.log(matrixReshape([[1,2], [3, 4]], 2, 4))