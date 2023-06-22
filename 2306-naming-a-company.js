/**
 * You are given an array of strings ideas that represents a list of names to be
 * used in the process of naming a company. The process of naming a company is
 * as follows:
 *    Choose 2 distinct names from ideas, call them ideaA and ideaB.
 *
 *    Swap the first letters of ideaA and ideaB with each other.
 *
 *    If both of the new names are not found in the original ideas, then the
 *    name ideaA ideaB (the concatenation of ideaA and ideaB, separated by a
 *    space) is a valid company name.
 *
 *    Otherwise, it is not a valid name.
 *
 * Return the number of distinct valid names for the company.
 *
 * Constraints:
 *    2 <= ideas.length <= 5 * 10^4
 *    1 <= ideas[i].length <= 10
 *    ideas[i] consists of lowercase English letters.
 *    All the strings in ideas are unique.
 */

/**
 * @param {string[]} ideas
 * @return {number}
 */
//  TLE
const distinctNames_array = (ideas) => {
  const map = new Array(26).fill().map((_) => [])
  for (const word of ideas) map[word[0].charCodeAt() - 97].push(word.slice(1))

  let count = 0

  for (let i = 0; i < map.length - 1; i++) {
    for (let j = i + 1; j < map.length; j++) {
      let both = 0
      for (const word of map[i]) if (map[j].includes(word)) both++
      count += (map[i].length - both) * (map[j].length - both)
    }
  }

  return count * 2
}

const distinctNames_map = (ideas) => {
  const map = new Map()
  for (const word of ideas) {
    if (!map.get(word[0])) map.set(word[0], new Set())
    map.get(word[0]).add(word.slice(1))
  }

  const initials = [...map.keys()]
  let count = 0

  for (let i = 0; i < initials.length - 1; i++) {
    const set1 = map.get(initials[i])
    for (let j = i + 1; j < initials.length; j++) {
      const set2 = map.get(initials[j])
      let both = 0
      for (const word of set1) if (set2.has(word)) both++
      count += (set1.size - both) * (set2.size - both)
    }
  }

  return count * 2
}

ideas = ['coffee', 'donuts', 'time', 'toffee']
// Output: 6
// Explanation: The following selections are valid:
// - ("coffee", "donuts"): The company name created is "doffee conuts".
// - ("donuts", "coffee"): The company name created is "conuts doffee".
// - ("donuts", "time"): The company name created is "tonuts dime".
// - ("donuts", "toffee"): The company name created is "tonuts doffee".
// - ("time", "donuts"): The company name created is "dime tonuts".
// - ("toffee", "donuts"): The company name created is "doffee tonuts".
// Therefore, there are a total of 6 distinct company names.

// The following are some examples of invalid selections:
// - ("coffee", "time"): The name "toffee" formed after swapping already exists in the original array.
// - ("time", "toffee"): Both names are still the same after swapping and exist in the original array.
// - ("coffee", "toffee"): Both names formed after swapping already exist in the original array.

// ideas = ['lack', 'back']
// Output: 0
// Explanation: There are no valid selections. Therefore, 0 is returned.

console.log(distinctNames_array(ideas))
console.log(distinctNames_map(ideas))
