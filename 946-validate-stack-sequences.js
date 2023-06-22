/**
 * Given two integer arrays pushed and popped each with distinct values,
 * return true if this could have been the result of a sequence of push and pop
 * operations on an initially empty stack, or false otherwise.
 *
 * Constraints:
 *    1 <= pushed.length <= 1000
 *    0 <= pushed[i] <= 1000
 *    All the elements of pushed are unique.
 *    popped.length == pushed.length
 *    popped is a permutation of pushed.
 */

/**
 * @param {number[]} pushed
 * @param {number[]} popped
 * @return {boolean}
 */
const validateStackSequences = (pushed, popped) => {
  const n = pushed.length

  const simulation = []
  let count = 0
  for (const num of pushed) {
    simulation.push(num)
    while (
      simulation.length &&
      count < n &&
      simulation.at(-1) === popped[count]
    ) {
      simulation.pop()
      count++
    }
  }

  return count === n
}

pushed = [1, 2, 3, 4, 5]
popped = [4, 5, 3, 2, 1]
// Output: true

pushed = [1, 2, 3, 4, 5]
popped = [4, 3, 5, 1, 2]
// Output: false

console.log(validateStackSequences(pushed, popped))
