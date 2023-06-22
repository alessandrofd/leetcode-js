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
  const children = new Array(parent.length).fill().map((_) => [])
  for (let i = 1; i < parent.length; i++) children[parent[i]].push(i)

  let longestPath = 0

  const dfs = (node) => {
    let longestChain = 0
    let secondLongestChain = 0
    for (const child of children[node]) {
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

  dfs(0)
  return longestPath
}

// Approach 2: Breadth First Search
const longestPath_bfs = (parents, s) => {
  const n = parents.length

  const children = new Array(n).fill(0)
  for (let i = 1; i < n; i++) children[parents[i]]++

  const chains = new Array(n)
    .fill()
    .map((_) => ({ longest: 0, secondLongest: 0 }))

  const leafs = []
  for (let i = 1; i < n; i++) {
    if (children[i] === 0) {
      chains[i].longest = 1
      leafs.push(i)
    }
  }

  // A raiz nunca é processada como folha, logo se ela for o único elemento
  // temos que retornar 1
  let longest = 1

  while (leafs.length) {
    const leaf = leafs.shift()
    const parent = parents[leaf]

    if (s[parent] !== s[leaf]) {
      if (chains[leaf].longest > chains[parent].longest) {
        chains[parent].secondLongest = chains[parent].longest
        chains[parent].longest = chains[leaf].longest
      } else if (chains[leaf].longest > chains[parent].secondLongest) {
        chains[parent].secondLongest = chains[leaf].longest
      }
    }

    longest = Math.max(
      longest,
      chains[parent].longest + chains[parent].secondLongest + 1
    )

    children[parent]--
    if (parent !== 0 && children[parent] === 0) {
      chains[parent].longest++
      leafs.push(parent)
    }
  }

  return longest
}

parent = [-1, 0, 0, 1, 1, 2]
s = 'abacbe'
// Output: 3

// parent = [-1, 0, 0, 0]
// s = 'aabc'
// Output: 3

// parent = [-1]
// s = 'z'
// Output: 1

// parent = [-1, 0, 1]
// s = 'aab'
// Expected: 2

console.log(longestPath_dfs(parent, s))
console.log(longestPath_bfs(parent, s))
