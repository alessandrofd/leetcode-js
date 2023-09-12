/**
 * A string s is called good if there are no two different characters in s that
 * have the same frequency.
 *
 * Given a string s, return the minimum number of characters you need to delete
 * to make s good.
 *
 * The frequency of a character in a string is the number of times it appears in
 * the string. For example, in the string "aab", the frequency of 'a' is 2,
 * while the frequency of 'b' is 1.
 *
 * Constraints:
 *    1 <= s.length <= 10^5
 *    s contains only lowercase English letters.
 */

/**
 * @param {string} string
 * @return {number}
 */
const minDeletions_decrement_duplicates = (string) => {
  // Decrement Each Duplicate Until it is Unique
}

/**
 * @param {string} string
 * @return {number}
 */
const minDeletions_priority_queue = (string) => {
  // Priority Queue
}

/**
 * @param {string} string
 * @return {number}
 */
const minDeletions_sorting = (string) => {
  // Sorting
}

const funcs = [
  minDeletions_decrement_duplicates,
  minDeletions_priority_queue,
  minDeletions_sorting,
]

const data = [
  ['aab', 0],
  ['aaabbbcc', 2],
  ['ceabaacb', 2],
  [
    'abcdefghijklmnopqrstuvwxwzabcdefghijklmnopqrstuvwxwzabcdefghijklmnopqrstuvwxwzabcdefghijklmnopqrstuvwxwzabcdefghijklmnopqrstuvwxwzabcdefghijklmnopqrstuvwxwzabcdefghijklmnopqrstuvwxwzabcdefghijklmnopqrstuvwxwzabcdefghijklmnopqrstuvwxwzabcdefghijklmnopqrstuvwxwzabcdefghijklmnopqrstuvwxwzabcdefghijklmnopqrstuvwxwzabcdefghijklmnopqrstuvwxwzabcdefghijklmnopqrstuvwxwzabcdefghijklmnopqrstuvwxwzabcdefghijklmnopqrstuvwxwzabcdefghijklmnopqrstuvwxwzabcdefghijklmnopqrstuvwxwzabcdefghijklmnopqrstuvwxwzabcdefghijklmnopqrstuvwxwzabcdefghijklmnopqrstuvwxwzabcdefghijklmnopqrstuvwxwzabcdefghijklmnopqrstuvwxwzabcdefghijklmnopqrstuvwxwzabcdefghijklmnopqrstuvwxwzabcdefghijklmnopqrstuvwxwz',
    276,
  ],
]

for (const func of funcs) {
  for (const [string, expected] of data) {
    console.log(func(string) === expected)
  }
}
