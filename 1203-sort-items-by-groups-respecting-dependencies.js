/**
 * There are n items each belonging to zero or one of m groups where group[i] is
 * the group that the i-th item belongs to and it's equal to -1 if the i-th item
 * belongs to no group. The items and the groups are zero indexed. A group can
 * have no item belonging to it.
 *
 * Return a sorted list of the items such that:
 *
 *    The items that belong to the same group are next to each other in the
 *    sorted list.
 *
 *    There are some relations between these items where beforeItems[i] is a
 *    list containing all the items that should come before the i-th item in the
 *    sorted array (to the left of the i-th item).
 *
 * Return any solution if there is more than one solution and return an empty
 * list if there is no solution.
 *
 * Constraints:
 *    1 <= m <= n <= 3 * 10^4
 *    group.length == beforeItems.length == n
 *    -1 <= group[i] <= m - 1
 *    0 <= beforeItems[i].length <= n - 1
 *    0 <= beforeItems[i][j] <= n - 1
 *    i != beforeItems[i][j]
 *    beforeItems[i] does not contain duplicates elements.
 */

/**
 * @param {number} n
 * @param {number} m
 * @param {number[]} group
 * @param {number[][]} beforeItems
 * @return {number[]}
 */
var sortItems = function (n, m, group, beforeItems) {
  let groupId = m
  for (let i = 0; i < n; i++) if (group[i] === -1) group[i] = groupId++

  const itemGraph = new Array(n).fill().map((_) => new Array())
  const itemIndegree = new Array(n).fill(0)

  const groupGraph = new Array(groupId).fill().map((_) => new Array())
  const groupIndegree = new Array(groupId).fill(0)

  for (let curr = 0; curr < n; curr++) {
    for (const prev of beforeItems[curr]) {
      itemGraph[prev].push(curr)
      itemIndegree[curr] += 1

      if (group[curr] !== group[prev]) {
        groupGraph[group[prev]].push(group[curr])
        groupIndegree[group[curr]] += 1
      }
    }
  }

  const topologicalSort = (graph, indegree) => {
    const n = graph.length
    const visited = []
    const stack = []
    for (let i = 0; i < n; i++) {
      if (indegree[i] === 0) stack.push(i)
    }

    while (stack.length) {
      const node = stack.shift()
      visited.push(node)
      for (const neighbor of graph[node]) {
        indegree[neighbor] -= 1
        if (indegree[neighbor] === 0) {
          stack.push(neighbor)
        }
      }
    }

    return visited.length === n ? visited : []
  }

  const itemLinear = topologicalSort(itemGraph, itemIndegree)
  const groupLinear = topologicalSort(groupGraph, groupIndegree)

  if (itemLinear.length === 0 || groupLinear.length === 0) {
    return []
  }

  const groupItems = new Array(groupId).fill().map((_) => new Array())
  for (const item of itemLinear) {
    groupItems[group[item]].push(item)
  }

  const result = []
  for (const group of groupLinear) {
    result.push(...groupItems[group])
  }

  return result
}

n = 8
m = 2
group = [-1, -1, 1, 0, 0, 1, 0, -1]
beforeItems = [[], [6], [5], [6], [3, 6], [], [], []]
// Expected: [6,3,4,1,5,2,0,7]

// n = 8
// m = 2
// group = [-1,-1,1,0,0,1,0,-1]
// beforeItems = [[],[6],[5],[6],[3],[],[4],[]]
// Expected: []

console.log(sortItems(n, m, group, beforeItems))
