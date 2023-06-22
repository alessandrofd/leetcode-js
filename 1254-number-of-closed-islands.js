/**
 * Given a 2D grid consists of 0s (land) and 1s (water).  An island is a maximal
 * 4-directionally connected group of 0s and a closed island is an island
 * totally (all left, top, right, bottom) surrounded by 1s.]
 *
 * Return the number of closed islands.
 *
 * Constraints:
 *    1 <= grid.length, grid[0].length <= 100
 *    0 <= grid[i][j] <=1
 */

/**
 * Podemos aplicar DSU e partir do princípio que todas as células das primeiras
 * e últimas linhas e colunas estão ligadas ao continentes. Agrupamos as demais
 * células e a resposta será a quantidade de grupos - 1, este um correspondendo
 * justamente às células ligadas ao continente. Precisamos linearizar a matriz,
 * que é a aplicação de uma equação simples sem qualquer problemas. No entanto,
 * mesmo após agruparmos todas as células, temos que revisitá-las para obter
 * a verdadeira raiz do seu grupo, pois é possível que haja encadeamentos
 * não resolvidos.
 */

/**
 * @param {number[][]} grid
 * @return {number}
 */
const closedIsland_borderAndMiddle = (grid) => {
  const rows = grid.length
  const cols = grid[0].length

  const parents = Array.from(new Array(rows * cols).keys())
  const sizes = new Array(rows * cols).fill(1)

  const find = (i) => {
    if (parents[i] === i) return i
    return (parents[i] = find(parents[i]))
  }

  const union = (i, j) => {
    i = find(i)
    j = find(j)

    if (i === j) return false

    if (sizes[i] >= sizes[j]) {
      parents[j] = i
      sizes[i] += sizes[j]
    } else {
      parents[i] = j
      sizes[j] += sizes[i]
    }
    return true
  }

  const flatten = (row, col) => col + row * cols

  for (let row of [0, rows - 1])
    for (let col = 0; col < cols; col++) union(0, flatten(row, col))

  for (let col of [0, cols - 1])
    for (let row = 0; row < rows; row++) union(0, flatten(row, col))

  for (let row = 1; row < rows - 1; row++) {
    for (let col = 1; col < cols - 1; col++) {
      if (grid[row][col] === 0) {
        index = flatten(row, col)
        if (grid[row - 1][col] === 0) union(index, flatten(row - 1, col))
        if (grid[row][col - 1] === 0) union(index, flatten(row, col - 1))
        if (grid[row][col + 1] === 0) union(index, flatten(row, col + 1))
        if (grid[row + 1][col] === 0) union(index, flatten(row + 1, col))
      }
    }
  }

  const groups = new Set([0])
  for (let row = 1; row < rows - 1; row++)
    for (let col = 1; col < cols; col++)
      if (grid[row][col] === 0) groups.add(find(flatten(row, col)))

  return groups.size - 1
}

/**
 * Uma melhoria que podemos aplicar é agrupar as células da matriz apenas com
 * as células que ficaram para trás, acima é à esquerda ao invés das quatro
 * células que a rodeiam. O efeito é o mesmo, não considerando o ganho em
 * processamento, pois a operação de agrupamento é transitiva. Neste caso, não
 * podemos isolar as bordas como fizemos na solução anterior. Logo, é possível
 * que as células ligadas ao continente pertençam a mais de um agrupamento.
 * Temos que contar todos os grupos e subtrair deste total aqueles ligados ao
 * continente, ao percorrer as células da borda.
 */

/**
 * @param {number[][]} grid
 * @return {number}
 */
const closedIsland_wholeGrid = (grid) => {
  const rows = grid.length
  const cols = grid[0].length

  const parents = Array.from(new Array(rows * cols).keys())
  const sizes = new Array(rows * cols).fill(1)

  const find = (i) => {
    if (parents[i] === i) return i
    return (parents[i] = find(parents[i]))
  }

  const union = (i, j) => {
    i = find(i)
    j = find(j)

    if (i === j) return false

    if (sizes[i] >= sizes[j]) {
      parents[j] = i
      sizes[i] += sizes[j]
    } else {
      parents[i] = j
      sizes[j] += sizes[i]
    }
    return true
  }

  const flatten = (row, col) => col + row * cols

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (grid[row][col] === 0) {
        index = flatten(row, col)
        if (row > 0 && grid[row - 1][col] === 0)
          union(index, flatten(row - 1, col))
        if (col > 0 && grid[row][col - 1] === 0)
          union(index, flatten(row, col - 1))
      }
    }
  }

  const groups = new Set()
  for (let row = 1; row < rows - 1; row++)
    for (let col = 1; col < cols - 1; col++)
      if (grid[row][col] === 0) groups.add(find(flatten(row, col)))

  for (let row of [0, rows - 1])
    for (let col = 0; col < cols; col++)
      if (grid[row][col] === 0) groups.delete(find(flatten(row, col)))

  for (let col of [0, cols - 1])
    for (let row = 0; row < rows; row++)
      if (grid[row][col] === 0) groups.delete(find(flatten(row, col)))

  return groups.size
}

/**
 * Uma última melhoria que podemos operar é ajustar a função de agrupamento
 * - union(i, j) - para que ela retorne se houve um agrupamento ou não. Isto
 * permite que subtraiamos do total de células de terra firma (os 0's)
 * a quantidade de agrupamentos, o que resultará na quantidade final de grupos.
 * Isto torna a segunda travessia da matriz restrita às células da borda
 * da matriz. Esta travesia ainda é  necessária para descobrirmos a quantidade
 * de grupos ligados ao continente, que será subtraído do valor total e
 * produzirá o resultado final,
 */

/**
 * @param {number[][]} grid
 * @return {number}
 */

const closedIsland_wholeGrid_reducedSet = (grid) => {
  const rows = grid.length
  const cols = grid[0].length

  const parents = Array.from(new Array(rows * cols).keys())
  const sizes = new Array(rows * cols).fill(1)

  const find = (i) => {
    if (parents[i] === i) return i
    return (parents[i] = find(parents[i]))
  }

  const union = (i, j) => {
    i = find(i)
    j = find(j)

    if (i === j) return false

    if (sizes[i] >= sizes[j]) {
      parents[j] = i
      sizes[i] += sizes[j]
    } else {
      parents[i] = j
      sizes[j] += sizes[i]
    }
    return true
  }

  const flatten = (row, col) => col + row * cols

  let count = 0
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (grid[row][col] === 0) {
        count++
        index = flatten(row, col)
        if (
          row > 0 &&
          grid[row - 1][col] === 0 &&
          union(index, flatten(row - 1, col))
        )
          count--
        if (
          col > 0 &&
          grid[row][col - 1] === 0 &&
          union(index, flatten(row, col - 1))
        )
          count--
      }
    }
  }

  const groups = new Set()

  for (let row of [0, rows - 1])
    for (let col = 0; col < cols; col++)
      if (grid[row][col] === 0) groups.add(find(flatten(row, col)))

  for (let col of [0, cols - 1])
    for (let row = 0; row < rows; row++)
      if (grid[row][col] === 0) groups.add(find(flatten(row, col)))

  return count - groups.size
}

grid = [
  [1, 1, 1, 1, 1, 1, 1, 0], // 0 - 7
  [1, 0, 0, 0, 0, 1, 1, 0], // 8 - 15
  [1, 0, 1, 0, 1, 1, 1, 0], // 16 - 23
  [1, 0, 0, 0, 0, 1, 0, 1], // 24 - 31
  [1, 1, 1, 1, 1, 1, 1, 0], // 32 - 39
]
// Output: 2

grid = [
  [0, 0, 1, 0, 0],
  [0, 1, 0, 1, 0],
  [0, 1, 1, 1, 0],
]
// Output: 1

grid = [
  [1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 1, 1, 0, 1],
  [1, 0, 1, 0, 1, 0, 1],
  [1, 0, 1, 1, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1],
]
// Output: 2

grid = [
  [0, 1, 1, 1, 0],
  [1, 0, 1, 0, 1],
  [1, 0, 1, 0, 1],
  [1, 0, 0, 0, 1],
  [0, 1, 1, 1, 0],
]
// Output: 1

grid = [
  [0, 0, 1, 1, 0, 1, 0, 0, 1, 0], // 0
  [1, 1, 0, 1, 1, 0, 1, 1, 1, 0], // 10
  [1, 0, 1, 1, 1, 0, 0, 1, 1, 0], // 20
  [0, 1, 1, 0, 0, 0, 0, 1, 0, 1], // 30
  [0, 0, 0, 0, 0, 0, 1, 1, 1, 0], // 40
  [0, 1, 0, 1, 0, 1, 0, 1, 1, 1], // 50
  [1, 0, 1, 0, 1, 1, 0, 0, 0, 1], // 60
  [1, 1, 1, 1, 1, 1, 0, 0, 0, 0], // 70
  [1, 1, 1, 0, 0, 1, 0, 1, 0, 1], // 80
  [1, 1, 1, 0, 1, 1, 0, 1, 1, 0], // 90
]
// Output: 5

console.log(closedIsland_borderAndMiddle(grid))
console.log(closedIsland_wholeGrid(grid))
console.log(closedIsland_wholeGrid_reducedSet(grid))
