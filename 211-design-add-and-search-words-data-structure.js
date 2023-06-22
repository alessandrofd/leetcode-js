/**
 * Design a data structure that supports adding new words and finding if
 * a string matches any previously added string.
 *
 * Implement the WordDictionary class:
 *
 *    WordDictionary() Initializes the object.
 *
 *    void addWord(word) Adds word to the data structure, it can be
 *    matched later.
 *
 *    bool search(word) Returns true if there is any string in the data
 *    structure that matches word or false otherwise. word may contain dots '.'
 *    where dots can be matched with any letter.
 *
 * Constraints:
 *    1 <= word.length <= 25
 *    word in addWord consists of lowercase English letters.
 *    word in search consist of '.' or lowercase English letters.
 *    There will be at most 3 dots in word for search queries.
 *    At most 104 calls will be made to addWord and search.
 */

class WordDictionary {
  constructor() {
    this.trie = new Map()
  }

  /**
   * @param {string} word
   * @return {void}
   */
  addWord(word) {
    let node = this.trie
    for (const char of word) {
      if (!node.has(char)) node.set(char, new Map())
      node = node.get(char)
    }
    node.set('$', true)
  }

  /**
   * @param {string} word
   * @return {boolean}
   */
  search(word) {
    const searchTrie = (pos, node) => {
      for (let i = pos; i < word.length; i++) {
        const char = word[i]
        if (node.has(char)) {
          node = node.get(char)
        } else if (char === '.') {
          for (const nextChar of node.keys()) {
            if (nextChar !== '$' && searchTrie(i + 1, node.get(nextChar)))
              return true
          }
          return false
        } else {
          return false
        }
      }
      return node.has('$')
    }

    return searchTrie(0, this.trie)
  }
}

// const wordDictionary = new WordDictionary()
// wordDictionary.addWord('bad')
// wordDictionary.addWord('dad')
// wordDictionary.addWord('mad')
// console.log(wordDictionary.search('pad')) // return False
// console.log(wordDictionary.search('bad')) // return True
// console.log(wordDictionary.search('.ad')) // return True
// console.log(wordDictionary.search('b..')) // return True

const wordDictionary = new WordDictionary()
wordDictionary.addWord('a')
wordDictionary.addWord('a')
console.log(wordDictionary.search('.')) // return true
console.log(wordDictionary.search('a')) // return true
console.log(wordDictionary.search('aa')) // return false
console.log(wordDictionary.search('a')) // return true
console.log(wordDictionary.search('.a')) // return false
console.log(wordDictionary.search('a.')) // return false
