/**
 * You are given a 0-indexed string s and a dictionary of words dictionary. You
 * have to break s into one or more non-overlapping substrings such that each
 * substring is present in dictionary. There may be some extra characters in s
 * which are not present in any of the substrings.
 *
 * Return the minimum number of extra characters left over if you break up s
 * optimally.
 *
 * Constraints:
 *    1 <= s.length <= 50
 *    1 <= dictionary.length <= 50
 *    1 <= dictionary[i].length <= 50
 *    dictionary[i] and s consists of only lowercase English letters
 *    dictionary contains distinct words
 */

/**
 * @param {string} s
 * @param {string[]} dictionary
 * @return {number}
 */
const minExtraChar_dp_topDown_substring = (s, dictionary) => {}

/**
 * @param {string} s
 * @param {string[]} dictionary
 * @return {number}
 */
const minExtraChar_dp_bottomUp_substring = (s, dictionary) => {}

/**
 * @param {string} s
 * @param {string[]} dictionary
 * @return {number}
 */
const minExtraChar_dp_topDown_trie = (s, dictionary) => {}

/**
 * @param {string} s
 * @param {string[]} dictionary
 * @return {number}
 */
const minExtraChar_dp_bottomUp_trie = (s, dictionary) => {}

// prettier-ignore
const funcs = [
  minExtraChar_dp_topDown_substring,
  minExtraChar_dp_bottomUp_substring,
  minExtraChar_dp_topDown_trie,
  minExtraChar_dp_bottomUp_trie,
]

const data = [
  ['leetscode', ['leet', 'code', 'leetcode'], 1],
  ['sayhelloworld', ['hello', 'world'], 3],
]

for (let func of funcs) {
  for (const [s, dictionary, expected] of data) {
    console.log(func(s, dictionary) === expected)
  }
}

const x = 'z'.charCodeAt() - 'a'.charCodeAt()
x
