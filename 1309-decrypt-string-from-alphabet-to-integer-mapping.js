/**
 * @param {string} s
 * @return {string}
 */
const freqAlphabets1 = (s) => {
  const charCodeA = 'a'.charCodeAt(0)

  const result = []
  for (let i = 0; i < s.length; i++) {
    if (s[i + 2] === '#') {
      result.push(s.slice(i, i + 2))
      i += 2
    } else result.push(s[i])
  }
  return result
    .map((s) => String.fromCharCode(Number(s) + charCodeA - 1))
    .join('')
}

const freqAlphabets2 = (s) => {
  const charCodeA = 'a'.charCodeAt(0)

  let result = ''
  for (let i = 0; i < s.length; i++) {
    let codeChar
    if (s[i + 2] === '#') {
      codeChar = s.slice(i, i + 2)
      i += 2
    } else codeChar = s[i]
    result += String.fromCharCode(charCodeA + Number(codeChar) - 1)
  }
  return result
}

const freqAlphabets = (s) => {
  const charCodeA = 'a'.charCodeAt(0)

  let result = ''
  for (let i = s.length - 1; i >= 0; i--) {
    let code
    if (s[i] === '#') {
      code = s[i - 2] + s[i - 1]
      i -= 2
    } else code = s[i]
    result = String.fromCharCode(Number(code) + charCodeA - 1) + result
  }
  return result
}

// Input: s = "10#11#12"
// Output: "jkab"
console.time()
console.log(freqAlphabets('10#11#12'))
console.timeEnd()

// Input: s = "1326#"
// Output: "acz"
console.log(freqAlphabets('1326#'))
