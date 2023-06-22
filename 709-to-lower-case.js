/**
 * @param {string} s
 * @return {string}
 */
const toLowerCase1 = (s) => {
  const charCodeA = 'A'.charCodeAt(0)
  const charCodeZ = 'Z'.charCodeAt(0)
  const charCodea = 'a'.charCodeAt(0)
  return s
    .split('')
    .map((c) => c.charCodeAt(0))
    .map((n) =>
      String.fromCharCode(
        n >= charCodeA && n <= charCodeZ ? n - charCodeA + charCodea : n
      )
    )
    .join('')
}

const toLowerCase = (s) => {
  const charCodeA = 'A'.charCodeAt(0)
  const charCodeZ = 'Z'.charCodeAt(0)
  const charCodea = 'a'.charCodeAt(0)

  const arr = s.split('')
  for (let i = 0; i < arr.length; i++) {
    const charCodeInput = arr[i].charCodeAt(0)
    if (charCodeInput >= charCodeA && charCodeInput <= charCodeZ)
      arr[i] = String.fromCharCode(charCodeInput - charCodeA + charCodea)
  }
  return arr.join('')
}

// Input: s = "Hello"
// Output: "hello"
console.log(toLowerCase('Hello'))

// Input: s = "here"
// Output: "here"
console.log(toLowerCase('here'))

// Input: s = "LOVELY"
// Output: "lovely"
console.time()
console.log(toLowerCase1('LOVELY'))
console.timeEnd()
