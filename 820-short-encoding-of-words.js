/**
 * @param {string[]} words
 * @return {number}
 */
const minimumLengthEncoding_1 = (words) => {
  const set = new Set(words)
  for (const word of words)
    for (let i = 1; i < word.length; i++) set.delete(word.slice(i))

  let ans = 0
  for (const word of set) ans += word.length + 1
  return ans
}

const minimumLengthEncoding = (words) => {
  class TrieNode {
    constructor() {
      this.children = new Array(26)
      this.count = 0
    }
    get(char) {
      const charCode = char.charCodeAt(0) - 97
      if (!this.children[charCode]) {
        this.children[charCode] = new TrieNode()
        this.count++
      }
      return this.children[charCode]
    }
  }

  const trie = new TrieNode()
  const nodes = new Map()

  for (let i = 0; i < words.length; i++) {
    const word = words[i]
    let wordTrie = trie
    for (let j = word.length - 1; j >= 0; j--) {
      wordTrie = wordTrie.get(word[j])
    }
    nodes.set(wordTrie, i)
  }

  let ans = 0
  for (const node of nodes.keys())
    if (node.count === 0) ans += words[nodes.get(node)].length + 1
  return ans
}

words = ['time', 'me', 'bell']
// words = ['t']
console.log(minimumLengthEncoding(words))
