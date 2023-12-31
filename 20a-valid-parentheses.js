/**
 * Given a string s containing just the characters '(', ')', '{', '}', '[' and 
 * ']', determine if the input string is valid.
 * 
 * An input string is valid if:
 *    Open brackets must be closed by the same type of brackets.
 *    Open brackets must be closed in the correct order.
 *    Every close bracket has a corresponding open bracket of the same type.

Constraints:
    1 <= s.length <= 10^4
    s consists of parentheses only '()[]{}'.
 */

/**
 * @param {string} s
 * @return {boolean}
 */
const isValid = (string) => {}

s = '()'
// Output: true

s = '()[]{}'
// Output: true

// s = '(]'
// Output: false

// s = '(('
// Output: false

s = ']'
// Output: false

console.log(isValid(s))
