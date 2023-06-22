/**
 * Two strings X and Y are similar if we can swap two letters (in different
 * positions) of X, so that it equals Y. Also two strings X and Y are similar if
 * they are equal.
 *
 * For example, "tars" and "rats" are similar (swapping at positions 0 and 2),
 * and "rats" and "arts" are similar, but "star" is not similar to "tars",
 * "rats", or "arts".
 *
 * Together, these form two connected groups by similarity: {"tars", "rats",
 * "arts"} and {"star"}.  Notice that "tars" and "arts" are in the same group
 * even though they are not similar.  Formally, each group is such that a word
 * is in the group if and only if it is similar to at least one other word in
 * the group.
 *
 * We are given a list strs of strings where every string in strs is an anagram
 * of every other string in strs. How many groups are there?
 *
 * Constraints:
 *    1 <= strs.length <= 300
 *    1 <= strs[i].length <= 300
 *    strs[i] consists of lowercase letters only.
 *    All words in strs have the same length and are anagrams of each other.
 */

/**
 * Aplicação de DSU. A cada union(i, j) efetiva subtrai-se um do número de 
 * componentes finais. Se todas as strings fizerem parte dos mesmo grupo 
 * componentes == 1
 */

/**
 * @param {string[]} strs
 * @return {number}
 */
const numSimilarGroups = (strs) => {
  const numStrs = strs.length
  const parents = Array.from(Array(numStrs).keys())
  const ranks = Array(numStrs).fill(1)
  let components = numStrs

  const find = (i) => {
    if (i != parents[i]) parents[i] = find(parents[i])
    return parents[i]
  }

  const union = (i, j) => {
    i = find(i)
    j = find(j)

    if (i == j) return 0

    if (ranks[i] < ranks[j]) {
      parents[j] = i
      ranks[i] += ranks[j]
    } else {
      parents[i] = j
      ranks[j] += ranks[i]
    }
    components--
    return 1
  }

  for (let i = 0; i < numStrs - 1; i++) {
    for (let j = i + 1; j < numStrs; j++) {
      let diffs = 0
      for (let k = 0; k < strs[0].length; k++) {
        if (strs[i][k] != strs[j][k]) diffs++
        if (diffs > 2) break
      }
      if (diffs <= 2) union(i, j)
    }
  }

  return components
}

strs = ['tars', 'rats', 'arts', 'star']
// Expected: 2

// strs = ['omv', 'ovm']
// Expected: 1

console.log(numSimilarGroups(strs))
