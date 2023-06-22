/**
 * Given two string arrays word1 and word2, return true if the two arrays
 * represent the same string, and false otherwise.
 *
 * A string is represented by an array if the array elements concatenated in
 * order forms the string.
 *
 * Constraints:
 *    1 <= word1.length, word2.length <= 10^3
 *    1 <= word1[i].length, word2[i].length <= 10^3
 *    1 <= sum(word1[i].length), sum(word2[i].length) <= 10^3
 *    word1[i] and word2[i] consist of lowercase letters.
 */

/**
 * @param {string[]} word1
 * @param {string[]} word2
 * @return {boolean}
 */
const arrayStringsAreEqual_afd = (word1, word2) => {
  let array1 = []
  let array2 = []
  while (word1.length) {
    array1 = [...word1.shift()]
    while (word2.length && array1.length > array2.length)
      array2 = array2.concat([...word2.shift()])
    while (array1.length) if (array1.shift() !== array2.shift()) return false
  }
  if (word2.length || array2.length) return false
  return true
}

// Approach 1: Concatenate and Compare
const arrayStringsAreEqual_1 = (word1, word2) => {
  const string1 = word1.reduce(
    (string, piece) => (string += piece),
    (string = '')
  )
  const string2 = word2.reduce(
    (string, piece) => (string += piece),
    (string = '')
  )
  return string1 === string2
}

// Approach 2: Two Pointers
const arrayStringsAreEqual = (word1, word2) => {
  let wPtr1 = 0,
    wPtr2 = 0,
    sPtr1 = 0,
    sPtr2 = 0

  while (wPtr1 < word1.length && wPtr2 < word2.length) {
    if (word1[wPtr1][sPtr1++] !== word2[wPtr2][sPtr2++]) return false

    if (sPtr1 === word1[wPtr1].length) {
      wPtr1++
      sPtr1 = 0
    }

    if (sPtr2 === word2[wPtr2].length) {
      wPtr2++
      sPtr2 = 0
    }
  }

  return wPtr1 === word1.length && wPtr2 === word2.length
}

word1 = ['ab', 'c']
word2 = ['a', 'bc']
// Output: true
// Explanation:
// word1 represents string "ab" + "c" -> "abc"
// word2 represents string "a" + "bc" -> "abc"
// The strings are the same, so return true.

// word1 = ['a', 'cb']
// word2 = ['ab', 'c']
// Output: false

// word1 = ['abc', 'd', 'defg']
// word2 = ['abcddefg']
// Output: true

console.log(arrayStringsAreEqual(word1, word2))
