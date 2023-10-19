/**
 * Given two strings s and t, return true if they are equal when both are typed
 * into empty text editors. '#' means a backspace character.
 *
 * Note that after backspacing an empty text, the text will continue empty.
 *
 * Constraints:
 *    1 <= s.length, t.length <= 200
 *    s and t only contain lowercase letters and '#' characters.
 */

/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
const backspaceCompare = (s, t) => {}

// prettier-ignore
const funcs = [
  backspaceCompare,
]

const data = [
  ['ab#c', 'ad#c', true],
  ['ab##', 'c#d#', true],
  ['a#c', 'b', false],
]

for (const func of funcs) {
  for (const [s, t, expected] of data) {
    console.log(func(s, t) === expected)
  }
}
