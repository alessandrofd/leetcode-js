/**
 * @param {number} n
 * @param {number} k
 * @return {string}
 */
const getSmallestString = (qtty, sum) => {
  let result = ''
  while (qtty > 0) {
    const char = Math.min(26, sum - qtty + 1)
    result = String.fromCharCode('a'.charCodeAt(0) + char - 1) + result
    sum -= char
    qtty--
  }
  return result
}

// Input: n = 3, k = 27
// Output: "aay"
// Explanation: The numeric value of the string is 1 + 1 + 25 = 27, and it is the smallest string with such a value and length equal to 3.
console.log(getSmallestString(3, 27))

// Input: n = 5, k = 73
// Output: "aaszz"
console.log(getSmallestString(5, 73))
