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
  if (nums.length === 1) return true

  let canJumpOver = true
  let hurdle
  for (let i = nums.length - 2; i >= 0; i--) {
    if (nums[i] === 0 && canJumpOver) {
      hurdle = i
      canJumpOver = false
    } else if (!canJumpOver) {
      if (nums[i] > hurdle - i) canJumpOver = true
    }
  }
  return canJumpOver
}

// Approach 1: Backtracking - Time Limit Exceeded - mesmo com a otimização do for
// Neste caso como não há um acumulador externo, o backtracking degenera para
// um DFS
const canJump_backtracking = (nums) => {
  const backtrack = (square) => {
    if (square === nums.length - 1) return true
    for (let i = 1; i <= nums[square]; i++)
      if (backtrack(square + i)) return true
    return false
  }

  return backtrack(0)
}

// Approach 2: Dynamic Programming Top-down - Time Limit Exceeded
const canJump_DP_topDown_recursion = (nums) => {
  const memo = []
  memo[nums.length - 1] = true

  const dfs = (square) => {
    if (memo[square] !== undefined) return memo[square]
    for (let i = 1; i <= nums[square]; i++)
      if (dfs(square + i)) return (memo[square] = true)
    return (memo[square] = false)
  }

  return dfs(0)
}

// Estouro de pilha
// Como o problema não pede um valor otimizado, apenas se o quadrado final e
// atingível, o resultado do cálculo de cada iteração é um valor booleano.
// Nestes casos, o acumulador pode ser um Set indicando que o caminho a ser
// analisado já não foi percorrido e mostrou-se inviável.
const canJump_DP_topDown_stack = (nums) => {
  const visited = new Set()

  const stack = [0]
  while (stack.length) {
    const square = stack.pop()
    if (square === nums.length - 1) return true
    if (visited.has(square)) continue
    visited.add(square)
    for (let i = 1; i <= nums[square]; i++) stack.push(square + i)
  }

  return false
}

// Approach 3: Dynamic Programming Bottom-up
// Melhor desempenho até agora 93%
const canJump_DP_bottomUp = (nums) => {
  for (let i = 1; i < nums.length; i++) {
    let canReach = false
    for (let j = i - 1; j >= 0; j--) {
      if (nums[j] >= i - j) {
        canReach = true
        break
      }
    }
    if (!canReach) return false
  }

  return true
}

// Approach 4: Greedy - Back to Front & Front to Back
const canJump_greedy_backToFront = (nums) => {
  let goodPos = nums.length - 1
  for (let i = nums.length - 2; i >= 0; i--) {
    if (nums[i] + i >= goodPos) goodPos = i
  }
  return goodPos === 0
}

const canJump_greedy_frontToBack = (nums) => {
  let maxJump = nums[0]
  for (let i = 0; i <= maxJump; i++) {
    maxJump = Math.max(maxJump, nums[i] + i)
    if (maxJump >= nums.length - 1) return true
  }
  return false
}

nums = [2, 3, 1, 1, 4]
// Output: true

// nums = [3, 2, 1, 0, 4]
// Output: false

// nums = [0]
// Output: true

// nums = [2, 5, 0, 0]
// Output: true

// nums = [0, 1]
// Output: false

// nums = [2, 0, 0]
// Output: true

console.log(canJump_zeros(nums))
console.log(canJump_backtracking(nums))
console.log(canJump_DP_topDown_recursion(nums))
console.log(canJump_DP_topDown_stack(nums))
console.log(canJump_DP_bottomUp(nums))
console.log(canJump_greedy_backToFront(nums))
console.log(canJump_greedy_frontToBack(nums))
