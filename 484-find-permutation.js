/**
 * @param {string} s
 * @return {number[]}
 */
const findPermutation = (s) => {
  res = []
  stack = []
  for (i = 1; i <= s.length; i++) {
    stack.push(i)
    if (s[i - 1] === 'I') while (stack.length) res.push(stack.pop())
  }
  stack.push(s.length + 1)
  while (stack.length) res.push(stack.pop())
  return res
}

s = 'DD'
console.log(findPermutation(s))

/* 
Example 1:

Input: s = "I"
Output: [1,2]
Explanation: [1,2] is the only legal permutation that can represented by s, where the number 1 and 2 construct an increasing relationship.

Example 2:

Input: s = "DI"
Output: [2,1,3]
Explanation: Both [2,1,3] and [3,1,2] can be represented as "DI", but since we want to find the smallest lexicographical permutation, you should return [2,1,3]
 

*/
