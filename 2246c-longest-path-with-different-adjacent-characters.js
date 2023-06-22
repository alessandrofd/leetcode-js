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
const longestPath_dfs = (parent, s) => {}

// Approach 2: Breadth First Search
const longestPath_bfs = (parents, s) => {}

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
