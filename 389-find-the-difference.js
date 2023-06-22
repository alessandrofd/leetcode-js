/**
 * @param {string} s
 * @param {string} t
 * @return {character}
 */
const findTheDifference1 = (s, t) => {
  for (let i = 0; i < t.length; i++) {
    const pos = s.indexOf(t[i])
    if (pos === -1) return t[i]
    s = s.slice(0, pos) + s.slice(pos + 1)
  }
}

const findTheDifference2 = (s, t) =>
  [...t].sort().find((c, i) => c !== [...s].sort()[i])

const findTheDifference3 = (s, t) => {
  s = [...s].sort()
  return [...t].sort().find((c, i) => c !== s[i])
}

const findTheDifference4 = (s, t) => {
  s = s.split('').sort()
  return t
    .split('')
    .sort()
    .find((c, i) => c !== s[i])
}

const findTheDifference5 = (s, t) => {
  let sum = 0,
    i = 0
  for (; i < s.length; i++) {
    sum += t.charCodeAt(i)
    sum -= s.charCodeAt(i)
  }
  sum += t.charCodeAt(i)
  return String.fromCharCode(sum)
}

const findTheDifference = (s, t) => {
  let sum = 0,
    i = 0
  for (; i < s.length; i++) {
    sum ^= t.charCodeAt(i) ^ s.charCodeAt(i)
  }
  sum ^= t.charCodeAt(i)
  return String.fromCharCode(sum)
}

// Input: s = "abcd", t = "abcde"
// Output: "e"
console.log(findTheDifference('abcd', 'abcde'))

// Input: s = "", t = "y"
// Output: "y"
console.log(findTheDifference('', 'y'))

console.log(findTheDifference('a', 'aa'))
