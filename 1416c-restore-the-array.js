/**
 * A program was supposed to print an array of integers. The program forgot to
 * print whitespaces and the array is printed as a string of digits s and all we
 * know is that all integers in the array were in the range [1, k] and there are
 * no leading zeros in the array.
 *
 * Given the string s and the integer k, return the number of the possible
 * arrays that can be printed as s using the mentioned program. Since the answer
 * may be very large, return it modulo 10^9 + 7.
 *
 * Constraints:
 *    1 <= s.length <= 10^5
 *    s consists of only digits and does not contain leading zeros.
 *    1 <= k <= 10^9
 */

/**
 * Recursão
 * O problema é decomposto é uma árvore onde cada nó representa um número
 * potencial. A função recursiva percorre a árvore até suas folhas o que
 * caracterizará uma vetor válido. Logo, a condição de saída da recursão é que
 * tenhamos encontrado uma folha, caso em que retornamos 1, ou que a substring
 * inicia com 0, o que não é permitido e, portanto, retornamos zero. No
 * processamento da função recursiva, percorremos a string linearmente, a partir
 * da posição passada para a função. A cada substring que produza um inteiro
 * válido (< k) chamamos a função recursiva com nova posição da string que marca
 * o final do inteiro válido. Para otimizar o algoritmo utilizamos um vetor
 * de memoization.
 */

/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
const numberOfArrays_dfs = (s, k) => {}

/**
 * Programação Dinâmica
 * Consideremos dp[i] a quantidade de vetores de inteiros válidos produzidos
 * pela substring de comprimento i da string original s. Logo, pretendemos que o
 * resultado final seja fornecido por dp[n], onde n é o comprimento da string s.
 * Neste caso dp[0] = 1, já que produzirá apenas um vetor vazio.
 *
 * Suponhamos que dp[start] seja conhecido. Ou seja, conhecemos a quantidade de
 * vetores de inteiros válidos formados pela substring s[0, start - 1]. Ao
 * iterarmos o índice end de start até n - 1, cada substring s[start, end] que
 * produzir um inteiro válido implica que todo vetor que pode ser produzido pela
 * substring s[0, start-1] também poderá ser produzido pela substring s[0, end],
 * bastando para tanto acresentar ao seu final o inteiro produzido pela substring
 * s[start, end]. Logo, acrescentamos dp[start] a dp[end] em cada um destes casos.
 *
 */

/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
const numberOfArrays_dp = (s, k) => {}

s = '1000'
k = 10000
// Output: 1

s = '1000'
k = 10
// Output: 0

s = '1317'
k = 2000
// Output: 8

console.log(numberOfArrays_dfs(s, k))
console.log(numberOfArrays_dp(s, k))
