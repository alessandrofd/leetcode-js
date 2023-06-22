/**
@param {string} s
@return {number}
 
Constraints:
* 1 <= s.length <= 15
* s contains only the characters ('I', 'V', 'X', 'L', 'C', 'D', 'M').
* It is guaranteed that s is a valid roman numeral in the range [1, 3999].
 */

const romanToInt1 = (s) => {
  const val = {
    M: 1000,
    CM: 900,
    D: 500,
    CD: 400,
    C: 100,
    XC: 90,
    L: 50,
    XL: 40,
    X: 10,
    IX: 9,
    V: 5,
    IV: 4,
    I: 1,
  }
  let result = 0
  for (let i = 0; i < s.length; i++) {
    if ((val[s[i + 1]] ?? 0) > val[s[i]]) (result += val[s[i] + s[i + 1]]), i++
    else result += val[s[i]]
  }
  return result
}
const romanToInt = (s) => {
  const val = {
    M: 1000,
    D: 500,
    C: 100,
    L: 50,
    X: 10,
    V: 5,
    I: 1,
  }
  let result = 0
  for (let i = 0; i < s.length; i++)
    (val[s[i + 1]] ?? 0) > val[s[i]]
      ? (result -= val[s[i]])
      : (result += val[s[i]])

  return result
}

/*
Input: s = "III"
Output: 3
Explanation: III = 3.
*/
console.log(romanToInt('III'))

/*
Input: s = "LVIII"
Output: 58
Explanation: L = 50, V= 5, III = 3.
*/
console.log(romanToInt('LVIII'))

/*
Input: s = "MCMXCIV"
Output: 1994
Explanation: M = 1000, CM = 900, XC = 90 and IV = 4.
*/
console.log(romanToInt('MCMXCIV'))
