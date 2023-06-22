/**
 * @param {string} n
 * @return {number}
 */
const minPartitions = (n) => {
  return Math.max(...[...n].map((n) => Number(n)))
}

n = '32'
// Output: 3

// n = "82734"
// Output: 8

// n = "27346209830709182346"
// Output: 9

console.log(minPartitions(n))
