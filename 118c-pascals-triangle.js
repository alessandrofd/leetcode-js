/**
 * Given an integer numRows, return the first numRows of Pascal's triangle.
 *
 * In Pascal's triangle, each number is the sum of the two numbers directly
 * above it.
 *
 * Constraints:
 *    1 <= numRows <= 30
 */

const arraysEqual = (a, b) => {
  /*
        Array-aware equality checker:
        Returns whether arguments a and b are == to each other;
        however if they are equal-lengthed arrays, returns whether their 
        elements are pairwise == to each other recursively under this
        definition.
    */
  if (a instanceof Array && b instanceof Array) {
    if (a.length != b.length)
      // assert same length
      return false
    for (let i = 0; i < a.length; i++)
      if (!arraysEqual(a[i], b[i])) return false
    return true
  } else {
    return a == b // if not both arrays, should be the same
  }
}

/**
 * @param {number} numRows
 * @return {number[][]}
 */
const generate = (qttyRows) => {}

// prettier-ignore
const funcs = [
  generate
]

const data = [
  [5, [[1], [1, 1], [1, 2, 1], [1, 3, 3, 1], [1, 4, 6, 4, 1]]],
  [1, [[1]]],
]

for (const func of funcs) {
  for (const [numRows, expected] of data) {
    const output = func(numRows)
    console.log(arraysEqual(output, expected))
  }
}
