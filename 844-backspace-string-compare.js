/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
const backspaceCompare = (s, t) => {
  const backspace = (s) => {
    arr = [...s]
    result = []
    for (c of arr)
      if (c === '#') result.pop()
      else result.push(c)
    return result.join('')
  }
  return backspace(s) === backspace(t)
}

;(s = 'a#c'), (t = 'b')
console.log(backspaceCompare(s, t))
/*
Example 1:

Input: s = "ab#c", t = "ad#c"
Output: true
Explanation: Both s and t become "ac".

Example 2:

Input: s = "ab##", t = "c#d#"
Output: true
Explanation: Both s and t become "".

Example 3:

Input: s = "a#c", t = "b"
Output: false
Explanation: s becomes "c" while t becomes "b".
*/
