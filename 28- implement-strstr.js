/**
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 */
const strStr = (haystack, needle) => {
  if (needle === '') return 0

  for (let i = 0; i < haystack.length - needle.length + 1; i++) {
    if (haystack.slice(i, i + needle.length) === needle) return i
  }

  return -1
}

// Input: haystack = "hello", needle = "ll"
// Output: 2
console.log(strStr('hello', 'll'))

// Input: haystack = "aaaaa", needle = "bba"
// Output: -1
console.log(strStr('aaaaa', 'bba'))

// Input: haystack = "", needle = ""
// Output: 0
console.log(strStr('', ''))
