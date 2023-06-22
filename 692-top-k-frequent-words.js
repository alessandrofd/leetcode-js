/**
 * Given an array of strings words and an integer k, return the k most frequent
 * strings.
 *
 * Return the answer sorted by the frequency from highest to lowest. Sort the
 * words with the same frequency by their lexicographical order.
 *
 * Constraints:
 *    1 <= words.length <= 500
 *    1 <= words[i].length <= 10
 *    words[i] consists of lowercase English letters.
 *    k is in the range [1, The number of unique words[i]]
 */

/**
 * @param {string[]} words
 * @param {number} k
 * @return {string[]}
 */
const topKFrequent = (words, k) => {
  const map = new Map()
  for (const word of words) map.set(word, (map.get(word) ?? 0) + 1)
  return [...map.entries()]
    .sort(([a1, a2], [b1, b2]) => b2 - a2 || a1.localeCompare(b1))
    .slice(0, k)
    .map(([word]) => word)
}

// TODO: Approach 2: Max Heap

// TODO: Approach 3: Min Heap

// TODO: Approach 4: Bucket Sorting + Trie


words = ['i', 'love', 'leetcode', 'i', 'love', 'coding']
k = 2
// Output: ["i","love"]
// Explanation: "i" and "love" are the two most frequent words.
// Note that "i" comes before "love" due to a lower alphabetical order.

words = ['the', 'day', 'is', 'sunny', 'the', 'the', 'the', 'sunny', 'is', 'is']
k = 4
// Output: ["the","is","sunny","day"]
// Explanation: "the", "is", "sunny" and "day" are the four most frequent words,
// with the number of occurrence being 4, 3, 2 and 1 respectively.

console.log(topKFrequent(words, k))
