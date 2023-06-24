/**
 * You are installing a billboard and want it to have the largest height.
 * The billboard will have two steel supports, one on each side. Each steel
 * support must be an equal height.
 *
 * You are given a collection of rods that can be welded together. For example,
 * if you have rods of lengths 1, 2, and 3, you can weld them together to make
 * a support of length 6.
 *
 * Return the largest possible height of your billboard installation. If you
 * cannot support the billboard, return 0.
 *
 * Constraints:
 *    1 <= rods.length <= 20
 *    1 <= rods[i] <= 1000
 *    sum(rods[i]) <= 5000
 */

// DP com a diferença entre somatório da altura varas selecionadas para cada
// lado como dimensão. O valor armazenado é o do lado mais alto

// Condição base: Se varas selecionadas a diferença é zero e a altura também

// Transição: Cada nova vara pode ser utilizada ou não. Caso seja utilizada,
// pode ser do lado mais alto ou do mais baixa de cada uma das possibilidades
// anteriores. A cada diferença de altura dos lados, basta armazenar o maior
// valor (ou seja, o mais alto dentre os lados mais altos)

// Resultado: O valor associado a diferença 0 entre os lados.

/**
 * @param {number[]} rods
 * @return {number}
 */
var tallestBillboard = (rods) => {}

rods = [1, 2, 3, 6]
// Expected: 6

rods = [1, 2, 3, 4, 5, 6]
// Expected: 10

rods = [1, 2]
// Expected: 0

console.log(tallestBillboard(rods))
