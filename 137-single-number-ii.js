/**
 * Given an integer array nums where every element appears three times except
 * for one, which appears exactly once. Find the single element and return it.
 *
 * You must implement a solution with a linear runtime complexity and use only
 * constant extra space.
 *
 * Constraints:
 *    1 <= nums.length <= 3 * 10^4
 *    -2^31 <= nums[i] <= 2^31 - 1
 *    Each element in nums appears exactly three times except for one element
 *    which appears once.
 */

// Sofrido entender a solução genérica utilizando manipulação de bits. Há uma
// explicação bem completa nas soluções apresentadas pela comunidade:
//    https://leetcode.com/problems/single-number-ii/solutions/43295/detailed-explanation-and-generalization-of-the-bitwise-operation-method-for-single-numbers/

// Para o problema apresentado, a intuição pode ser simplificada um bocado

/**
 * @param {number[]} nums
 * @return {number}
 */
https: var singleNumber = function (nums) {
  // Bits dos contadores de ocorrência, como contaremos apenas até 3 (na verdade
  // de 0 a 2), bastam dois bits - que nos permitiriam contar até 4
  let ones = 0
  let twos = 0

  for (const num of nums) {
    // O XOR garante o toggle dos bits
    // Os dois bits não podem estar ligados ao mesmo tempo, pois contamos apenas
    // até 2, o AND com NOT do outro bit garante isto.
    ones = (ones ^ num) & ~twos
    twos = (twos ^ num) & ~ones
  }

  // Retonarmos o número que ocorre apenas 1 vez.
  // Como não há a hipótese de um número ocorrer apenas 2 vezes, ao término
  // do processamento twos sempre será igual a zero. Logo, poderíamos retornar
  // (ones | twos) conforme a solução genérica do problema
  return ones
}

nums = [2, 2, 3, 2]
// Output: 3

// nums = [0, 1, 0, 1, 0, 1, 99]
// Output: 99

console.log(singleNumber(nums))
