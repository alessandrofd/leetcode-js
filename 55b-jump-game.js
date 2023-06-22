/**
 * You are given an integer array nums. You are initially positioned at the
 * array's first index, and each element in the array represents your maximum
 * jump length at that position.
 *
 * Return true if you can reach the last index, or false otherwise.
 *
 * Constraints:
 *    1 <= nums.length <= 10^4
 *    0 <= nums[i] <= 10^5
 */

// Únicas abordagens que não estouram o tempo - ou não tem um desempenho muito
// ruim são as greedy (minha e a abordagem 4), as demais são apenas ilustrativas

// Minha solução - análise das posições com valor 0
const canJump_zeros = (nums) => {
  // const canJump = (nums) => {
  for (let i = 0; i < nums.length - 1; i++) {
    if (nums[i] === 0) {
      let canJumpOver = false
      for (let j = i - 1; j >= 0; j--) {
        if (nums[j] > i - j) {
          canJumpOver = true
          break
        }
      }
      if (!canJumpOver) return false
    }
  }
  return true
}

// Approach 1: Backtracking - Time Limit Exceeded - mesmo com a otimização do for
const canJump_backtracking = (nums) => {
  // const canJump = (nums) => {
  const backtrack = (square) => {
    if (square >= nums.length - 1) return true

    for (let i = nums[square]; i >= 1; i--)
      if (backtrack(square + i) === true) return true

    return false
  }

  return backtrack(0)
}

// Approach 2: Dynamic Programming Top-down - Time Limit Exceeded
const canJump_DP_topDown_recursion = (nums) => {
  // const canJump = (nums) => {
  const memo = []

  const dp = (pos) => {
    if (pos >= nums.length - 1) return true
    if (memo[pos] != undefined) return memo[pos]

    for (let i = nums[pos]; i >= 1; i--) memo[pos] ||= dp(pos + i)
    return !!memo[pos]
  }

  return dp(0)
}

// Estouro de pilha
const canJump_DP_topDown_stack = (nums) => {
  // const canJump = (nums) => {
  const visited = new Set()
  const stack = [0]

  while (stack.length) {
    pos = stack.pop()
    if (pos >= nums.length - 1) return true
    for (let i = 1; i <= nums[pos]; i++)
      if (!visited.has(pos + i)) stack.push(pos + i)
  }

  return false
}

// Approach 3: Dynamic Programming Bottom-up - Performance muito ruim - 10%
const canJump_DP_bottomUp = (nums) => {
  // const canJump = (nums) => {
  const canReachEnd = new Set([nums.length - 1])
  for (let pos = nums.length - 2; pos >= 0; pos--)
    for (let next = pos + nums[pos]; next > pos; next--)
      if (next >= nums.length - 1 || canReachEnd.has(next)) {
        canReachEnd.add(pos)
        break
      }
  return canReachEnd.has(0)
}

// Approach 4: Greedy - Back to Front & Front to Back
const canJump_greedy_backToFront = (nums) => {
  // const canJump = (nums) => {
  let goodPos = nums.length - 1
  for (let pos = nums.length - 2; pos >= 0; pos--)
    if (pos + nums[pos] >= goodPos) goodPos = pos
  return goodPos === 0
}

const canJump_greedy_frontToBack = (nums) => {
  // const canJump = (nums) => {
  let maxJump = nums[0]
  for (let pos = 0; pos <= maxJump; pos++) {
    maxJump = Math.max(maxJump, pos + nums[pos])
    if (maxJump >= nums.length - 1) return true
  }
  return false
}

nums = [2, 3, 1, 1, 4]
// Output: true

nums = [3, 2, 1, 0, 4]
// Output: false

nums = [0]
// Output: true

nums = [2, 5, 0, 0]
// Output: true

nums = [0, 1]
// Output: false

console.log(canJump_greedy_frontToBack(nums))
console.log(canJump_greedy_backToFront(nums))
console.log(canJump_DP_bottomUp(nums))
console.log(canJump_DP_topDown_stack(nums))
console.log(canJump_DP_topDown_recursion(nums))
console.log(canJump_backtracking(nums))
console.log(canJump_zeros(nums))
