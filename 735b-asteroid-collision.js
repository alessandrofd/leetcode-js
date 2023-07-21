/**
 * We are given an array asteroids of integers representing asteroids in a row.
 *
 * For each asteroid, the absolute value represents its size, and the sign
 * represents its direction (positive meaning right, negative meaning left).
 * Each asteroid moves at the same speed.
 *
 * Find out the state of the asteroids after all collisions. If two asteroids
 * meet, the smaller one will explode. If both are the same size, both will
 * explode. Two asteroids moving in the same direction will never meet.
 *
 * Constraints:
 *    2 <= asteroids.length <= 10^4
 *    -1000 <= asteroids[i] <= 1000
 *    asteroids[i] != 0
 */

// Os sinais não indicam apenas direçoes opostas positivo se movimentará para a
// direita e negativa para a esquerda. Logo, se tivermos uma sequência positivo
// seguido de um negativo, teremos uma colisão. No entanto, se tivermos negativo
// seguido de um positivo, os asteroids se afastarão e não colidirão.

/**
 * @param {number[]} asteroids
 * @return {number[]}
 */
const asteroidCollision = (asteroids) => {}

asteroids = [5, 10, -5]
// Expected: [5,10]

asteroids = [8, -8]
// Expected: []

asteroids = [10, 2, -5]
// Expected: [10]

asteroids = [-2, -1, 1, 2]
// Expected: [-2,-1,1,2]

console.log(asteroidCollision(asteroids))
