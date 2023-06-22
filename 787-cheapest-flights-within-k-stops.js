/**
 * There are n cities connected by some number of flights. You are given an
 * array flights where flights[i] = [fromi, toi, pricei] indicates that there is
 * a flight from city fromi to city toi with cost pricei.
 *
 * You are also given three integers src, dst, and k, return the cheapest price
 * from src to dst with at most k stops. If there is no such route, return -1.
 *
 * Constraints:
 *    1 <= n <= 100
 *    0 <= flights.length <= (n * (n - 1) / 2)
 *    flights[i].length == 3
 *    0 <= fromi, toi < n
 *    fromi != toi
 *    1 <= pricei <= 10^4
 *    There will not be any multiple flights between two cities.
 *    0 <= src, dst, k < n
 *    src != dst
 */

/**
 * @param {number} n
 * @param {number[][]} flights
 * @param {number} src
 * @param {number} dst
 * @param {number} k
 * @return {number}
 */
// DFS - Sem memoization TLE
// Tentei memoization mas não foi possível pois ele retém apenas a alternativa
// mais barata de um trecho - o custo de se chegar ao destino a partir de uma
// parada específica. No entanto, a questão traz um segundo critério: a
// quantidade máxima de paradas. Como no momento do memoization de um trecho,
// não se sabe como ele será usado - pode ser que em determinadas circurstâncias
// o menor custo não seja conveniente devido à quantidade de paradas envolvidas,
// o memoization torna-se inviável. Veja caso de teste abaixo.
const findCheapestPrice_dfs = (n, flights, src, dst, k) => {
  const flightsByOrigin = new Array(n).fill().map((_) => [])
  for (const [origin, destination, price] of flights)
    flightsByOrigin[origin].push([destination, price])

  const visited = new Set([src])
  const cheapest = new Array(n).fill(Infinity)
  cheapest[dst] = 0

  const dfs = (stop, count) => {
    if (stop === 3) console.log(count)
    if (cheapest[stop] !== Infinity) return cheapest[stop]
    if (count > k) return Infinity

    for (const [nextStop, nextPrice] of flightsByOrigin[stop]) {
      if (visited.has(nextStop)) continue
      visited.add(nextStop)
      cheapest[stop] = Math.min(
        cheapest[stop],
        dfs(nextStop, count + 1) + nextPrice
      )
      visited.delete(nextStop)
    }

    return cheapest[stop]
  }

  dfs(src, 0)
  cheapest
  return cheapest[src] === Infinity ? -1 : cheapest[src]
}

const findCheapestPrice_bfs = (n, flights, src, dst, k) => {
  const flightsByOrigin = new Array(n).fill().map((_) => [])
  for (const [origin, destination, price] of flights)
    flightsByOrigin[origin].push([destination, price])

  const cheapest = new Array(n).fill(Infinity)

  const queue = [[src, 0]]
  let stops = 0
  while (stops <= k && queue.length) {
    let len = queue.length
    while (len--) {
      const [stop, price] = queue.shift()
      for (const [nextStop, nextPrice] of flightsByOrigin[stop]) {
        if (cheapest[nextStop] <= price + nextPrice) continue
        cheapest[nextStop] = price + nextPrice
        queue.push([nextStop, cheapest[nextStop]])
      }
    }
    stops++
  }
  return cheapest[dst] === Infinity ? -1 : cheapest[dst]
}

// Approach 2: Bellman Ford
/**
 * Como a questão coloca a condição de um número mínimo de paradas, não é
 * possível otimizar o algoritmo de Bellman Ford. Logo, a solução final
 * confunde-se com uma programação dinâmica otimizada para espaço.
 */
const findCheapestPrice_bellmanFord = (n, flights, src, dst, k) => {
  let cheapest = new Array(n).fill(Infinity)
  cheapest[src] = 0

  for (let i = 0; i <= k; i++) {
    const temp = [...cheapest]
    for (const [origin, destination, price] of flights) {
      temp[destination] = Math.min(temp[destination], cheapest[origin] + price)
    }
    cheapest = temp
  }

  return cheapest[dst] === Infinity ? -1 : cheapest[dst]
}

/*
Normalmente, o Dijkstra é otimizado ao se comprarar o custo total do trecho a ser processado com o custo máximo ou mínimo encontrado nas iterações anteriores. Considerando que um caminho anterior esteve mais próximo do que se pretende atingir (seja ele o valor máximo ou mínimo), não é necessário prosseguir analisando o caminho atual. No entanto, como o problema prevê que, além da minimização do custo atual, seja também respeitada a quantidade máxima de paradas, é possível que um caminho de custo mais baixo seja inviável devido à sua extensão. Logo, em situações em que o destino jamais será atingido, todos os caminhos possíveis devem analisados antes que se conclua que o destino é inalcançável. O que indica a necessidade de uma otimização que não se limite à comparação dos custos dos caminhos.

Para contornar essa dificuldade, o algoritmo é otimizado por meio da comparação entre as extenções dos caminhos. Os caminhos já são analisados de forma ordenada, de acordo com o seu custo, pela utilização da fila de priorização. Logo, independente de seu comprimento, os caminhos mais baratos sempre serão analisados primeiro, até que se atinja o destino ou se tornem inviáveis devido ao seu comprimento. Neste, segundo caso, os caminhos mais caros passam a ser considerados. No entanto, não é necessário analisar todos estes caminhos. Considerando que o grafo apresenta apenas pesos positivos (caso contrário sequer poderíamos aplicar Dijkstra) e que os caminhos mais baratos são analisados antes, apenas os caminhos mais curtos necessitam ser analisados, sendo os demais descartados.
*/

// Approach 3: Dijkstra
import { MinPriorityQueue } from '@datastructures-js/priority-queue'
const findCheapestPrice_dijkstra = (n, flights, src, dst, k) => {
  const flightsByOrigin = new Array(n).fill().map((_) => [])
  for (const [origin, destination, price] of flights)
    flightsByOrigin[origin].push([destination, price])

  const maxStops = new Array(n).fill(Infinity)

  const queue = new MinPriorityQueue({ priority: (element) => element.price })
  queue.enqueue({ stop: src, price: 0, countStops: 0 })

  while (!queue.isEmpty()) {
    const { stop, price, countStops } = queue.dequeue().element
    if (countStops > k + 1 || countStops > maxStops[stop]) continue
    maxStops[stop] = countStops
    if (stop === dst) return price
    for (const [nextStop, nextPrice] of flightsByOrigin[stop]) {
      queue.enqueue({
        stop: nextStop,
        price: price + nextPrice,
        countStops: countStops + 1,
      })
    }
  }
  return -1
}

let n = 4
let flights = [
  [0, 1, 100],
  [1, 2, 100],
  [2, 0, 100],
  [1, 3, 600],
  [2, 3, 200],
]
let src = 0
let dst = 3
let k = 1
// Output: 700

/* let n = 3
let flights = [
  [0, 1, 100],
  [1, 2, 100],
  [0, 2, 500],
]
let src = 0
let dst = 2
let k = 1
// Output: 200
 */

/*
let n = 3
let flights = [
  [0, 1, 100],
  [1, 2, 100],
  [0, 2, 500],
]
let src = 0
let dst = 2
let k = 0
// Output: 500
*/

/* 
let n = 10
let flights = [
  [3, 4, 4],
  [2, 5, 6],
  [4, 7, 10],
  [9, 6, 5],
  [7, 4, 4],
  [6, 2, 10],
  [6, 8, 6],
  [7, 9, 4],
  [1, 5, 4],
  [1, 0, 4],
  [9, 7, 3],
  [7, 0, 5],
  [6, 5, 8],
  [1, 7, 6],
  [4, 0, 9],
  [5, 9, 1],
  [8, 7, 3],
  [1, 2, 6],
  [4, 1, 5],
  [5, 2, 4],
  [1, 9, 1],
  [7, 8, 10],
  [0, 4, 2],
  [7, 2, 8],
]
let src = 6
let dst = 0
let k = 7
// Output: 14
 */

/* Caso de teste que demonstra a impossibilidade de se usar memoization com DFS.
O trecho 0 -> 1 -> 4 -> 2, com custo 7 é o valor correto. Assim, quando
aplicamos o memoization, o custo da parada 1 à parada 2 é guardado, pois todo
o trajeto obedece a quantidade máxima de paradas. No entanto, quando
analisamos o trajeto 0 -> 3 -> 1 -> 4 -> 2, ele é considerado válido pois a
análise para quando chegamos na parada 1 e não contamos todas as paradas até
chegar ao destino. Portanto, me parece que DFS c/ memoization não é adequado
para situações onde haja uma restrição de quantidade de passos até o destino
pretendido. E o DFS sem memoization tende a ser muito oneroso pois todos os
casos precisam ser analisados.
 */
/* let n = 5
let flights = [
  [0, 1, 5],
  [1, 2, 5],
  [0, 3, 2],
  [3, 1, 2],
  [1, 4, 1],
  [4, 2, 1],
]
let src = 0
let dst = 2
let k = 2
// Output: 7
 */

/* let n = 13
let flights = [
  [11, 12, 74],
  [1, 8, 91],
  [4, 6, 13],
  [7, 6, 39],
  [5, 12, 8],
  [0, 12, 54],
  [8, 4, 32],
  [0, 11, 4],
  [4, 0, 91],
  [11, 7, 64],
  [6, 3, 88],
  [8, 5, 80],
  [11, 10, 91],
  [10, 0, 60],
  [8, 7, 92],
  [12, 6, 78],
  [6, 2, 8],
  [4, 3, 54],
  [3, 11, 76],
  [3, 12, 23],
  [11, 6, 79],
  [6, 12, 36],
  [2, 11, 100],
  [2, 5, 49],
  [7, 0, 17],
  [5, 8, 95],
  [3, 9, 98],
  [8, 10, 61],
  [2, 12, 38],
  [5, 7, 58],
  [9, 4, 37],
  [8, 6, 79],
  [9, 0, 1],
  [2, 3, 12],
  [7, 10, 7],
  [12, 10, 52],
  [7, 2, 68],
  [12, 2, 100],
  [6, 9, 53],
  [7, 4, 90],
  [0, 5, 43],
  [11, 2, 52],
  [11, 8, 50],
  [12, 4, 38],
  [7, 9, 94],
  [2, 7, 38],
  [3, 7, 88],
  [9, 12, 20],
  [12, 0, 26],
  [10, 5, 38],
  [12, 8, 50],
  [0, 2, 77],
  [11, 0, 13],
  [9, 10, 76],
  [2, 6, 67],
  [5, 6, 34],
  [9, 7, 62],
  [5, 3, 67],
]
let src = 10
let dst = 1
let k = 10
// Output: -1
 */

// console.log(findCheapestPrice_dfs(n, flights, src, dst, k))
console.log(findCheapestPrice_bfs(n, flights, src, dst, k))
console.log(findCheapestPrice_bellmanFord(n, flights, src, dst, k))
console.log(findCheapestPrice_dijkstra(n, flights, src, dst, k))
