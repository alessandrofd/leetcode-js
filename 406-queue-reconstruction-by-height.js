/**
 * @param {number[][]} people
 * @return {number[][]}
 */
const reconstructQueue = (people) => {
  const output = []
  people.sort((a, b) => (a[0] === b[0] ? a[1] - b[1] : b[0] - a[0]))
  people.forEach((person) => output.splice(person[1], 0, person))
  return output
}

people = [
  [7, 0],
  [4, 4],
  [7, 1],
  [5, 0],
  [6, 1],
  [5, 2],
]
// Output: [[5,0],[7,0],[5,2],[6,1],[4,4],[7,1]]

// people = [[6,0],[5,0],[4,0],[3,2],[2,2],[1,4]]
// Output: [[4,0],[5,0],[2,2],[3,2],[1,4],[6,0]]

console.log(reconstructQueue(people))
