/**
 * You are given the root of a binary tree containing digits from 0 to 9 only.
 *
 * Each root-to-leaf path in the tree represents a number.
 *
 * For example, the root-to-leaf path 1 -> 2 -> 3 represents the number 123.
 *
 * Return the total sum of all root-to-leaf numbers. Test cases are generated
 * so that the answer will fit in a 32-bit integer.
 *
 * A leaf node is a node with no children.
 *
 * Constraints:
 *    The number of nodes in the tree is in the range [1, 1000].
 *    0 <= Node.val <= 9
 *    The depth of the tree will not exceed 10.
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

/**
 * @param {TreeNode} root
 * @return {number}
 */
const sumNumbers_dfs = (root) => {}

const sumNumbers_bfs = (root) => {}

// Uma alternativa que economiza o espaço alocado pela pilha de recursão na
// solução usando DFS ou pela fila quando usamos BFS é o Morris Preorder
// Traversal. A ideia central a esta estratégia é dividir, a partir de uma raiz,
// a árvore em duas subárvores e conectar o final da subárvore à esquerda à raiz.
// Como resultado é possível atravessar toda a árvore de forma préordenada sem
// que seja necessário armazenar estados em variáveis externas.

// A travesia preordenada primeiro visita o nó à esquerda, em seguida a raiz e,
// por fim, o nó à direita. A cada iteração os nós visitados, esquerda e direita,
// assumem o papel de raiz e promovem a mesma ordem de travesia a partir de si.
// O problema concreto que o algoritmo procura resolver é como retornar à raiz
// depois de visitar o nó da esquerda (e a potencial subárvore da qual é raiz)
// já que a ligação entre eles é unidirecional. Para resolvê-lo, o nó à esquerda
// passa a ser considerado a raiz de uma subárvore. Antes mesmo que o nó seja
// processado, de acordo com as necessidades do problema que se deseja resolver,
// a subárvore que origina-se dele será percorrida, navegando-se sempre à
// direita, até que se atinja o seu último nó (aquele mais à direita).
// Por definição, este nó não terá um nó à sua direita. No entanto, o algoritmo
// o alterará para que ele aponte para a raiz orignal (a que antecede
// a subárvore).

// Tendo sido feita a ligação entre a subárvore e o nó raiz, o nó à esquerda da
// raiz assume o papel de raiz e passa a processar a subárvore à sua esquerda.
// Eventualmente chegaremos a uma folha da árvore. Esta folha constituirá uma
// subárvore de um único nó e como tal será alterada pelo algoritmo para apontar
// à direita para a sua raiz. Portanto, após o processamento desta folha, não
// sendo possível navegar à esquerda, o algoritmo navegará à direita e retornará
//  ao nó que a antecedeu, que passa a ser a raiz novamente. A rotina normal
// seria navegar ao nó da esquerda, considerá-lo uma subárvore, percorrê-lo em
// busca de seu último elemento e ligá-lo à raiz. No entanto, como isto já foi
// feito, o algoritmo rompe a ligação entre a subárvore à esquerda (neste caso
// específico a folha à esquerda) e a raiz, restaurando a subárvore ao seu
// estado original e navega para o nó à direita da raiz. Desta forma,
// o algoritmo cumpre o seu objetivo ao permitir a navegação dos nós à esquerda
// para os nós à direita da raiz sem a necessidade de armazenamento externo.

// Ilustramos a transição do lado esquerdo ao lado direito com o nó mais a
// esquerda da árvore, no entanto, podemos extrapolar a mesma lógica para
// qualquer subárvore no lugar deste nó. Após o processamento de seu último nó
// (aquele mais à direita e que antecede, no ordenamento da árvore, à raiz),
// o algoritmo retornará (por meio da ligação feita quando analizada todas
// a subárvore) à raiz, identificará que a subárvore já foi percorrida, romperá
// a ligação e navegará para o nó à direita.

// Há um caso especial que deve ser tratado à parte. O nó mais à direita
// da árvore não será alterado pelo algoritmo. Logo, após o seu processamento,
// caso seja uma folha, ou o processamento da subárvore à sua esquerda, ele não
// terá um nó à direita para navegar (afinal é o nó mais à direita da árvore),
// logo o algoritmo se encerrará

// No caso do problema em questão, dentro do algoritmo que descrevemos acima,
// que se restringe à percorrer a árvore, temos que que encaixar três operações
// distintas: incorporar o valor de um nó no número a ser somado à solução final,
// descartar os números de um ramo quando mudarmos de ramo (por meio de alguma
// forma de backtracking) e somar à solução final os números formados pelos
// caminhos da árvore que levam do sua raiz às suas folhas. Identificaremos
// o ponto de inserção no algoritmo de cada uma destas operações de trás
// para frente.

// Toda vez que atingirmos uma folha, o número formado pela caminho entre raiz
// da árvore e a folha deverá ser somado à solução final. Como vimos, as folhas
// são necessariament alteradas para que apontem à direita para o nó que se
// deseja navegar após percorrer toda a sua subárvore. Caso a folha esteja à
// esquerda, ela será uma subávore em si e apontará para o nó imediatamente
// superior a si. Caso esteja à direita, ela apontará para o nó imediatamente
// superior à raiz da subárvore a que pertence. Logo, a navegação ascendente
// parece ser o local ideal para indentificarmos as folhas da árvore. Sabemos
// que uma navegação foi ascendente quando o algoritmo tenta processar uma
// subárvore que já foi percorrida.

// A princípio, nos pareceu que toda navegação à direita seria uma navegação
// ascendente. Isto pois a navegação ascendente promove a transição dos nós à
// esquerda da raiz para os nós à direita. Ou seja, a navegação ascendete
// (sempre à direita) promove uma navegação descendente. No entanto, quando um
// nó possui um nó apenas à direita (não uma ligação, mas um nó de fato), haverá
// uma navegação à direita descendente isolada. Logo, toda navegação ascendente
// será à direita, mas nem toda navegação à direita será ascendente.

// Além das questões acima, nem toda navegação ascendente origina-se de uma
// folha. Por exemplo, o nó mais a direita de uma subárvore pode ter nós à sua
// esquerda. Logo, além da navegação ascendente, devemos verificar se o nó
// também não posui nós à esquerda.

// Como exceção à regra acima, quando o nó mais à direita da árvore for uma
// folha, não haverá uma navegação ascendente que nos permita identificá-lo,
// pois o algoritmo não o alterará, como vimos anteriormente. No entanto,
// podemos indetificar a situação quando após uma navegação à direita nos
// depararmos com um nó que não aponte para ninguém à direita (node.right == null),
// que é o mesmo critério de encerramento do algoritmo. Não temos que verificar
// se ele aponta para algum nó (ou subárvore) à esquerda, como no caso geral.
// Pois, se for esse o caso, após o processamento da subárvore à esquerda, o
// algoritmo navegará diretamente para o nó à sua direita, que é nulo e portanto
// encerrará o algoritmo. Cabe lembrar que a navegação ascendente se dá em três
// passos: navega-se para o nó imediatament superior à raiz da subárvore (neste
// caso, o nó mais à direita da árvore inteira), determina-se que a subárvore à
// esquerda já foi processado (justamente pela existência da ligação pela qual
// navegamos) e, por fim navega-se para o nó à direita da raiz (neste caso,
//  nulo). Logo, a navegação ascendente dá dois passos, um para cima e outro
// para baixo e para a direita. Portanto, não há uma navegação à direita isolada
// do nó mais à direita da árvore a não ser que seja uma folha.

// Todo movimento ascendente gera descarte de dígitos. O número de dígitos a serem
// descartados é igual ao comprimento do caminho entre o nó de onde se originou
// navegação ascendente e o destino, preservando-se o dígito correpondente à
// raiz, que comporá novos números com a subárvore à direita. O comprimento pode
// ser calculado tanto à medida em que novos nós do ramo são incorporados ou ao
// verificarmos que a subárvore já foi processada. Optaremos pela segunda
// alternativa.

// Por fim, incorporamos novos dígitos ao número que representará o caminho
// percorrido sempre que navegarmos de um nó para outro desde que seja no
// decorrer da primeira travesia. Na segunda travesia, em que há uma mudança de
// subárvores, o ajuste no número que virá se dará por meio do descarte dos
// dígitos da subárvore anterior e não pela incorporação de novo dígito.

const sumNumbers_morris = (root) => {}

arr = [1, 2, 3]
// Output: 25

arr = [4, 9, 0, 5, 1]
// Output: 1026

arr = [1, null, 5]
// Output: 15

root = buildTree(arr)
console.log(sumNumbers_dfs(root))
console.log(sumNumbers_bfs(root))
console.log(sumNumbers_morris(root))
