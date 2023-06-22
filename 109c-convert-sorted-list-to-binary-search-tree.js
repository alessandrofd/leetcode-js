/**
 * Given the head of a singly linked list where elements are sorted in ascending
 * order, convert it to a height-balanced binary search tree.
 *
 * Constraints:
 *    The number of nodes in head is in the range [0, 2 * 10^4].
 *    -10^5 <= Node.val <= 10^5
 */

// Definition for singly-linked list.
class ListNode {
  constructor(val, next) {
    this.val = val === undefined ? 0 : val
    this.next = next === undefined ? null : next
  }
}

const buildLinkedList = (arr) => {
  if (!arr.length) return null

  const head = new ListNode(arr.shift())

  let prev = head
  while (arr.length) {
    const node = new ListNode(arr.shift())
    prev.next = node
    prev = node
  }
  return head
}

// Definition for a binary tree node.
class TreeNode {
  constructor(val, left, right) {
    this.val = val === undefined ? 0 : val
    this.left = left === undefined ? null : left
    this.right = right === undefined ? null : right
  }
}

const destroyTree = (root) => {
  if (!root) return null

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

// O primeiro passo é descobrir o "meio" da lista encadeada. Podemos fazer isso
// lendo a lista e colocando os seus elementos em um vetor.

// Em seguida construímos a árvore recursivamente ao selecionar o elemento
// central do vetor como um nó raiz e os trechos do vetor que este elemento
// separa serão os argumentos para a próxima iteração da recursão até que
// cheguemos a um único elemento.

/**
 * @param {ListNode} head
 * @return {TreeNode}
 */
const sortedListToBST_array = (head) => {}

// Na solução anterior precisamos criar um vetor de apoio para que pudéssemos
// acessar randômicamente os elementos da lista encadeada. No entanto, se
// respeitarmos a ordem dos valores na contrução da árvore binária, o vetor
// é desnecessário.

// Para tanto, partimos, da mesma forma que na solução anterior, do elemento
// central da lista. Logo, em primeiro lugar, devemos percorrer toda a lista
// para determinar o seu comprimento. Mas, neste caso, precisamos apenas do seu
// índice e não do nó propriamente dito. Para tanto, é preciso primeiro contruir
// integralmente o ramo da esquerda ao elemento central, então o nó que
// representará o elemento central e, por fim, o ramo da direita. A cada nó da
// árvore binária criada avançamos para o próximo nó da lista encadeada. A
// sincronia entre a criação da esqueda para a direita da árvore e o avanço na
// lista encadeada é o que torna o vetor de apoio desenecessário.

const sortedListToBST_noArray = (head) => {}

head = [-10, -3, 0, 5, 9]
// Output: [0, -3, 9, -10, null, 5]

// head = []
// Output: []

const list = buildLinkedList(head)
console.log(destroyTree(sortedListToBST_array(list)))
console.log(destroyTree(sortedListToBST_noArray(list)))
