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
  if (!nums.some((num) => num === 0)) return true

  for (let i = 0; i < nums.length - 1; i++) {
    if (nums[i] === 0) {
      canSkip = false
      for (let j = i - 1; j >= 0; j--) {
        if (nums[j] > i - j) {
          canSkip = true
          break
        }
      }
      if (!canSkip) return false
    }
  }
  return true
}

// Approach 1: Backtracking - Time Limit Exceeded - mesmo com a otimização do for
const canJump_backtracking = (nums) => {
  // const canJump = (nums) => {
  const canJumpFromPosition = (position) => {
    if (position === nums.length - 1) return true

    const maxJump = Math.min(position + nums[position], nums.length - 1)
    // for (let next = position + 1; next <= maxJump; next++) {
    for (let next = maxJump; next > position; next--) {
      if (canJumpFromPosition(next)) return true
    }
    return false
  }

  return canJumpFromPosition(0)
}

// Approach 2: Dynamic Programming Top-down - Time Limit Exceeded
const canJump_DP_topDown_recursion = (nums) => {
  // const canJump = (nums) => {
  const memo = []
  memo[nums.length - 1] = true

  const canJumpFromPosition = (position) => {
    if (memo[position]) return memo[position]

    const maxJump = Math.min(position + nums[position], nums.length - 1)
    for (let next = maxJump; next > position; next--) {
      if (canJumpFromPosition(next)) return (memo[position] = true)
    }
    return (memo[position] = false)
  }

  return canJumpFromPosition(0)
}

// Estouro de pilha
const canJump_DP_topDown_stack = (nums) => {
  // const canJump = (nums) => {
  const visited = new Set()
  const stack = [0]

  while (stack.length) {
    const pos = stack.pop()
    visited.add(pos)
    if (pos >= nums.length - 1) return true
    for (let i = nums[pos]; i >= 1; i--)
      if (!visited.has(pos + i)) stack.push(pos + i)
  }

  return false
}

// Approach 3: Dynamic Programming Bottom-up - Performance muito ruim - 10%
const canJump_DP_bottomUp = (nums) => {
  // const canJump = (nums) => {
  const memo = []
  memo[nums.length - 1] = true

  for (let pos = nums.length - 2; pos >= 0; pos--) {
    const maxJump = Math.min(pos + nums[pos], nums.length - 1)
    for (let next = maxJump; next > pos; next--) {
      if (memo[next]) {
        memo[pos] = true
        break
      }
    }
  }
  return !!memo[0]
}

// Approach 4: Greedy - Back to Front & Front to Back
const canJump_greedy_backToFront = (nums) => {
  // const canJump = (nums) => {
  let goodPos = nums.length - 1
  for (let pos = nums.length - 1; pos >= 0; pos--)
    if (pos + nums[pos] >= goodPos) goodPos = pos

  return goodPos === 0
}

// const canJump_greedy_frontToBack = (nums) => {
const canJump = (nums) => {
  let maxJump = 0
  for (let pos = 0; pos <= maxJump && pos < nums.length - 1; pos++)
    maxJump = Math.max(maxJump, pos + nums[pos])

  return maxJump >= nums.length - 1
}

nums = [2, 3, 1, 1, 4]
// Output: true

nums = [3, 2, 1, 0, 4]
// Output: false

nums = [0]
// Output: true

nums = [2, 5, 0, 0]
// Output: true

console.log(canJump(nums))
