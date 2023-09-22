/**
 * Given two sorted arrays nums1 and nums2 of size m and n respectively, return
 * the median of the two sorted arrays.
 *
 * The overall run time complexity should be O(log (m+n)).
 *
 * Constraints:
 *    nums1.length == m
 *    nums2.length == n
 *    0 <= m <= 1000
 *    0 <= n <= 1000
 *    1 <= m + n <= 2000
 *    -10^6 <= nums1[i], nums2[i] <= 10^6
 */

/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
const findMedianSortedArrays_merge_sort = (nums1, nums2) => {}

/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
const findMedianSortedArrays_binSearch = (nums1, nums2) => {
  /*
  Recursive Binary Search
  
  A busca binária proposta nesta solução funciona porque buscamos um elemento de 
  acordo com sua posição, no caso a mediana da união dos dois vetores. Não sei 
  se o algoritmo pode ser adaptado para testar a existência de um valor em um 
  dos dois vetores ordenados. 
  
  A solução é capaz de identificar um elemento pela sua posição. O problema pede 
  a mediana, o que pode envolver um único elemento, caso a soma da quantidade de 
  elementos das duas sequências seja ímpar, ou a média dos dois elementos 
  centrais da união ordenada das sequências, caso contrário.
  
  Para identificar o elemento procurado precisamos determinar qual sequência o 
  contém e qual a sua posição nela. O critério de saída da função recursiva nos 
  traz estes dois elementos. Como os parâmetros da função são os ponteiros que 
  delimitam as faixas das sequências ainda sob consideração (lo e hi), assim que 
  uma das faixas colapsar (lo >= hi) teremos os elementos necessários para a 
  solução. A sequência que ainda possuir uma faixa válida (lo < hi) conterá o 
  elemento procurado. A posição do elemento dentro da sequência válida será dada 
  pela pela posição procurada (target) subtraída dos elementos à esquerda da 
  sequência colapsada (lo).
  

  Para aplicar a busca binária calculamos o ponto central de ambas sequências e 
  os somamos. Quando comparamos este ponto central consolidado com a posição 
  procurada, não somos capazes de inferir a relação entre todos os elementos das 
  sequências e o valor procurado. Caso estivéssemos trabalhando com uma única 
  sequência ordenada, se a posição procurada estivesse à direita do ponto 
  central (target > mid) poderíamos afirmar que todos os elementos à esquerda do 
  ponto central são menores que o valor procurado. Como os elementos são 
  distribuídos em duas sequências sem qualquer relação entre si, não podemos 
  fazer tal afirmação. Entretanto, considerando que ambas sequências são 
  ordenadas, é garantido que o valor central de uma delas apresentará a relação 
  esperada. Portanto, caso o valor procurado esteja à direita do ponto central, 
  é certo que o menor valor central das duas sequências será menor que o valor 
  procurado. De forma análoga, se o valor procurado estiver à direita do ponto 
  central, o maior valor central será maior que o valor procurado.

  A partir destas relações podemos aplicar a lógica da busca binária à qual 
  estamos acostumados. A cada passo identificamos a sequência cujo segmento 
  oposto à posição procurada preserve a relação entre eles, de acordo com o 
  valor central da sequência. A partir daí ajustamos os ponteiros que marcam a 
  faixa sob análise da sequência de acordo com a posição do valor procurado em 
  relação ao ponto central consolidado das duas sequências. Se à direita, o 
  ponteiro à esquerda da sequência será atualizado (lo = mid + 1), se à 
  esquerda, o ponteiro da direita (hi = mid). Este processo é repetido até que a 
  faixa de uma das sequências seja completamente consumida (lo >= hi).
*/
}

/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
const findMedianSortedArrays_partitions = (nums1, nums2) => {
  /*
  A ideia deste algoritmo é dividir cada uma das sequências em duas partições. 
  A soma do comprimento das partições à esquerda deve ser igual à metade da soma 
  da quantidade de elementos de ambas sequências. As partições à esquerda devem 
  ter todos os seus elementos menores que as partições à direita. Essa relação é 
  garantida por definição entre as partições de uma mesma sequência, já que as 
  sequências são ordenadas. No entanto a relação cruzada requer que procuremos 
  pelo ponto ideal para particionar as sequências.

  Para identificar o correto ponto de partição na menor sequência
  utilizamos uma busca binária. Na medida em que o ponto de partição da
  menor sequência é alterado, também será alterado o ponto de partição da
  outra sequênica. Desta forma, a quantidade de elementos nas partições à
  esquerda permanece constante e igual à metade de todos os elementos.

  Uma vez a partição esteja correta, podemos extrair delas os valores 
  ecessários para o cálculo da mediana. O maior valor das partições à esquerda e 
  o menor das partições à direita, considerando que as partições são 
  caracterizadas pelos seus valores limítrofes, são usados. No caso de uma 
  quantidade de elementos ímpar, basta o valor das partições à esquerda. Caso 
  contrário, devemos fazer uma média entre os valores das partiçãoes à esquerda 
  e da direita.
  */
}

// prettier-ignore
const funcs = [
  // findMedianSortedArrays_merge_sort, 
  // findMedianSortedArrays_binSearch,
  findMedianSortedArrays_partitions,
]

const data = [
  [[1, 3], [2], 2.0],
  [[1, 2], [3, 4], 2.5],
  [[1, 3, 5], [2, 4, 6], 3.5],
  [[0, 0], [0, 0], 0],
  [[2], [], 2],
]

for (const func of funcs) {
  for (const [nums1, nums2, expected] of data) {
    console.log(func(nums1, nums2) === expected)
  }
}
