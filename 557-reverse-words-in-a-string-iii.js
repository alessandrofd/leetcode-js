/** Given a string s, reverse the order of characters in each word within a
 * sentence while still preserving whitespace and initial word order.
 *
 * Constraints:
 *    1 <= s.length <= 5 * 10^4
 *    s contains printable ASCII characters.
 *    s does not contain any leading or trailing spaces.
 *    There is at least one word in s.
 *    All the words in s are separated by a single space
 */

/**
 * @param {string} s
 * @return {string}
 */
const reverseWords = (sentence) => {
  return sentence.split(' ').map(word => [...word].reverse().join('')).join(' ')
}

s = "Let's take LeetCode contest"
// Output: "s'teL ekat edoCteeL tsetnoc"

// s = 'God Ding'
// Output: "doG gniD"

console.log(reverseWords(s))
