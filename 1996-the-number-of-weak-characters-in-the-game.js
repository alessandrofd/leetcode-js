/**
 * You are playing a game that contains multiple characters, and each of the
 * characters has two main properties: attack and defense. You are given a 2D
 * integer array properties where properties[i] = [attacki, defensei] represents
 * the properties of the ith character in the game.
 *
 * A character is said to be weak if any other character has both attack and
 * defense levels strictly greater than this character's attack and defense
 * levels. More formally, a character i is said to be weak if there exists
 * another character j where attackj > attacki and defensej > defensei.
 *
 * Return the number of weak characters.
 *
 * Constraints:
 *    2 <= properties.length <= 10^5
 *    properties[i].length == 2
 *    1 <= attacki, defensei <= 10^5
 */

/**
 * @param {number[][]} properties
 * @return {number}
 */
// Time limit exceeded
const numberOfWeakCharacters_x = (properties) => {
  return properties.reduce(
    (acc, [attack1, defense1]) =>
      acc +
      (properties.find(
        ([attack2, defense2]) => attack2 > attack1 && defense2 > defense1
      )
        ? 1
        : 0),
    0
  )
}

// Approach 1: Sorting
const numberOfWeakCharacters_1 = (properties) => {
  properties.sort(([a1, a2], [b1, b2]) => a1 - b1 || b2 - a2)
  let weak = 0
  let max = 0
  for (let i = properties.length - 1; i >= 0; i--) {
    if (properties[i][1] < max) weak++
    max = Math.max(max, properties[i][1])
  }
  return weak
}

// Approach 2: Greedy
const numberOfWeakCharacters = (characters) => {
  let maxAttack = 0
  for ([attack, _] of characters) maxAttack = Math.max(maxAttack, attack)

  const maxDefense = new Array(maxAttack + 2).fill(0)
  for ([attack, defense] of characters)
    maxDefense[attack] = Math.max(maxDefense[attack], defense)

  // Store the maximum defense for attack greater than or equal to a value
  for (let i = maxAttack - 1; i >= 0; i--)
    maxDefense[i] = Math.max(maxDefense[i], maxDefense[i + 1])

  let weakCharacters = 0
  for ([attack, defense] of characters)
    if (defense < maxDefense[attack + 1]) weakCharacters++

  return weakCharacters
}

properties = [
  [5, 5],
  [6, 3],
  [3, 6],
]
// Output: 0

// properties = [
//   [2, 2],
//   [3, 3],
// ]
// Output: 1

// properties = [
//   [1, 5],
//   [10, 4],
//   [4, 3],
// ]
// Output: 1

// properties = [
//   [1, 1],
//   [2, 1],
//   [2, 2],
//   [1, 2],
// ]
// Output: 1

console.log(numberOfWeakCharacters(properties))
