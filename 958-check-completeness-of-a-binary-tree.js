/**
 * Given the root of a binary tree, determine if it is a complete binary tree.
 *
 * In a complete binary tree, every level, except possibly the last, is
 * completely filled, and all nodes in the last level are as far left as
 * possible. It can have between 1 and 2h nodes inclusive at the last level h.
 *
 * Constraints:
 *    The number of nodes in the tree is in the range [1, 100].
 *    1 <= Node.val <= 1000
 */

class TreeNode {
  constructor(val, left, right) {
    this.val = val === undefined ? 0 : val
    this.left = left === undefined ? null : left
    this.right = right === undefined ? null : right
  }
}

const buildTree = (array) => {
  if (!array || !array.length) return null

  const root = new TreeNode(array.shift())
  const queue = [root]

  while (array.length) {
    const leftVal = array.shift()
    const rightVal = array.shift() ?? null
    const node = queue.shift()
    if (node) {
      if (leftVal !== null) {
        node.left = new TreeNode(leftVal)
        queue.push(node.left)
      }
      if (rightVal !== null) {
        node.right = new TreeNode(rightVal)
        queue.push(node.right)
      }
    }
  }
  return root
}

// O problema pede uma avaliação da árvore nível a nível, logo a estratégia mais
// adequada é o BFS. O desafio aqui é desobrir em um determinado nível da árvore,
// onde ocorre o primeiro valor nulo e se á valores válidos após ele, seja no
// mesmo nível seja em níveis subsequentes.

// O primeiro passo é enfileirar os nós de um mesmo nível. Para tanto, criamos
// uma fila, inicialmente contento apenas a raiz. A cada nível extraímos da fila
// 2^n nós, onde n é o nível da fila, começando com 0. Assim que identificarmos
// o primeiro valor nulo, a fila não poderá conter mais valores válidos.
// Além disso, os valores já extraídos não podem conter valores válidos em
// níveis subsequentes.

// Como o primeiro valor nulo de uma árvore completa impede que os próximos
// valores não só daquele nível sejam válidos, mas de todos os níveis
// subsequentes, não precisamos analisar a árvore nível a nível. A fila pode ser
// um stream de valores ao encadearmos um nível após o outro.

/**
 * @param {TreeNode} root
 * @return {boolean}
 */

//  Análise nível a nível - ineficiente
const isCompleteTree_BFS_nivel = (root) => {
  let queue = [root]
  let level = 0
  while (queue.length) {
    const newQueue = []
    let nullFound = false

    for (let i = 0; i < 2 ** level; i++) {
      const { left, right } = queue.shift()
      for (const node of [left, right]) {
        if (node) {
          if (nullFound) return false
          else newQueue.push(node)
        } else {
          nullFound = true
        }
      }
    }

    if (nullFound) {
      for (const node of newQueue) if (node.left || node.right) return false
      return true
    }

    queue = newQueue
    level++
  }

  return true
}

const isCompleteTree_BFS_stream = (root) => {
  let nullFound = false
  let queue = [root]
  while (queue.length) {
    const node = queue.shift()
    if (node) {
      if (nullFound) return false
      queue.push(node.left)
      queue.push(node.right)
    } else {
      nullFound = true
    }
  }
  return true
}

// Quando convertemos uma árvore binária em um vetor, as posições dos nós à
// esquerda e a direita de um nó de índice 'i' são, respectivamente, 2*i + 1 e
// 2*i + 2. Logo, desde que conheçamos o seu índice, podemos determinar a
// posição do nó no vetor. Consequentemente, o maior índice coincidirá com o
// tamanho do vetor para armazenar a árvore. Entretanto, esta forma de armazenar
// a árvore requer que os nós nulos também sejam representados no vetor.
// Portanto, caso o vetor seja maior que o número de nós na árvore, a árvore
// não será completa.

// Em primeiro lugar devemos percorrer a árvore para determinar a quantidade de
// nós que ela possui. Em seguida determinamos se o vetor necessário para
// armazená-la é maior que sua quantidade de nós. Para tanto, basta comparar o
// índice de cada nó, de acordo com a fórmula acima, com a quantidade de nós.
// Caso o índice seja maior, a árvore não será completa.

// Com o índice de um nó é sempre calculado em função do índice do nó pai,
// podemos utilizar uma estratégia de DFS e percorrer a árvore recursivamente

const isCompleteTree_DFS = (root) => {
  const countNodes = (node) => {
    if (!node) return 0
    return 1 + countNodes(node.left) + countNodes(node.right)
  }

  const numNodes = countNodes(root)

  const dfs = (node, i) => {
    if (!node) return true
    if (i >= numNodes) return false
    return dfs(node.left, 2 * i + 1) && dfs(node.right, 2 * i + 2)
  }

  return dfs(root, 0)
}

arr = [1, 2, 3, 4, 5, 6]
// Output: true

arr = [1, 2, 3, 4, 5, null, 7]
// Output: false

arr = [1, 2, 3, 4, 5, 6, null, 8]
// Output: false

const root = buildTree(arr)
console.log(isCompleteTree_BFS_stream(root))
