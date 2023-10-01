/**
 * Given an array of n integers nums, a 132 pattern is a subsequence of three
 * integers nums[i], nums[j] and nums[k] such that i < j < k and
 * nums[i] < nums[k] < nums[j].
 *
 * Return true if there is a 132 pattern in nums, otherwise, return false.
 *
 * Constraints:
 *    n == nums.length
 *    1 <= n <= 2 * 10^5
 *    -10^9 <= nums[i] <= 10^9
 */

/**
 * @param {number[]} nums
 * @return {boolean}
 */
const find132pattern_brute_force = (nums) => {
  // Approach 1: brute force - TLE
}

/**
 * @param {number[]} nums
 * @return {boolean}
 */
const find132pattern_min = (nums) => {
  // Approach 2: better brute force - min - TLE
}

/**
 * @param {number[]} nums
 * @return {boolean}
 */
const find132pattern_intervals = (nums) => {
  // Approach 3: searching intervals - TLE
  // A ideia desta solução é armazenar intervalos do vetor que sejam
  // estritamente crescentes. À medida que o vetor é percorrido o primeiro passo
  // é incrementar a lista de intervalos e o segundo e comparar o valor corrente
  // com cada um dos intervalos de forma a garantir o padrão 132
}

/**
 * @param {number[]} nums
 * @return {boolean}
 */
const find132pattern_stack_prefix_min = (nums) => {
  // Pilha com prefixMin
  // Inicialmente criamos um vetor prefixMin ou seja um vetor que contém em
  // suas posições não o valor acumulado do vetor original até aquela posição,
  // como é o caso do prefixSum, mas o valor mínimo do vetor original até a
  // posição em questão. Estes mínimos serão o primeiro valor do padrão 132.
  // Como o problema pede apenas a existência do padrão e não os padrões
  // propriamente ditos, o vetor prefixMin apresentará a melhor alternativa
  // possível para o a primeira posição do padrão sem considerar se há outras
  // alternativas viáveis.
  //
  // Em seguida o vetor é percorrido de trás para frente e os valores são
  // empilhados. A pilha conterá o último valor do padrão 132. Logo, antes do
  // valor ser empilhado 2 verificações são necessárias. Primeiro, caso o valor
  // no topo da pilha seja menor que o valor mínimo naquela posição, dado pelo
  // prefixMin, ele deve ser desempilhado e descartado, até que obtenhamos um
  // valor no topo da pilha que seja maior que o valor mínimo. Essa situação é
  // possível pois o valor empilhado pode ter diso o valor mínimo do vetor em
  // posições anteriores. Em seguida, caso o valor corrente, que corresponderá
  // ao segundo elemento do padrão 132, seja maior que o valor no topo da pilha,
  // estará configurado o padrão, formado, respectivamente, pelo valor do
  // prefixMin, o valor corrente e o valor no topo da pilha.
}

/**
 * @param {number[]} nums
 * @return {boolean}
 */
const find132pattern_stack = (nums) => {
  // Pilha com uma única passagem pelo vetor
  // Qualquer que seja a solução do problema, ela deve ter no mínimo duas
  // comparações. O esforço de otimização da solução é a redução de quantidade
  // de vezes que os vetores são percorridos. Na solução força bruta eles são
  // percorridos 3 vezes, na verdade potencialmente mais que três vez já que a
  // cada iteração de um laço externo o laço interno é potencialmente percorrido
  // do ponto  do laço externo até o final. Na solução de pilha com o prefixMin,
  // o vetor é percorrido uma vez para se construir o prefixMin e outra
  // parcialmente até que se encontre o padrão procurado ou completa quando o
  // padrão não estiver presente.
  //
  // Estas otimizações são possíveis porque o problema pede apenas para
  // determinarmos se o padrão 132 está presente na sequência de números ou não,
  // sem se importar com o padrão propriamente dito. Logo, a solução pode
  // trabalhar com as situaçõe mais propícias para a formação do padrão. No caso
  // do prefixMin, utilizamos o valor mínimo do vetor a cada posição como
  // candidato ao primeiro elemento do padrão. Podemos melhorar ainda mais a
  // solução se, ao invés de calcularmos antecipadamente os valores extremos do
  // vetor, seja ele qual for, nós o calcularmos à medida que percorremos o
  // vetor por um única vez.
  //
  // A utilização da pilha é necessária pois ela guarda em si o ordenamento dos
  // valores percorridos e não utilizados para a solução do problema, até que se
  // tornem necessários. Por exemplo, na solução com o prefixMin a pilha
  // armazenará todos os valores percorridos e o último valor empilhado
  // representará o último elemento no padrão 132. Para que se amplie a
  // oportunidade de encontrarmos a peça que falta ao padrão, o '3', ou seja o
  // maior valor no padrão, a pilha deverá ter em seu topo o menor valor dentre
  // os percorridos que seja maior que o valor mínimo do vetor na posição
  // corrente.  No entanto, à medida que o vetor é percorrido é possível que o
  // valor mínimo do vetor aumente (jamais diminuirá devido ao próprio conceito
  // do prefixMin). Neste caso, os valores devem ser desempilhados até que a
  // relação entre o valor empilhado e o valor mínimo se reestabeleça ou a pilha
  // seja completamente consumida.
  //
  // A solução abaixo procurará otimizar, para efeitos da identificação da
  // existência do padrão na sequência de valores, o último elemento. Para
  // tanto, a pilha armazenará o elemento central, o '3' do padrão '132'. Todo
  // valor é empilhado, mas antes que o sejam, da mesma forma que ocorreu com a
  // solução com o prefixMin, duas comparações devem ser feitas. Estas
  // comparações são aquelas que afirmamos anteriormente serem necessárias para
  // a solução do problema.
  //
  // A primeira será entre o valor corrente e o candidato a último elemento do
  // padrão. Caso o valor seja menor, identificamos a existência do padrão. Isto
  // porque inicializamos o candidato com um valor inferior à faixa de valores
  // permitidos na sequência e ele será atualizado apenas em decorrência da
  // próxima comparação.
  //
  // A segunda comparação verificará se o valor corrente é maior que o valor
  // armazenado na pilha, caso não esteje vazia. Lembremos que a pilha
  // armazenará o elemento central do padrão 132, ou seja o maior elemento
  // dentre os três. Logo, para maximar a possibilidade de se identificar o
  // padrão, a pilha deve conter sempre o maior valor do vetor. Portanto, os
  // valores da pilha que forem menores que o valor corrente serão desempilhados
  // (me parece que a pilha sempre terá apenas um elemento). No entanto, os
  // valores desempilhados não são simplesmente decartados. Eles são comparados
  // com o candidato a último elemento do padrão e caso sejam maiores o
  // substituirão. Desta forma, o último elemento será o maior possível, desde
  // que menor que o valor empilhado. Esta relação maximizará a possibilidade de
  // identificarmos a existência do padrão - que ocorrerá na primeira comparação
  // que vimos acima.
}

const funcs = [
  // find132pattern_brute_force,
  // find132pattern_min,
  // find132pattern_intervals,
  find132pattern_stack_prefix_min,
  find132pattern_stack,
]

const data = [
  [[1, 2, 3, 4], false],
  [[3, 1, 4, 2], true],
  [[-1, 3, 2, 0], true],
  [[-2, 1, -2], false],
]

for (const func of funcs) {
  for (const [nums, expected] of data) {
    console.log(func(nums) === expected)
  }
}
