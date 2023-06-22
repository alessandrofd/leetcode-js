/**
 * Given two integer arrays inorder and postorder where inorder is the inorder
 * traversal of a binary tree and postorder is the postorder traversal of the
 * same tree, construct and return the binary tree.
 *
 * Constraints:
 *    1 <= inorder.length <= 3000
 *    postorder.length == inorder.length
 *    -3000 <= inorder[i], postorder[i] <= 3000
 *    inorder and postorder consist of unique values.
 *    Each value of postorder also appears in inorder.
 *    inorder is guaranteed to be the inorder traversal of the tree.
 *    postorder is guaranteed to be the postorder traversal of the tree.
 */

class TreeNode {
  constructor(val, left, right) {
    this.val = val === undefined ? 0 : val
    this.left = left === undefined ? null : left
    this.right = right === undefined ? null : right
  }
}

const destroyTree = (root) => {
  const array = []
  const queue = [root]
  while (queue.length) {
    const node = queue.shift()
    array.push(node ? node.val : null)
    if (!node || (!node.left && !node.right)) continue
    queue.push(node.left)
    queue.push(node.right)
  }
  return array
}

// Para construir a árvore temos que extrair os dados dos dois vetores
// simultaneamente em uma lógica preorder e construir a árvore a partir dela.
// Faremos isso ao identificar o valor da raiz e os trechos dos vetores que
// representam as subárvores que comporão a árvore final. Uma vez identificados,
// criaremos a raiz com seu valor e como nós filhos chamaremos recursivamente a
// função com os trechos dos vetores que descrevem a subárvore que desejamos
// construir, seja ela a da esquerda ou da direita, como argumentos.

// Para o valor da raiz utilizaremos o vetor postorder, que, por definição, terá
// a raiz como o seu último elemento. Em seguida, identificaremos no vetor
// inorder o índice do valor identificado. O trecho que antecede este índice
// corresponderá à subárvore à esquerda e o trecho seguinte (até o final
// do vetor) à da direita. De forma análoga, o vetor postorder será dividido em
// dois trechos contíguos, já que a raiz a ser descartada está ao seu final,
// tendo o índice como fronteira entre eles.

// No extremo, as folhas da árvore, após as recursões necessárias, serão
// consideradas raízes de árvores sem ramos válido. Logo, a condição de saída
// da recursão será quando a função receber vetores vazios.

/**
 * @param {number[]} inorder
 * @param {number[]} postorder
 * @return {TreeNode}
 */
const buildTree_slice = (inorder, postorder) => {
  if (!inorder.length) return null

  const root = postorder.at(-1)
  const i = inorder.indexOf(root)

  return new TreeNode(
    root,
    buildTree(inorder.slice(0, i), postorder.slice(0, i)),
    buildTree(inorder.slice(i + 1), postorder.slice(i, -1))
  )
}

// No algoritmo acima, a única coisa que precisamos do vetor inoder é a posição
// das raízes. Com um hash table dos nós para os seus índices no vetor inorder
// eliminamos a necessidade do vetor e passamos a percorrê-lo apenas uma vez.
// Também podemos evitar a criação de vetores a cada recursão, passando apenas
// os índices de início e fim das subárvores no vetor inorder. Neste caso,
// o critério de saída da recursão ser quando índice de início superior o de fim.

// Para obtermos a raiz a cada recursão, basta construirmos a árvore da direita
// para esquerda e mantermos um contador dos nós criados. Assim, a última
// posição do vetor postorder menos a quantidade de nós criados sempre
// corresponderá ao valor do nó a ser criado.

const buildTree_hash = (inorder, postorder) => {
  const n = inorder.length

  const map = new Map()
  let i = 0
  for (const node of inorder) map.set(node, i++)

  const recurse = (start, end) => {
    if (start > end) return null

    const rootVal = postorder[n - 1 - nodes]
    const root = new TreeNode(rootVal)
    nodes++

    const i = map.get(rootVal)
    root.right = recurse(i + 1, end)
    root.left = recurse(start, i - 1)

    return root
  }

  let nodes = 0
  return recurse(0, n - 1)
}

inorder = [9, 3, 15, 20, 7]
postorder = [9, 15, 7, 20, 3]
// Output: [3,9,20,null,null,15,7]

// inorder = [-1]
// postorder = [-1]
// Output: [-1]

console.log(destroyTree(buildTree_hash(inorder, postorder)))
