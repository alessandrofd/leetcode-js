/**
 * Given the head of a linked list, return the node where the cycle begins.
 * If there is no cycle, return null.
 *
 * There is a cycle in a linked list if there is some node in the list that
 * can be reached again by continuously following the next pointer. Internally,
 * pos is used to denote the index of the node that tail's next pointer is
 * connected to (0-indexed). It is -1 if there is no cycle. Note that pos is not
 * passed as a parameter.
 *
 * Do not modify the linked list.
 *
 * Constraints:
 *
 *    The number of the nodes in the list is in the range [0, 10^4].
 *    -10^5 <= Node.val <= 10^5
 *    pos is -1 or a valid index in the linked-list.
 */

class ListNode {
  constructor(val) {
    this.val = val
    this.next = null
  }
}

const buildLinkedList = (arr, pos) => {
  if (!arr.length) return null

  const head = new ListNode(arr.shift())
  const indexedNodes = [head]

  let prev = head
  while (arr.length) {
    const node = new ListNode(arr.shift())
    indexedNodes.push(node)
    prev.next = node
    prev = node
  }

  if (pos >= 0) prev.next = indexedNodes[pos]
  return head
}

/**
 * Como não há garantia de que os valores armazenados nos nós não se repitam,
 * não podemos utilizá-los como chaves de identificação. Logo, uma solução
 * baseada em Sets ou Maps está descartada. Em outra linguagem de programção,
 * que dê acesso à memoria alocada a seus objetos, poderíamos utilizar esses en-
 * dereços de memória como chave.
 *
 * Para resolver o problema temos que utilizar dois ponteiros percorrenco
 * a lista a velocidades diferentes. Considerando as seguintes definições:
 *
 *    tartaruga = ponteiro lento, que avança uma posição a cada iteração
 *    lebre = ponteiro rápido, que avança duas posições por vez
 *    F = porção da lista Fora do ciclo
 *    C = porção da lista dentro do ciclo
 *
 * O problema pede para encontrarmos o F, ou seja, a entrada do ciclo.
 *
 * Se os ponteiros percorerrem a lista em suas respectivas velocidades e se a
 * lista tiver um ciclo, os ponteiros eventualmente se encontrarão. Vamos chamar
 * a distância entre o início do ciclo (F) e este ponto de encontro de intersec-
 * ção de "a". Ao se encontrarem os ponteiros terão percorrido as seguintes dis-
 * tâncias:
 *
 *    tartaruga = F + a
 *    lebre = F + nC + a, onde n é um inteiro
 *
 * como a lebre é duas vezes mais rápida que a tartaruga,
 *
 *    2(F + a) = F + nC + a => F + a = nC => F = (C - a) + (n - 1)C
 *
 * Se soltarmos nova tartaruga (ponteiro percorrendo uma única posição por
 * iteração) no início da lista , no tempo necessário para que percorra todo o
 * trecho da lista fora do ciclo (F), a tartaruga orignal percorrerá o que resta
 * para completar o ciclo a partir do ponto de intersecção (C - a) e um número
 * indeterminado de ciclos ((n - 1) * C) e parará justamente na entrada do ciclo.
 *
 * Logo, a solução do problema será das pelo ponto onde as duas tartarugas se
 * encontrarem
 */

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
const detectCycle = function (head) {}

arr = [3, 2, 0, -4]
pos = 1
// Output: tail connects to node index 1

arr = [1, 2]
pos = 0
// Output: tail connects to node index 0

arr = [1]
pos = -1
// Output: no cycle

arr = []
pos = -1

arr = [-1, -7, 7, -4, 19, 6, -9, -5, -2, -5]
pos = 6

arr = [1, 2]
pos = -1
// Output: null

head = buildLinkedList(arr, pos)
console.log(detectCycle(head)?.val ?? null)
