/**
 * Given an integer n, return a list of all possible full binary trees with
 * n nodes. Each node of each tree in the answer must have Node.val == 0.
 *
 * Each element of the answer is the root node of one possible tree. You may
 * return the final list of trees in any order.
 *
 * A full binary tree is a binary tree where each node has exactly 0 or
 * 2 children.
 *
 * Constraints:
 *    1 <= n <= 20
 */

class TreeNode {
  constructor(val, left, right) {
    this.val = val === undefined ? 0 : val
    this.left = left === undefined ? null : left
    this.right = right === undefined ? null : right
  }
}

// Programação dinâmica tendo como dimensão relevante o número de nós.
// Os nós de uma árvore binárias completas tem obrigatoriamente 0 ou 2 filhos,
// logo a árvore só pode ter número ímpar de nós. Podemos decompor o problema ao
// dividir os nós restantes (subtraído o nó raiz), n - 1, entre os lados
// esquerdos e direito. Devemos considerar ainda que cada ramo da árvore também
// deve ser uma árvore binária completa, logo as duas parcelas, esquerda e
// direita, também devem ser ímpares. Enquanto o lado esquerdo variar entre 1 e
// n - 2 nós, com incrementos de 2 unidades para manter o número ímpar de nós,
// o lado direito variará de n - 2 a 1. As árvores resultantes serão compostas
// pela raiz e todas as (n/2)^2 combinações de ramos esquerdos e direitos.
//

/**
 * @param {number} n
 * @return {TreeNode[]}
 */
var allPossibleFBT_topDown_DP = function (n) {
  if (n % 2 === 0) return []
  const memo = []

  const recurse = (n) => {
    if (n === 1) return [new TreeNode()]
    if (memo[n]) return memo[n]

    memo[n] = []
    for (let i = 1; i < n; i += 2) {
      const leftTrees = recurse(i)
      const rightTrees = recurse(n - 1 - i)

      for (const leftTree of leftTrees) {
        for (const rightTree of rightTrees) {
          root = new TreeNode(0, leftTree, rightTree)
          memo[n].push(root)
        }
      }
    }
    return memo[n]
  }

  return recurse(n)
}

/**
 * @param {number} n
 * @return {TreeNode[]}
 */
var allPossibleFBT_bottomUp_DP = function (numNodes) {
  if (numNodes % 2 === 0) return []
  const trees = new Array(numNodes + 1).fill().map((_) => [])
  trees[1] = [new TreeNode()]

  for (let currNumNodes = 3; currNumNodes <= numNodes; currNumNodes++) {
    for (let leftNumNodes = 1; leftNumNodes < currNumNodes; leftNumNodes += 2) {
      const rightNumNodes = currNumNodes - 1 - leftNumNodes
      for (const leftTree of trees[leftNumNodes]) {
        for (const rightTree of trees[rightNumNodes]) {
          trees[currNumNodes].push(new TreeNode(0, leftTree, rightTree))
        }
      }
    }
  }

  return trees[numNodes]
}

n = 7
// Expected:
// [
//   [0, 0, 0, null, null, 0, 0, null, null, 0, 0],
//   [0, 0, 0, null, null, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, null, null, null, null, 0, 0],
//   [0, 0, 0, 0, 0, null, null, 0, 0],
// ]

// n = 3
// Expected: [[0,0,0]]

console.log(allPossibleFBT_bottomUp_DP(n).length)
