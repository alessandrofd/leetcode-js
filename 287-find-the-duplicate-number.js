/**
 * Given an array of integers nums containing n + 1 integers where each integer
 * is in the range [1, n] inclusive.
 *
 * There is only one repeated number in nums, return this repeated number.
 *
 * You must solve the problem without modifying the array nums and uses only
 * constant extra space.
 *
 * Constraints:
 *    1 <= n <= 10^5
 *    nums.length == n + 1
 *    1 <= nums[i] <= n
 *    All the integers in nums appear only once except for precisely one integer
 *    which appears two or more times.
 */

/**
 * @param {number[]} nums
 * @return {number}
 */
const findDuplicate = (nums) => {
  /*
  A ideia é considerar o vetor uma lista encadeada é utilizar o método da 
  tartaruga e da lebre como no problema 142. Linked List Cycle II.

  Para converter o vetor em uma lista encadeada, consideramos o cada célula um 
  nó e o seu valor um ponteiro para o nó seguinte. Esta modelagem é possível 
  porque temos um vetor de comprimento n+1 com valores entre [1, n]. Logo, o 
  maior desta sequência apontará para uma posição válida no vetor. A cabeça da 
  lista encadeada será, por definição, nums[0].

  Como há um número repetido no vetor, quando o convertemos para uma lista 
  encadeada, a repetição traduz-se em um ciclo na lista. Logo, o problema 
  reduz-se a encontrar o início do ciclo.
  
  Ao utilizarmos dois ponteiros, um rápido, a lebre, ou outro devagar, a 
  tartaruga, eles inevitavelmente se encontraram dentro do ciclo. Nesta primeira 
  colisão, a tartaruga terá percorido uma distância de x enquanto que a lebre 2x. 
  A diferença entre as distâncias percorrida, x, será necessariamente um 
  múltiplo do comprimento do ciclo. No entanto, a primeira colisão não 
  necessariamente será no ponto de entrada do ciclo, ou seja, no número 
  repetido. Para tanto, temos que descobrir o ponto de uma segunda colisão.

  Suponhamos que a distância entre o início da lista e o início do ciclo seja 
  "a". Logo, a tartaruga, ainda estacionada no ponto da primeira colisão, estará 
  a uma distância de "x - a" do início do ciclo. Importarnte ressaltar que esta 
  distância é do início do ciclo e não do início da lista. Além disso, a 
  distância pode contemplar mais de uma volta pelo ciclo já que "x" é múltiplo e 
  não necessariamente o comprimento exato do ciclo. Se posicionarmos a lebre no 
  início da lista e progredirmos tanto ela como a tartaruga na mesma velocidade, 
  um passo a cada iteração, quando a lebre percorrer "a" passos, a tartaruga 
  terá percorrido "x - a + a" passos do início do ciclo. Como "x" é um múltiplo 
  do comprimento do ciclo, a tartaruga estará posicionada em seu início. Como, 
  por definição, "a" é a distâcia entre o início da lista e o início do ciclo, a 
  lebre, ao percorrer os mesmos "a" passos da tartaruga colidirá com ela no 
  início do ciclo.
   */
  const n = nums.length
  if (n <= 1) return -1

  let fast = nums[0]
  let slow = nums[0]
  do {
    fast = nums[nums[fast]]
    slow = nums[slow]
  } while (fast !== slow)

  fast = nums[0]
  while (fast !== slow) {
    fast = nums[fast]
    slow = nums[slow]
  }

  return slow
}

const funcs = [findDuplicate]

const data = [
  [[1, 3, 4, 2, 2], 2],
  [[3, 1, 3, 4, 2], 3],
]

for (const func of funcs) {
  for (const [nums, expected] of data) {
    console.log(func(nums) === expected)
  }
}
