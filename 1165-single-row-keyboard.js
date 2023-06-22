/**
 * There is a special keyboard with all keys in a single row.
 *
 * Given a string keyboard of length 26 indicating the layout of the keyboard
 * (indexed from 0 to 25). Initially, your finger is at index 0. To type a
 * character, you have to move your finger to the index of the desired
 * character. The time taken to move your finger from index i to index j is
 * |i - j|.
 *
 * You want to type a string word. Write a function to calculate how much time
 * it takes to type it with one finger.
 *
 * Constraints:
 *    keyboard.length == 26
 *    keyboard contains each English lowercase letter exactly once in some order.
 *    1 <= word.length <= 10^4
 *    word[i] is an English lowercase letter.
 */

/**
 * @param {string} keyboard
 * @param {string} word
 * @return {number}
 */
const calculateTime = (keyboard, word) => {
  const positions = new Array(26)
  for (let i = 0; i < 26; i++) positions[keyboard[i].charCodeAt() - 97] = i

  let pos = 0
  let distance = 0
  for (letter of word) {
    newPos = positions[letter.charCodeAt() - 97]
    distance += Math.abs(pos - newPos)
    pos = newPos
  }

  return distance
}

keyboard = 'abcdefghijklmnopqrstuvwxyz'
word = 'cba'
// Output: 4
// Explanation: The index moves from 0 to 2 to write 'c' then to 1 to write 'b'
// then to 0 again to write 'a'.
// Total time = 2 + 1 + 1 = 4.

// keyboard = 'pqrstuvwxyzabcdefghijklmno'
// word = 'leetcode'
// Output: 73

console.log(calculateTime(keyboard, word))
