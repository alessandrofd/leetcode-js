/**
 * You are visiting a farm that has a single row of fruit trees arranged from
 * left to right. The trees are represented by an integer array fruits where
 * fruits[i] is the type of fruit the ith tree produces.
 *
 * You want to collect as much fruit as possible. However, the owner has some
 * strict rules that you must follow:
 *
 *    You only have two baskets, and each basket can only hold a single type of
 *    fruit. There is no limit on the amount of fruit each basket can hold.
 *
 *    Starting from any tree of your choice, you must pick exactly one fruit
 *    from every tree (including the start tree) while moving to the right.
 *    The picked fruits must fit in one of your baskets.
 *
 *    Once you reach a tree with fruit that cannot fit in your baskets,
 *    you must stop.
 *
 * Given the integer array fruits, return the maximum number of fruits you
 * can pick.
 */

/**
 * @param {number[]} fruits
 * @return {number}
 */
// Approach 1: Brute Force - Analisa todos os subarrays - TLE
const totalFruit_bruteForce = (fruits) => {}

// Approach 2: Brute Force II
// Analisa subarrays até que o número de frutas exceda 2 - TLE
const totalFruit_bruteForceII = (fruits) => {}

// Approach 3: Sliding Window
const totalFruit_slidingWindow = (fruits) => {}

// Approach 4: Sliding Window II - Tamanho da janela otimizado
const totalFruit_slidingWindowII = (fruits) => {}

fruits = [1, 2, 1]
// Output: 3
// Explanation: We can pick from all 3 trees.

// fruits = [0, 1, 2, 2]
// Output: 3
// Explanation: We can pick from trees [1,2,2].
// If we had started at the first tree, we would only pick from trees [0,1].

// fruits = [1, 2, 3, 2, 2]
// Output: 4
// Explanation: We can pick from trees [2,3,2,2].
// If we had started at the first tree, we would only pick from trees [1,2].

console.log(totalFruit_bruteForce(fruits))
console.log(totalFruit_bruteForce(fruits))
console.log(totalFruit_bruteForce(fruits))
console.log(totalFruit_slidingWindowII(fruits))
