/**
 * @param {string[][]} equations
 * @param {number[]} values
 * @param {string[][]} queries
 * @return {number[]}
 */
const calcEquation = (equations, values, queries) => {
  const backtrack = (node, target, acc) => {
    visited.add(node)
    result = -1.0
    neighbors = graph.get(node)
    if (neighbors.has(target)) result = acc * neighbors.get(target)
    else {
      for ([neighbor, quotient] of neighbors) {
        if (visited.has(neighbor)) continue
        result = backtrack(neighbor, target, acc * quotient)
        if (result !== -1.0) break
      }
    }
    visited.delete(node)
    return result
  }

  graph = new Map()

  //Step 1. build the graph from the equations
  for (i = 0; i < equations.length; i++) {
    ;[dividend, divisor] = equations[i]
    quotient = values[i]

    if (!graph.has(dividend)) graph.set(dividend, new Map())
    graph.get(dividend).set(divisor, quotient)

    if (!graph.has(divisor)) graph.set(divisor, new Map())
    graph.get(divisor).set(dividend, 1 / quotient)
  }

  //Step 2. Evaluate each query via backtracking (DFS)
  // by verifying if there exists a path from dividend to divisor
  results = Array(queries.length)
  for (i = 0; i < queries.length; i++) {
    ;[dividend, divisor] = queries[i]

    if (!graph.has(dividend) || !graph.has(divisor)) results[i] = -1.0
    else if (dividend === divisor) results[i] = 1.0
    else {
      visited = new Set()
      results[i] = backtrack(dividend, divisor, 1)
    }
  }
  return results
}

equations = [
  ['x1', 'x2'],
  ['x2', 'x3'],
  ['x3', 'x4'],
  ['x4', 'x5'],
]
values = [3.0, 4.0, 5.0, 6.0]
queries = [
  // ['x1', 'x5'],
  // ['x5', 'x2'],
  ['x2', 'x4'],
  // ['x2', 'x2'],
  // ['x2', 'x9'],
  // ['x9', 'x9'],
]

console.log(calcEquation(equations, values, queries))

// Example 1:

// Input: equations = [["a","b"],["b","c"]], values = [2.0,3.0], queries = [["a","c"],["b","a"],["a","e"],["a","a"],["x","x"]]
// Output: [6.00000,0.50000,-1.00000,1.00000,-1.00000]
// Explanation:
// Given: a / b = 2.0, b / c = 3.0
// queries are: a / c = ?, b / a = ?, a / e = ?, a / a = ?, x / x = ?
// return: [6.0, 0.5, -1.0, 1.0, -1.0 ]

// Example 2:

// Input: equations = [["a","b"],["b","c"],["bc","cd"]], values = [1.5,2.5,5.0], queries = [["a","c"],["c","b"],["bc","cd"],["cd","bc"]]
// Output: [3.75000,0.40000,5.00000,0.20000]

// Example 3:

// Input: equations = [["a","b"]], values = [0.5], queries = [["a","b"],["b","a"],["a","c"],["x","y"]]
// Output: [0.50000,2.00000,-1.00000,-1.00000]
