/**
 * Given a string s, check if it can be constructed by taking a substring of it
 * and appending multiple copies of the substring together.
 *
 * Constraints:
 *    1 <= s.length <= 10^4
 *    s consists of lowercase English letters.
 */

/**
 * @param {string} s
 * @return {boolean}
 */
const repeatedSubstringPattern = (s) => /^(.*)\1+$/.test(s)

/**
 * Approach 2: String Concatenation/Rotation
 *
 * Consider a string S = "helloworld". Now, given another string
 * T = "lloworldhe", can we figure out if T is a rotated version of S? By
 * rotated version, we mean taking S and shifting it any number of spaces
 * (with wrap around). For example, if S = "abc" and we shifted it to the left
 * once, we would have "bca".
 *
 * Yes, we check if T is a rotated version of S by checking if it is a substring
 * of S + S. This is because S + S contains all of the rotations of S.
 *
 * Let's try to use this fact to solve our problem.
 *
 * We consider every rotation of string S such that it's rotated by k units
 * (where k < s.length) to the left. Specifically, we're looking at strings
 * elloworldh, lloworldhe, loworldhel, etc.
 *
 * If a string can be constructed by taking a substring of it and appending
 * multiple copies of the substring together, IT MUST BE A ROTATION OF ITSELF.
 * However, it would be inefficient to check all rotations.
 *
 * Let t = s + s. We can easily and efficiently check all possible rotations by
 * removing the first and last character of t, then checking if s is a substring
 * of t.
 *
 * OBS: Na verdade, removemos o primeiro e o último caracter para garantir que
 * haja uma repetição de subtring. Caso contrário, a string original, sem
 * qualquer rotação, passaria pela verificação.
 *
 * We can prove that the solution works mathematically.
 *
 * Let's assume s = p * k where p is a pattern that has been repeated k times.
 * If there is no repeating pattern in s, k would be 1 and p = s. If there is a
 * repeating pattern, then k > 1.
 *
 * If we concatenate s twice, i.e., form another string t where t = s + s and
 * remove the first and last character from it, t would look like
 * t = (head + p * (k - 1)) + (p * (k - 1) + tail) where head is p without first
 * character, tail is p without last character and p * (k - 1) denotes p
 * repeated k - 1 times.
 *
 * As a result, t = head + p * (2k - 2) + tail. We now have 2 possibilities:
 * either k = 1 and the answer is false, or k > 1 and the answer is true.
 *
 * If k = 1, then 2k - 2 = 0 and t = head + tail. Remember, head is equal to p
 * with the first character removed, and tail is equal to p with the last
 * character removed. We can simplify this as t is equal to p + p with the first
 * and last characters removed. Now, s cannot possibly be a substring of t
 * because s = p and we removed the first and last character.
 *
 * => Thus, if k = 1, then s cannot be a substring of t and the answer is false
 *
 * If k > 1, then 2k - 2 is some nonzero integer x. This means
 * t = head + p * x + tail. By definition, s = p * k. This means that as long as
 * x >= k, s must be contained within p * x, and thus within t. We have
 * x = 2k - 2, so the inequality becomes 2k - 2 >= k. We can rearrange this to
 * k >= 2, which is the same thing as k > 1.
 *
 * => In conclusion, if k > 1, it implies two things: first, the answer to the
 * problem is true. Second, x >= k and thus s must be a substring of p * x, and
 * thus a substring of t.
 *
 * So, concatenate s twice and then remove the first and last characters from
 * it. The answer to the problem is the answer to "does this new string contain
 * s as a substring"?
 *
 * OBS: Apesar do potencial de complexidade O(n), a forma como os algoritmos de
 * busca em string são implementados eleveam a complexidade para O(n^2). A
 * sugestão é aplicar o algoritmos de Knuth–Morris–Pratt (KMP).
 */

/**
 * @param {string} s
 * @return {boolean}
 */
const repeatedSubstringPattern_rotated = (s) => {
  const t = s.slice(1) + s.slice(0, s.length - 1)
  return t.includes(s)
}

s = 'abab'
// Expected: true

// s = 'aba'
// Expected: false

// s = 'abcabcabcabc'
// Expected: true

// s = 'ababba'
// Expected: false

// s = 'babbabbabbabbab'
// Expected: true

console.log(repeatedSubstringPattern(s))
console.log(repeatedSubstringPattern_rotated(s))
