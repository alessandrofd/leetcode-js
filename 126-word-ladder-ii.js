/**
 * A transformation sequence from word beginWord to word endWord using a
 * dictionary wordList is a sequence of words beginWord -> s1 -> s2 -> ... -> sk
 * such that:
 *
 * Every adjacent pair of words differs by a single letter.
 * Every si for 1 <= i <= k is in wordList. Note that beginWord does not need to
 * be in wordList.
 * sk == endWord
 *
 * Given two words, beginWord and endWord, and a dictionary wordList, return all
 * the shortest transformation sequences from beginWord to endWord, or an empty
 * list if no such sequence exists. Each sequence should be returned as a list
 * of the words [beginWord, s1, s2, ..., sk].
 */

/**
 * @param {string} beginWord
 * @param {string} endWord
 * @param {string[]} wordList
 * @return {string[][]}
 */

// Approach 1: Breadth-First Search (BFS) + Backtracking
const findLadders = (beginWord, endWord, wordList) => {
  const adjacents = new Map()
  const path = [endWord]
  const shortestPaths = []

  const findNeighbors = (word, wordList) => {
    const neighbors = []
    const chars = [...word]

    for (let i = 0; i < word.length; i++) {
      const oldChar = chars[i]

      for (let c = 'a'.charCodeAt(0); c <= 'z'.charCodeAt(0); c++) {
        chars[i] = String.fromCharCode(c)
        if (c === oldChar.charCodeAt(0) || !wordList.has(chars.join('')))
          continue
        neighbors.push(chars.join(''))
      }
      chars[i] = oldChar
    }
    return neighbors
  }

  const bfs = (beginWord, wordList) => {
    if (wordList.has(beginWord)) wordList.delete(beginWord)

    const queue = [beginWord]
    const isEnqueued = new Set([beginWord])

    while (queue.length) {
      const visited = []

      for (let i = queue.length - 1; i >= 0; i--) {
        const word = queue.shift()
        const neighbors = findNeighbors(word, wordList)

        for (const neighbor of neighbors) {
          visited.push(neighbor)

          if (!adjacents.has(neighbor)) adjacents.set(neighbor, [])
          adjacents.get(neighbor).push(word)

          if (!isEnqueued.has(neighbor)) {
            queue.push(neighbor)
            isEnqueued.add(neighbor)
          }
        }
      }
      // removing the words from the previous layer
      for (const word of visited) if (wordList.has(word)) wordList.delete(word)
    }
  }

  const backtrack = (source) => {
    if (source === beginWord) shortestPaths.push([...path].reverse())

    if (!adjacents.has(source)) return

    for (const adjacent of adjacents.get(source)) {
      path.push(adjacent)
      backtrack(adjacent)
      path.pop()
    }
  }

  bfs(beginWord, new Set(wordList))
  backtrack(endWord)
  return shortestPaths
}

// Approach 2: Bidirectional Breadth-First Search (BFS) + Backtracking
const findLadders_2 = (beginWord, endWord, wordList) => {
  const adjacents = new Map()
  const path = [beginWord] // Every path will start from the beginWord
  const shortestPaths = []

  const findNeighbors = (word, wordList) => {
    const neighbors = []
    const chars = [...word]

    for (let i = 0; i < word.length; i++) {
      const oldChar = chars[i]

      for (let c = 'a'.charCodeAt(0); c <= 'z'.charCodeAt(0); c++) {
        chars[i] = String.fromCharCode(c)
        if (c === oldChar.charCodeAt(0) || !wordList.has(chars.join('')))
          continue
        neighbors.push(chars.join(''))
      }
      chars[i] = oldChar
    }
    return neighbors
  }

  const addEdge = (word1, word2, forward) => {
    if (forward) {
      if (!adjacents.has(word1)) adjacents.set(word1, [])
      adjacents.get(word1).push(word2)
    } else {
      if (!adjacents.has(word2)) adjacents.set(word2, [])
      adjacents.get(word2).push(word1)
    }
  }

  const bfs = (beginWord, endWord, wordList) => {
    if (!wordList.has(endWord)) return false

    if (wordList.has(beginWord)) wordList.delete(beginWord)
    let forwardQueue = new Set([beginWord])
    let backwardQueue = new Set([endWord])

    let found = false
    let forward = true

    while (forwardQueue.size) {
      // visited will store the words in the current layer
      const visited = new Set()

      if (forwardQueue.size > backwardQueue.size) {
        ;[forwardQueue, backwardQueue] = [backwardQueue, forwardQueue]
        forward = !forward
      }

      for (const word of forwardQueue) {
        const neighbors = findNeighbors(word, wordList)
        for (const neighbor of neighbors) {
          // if the backward queue already contains it we can stop after
          // completing this level
          if (backwardQueue.has(neighbor)) {
            found = true
            addEdge(word, neighbor, forward)
          } else if (
            !found &&
            wordList.has(neighbor) &&
            !forwardQueue.has(neighbor)
          ) {
            visited.add(neighbor)
            addEdge(word, neighbor, forward)
          }
        }
      }
      // removing words of the previous layer
      for (const word of forwardQueue)
        if (wordList.has(word)) wordList.delete(word)

      if (found) break

      forwardQueue = visited
    }
    return found
  }

  const backtrack = (word) => {
    if (word === endWord) shortestPaths.push([...path])

    if (!adjacents.has(word)) return

    for (const adjacent of adjacents.get(word)) {
      path.push(adjacent)
      backtrack(adjacent)
      path.pop()
    }
  }

  if (!bfs(beginWord, endWord, new Set(wordList))) return []
  backtrack(beginWord)
  return shortestPaths
}

// Discussion Board
var findLadders_d = function (beginWord, endWord, wordList) {
  const wordSet = new Set(wordList)
  wordSet.add(beginWord)

  if (!wordSet.has(endWord)) return []

  const distanceMap = new Map()
  const wordMap = new Map()

  // 1. BFS construct distanceMap and wordMap from end to start
  const queue = []
  const visited = new Set()

  // Flag to check if we can reach start from end
  let reached = false

  queue.push(endWord)
  visited.add(endWord)
  let distance = 0
  distanceMap.set(endWord, distance)
  while (queue.length !== 0) {
    let size = queue.length
    distance++
    for (let i = 0; i < size; i++) {
      const word = queue.shift()
      for (let w of getNextWords(word, wordSet)) {
        // push into wordMap from start to end
        // we need to push here before visited check
        if (!wordMap.has(w)) wordMap.set(w, [])
        wordMap.get(w).push(word)

        if (visited.has(w)) continue
        if (w === beginWord) reached = true

        // put into distance map
        distanceMap.set(w, distance)

        queue.push(w)
        visited.add(w)
      }
    }
  }

  // short circuit if can not reach
  if (!reached) return []

  // 2. DFS find path where distance - 1
  const result = []
  dfs(result, [beginWord], beginWord, endWord, wordMap, distanceMap)

  return result
}

var dfs = function (result, tmpPath, word, endWord, wordMap, distanceMap) {
  if (word === endWord) {
    result.push([...tmpPath])
    return
  }

  for (let nextWord of wordMap.get(word)) {
    if (distanceMap.get(word) === distanceMap.get(nextWord) + 1) {
      tmpPath.push(nextWord)
      dfs(result, tmpPath, nextWord, endWord, wordMap, distanceMap)
      tmpPath.pop()
    }
  }
}

var getNextWords = function (word, wordSet) {
  const result = []
  for (let i = 0; i < word.length; i++) {
    let currentCode = word.charCodeAt(i)
    for (let c = 97; c <= 122; c++) {
      if (c !== currentCode) {
        const chars = word.split('')
        chars[i] = String.fromCharCode(c)
        let newWord = chars.join('')
        if (wordSet.has(newWord)) {
          result.push(newWord)
        }
      }
    }
  }

  return result
}

beginWord = 'hit'
endWord = 'cog'
wordList = ['hot', 'dot', 'dog', 'lot', 'log', 'cog']
// Output: [["hit","hot","dot","dog","cog"],["hit","hot","lot","log","cog"]]

// beginWord = 'hit'
// endWord = 'cog'
// wordList = ['hot', 'dot', 'dog', 'lot', 'log']
// Output: []

console.log(findLadders(beginWord, endWord, wordList))
