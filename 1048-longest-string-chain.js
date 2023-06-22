/**
 * @param {string[]} words
 * @return {number}
 */

// Approach 1: Top-Down Dynamic Programming (Recursion + Memoization)

const longestStrChain_1 = (words) => {
  const set = new Set(words)
  const memo = new Map()
  const dfs = (word) => {
    if (memo.has(word)) return memo.get(word)
    let maxLength = 1
    for (let i = 0; i < word.length; i++) {
      const newWord = word.slice(0, i) + word.slice(i + 1)
      if (set.has(newWord)) {
        const currentLength = 1 + dfs(newWord)
        maxLength = Math.max(maxLength, currentLength)
      }
    }
    memo[word] = maxLength
    return maxLength
  }

  let result = 0
  for (const word of words) result = Math.max(result, dfs(word))
  return result
}

// Approach 2: Bottom-Up Dynamic Programming

const longestStrChain_2 = (words) => {
  const dp = new Map()
  words.sort((a, b) => a.length - b.length)
  let longest = 1
  for (const word of words) {
    let length = 1
    for (let i = 0; i < word.length; i++) {
      const predecessor = word.slice(0, i) + word.slice(i + 1)
      length = Math.max(length, (dp.get(predecessor) ?? 0) + 1)
    }
    dp.set(word, length)
    longest = Math.max(longest, length)
  }
  return longest
}

// Discussion

const longestStrChain = (words) => {
  const sets = Array.from({length: 17}, _ => new Set())
  for (const word of words) sets[word.length].add(word)
  const dp = new Map()
  let best = 1
  for (let i = 16; i; i--) {
    if (!sets[i - 1].size) continue
    for (const word of sets[i]) {
      let wVal = dp.get(word) ?? 1
      for (let j = 0; j < word.length; j++) {
        const pred = word.slice(0, j) + word.slice(j + 1)
        if (sets[i - 1].has(pred) && wVal >= (dp.get(pred) ?? 1)) {
          dp.set(pred, wVal + 1)
          best = Math.max(best, wVal + 1)
        }
      }
    }
  }
  return best
}

words = ['bdca', 'a', 'b', 'ba', 'bca', 'bda']
words = ['xbc', 'pcxbcf', 'xb', 'cxbc', 'pcxbc']
words = ['abcd', 'dbqca']
console.log(longestStrChain(words))
