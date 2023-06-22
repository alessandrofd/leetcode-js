/**
 * You are given an array of variable pairs equations and an array of real
 * numbers values, where equations[i] = [Ai, Bi] and values[i] represent
 * the equation Ai / Bi = values[i]. Each Ai or Bi is a string that represents
 * a single variable.
 *
 * You are also given some queries, where queries[j] = [Cj, Dj] represents
 * the jth query where you must find the answer for Cj / Dj = ?.
 *
 * Return the answers to all queries. If a single answer cannot be determined,
 * return -1.0.
 *
 * Note: The input is always valid. You may assume that evaluating the queries
 * will not result in division by zero and that there is no contradiction.
 *
 * Constraints:
 *    1 <= equations.length <= 20
 *    equations[i].length == 2
 *    1 <= Ai.length, Bi.length <= 5
 *    values.length == equations.length
 *    0.0 < values[i] <= 20.0
 *    1 <= queries.length <= 20
 *    queries[i].length == 2
 *    1 <= Cj.length, Dj.length <= 5
 *    Ai, Bi, Cj, Dj consist of lower case English letters and digits.
 */

/**
 * @param {string[][]} equations
 * @param {number[]} values
 * @param {string[][]} queries
 * @return {number[]}
 */
const calcEquation_preCalculation = (equations, values, queries) => {}

const calcEquation_backtrack = (equations, values, queries) => {}

// prettier-ignore
equations = [ ['a', 'b'], ['b', 'c'], ]
values = [2.0, 3.0]
// pretier-ignore
queries = [
  ['a', 'c'],
  ['b', 'a'],
  ['a', 'e'],
  ['a', 'a'],
  ['x', 'x'],
]
// Expected: [6.00000,0.50000,-1.00000,1.00000,-1.00000]

// prettier-ignore
equations = [ ['a', 'b'], ['b', 'c'], ['bc', 'cd'], ]
values = [1.5, 2.5, 5.0]
// prettier-ignore
queries = [ ['a', 'c'], ['c', 'b'], ['bc', 'cd'], ['cd', 'bc'], ]
// Expected: [3.75000,0.40000,5.00000,0.20000]

equations = [['a', 'b']]
values = [0.5]
//prettier-ignore
queries = [ ['a', 'b'], ['b', 'a'], ['a', 'c'], ['x', 'y'], ]
// Expected: [0.50000,2.00000,-1.00000,-1.00000]

// prettier-ignore
equations = [ ['a', 'b'], ['c', 'd'], ]
values = [1.0, 1.0]
// prettier-ignore
queries = [ ['a', 'c'], ['b', 'd'], ['b', 'a'], ['d', 'c'], ]
// Expected: [-1.00000,-1.00000,1.00000,1.00000]

console.log(calcEquation_preCalculation(equations, values, queries))
console.log(calcEquation_backtrack(equations, values, queries))

n = 3
console.log(n ?? -1)
