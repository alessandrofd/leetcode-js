/**
 * Given an m x n board of characters and a list of strings words, return all
 * words on the board.
 *
 * Each word must be constructed from letters of sequentially adjacent cells,
 * where adjacent cells are horizontally or vertically neighboring. The same
 * letter cell may not be used more than once in a word.
 *
 * Constraints:
 *    m == board.length
 *    n == board[i].length
 *    1 <= m, n <= 12
 *    board[i][j] is a lowercase English letter.
 *    1 <= words.length <= 3 * 10^4
 *    1 <= words[i].length <= 10
 *    words[i] consists of lowercase English letters.
 *    All the strings of words are unique.
 */

// Classe Trie do problema 208
class Trie {
  constructor() {
    this.children = {}
    this.end = false
  }

  insert = (word) => {
    let node = this
    for (const char of word) {
      if (!node.children[char]) node.children[char] = new Trie()
      node = node.children[char]
    }
    node.end = true
  }

  searchPrefix = (prefix) => {
    let node = this
    for (const char of prefix) {
      if (!node.children[char]) return null
      node = node.children[char]
    }
    return node
  }

  search = (word) => {
    const node = this.searchPrefix(word)
    return node !== null && node.end
  }

  startsWith = (prefix) => this.searchPrefix(prefix) !== null
}

/**
 * @param {character[][]} board
 * @param {string[]} words
 * @return {string[]}
 */
const findWords_0 = (board, words) => {
  const trie = new Trie()
  for (const word of words) trie.insert(word)

  const backtracking = (row, col, word) => {
    if (!trie.startsWith(word)) return

    if (trie.search(word)) results.add(word)

    const char = board[row][col]
    board[row][col] = '#'

    const directions = [
      [-1, 0],
      [0, 1],
      [1, 0],
      [0, -1],
    ]
    for (const [dy, dx] of directions) {
      const newRow = row + dy
      const newCol = col + dx
      if (
        newRow < 0 ||
        newRow >= board.length ||
        newCol < 0 ||
        newCol >= board[0].length
      )
        continue
      backtracking(newRow, newCol, word + board[newRow][newCol])
    }

    board[row][col] = char
  }

  results = new Set()

  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board[0].length; col++) {
      backtracking(row, col, board[row][col])
    }
  }

  return [...results]
}

const findWords_1 = (board, words) => {
  const backtrack = (node, row, col) => {
    if (node.word) {
      results.push(node.word)
      // garante que a palavra será incluída apenas uma vez nos resultados
      node.word = null
    }

    if (row < 0 || row >= board.length || col < 0 || col >= board[0].length)
      return

    const char = board[row][col]
    if (!node[char]) return

    board[row][col] = '#' // marca como visitado

    const directions = [
      [-1, 0],
      [0, 1],
      [1, 0],
      [0, -1],
    ]
    for (const [dy, dx] of directions) backtrack(node[char], row + dy, col + dx)

    board[row][col] = char // reset
  }

  // Build Trie
  const root = {}
  for (const word of words) {
    let node = root
    for (const char of word) {
      if (!node[char]) node[char] = {}
      node = node[char]
    }
    node.word = word
  }

  const results = []
  for (let row = 0; row < board.length; row++)
    for (let col = 0; col < board[0].length; col++) backtrack(root, row, col)
  return results
}

const findWords = (board, words) => {
  const backtrack = (node, row, col) => {
    const char = board[row]?.[col]
    if (!char) return

    const child = node.children.get(char)
    if (!child) return

    if (child.word) {
      results.push(child.word)
      delete child.word
    }

    if (child.children.size === 0) {
      node.children.delete(char)
      return
    }

    board[row][col] = '#' // marca como visitado

    backtrack(child, row - 1, col)
    backtrack(child, row, col + 1)
    backtrack(child, row + 1, col)
    backtrack(child, row, col - 1)

    board[row][col] = char // reset
  }

  // Build Trie
  const root = { children: new Map() }
  for (const word of words) {
    let node = root
    for (const char of word) {
      if (!node.children.get(char))
        node.children.set(char, { children: new Map() })
      node = node.children.get(char)
    }
    node.word = word
  }

  const results = []
  for (let row = 0; row < board.length; row++)
    for (let col = 0; col < board[0].length; col++) backtrack(root, row, col)
  return results
}

board = [
  ['o', 'a', 'a', 'n'],
  ['e', 't', 'a', 'e'],
  ['i', 'h', 'k', 'r'],
  ['i', 'f', 'l', 'v'],
]
words = ['oath', 'pea', 'eat', 'rain']
//  Output: ['eat', 'oath']

board = [
  ['a', 'b'],
  ['c', 'd'],
]
words = ['abcb']
// Output: []

board = [['a']]
words = ['a']

console.log(findWords(board, words))
