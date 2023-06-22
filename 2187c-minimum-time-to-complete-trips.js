/**
 * You are given an array time where time[i] denotes the time taken by the ith
 * bus to complete one trip.
 *
 * Each bus can make multiple trips successively; that is, the next trip can
 * start immediately after completing the current trip. Also, each bus operates
 * independently; that is, the trips of one bus do not influence the trips of
 * any other bus.
 *
 * You are also given an integer totalTrips, which denotes the number of trips
 * all buses should make in total. Return the minimum time required for all
 * buses to complete at least totalTrips trips
 *
 * Constraints:
 *    1 <= time.length <= 10^5
 *    1 <= time[i], totalTrips <= 10^7
 */

/**
 * Como o problema não garantiu que cada ônibus tenha tempo de viagem distinto
 * e tampouco que eles estariam ordenados, o primeiro passo é agrupá-lo por seu
 * tempo de viagem e ordenar os tempos.
 *
 * Se criarmos uma fila de prioridade mínima tendo como índice o tempo
 * necessário para a viagem multiplicado pela quantidade de viagens e quantidade
 * de ônibus associados a este tempo como payload. Podemos simplesmente ter um
 * laço que debite da quantidade de viagens necessárias os ônibus de cada um
 * destes tempos. Quando superarmos a quantidade de viagens o tempo,
 * multiplicado pela quantidade de viages será a solução.
 *
 * ***TLE***
 */

import { MinPriorityQueue } from '@datastructures-js/priority-queue'
/**
 * @param {number[]} times
 * @param {number} totalTrips
 * @return {number}
 */
const minimumTime_priorityQueue = (times, totalTrips) => {}

/**
 * Quais são as características que nos levam a escolher um binSearch?
 * Talvez a independência entre os valores.
 */

/**
 * @param {number[]} times
 * @param {number} totalTrips
 * @return {number}
 */
const minimumTime_binSearch = (times, totalTrips) => {}

let time = [1, 2, 3]
let totalTrips = 5
// Output: 3

time = [2]
totalTrips = 1
// Output: 2

// time = [2, 3, 9]
// totalTrips = 7
// 2 4 6 8 10
// 3 6 9 12
// 9 18 27

console.log(minimumTime_priorityQueue(time, totalTrips))
console.log(minimumTime_binSearch(time, totalTrips))
