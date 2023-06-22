/**
 * Hard - Daily Challenge 13/01/2023
 *
 * You are given a tree (i.e. a connected, undirected graph that has no cycles)
 * rooted at node 0 consisting of n nodes numbered from 0 to n - 1. The tree is
 * represented by a 0-indexed array parent of size n, where parent[i] is the
 * parent of node i. Since node 0 is the root, parent[0] == -1.
 *
 * You are also given a string s of length n, where s[i] is the character
 * assigned to node i.
 *
 * Return the length of the longest path in the tree such that no pair of
 * adjacent nodes on the path have the same character assigned to them.
 *
 * Constraints:
 *    n == parent.length == s.length
 *    1 <= n <= 10^5
 *    0 <= parent[i] <= n - 1 for all i >= 1
 *    parent[0] == -1
 *    parent represents a valid tree.
 *    s consists of only lowercase English letters.
 */

/**
 * @param {number[]} parent
 * @param {string} s
 * @return {number}
 */

// Approach 1: Depth First Search
const longestPath_dfs = (parent, s) => {
  const n = parent.length

  const children = new Array(n).fill().map((_) => [])
  for (let i = 1; i < n; i++) children[parent[i]].push(i)

  const dfs = (node) => {
    if (children[node].length === 0) return 1
    let longestChain = 0
    let secondLongestChain = 0
    for (let child of children[node]) {
      const chain = dfs(child)
      if (s[child] === s[node]) continue
      if (chain > longestChain) {
        secondLongestChain = longestChain
        longestChain = chain
      } else if (chain > secondLongestChain) {
        secondLongestChain = chain
      }
    }
    longestPath = Math.max(longestPath, longestChain + secondLongestChain + 1)
    return longestChain + 1
  }

  let longestPath = 1
  dfs(0)
  return longestPath
}

// Approach 2: Breadth First Search
const longestPath_bfs = (parents, s) => {
  const n = parents.length

  const childrenCount = new Array(n).fill(0)
  for (let i = 1; i < n; i++) childrenCount[parents[i]]++

  const chains = new Array(n).fill().map((_) => [0, 0])

  const queue = []
  for (let node = 1; node < n; node++) {
    if (childrenCount[node] === 0) {
      queue.push(node)
      chains[node][0] = 1
    }
  }

  let longestPath = 1

  while (queue.length) {
    const node = queue.shift()
    const parent = parents[node]

    const longestChainFromChild = chains[node][0]

    if (s[node] !== s[parent]) {
      if (longestChainFromChild > chains[parent][0]) {
        chains[parent][1] = chains[parent][0]
        chains[parent][0] = longestChainFromChild
      } else if (longestChainFromChild > chains[parent][1]) {
        chains[parent][1] = longestChainFromChild
      }
    }

    longestPath = Math.max(
      longestPath,
      chains[parent][0] + chains[parent][1] + 1
    )

    childrenCount[parent]--
    if (parent !== 0 && childrenCount[parent] === 0) {
      chains[parent][0]++
      queue.push(parent)
    }
  }

  return longestPath
}

parent = [-1, 0, 0, 1, 1, 2]
s = 'abacbe'
// Output: 3

parent = [-1, 0, 0, 0]
s = 'aabc'
// Output: 3

parent = [-1]
s = 'z'
// Output: 1

console.log(longestPath_dfs(parent, s))
console.log(longestPath_bfs(parent, s))
