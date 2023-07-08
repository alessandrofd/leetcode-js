/**
 * There are n cities. Some of them are connected, while some are not. If city a
 * is connected directly with city b, and city b is connected directly with
 * city c, then city a is connected indirectly with city c.
 *
 * A province is a group of directly or indirectly connected cities and no other
 * cities outside of the group.
 *
 * You are given an n x n matrix isConnected where isConnected[i][j] = 1 if
 * the ith city and the jth city are directly connected, and
 * isConnected[i][j] = 0 otherwise.
 *
 * Return the total number of provinces.
 *
 * Constraints:
 *    1 <= n <= 200
 *    n == isConnected.length
 *    n == isConnected[i].length
 *    isConnected[i][j] is 1 or 0.
 *    isConnected[i][i] == 1
 *    isConnected[i][j] == isConnected[j][i]
 */

// DSU

/**
 * @param {number[][]} isConnected
 * @return {number}
 */
const findCircleNum = (isConnected) => {
  const n = isConnected.length
  let provinces = n

  const reps = Array.from(Array(n).keys())
  const sizes = Array(n).fill(1)

  const find = (i) => {
    if (i == reps[i]) return i
    return (reps[i] = find(reps[i]))
  }

  const union = (i, j) => {
    i = find(i)
    j = find(j)

    if (i === j) return

    provinces -= 1

    if (sizes[i] > sizes[j]) {
      reps[j] = i
      sizes[i] += sizes[j]
    } else {
      reps[i] = j
      sizes[j] += sizes[i]
    }
  }

  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      if (isConnected[i][j]) union(i, j)
    }
  }

  return provinces
}

// prettier-ignore
isConnected = [[1,1,0],[1,1,0],[0,0,1]]
// Expected: 2

// prettier-ignore
// isConnected = [[1,0,0],[0,1,0],[0,0,1]]
// Expected: 3

console.log(findCircleNum(isConnected))
