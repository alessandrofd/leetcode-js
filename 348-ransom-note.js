/**
 * Given two strings ransomNote and magazine, return true if ransomNote can be
 * constructed by using the letters from magazine and false otherwise.
 *
 * Each letter in magazine can only be used once in ransomNote.
 */

/**
 * @param {string} ransomNote
 * @param {string} magazine
 * @return {boolean}
 */
const canConstruct = (ransomNote, magazine) => {
  const map = new Map()
  for (const char of magazine) map.set(char, (map.get(char) ?? 0) + 1)
  for (const char of ransomNote)
    if (map.get(char)) map.set(char, map.get(char) - 1)
    else return false
  return true
}

ransomNote = 'a'
magazine = 'b'
// Output: false

// ransomNote = 'aa'
// magazine = 'ab'
// Output: false

// ransomNote = 'aa'
// magazine = 'aab'
// Output: true

console.log(canConstruct(ransomNote, magazine))
