/**
 * There are n bulbs that are initially off. You first turn on all the bulbs,
 * then you turn off every second bulb.
 *
 * On the third round, you toggle every third bulb (turning on if it's off or
 * turning off if it's on). For the ith round, you toggle every i bulb. For
 * the nth round, you only toggle the last bulb.
 *
 * Return the number of bulbs that are on after n rounds.
 *
 * Constraints:
 *    0 <= n <= 10^9
 */

/**
 * Este problema foi feito para ter uma solução matemática, a pilha simplesmente
 * estoura se tentarmos um laço.
 *
 * A intuição para a resolução do problema é que as lâmpadas apenas permanecerão
 * acessas ao final se foram acionadas um número ímpar de vezes (já que iniciam
 * o problema todas desligadas).
 *
 * Como cada lâmpada é  acionada apenas em uma rodada que seja um fator seu,
 * temos que achar os números que tenham uma quantidade ímpar de fatores.
 *
 * Considerando o número n, se x for um de seus fatores, y = n/x também o será.
 * Caso x == y, n será um quadrado perfeito. Neste caso e apenas neste caso,
 * n terá uma quantidade ímpar de fatores, independente da quantidade destes
 * pois todos os demais x*y terão x != y.
 *
 * Portanto, o problemas reduz-se a encontrarmos a quantidade de quadrados
 * perfeitos dentre as rodadas. Como todas as rodadas são "jogadas" esta tarefa
 * torna-se simples, bastando calcularmos o maior quadrado perfeito menor ou
 * igual à quantidade de rodadas.
 */

// TLE
/**
 * @param {number} n
 * @return {number}
 */
const bulbSwitch_loop = (n) => {}

/**
 * @param {number} n
 * @return {number}
 */
const bulbSwitch_math = (n) => {}

n = 3
// Output: 1

// n = 0
// Output: 0

// n = 1
// Output: 1

// n = 4
// Output: 2

// n = 99999
// Output: 316

n = 99999999

// console.log(bulbSwitch_loop(n))
console.log(bulbSwitch_math(n))
