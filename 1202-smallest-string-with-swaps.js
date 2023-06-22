/**
 * @param {string} s
 * @param {number[][]} pairs
 * @return {string}
 */
const smallestStringWithSwaps = (s, pairs) => {
  const DFS = (string, vertex, characters, indices) => {
    characters.push(string[vertex])
    indices.push(vertex)
    visited[vertex] = true

    // Traverse the adjacents
    for (const adjacent of adjacents[vertex]) {
      if (!visited[adjacent]) {
        DFS(string, adjacent, characters, indices)
      }
    }
  }

  const visited = new Array(s.length).fill(false)
  const adjacents = new Array(s.length).fill(null).map((_) => new Array())
  const answer = new Array(s.length)

  // Build the adjancency list
  for (const [origin, destination] of pairs) {
    // Undirected edge
    adjacents[origin].push(destination)
    adjacents[destination].push(origin)
  }

  for (let vertex = 0; vertex < s.length; vertex++) {
    if (!visited[vertex]) {
      const characters = []
      const indices = []

      DFS(s, vertex, characters, indices)

      characters.sort()
      indices.sort((a, b) => a - b)

      for (let i = 0; i < characters.length; i++) {
        answer[indices[i]] = characters[i]
      }
    }
  }
  return answer.join('')
}

// const s = "dcab", pairs = [[0,3],[1,2]]
// const s = "dcab", pairs = [[0,3],[1,2],[0,2]]
const s = 'cba',
  pairs = [
    [0, 1],
    [1, 2],
  ]

console.log(smallestStringWithSwaps(s, pairs))

// Example 1:
// Input: s = "dcab", pairs = [[0,3],[1,2]]
// Output: "bacd"
// Explaination:
// Swap s[0] and s[3], s = "bcad"
// Swap s[1] and s[2], s = "bacd"

// Example 2:
// Input: s = "dcab", pairs = [[0,3],[1,2],[0,2]]
// Output: "abcd"
// Explaination:
// Swap s[0] and s[3], s = "bcad"
// Swap s[0] and s[2], s = "acbd"
// Swap s[1] and s[2], s = "abcd"

// Example 3:
// Input: s = "cba", pairs = [[0,1],[1,2]]
// Output: "abc"
// Explaination:
// Swap s[0] and s[1], s = "bca"
// Swap s[1] and s[2], s = "bac"
// Swap s[0] and s[1], s = "abc"
