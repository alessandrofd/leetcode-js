/**
 * You are given a 0-indexed string s and a dictionary of words dictionary. You
 * have to break s into one or more non-overlapping substrings such that each
 * substring is present in dictionary. There may be some extra characters in s
 * which are not present in any of the substrings.
 *
 * Return the minimum number of extra characters left over if you break up s
 * optimally.
 *
 * Constraints:
 *    1 <= s.length <= 50
 *    1 <= dictionary.length <= 50
 *    1 <= dictionary[i].length <= 50
 *    dictionary[i] and s consists of only lowercase English letters
 *    dictionary contains distinct words
 */

/**
 * @param {string} s
 * @param {string[]} dictionary
 * @return {number}
 */
const minExtraChar_dp_topDown_substring = (s, dictionary) => {
  const n = s.length

  const dp = new Array(n + 1)
  dp[n] = 0
  const set = new Set(dictionary)

  const dfs = (i) => {
    if (dp[i] !== undefined) return dp[i]

    dp[i] = dfs(i + 1) + 1
    for (let j = i; j < n; j++) {
      const sub = s.slice(i, j + 1)
      if (set.has(sub)) {
        dp[i] = Math.min(dp[i], dp[j + 1])
      }
    }
    return dp[i]
  }

  return dfs(0)
}

/**
 * @param {string} s
 * @param {string[]} dictionary
 * @return {number}
 */
const minExtraChar_dp_bottomUp_substring = (s, dictionary) => {
  const n = s.length

  const dp = new Array(n + 1)
  dp[0] = 0
  const set = new Set(dictionary)

  for (let i = 1; i <= n; i++) {
    dp[i] = dp[i - 1] + 1
    for (let j = 1; j <= i; j++) {
      const sub = s.slice(j - 1, i)
      if (set.has(sub)) {
        dp[i] = Math.min(dp[i], dp[j - 1])
      }
    }
  }

  return dp[n]
}

class TrieNode {
  children = new Array(26)
  isWord = false
}

const buildTrie = (dictionary) => {
  const root = new TrieNode()
  for (const word of dictionary) {
    let node = root
    for (const letter of word) {
      const i = letter.charCodeAt() - 97
      if (!node.children[i]) node.children[i] = new TrieNode()
      node = node.children[i]
    }
    node.isWord = true
  }
  return root
}

/**
 * @param {string} s
 * @param {string[]} dictionary
 * @return {number}
 */
const minExtraChar_dp_topDown_trie = (s, dictionary) => {
  const n = s.length

  const dp = new Array(n + 1)
  dp[n] = 0
  const trie = buildTrie(dictionary)

  const dfs = (i) => {
    if (dp[i] !== undefined) return dp[i]

    dp[i] = dfs(i + 1) + 1
    let node = trie
    for (let j = i; j < n; j++) {
      const charCode = s[j].charCodeAt() - 97
      if (!node.children[charCode]) break
      node = node.children[charCode]
      if (node.isWord) dp[i] = Math.min(dp[i], dp[j + 1])
    }
    return dp[i]
  }

  return dfs(0)
}

/**
 * @param {string} s
 * @param {string[]} dictionary
 * @return {number}
 */
const minExtraChar_dp_bottomUp_trie = (s, dictionary) => {
  const n = s.length

  const dp = new Array(n + 1)
  dp[n] = 0
  const trie = buildTrie(dictionary)

  for (let i = n - 1; i >= 0; i--) {
    let node = trie
    dp[i] = dp[i + 1] + 1
    for (let j = i; j < n; j++) {
      const charCode = s[j].charCodeAt() - 97
      if (!node.children[charCode]) break
      node = node.children[charCode]
      if (node.isWord) dp[i] = Math.min(dp[i], dp[j + 1])
    }
  }

  return dp[0]
}

// O Trie utilizando um mapa ao invés de um array tem aproximadamente o mesmo
// desempenho e consumo de memória.

class TrieNode_map {
  children = new Map()
  isWord = false
}

const buildTrie_map = (dictionary) => {
  const root = new TrieNode_map()
  for (const word of dictionary) {
    let node = root
    for (const letter of word) {
      if (!node.children.has(letter))
        node.children.set(letter, new TrieNode_map())
      node = node.children.get(letter)
    }
    node.isWord = true
  }
  return root
}

/**
 * @param {string} s
 * @param {string[]} dictionary
 * @return {number}
 */
const minExtraChar_dp_topDown_trie_map = (s, dictionary) => {
  const n = s.length

  const dp = new Array(n + 1)
  dp[n] = 0
  const trie = buildTrie_map(dictionary)

  const dfs = (i) => {
    if (dp[i] !== undefined) return dp[i]

    dp[i] = dfs(i + 1) + 1
    let node = trie
    for (let j = i; j < n; j++) {
      if (!node.children.has(s[j])) break
      node = node.children.get(s[j])
      if (node.isWord) dp[i] = Math.min(dp[i], dp[j + 1])
    }
    return dp[i]
  }

  return dfs(0)
}

// prettier-ignore
const funcs = [
  minExtraChar_dp_topDown_substring,
  minExtraChar_dp_bottomUp_substring,
  minExtraChar_dp_topDown_trie,
  minExtraChar_dp_bottomUp_trie,
  minExtraChar_dp_topDown_trie_map,
]

const data = [
  ['leetscode', ['leet', 'code', 'leetcode'], 1],
  ['sayhelloworld', ['hello', 'world'], 3],
]

for (let func of funcs) {
  for (const [s, dictionary, expected] of data) {
    console.log(func(s, dictionary) === expected)
  }
}

const x = 'z'.charCodeAt() - 'a'.charCodeAt()
x
