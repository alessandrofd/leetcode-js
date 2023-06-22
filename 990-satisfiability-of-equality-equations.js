/**
 * You are given an array of strings equations that represent relationships
 * between variables where each string equations[i] is of length 4 and takes one
 * of two different forms: "xi==yi" or "xi!=yi".Here, xi and yi are lowercase
 * letters (not necessarily different) that represent one-letter variable names.
 *
 * Return true if it is possible to assign integers to variable names so as to
 * satisfy all the given equations, or false otherwise.
 *
 * Constraints:
 *    1 <= equations.length <= 500
 *    equations[i].length == 4
 *    equations[i][0] is a lowercase letter.
 *    equations[i][1] is either '=' or '!'.
 *    equations[i][2] is '='.
 *    equations[i][3] is a lowercase letter.
 */

/**
 * @param {string[]} equations
 * @return {boolean}
 */
const equationsPossible = (equations) => {
  const A = 'a'.charCodeAt(0)
  
  const graph = new Array(26).fill().map(x => [])
  for (const equation of equations) {
    if (equation[1] === '=') {
      const x = equation[0].charCodeAt(0) - A
      const y = equation[3].charCodeAt(0) - A
      graph[x].push(y)
      graph[y].push(x)
    }
  }

    const colors = new Array(26)
    const dfs = (node, color) => {
      if (colors[node] === undefined) {
        colors[node] = color
        for (const adjacent of graph[node]) dfs(adjacent, color)
      }
    }
  
  for (let node = 0; node < 26; node++) 
    if (colors[node] === undefined) dfs(node, node)

  for (const equation of equations) {
    if (equation[1] === '!') {
      const x = equation[0].charCodeAt(0) - A
      const y = equation[3].charCodeAt(0) - A
      if (colors[x] === colors[y]) return false
    }
  }

  return true
}

equations = ["a==b","b!=a"]
// Output: false
// Explanation: If we assign say, a = 1 and b = 1, then the first equation is 
// satisfied, but not the second.
// There is no way to assign the variables to satisfy both equations.

equations = ["b==a","a==b"]
// Output: true
// Explanation: We could assign a = 1 and b = 1 to satisfy both equations.

console.log(equationsPossible(equations))

