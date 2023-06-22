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
  const MOD = 1e9 + 7

  if (n <= 2) return n

  const complete = [, 1, 2]
  const partial = [, , 1]
  console.log(complete[1], complete[2], partial[2])

  const f = (k) => {
    if (complete[k]) return complete[k]
    return (complete[k] = (f(k - 1) + f(k - 2) + 2 * p(k - 1)) % MOD)
  }

  const p = (k) => {
    if (partial[k]) return partial[k]
    return (partial[k] = (f(k - 2) + p(k - 1)) % MOD)
  }

  return f(n)
}

// Approach 2: Dynamic Programming (Bottom-up)
const numTilings_DP_bottomUp = (n) => {
  // const numTilings = (n) => {
  const MOD = 1e9 + 7

  if (n <= 2) return n

  const complete = [, 1, 2]
  const partial = [, , 1]

  for (let k = 3; k <= n; k++) {
    complete[k] = (complete[k - 1] + complete[k - 2] + 2 * partial[k - 1]) % MOD
    partial[k] = (complete[k - 2] + partial[k - 1]) % MOD
  }

  return complete[n]
}

// Approach 3: Dynamic Programming (Bottom-up, space optimization)
const numTilings_DP_bottomUp_optimized = (n) => {
  // const numTilings = (n) => {
  const MOD = 1e9 + 7

  if (n <= 2) return n

  let prevComplete = 1
  let complete = 2
  let partial = 1

  for (let k = 3; k <= n; k++) {
    const temp = complete
    complete = (prevComplete + complete + 2 * partial) % MOD
    partial = (prevComplete + partial) % MOD
    prevComplete = temp
  }
  return complete
}

// Approach 4: Matrix Exponentiation
const numTilings_matrixExp = (n) => {
  // const numTilings = (n) => {
  const MOD = 1e9 + 7

  if (n <= 2) return n

  const initial = [[2, 1, 1]] // f(2), f(1), p(2)
  const trans = [
    [1, 1, 0],
    [1, 0, 1],
    [2, 0, 1],
  ]

  const mult = (m1, m2) => {
    const rows = m1.length
    const cols = m2[0].length
    const opers = m1[0].length

    const result = new Array(rows).fill().map((_) => new Array(cols).fill(0))

    for (let row = 0; row < rows; row++)
      for (let col = 0; col < cols; col++)
        for (let oper = 0; oper < opers; oper++)
          result[row][col] =
            (result[row][col] + m1[row][oper] * m2[oper][col]) % MOD

    return result
  }

  const exp = (matrix, n) => {
    let result = [...matrix]
    for (let i = 1; i < n; i++) result = mult(matrix, result)
    return result
  }

  return mult(initial, exp(trans, n - 2))[0][0]
}

// Approach 5: Matrix Exponentiation (time optimization, space/time trade off)
const numTilings_matrixExp_optimized = (n) => {
  // NOT WORKING
  // const numTilings = (n) => {
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

  let curr = 5 // n === 3
  let prev = 2 // n === 2
  let before = 1 // n == 1

  for (let i = 4; i <= n; i++) {
    const temp = curr
    curr = (2 * curr + before) % MOD
    before = prev
    prev = temp
  }

  return curr
}

let n = 3
// Output: 5

// n = 1
// Output: 1

n = 60

console.log(numTilings(n))
console.log(numTilings_matrixExp(n))
console.log(numTilings_DP_bottomUp_optimized(n))
console.log(numTilings_DP_bottomUp(n))
console.log(numTilings_DP_topDown(n))
