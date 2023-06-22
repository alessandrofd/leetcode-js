/**
 * For two strings s and t, we say "t divides s" if and only if
 * s = t + ... + t (i.e., t is concatenated with itself one or more times).
 *
 * Given two strings str1 and str2, return the largest string x such that x
 * divides both str1 and str2.
 *
 * Constraints:
 *    1 <= str1.length, str2.length <= 1000
 *    str1 and str2 consist of English uppercase letters.
 */

/**
 * @param {string} str1
 * @param {string} str2
 * @return {string}
 */

// Interative GCD - MDC iterativo
const gcdOfStrings = (str1, str2) => {}

// Approach 2: Greatest Common Divisor - Calculated GCD
// Rotina de cálculo de mínimo denominador comum MDC
const gcdOfStrings_greatestCommonDivisor = (str1, str2) => {}

str1 = 'ABCABC'
str2 = 'ABC'
// Output: "ABC"

str1 = 'ABABAB'
str2 = 'ABAB'
// Output: "AB"

str1 = 'LEET'
str2 = 'CODE'
// Output: ""

str1 = 'AAAAAAAAA'
str2 = 'AAACCC'
// Expected: ''

console.log(gcdOfStrings(str1, str2))
console.log(gcdOfStrings_greatestCommonDivisor(str1, str2))
