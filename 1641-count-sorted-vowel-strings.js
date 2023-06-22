/**
 * @param {number} n
 * @return {number}
 */
const countVowelStrings = (n) => {
  let count = 0

  const backtrack = (len, start) => {
    if (len === 0) {
      count++
      return
    }

    for (let i = start; i < 5; i++) backtrack(len - 1, i)
  }

  backtrack(n, 0)
  return count
}

console.log(countVowelStrings(33))

/* 
Example 1:

Input: n = 1
Output: 5
Explanation: The 5 sorted strings that consist of vowels only are ["a","e","i","o","u"].

Example 2:

Input: n = 2
Output: 15
Explanation: The 15 sorted strings that consist of vowels only are
["aa","ae","ai","ao","au","ee","ei","eo","eu","ii","io","iu","oo","ou","uu"].
Note that "ea" is not a valid string since 'e' comes after 'a' in the alphabet.

Example 3:

Input: n = 33
Output: 66045
*/
