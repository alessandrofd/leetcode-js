/**
 * @param {number} k
 * @param {number} n
 * @return {number[][]}
 */
const combinationSum3_1 = (k, n) => {
  const result = []
  const permute = (arr, sum, start) => {
    if (sum > n) return
    if (arr.length === k) if (sum === n) result.push(arr)

    for (let i = start; i < 10; i++) {
      permute([...arr, i], sum + i, i + 1)
    }
  }
  permute([], 0, 1)
  return result
}

const combinationSum3 = (k, n) => {
  const results = []
  const stack = []

  const backtrack = (sum, next) => {
    if (sum === n && stack.length === k) {
      results.push([...stack])
      return
    } else if (sum > n || stack.length === k) {
      return  
    }

    for (let i = next; i <=9; i++) {
      stack.push(i)
      backtrack(sum + i, i + 1)
      stack.pop()
    }
  }

  backtrack(0, 1)
  return results
}

 ;(k = 3), (n = 9)
console.log(combinationSum3(k, n))

/*
Example 1:

Input: k = 3, n = 7
Output: [[1,2,4]]
Explanation:
1 + 2 + 4 = 7
There are no other valid combinations.

Example 2:

Input: k = 3, n = 9
Output: [[1,2,6],[1,3,5],[2,3,4]]
Explanation:
1 + 2 + 6 = 9
1 + 3 + 5 = 9
2 + 3 + 4 = 9
There are no other valid combinations.

Example 3:

Input: k = 4, n = 1
Output: []
Explanation: There are no valid combinations.
Using 4 different numbers in the range [1,9], the smallest sum we can get is 1+2+3+4 = 10 and since 10 > 1, there are no valid combination.

*/
