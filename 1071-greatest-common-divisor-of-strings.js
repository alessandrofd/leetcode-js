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

// Interative GCD
const gcdOfStrings = (str1, str2) => {
  let longest, shortest
  if (str1.length > str2.length) {
    longest = str1
    shortest = str2
  } else {
    longest = str2
    shortest = str1
  }

  nLong = longest.length
  nShort = shortest.length

  let i
  for (i = nShort; i > 0; i--) {
    if (!(nShort % i)) {
      if (!(nLong % i)) {
        if (
          shortest === shortest.slice(0, i).repeat((nShort / i) | 0) &&
          longest === shortest.slice(0, i).repeat((nLong / i) | 0)
        ) {
          break
        }
      }
    }
  }

  return i === 0 ? '' : shortest.slice(0, i)
}

// Approach 2: Greatest Common Divisor - Calculated GCD
// Rotina de cálculo de mínimo denominador comum MDC
const gcdOfStrings_greatestCommonDivisor = (str1, str2) => {
  if (str1 + str2 !== str2 + str1) return ''

  const gcd = (x, y) => {
    if (y === 0) return x
    return gcd(y, x % y)
  }

  const gcdLength = gcd(str1.length, str2.length)
  return str1.slice(0, gcdLength)
}

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
