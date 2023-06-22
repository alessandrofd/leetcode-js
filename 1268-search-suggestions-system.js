/**
 * @param {string[]} products
 * @param {string} searchWord
 * @return {string[][]}
 */
const suggestedProducts_me = (products, searchWord) => {
  const load = (words, trie) => {
    for (let wordIndex = 0; wordIndex < words.length; wordIndex++) {
      const word = words[wordIndex]
      const wordLen = word.length
      let wordTrie = trie
      for (let charIndex = 0; charIndex < wordLen; charIndex++) {
        const charCode = word.charCodeAt(charIndex) - 97
        if (!wordTrie[charCode]) wordTrie[charCode] = new Array(27)
        wordTrie = wordTrie[charCode]
        if (!wordTrie[26]) wordTrie[26] = []
        if (wordTrie[26].length < 3) wordTrie[26].push(word)
      }
    }
  }

  const retrieve = (word, trie) => {
    for (const char of word) {
      const charCode = char.charCodeAt(0) - 97
      if (!trie[charCode]) return []
      trie = trie[charCode]
    }
    return trie[26]
  }

  const trie = new Array(27)
  products.sort()
  load(products, trie)

  const ans = []
  for (let i = 1; i <= searchWord.length; i++) {
    ans.push(retrieve(searchWord.slice(0, i), trie))
  }
  return ans
}

const suggestedProducts = (products, searchWord) => {
  const ans = []
  products.sort()
  for (let i = 0; i < searchWord.length; i++) {
    products = products.filter((product) => product[i] === searchWord[i])
    ans.push(products.slice(0, 3))
  }
  return ans
}

products = ['mobile', 'mouse', 'moneypot', 'monitor', 'mousepad']
searchWord = 'mouse'

// products = ['havana']
// searchWord = 'havana'

// products = ['bags', 'baggage', 'banner', 'box', 'cloths']
// searchWord = 'bags'

console.log(suggestedProducts(products, searchWord))
