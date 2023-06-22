/**
 * @param {number[]} people
 * @param {number} limit
 * @return {number}
 */
const numRescueBoats = (people, limit) => {
  people.sort((a, b) => b - a)
  let count = 0
  let start = 0
  let end = people.length - 1
  while (start <= end) {
    const diff = limit - people[start++]
    if (people[start] <= diff) start++
    else if (people[end] <= diff) end--
    count++
  }
  return count
}

// Input: people = [1,2], limit = 3
// Output: 1
// Explanation: 1 boat (1, 2)
console.log(numRescueBoats([1, 2], 3))

// Input: people = [3,2,2,1], limit = 3
// Output: 3
// Explanation: 3 boats (1, 2), (2) and (3)
console.log(numRescueBoats([3, 2, 2, 1], 3))

// Input: people = [3,5,3,4], limit = 5
// Output: 4
// Explanation: 4 boats (3), (3), (4), (5)
console.log(numRescueBoats([3, 5, 3, 4], 5))

// Expected: 11
console.log(
  numRescueBoats(
    [2, 49, 10, 7, 11, 41, 47, 2, 22, 6, 13, 12, 33, 18, 10, 26, 2, 6, 50, 10],
    50
  )
)
