/**
 * Given a string containing digits from 2-9 inclusive, return all possible
 * letter combinations that the number could represent. Return the answer in any
 * order.
 *
 * A mapping of digits to letters (just like on the telephone buttons) is given
 * below. Note that 1 does not map to any letters.
 *
 *     2: ['a', 'b', 'c'],
 *     3: ['d', 'e', 'f'],
 *     4: ['g', 'h', 'i'],
 *     5: ['j', 'k', 'l'],
 *     6: ['m', 'n', 'o'],
 *     7: ['p', 'q', 'r', 's'],
 *     8: ['t', 'u', 'v'],
 *     9: ['w', 'x', 'y', 'z']
 *
 * Constraints:
 *    0 <= digits.length <= 4
 *    digits[i] is a digit in the range ['2', '9'].
 */

/**
 * @param {string} digits
 * @return {string[]}
 */
const letterCombinations_doubleMap = (digits) => {}

/**
 * @param {string} digits
 * @return {string[]}
 */
const letterCombinations_flatMap = (digits) => {}

digits = '23'
// Expected: ["ad","ae","af","bd","be","bf","cd","ce","cf"]

// digits = ""
// Expected: []

// digits = "2"
// Expected: ["a","b","c"]

console.log(letterCombinations_doubleMap(digits))
console.log(letterCombinations_flatMap(digits))
