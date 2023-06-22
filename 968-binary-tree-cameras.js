/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */

// Approach 1: Dynamic Programming - error

var minCameraCover_1 = function (root) {
  // 0: Strict ST; All nodes below this are covered, but not this one
  // 1: Normal ST; All nodes below and incl this are covered - no camera
  // 2: Placed camera; All nodes below this are covered, plus camera here
  const solve = (node) => {
    if (node === null) return [0, 0, Infinity]
    left = solve(node.left)
    right = solve(node.right)

    // Número mínimo de câmeras em cada ramo que não requeira uma câmera neste nó
    minLeft = Math.min(left[1], left[2])
    minRight = Math.min(right[1], right[2])

    d0 = left[1] + right[1]
    d1 = Math.min(left[2] + minRight, right[2] + minLeft)
    d2 = 1 + Math.min(left[0], minLeft) + Math.min(right[0], minRight)
    return [d0, d1, d2]
  }

  ans = solve(root)
  return Math.min(ans[1], ans[2])
}

// Discussion - sgallivan
const minCameraCover = (root) => {
  let ans = 0
  /* Returns:
   *  0: Ignore (M)
   *  1: Placed camera in child (C)
   *  3: Need camera in parent (U)
   */
  const dfs = (node) => {
    if (!node) return 0
    const val = dfs(node.left) + dfs(node.right)
    if (val === 0) return 3
    if (val < 3) return 0
    ans++
    return 1
  }

  return dfs(root) >= 3 ? ans + 1 : ans
}
