/**
 * You have two types of tiles: a 2 x 1 domino shape and a tromino shape. You
 * may rotate these shapes.
 *
 * Given an integer n, return the number of ways to tile an 2 x n board. Since
 * the answer may be very large, return it modulo 10^9 + 7.
 *
 * In a tiling, every square must be covered by a tile. Two tilings are
 * different if and only if there are two 4-directionally adjacent cells on the
 * oard such that exactly one of the tilings has both squares occupied by a tile.
 *
 * Constraints:
 *    1 <= n <= 1000
 */

// f(k) = número de formas de cobrir completamente um tabuleiro 2 x k
// p(p) = número de formas de cobrir parcialmente um tabuleriro 2 x k

// Consideramos um tabuleiro parcialmente coberto aquele que todas as posições
// estão cobertas exceto o canto superior direito (primeira linha da última
// coluna). Não temos que considerar o canto inferior direito devido a simetria
// do problema.

// f(k) = f(k-1) + f(k-2) + 2 * p(k-1)
// p(k) = f(k-2) + p(k-1)
// f(1) = 1, f(2) = 2, p(2) = 1

// Approach 1: Dynamic Programming (Top-down)
const numTilings_DP_topDown = (n) => {
  // const numTilings = (n) => {
  const MOD = 10 ** 9 + 7

  const memoF = []
  memoF[1] = 1
  memoF[2] = 2

  const memoP = []
  memoP[2] = 1

  const f = (k) => {
    if (memoF[k]) return memoF[k]
    return (memoF[k] = (f(k - 1) + f(k - 2) + 2 * p(k - 1)) % MOD)
  }

  const p = (k) => {
    if (memoP[k]) return memoP[k]
    return (memoP[k] = (f(k - 2) + p(k - 1)) % MOD)
  }

  return f(n)
}

// Approach 2: Dynamic Programming (Bottom-up)
const numTilings_DP_bottomUp = (n) => {
  // const numTilings = (n) => {
  const MOD = 10 ** 9 + 7

  if (n <= 2) return n

  const f = [, 1, 2]
  const p = [, , 1]

  for (let k = 3; k <= n; k++) {
    f[k] = (f[k - 1] + f[k - 2] + 2 * p[k - 1]) % MOD
    p[k] = (f[k - 2] + p[k - 1]) % MOD
  }

  return f[n]
}

// Approach 3: Dynamic Programming (Bottom-up, space optimization)
const numTilings_DP_bottomUp_optimized = (n) => {
  // const numTilings = (n) => {
  const MOD = 1e9 + 7

  if (n <= 2) return n

  let prevF = 1
  let currF = 2
  let currP = 1

  for (let k = 3; k <= n; k++) {
    const temp = currF
    currF = (currF + prevF + 2 * currP) % MOD
    currP = (prevF + currP) % MOD
    prevF = temp
  }

  return currF
}

// Approach 4: Matrix Exponentiation
const numTilings_matrixExp = (n) => {
  // const numTilings = (n) => {
  const MOD = 1e9 + 7
  const matrix = [
    [1, 1, 2],
    [1, 0, 0],
    [0, 1, 1],
  ]

  const matrixProduct = (m1, m2) => {
    const result = new Array(3).fill().map((_) => new Array(3))
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        let sum = 0
        for (let k = 0; k < 3; k++) {
          sum = (sum + m1[row][k] * m2[k][col]) % MOD
        }
        result[row][col] = sum
      }
    }
    return result
  }

  const matrixExpo = (n) => {
    let expo = matrix
    for (let i = 1; i < n; i++) {
      expo = matrixProduct(expo, matrix)
    }
    return expo
  }

  if (n <= 2) return n
  const expo = matrixExpo(n - 2)
  // f(n) = expo[0][0] * f(2) + expo[0][1] * f(1) + expo[0][2] * p(2)
  return (expo[0][0] * 2 + expo[0][1] * 1 + expo[0][2] * 1) % MOD
}

// Approach 5: Matrix Exponentiation (time optimization, space/time trade off)
const numTilings_matrixExp_optimized = (n) => {
  // NOT WORKING
  // const numTilings = (n) => {
  const MOD = 1e9 + 7
  const matrix = [
    [1, 1, 2],
    [1, 0, 0],
    [0, 1, 1],
  ]

  const memo = []

  const matrixProduct = (m1, m2) => {
    const result = new Array(3).fill().map((_) => new Array(3))
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        let sum = 0
        for (let k = 0; k < 3; k++) {
          sum = (sum + m1[row][k] * m2[k][col]) % MOD
        }
        result[row][col] = sum
      }
    }
    return result
  }

  const matrixExpo = (n) => {
    if (memo[n]) return memo[n]

    let expo
    if (n === 1) expo = matrix
    else if (n % 2) expo = matrixProduct(matrixExpo(n - 1), matrix)
    else expo = matrixProduct(matrixExpo(n / 2), matrixExpo(n / 2))

    return (memo[n] = expo)
  }

  if (n <= 2) return n
  const expo = matrixExpo(n - 2)[0]
  // f(n) = expo[0] * f(2) + expo[1] * f(1) + expo[2] * p(2)
  return (expo[0] * 2 + expo[1] * 1 + expo[2] * 1) % MOD
}

// f(k) = f(k - 1) + f(k - 2) + 2 * p(k - 1) (Eq 1)
// p(k) = f(k - 2) + p(k - 1) (Eq 2)

// Na Eq 1, substituir k por k - 1
// f(k - 1) = f(k - 2) + f(k - 3) + 2 * p(k - 2) (Eq 3)

// Na Eq 2, mover p(k - 1) para o lado esquerdo
// p(k) - p(k - 1) = f(k - 2) (Eq 4)

// Na Eq 4, substituir k por k - 1
// p(k - 1) - p(k - 2) = f(k - 3) (Eq 5)

// Eq 1 - Eq 3
// f(k) - f(k-1) = f(k-1) + f(k-2) + 2 * p(k-1) - f(k-2) - f(k-3) - 2 * p(k-2)

// Simplificar
// f(k) - f(k-1) = f(k-1) - f(k-3) + 2 * (p(k-1) - p(k-2))

// Usar a Eq 5 para substituir p() na equação acima
// f(k) - f(k-1) = f(k-1) - f(k-3) + 2 * f(k-3) = f(k-1) + f(k-3)

// Mover -f(k-1) para o lado direito da equação
// f(k) = 2 * f(k-1) + f(k-3)

// Com essa nova fórmula, independente de p(), podemos aplicar todos os métodos
// acima. Abaixo a aplicaremos apenas ao DP top down otimizado

//Approach 6: Math optimization (Fibonacci sequence like)
// const numTilings_finonacci = (n) => {
const numTilings = (n) => {
  const MOD = 1e9 + 7

  if (n <= 2) return n

  let curr = 5 // f(3)
  let prev = 2 // f(2)
  let before = 1 // f(1)

  for (let k = 4; k <= n; k++) {
    const temp = prev
    prev = curr
    curr = (2 * curr + before) % MOD
    before = temp
  }
  return curr
}

n = 3
// Output: 5

// n = 1
// Output: 1

// n = 60

console.log(numTilings(n))
