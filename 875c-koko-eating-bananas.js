/**
 * Koko loves to eat bananas. There are n piles of bananas, the ith pile has
 * piles[i] bananas. The guards have gone and will come back in h hours.
 *
 * Koko can decide her bananas-per-hour eating speed of k. Each hour, she
 * chooses some pile of bananas and eats k bananas from that pile. If the pile
 * has less than k bananas, she eats all of them instead and will not eat any
 * more bananas during this hour.
 *
 * Koko likes to eat slowly but still wants to finish eating all the bananas
 * before the guards return.
 *
 * Return the minimum integer k such that she can eat all the bananas within
 * h hours.
 *
 * Constraints:
 *    1 <= piles.length <= 10^4
 *    piles.length <= h <= 10^9
 *    1 <= piles[i] <= 10^9
 */

/**
 * O problema de ontem, 2187 - Minimum time to complete trips, utiliza um bin
 * search para determinar uma valor mínimo. Ele possui a vantagem de não ter que
 * ordenar a lista de valores fornecida, naquele caso os tempos necessários para
 * cada ônibus fazer uma viagem e neste o tamanho das pilhas de banana. A prin-
 * cípio conjecturei que a característica que tornava o problema propício para
 * aplicarmos uma bin search seria a independência dos elementos, pouco importa-
 * a ordem dos ônibus naquele problema como pouco importa a ordem das pilhas de
 * banana neste.
 *
 * A diferença entre os dois é que, no caso dos ônibus, os eventos poderiam
 * ocorrer simultâneamente, o que apenas enfatiza a independência da ordem dos
 * eventos que a solução tem. Aqui não há essa simultaneidade, o que na verdade
 * simplifica o problemas. Mas isso é irrelevante já que o critério de avaliação
 * na bin search era simplesmente se o tempo era suficiente para realizar todas
 * as viagens pedidas, ou neste caso consumir todas as pilhas de bananas. A im-
 * plementação do critério é distinta mas o resultado é o mesmo - se o tempo é
 * suficiente ou não.
 *
 * Temos que decidir qual o limite superior da busca, ou seja qual o pior caso.
 * Quanto aos ônibus, escolhemos o tempo necessário dos ônibus mais lentos faze-
 * rem todas as viagens pedidas. Aqui podemos escolher simplesmente
 * a maior pilha
 */

/**
 * @param {number[]} piles
 * @param {number} h
 * @return {number}
 */
const minEatingSpeed = (piles, h) => {}

piles = [3, 6, 7, 11]
h = 8
// Output: 4

// piles = [30, 11, 23, 4, 20]
// h = 5
// Output: 30

// piles = [30, 11, 23, 4, 20]
// h = 6
// Output: 23

console.log(minEatingSpeed(piles, h))
