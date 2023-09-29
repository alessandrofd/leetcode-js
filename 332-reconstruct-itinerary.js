/**
 * You are given a list of airline tickets where tickets[i] = [fromi, toi]
 * represent the departure and the arrival airports of one flight. Reconstruct
 * the itinerary in order and return it.
 *
 * All of the tickets belong to a man who departs from "JFK", thus, the
 * itinerary must begin with "JFK". If there are multiple valid itineraries, you
 * should return the itinerary that has the smallest lexical order when read as
 * a single string.
 *
 *    For example, the itinerary ["JFK", "LGA"] has a smaller lexical order than
 *    ["JFK", "LGB"].
 *
 * You may assume all tickets form at least one valid itinerary. You must use
 * all the tickets once and only once.
 *
 * Constraints:
 *    1 <= tickets.length <= 300
 *    tickets[i].length == 2
 *    fromi.length == 3
 *    toi.length == 3
 *    fromi and toi consist of uppercase English letters.
 *    fromi != toi
 */

import _ from 'lodash'

/**
 * @param {string[][]} tickets
 * @return {string[]}
 */
const findItinerary = (tickets) => {
  const flights = new Map()
  for (const [departure, destination] of tickets) {
    if (!flights.has(departure)) flights.set(departure, [])
    flights.get(departure).push(destination)
  }

  for (const destinations of flights.values()) {
    destinations.sort().reverse()
  }

  const route = []

  /*
  Os vôos são processados na ordem alfabética de seus destinos. O critério de 
  retorno da função recursiva é o aeroporto visitado ser um destino final, 
  quando será incluído no itinerário. Um aeroporto só é considerado um destino 
  final se não houver vôo saindo dele ou, caso haja, quando todos já tiverem 
  sido usados. 
  
  No entanto, há a possibilidade de chegarmos a um destino final e ainda haver 
  vôos que não foram usados no trajeto. Isto se deve pela existência de ciclos 
  que foram ignorados em decorrência da ordem dos vôos imposta pelo problema 
  (ordem alfabética dos destinos). O ponto chave do problema, portanto, é não 
  permitir que haja ciclos que não foram percorridos.
  
  Logo, todos os vôos partindo de um aeroporto devem ser percorridos, o que, ao 
  término, o tornará um destino final. Apenas então poderá ser incluído no 
  itinerário. Note que um único aeroporto será visitado tantas vezes quanto 
  forem os vôos tendo-o como destino. Como a quantidade de vôos partindo dele é 
  controlada por uma estrutura fora da função recursiva, assim que tornar-se um 
  destino final todas as chamadas recursivas dele poderão retornar, incluindo-o 
  no itinerário na ordem em que foi empilhado. 

  Por exemplo, se tivermos os seguintes vôos: [[Início, A], [A, Fim], [A, B],
  [B, A]], o itinerário final será [Início, A, B, A, Fim] (desconsideramos o
  ordenamento léxico no exemplo, logo os vôos serão processados na ordem em que
  são apresentados). O resultado é construído em ordem inversa, do Fim para o
  Início. As primeiras chamadas à função recursiva serão Início, A e Fim.
  Como não há vôos saindo de Fim, o incluímos no itinerário, os demais 
  aeroportos permanecerão empilhados ([Início, A]). No entanto, ao retornar para 
  A constatamos que ainda há vôos saindo de lá, o que indica a existência de 
  ciclos ainda a serem percorridos. Logo, as próximas chamadas à função 
  recursiva serão B e A, destinos dos vôos [A, B] e [B, A], respectivamente. Ao 
  chegar em B, verificamos que ainda há o vôo para A a ser processado, logo não 
  podemos considerá-lo um destino final e portanto deve ser empilhado 
  ([Início, A, B]). Ao chegar em A pela segunda vez percebemos que todos os vôos 
  partindo de lá (Fim e B) já foram processados, logo A torna-se um destino 
  final e podemos incluí-lo no itinerário ([A, Fim]). Neste ponto todos os vôos 
  foram processado, logo a função recursiva retornará e cada um dos aeroportos 
  na pilha ([Início, A, B]) serão incluídos no itinerário na ordem inversa em 
  que foram empilhados.
  */

  const visit = (airport) => {
    while (flights.has(airport) && flights.get(airport).length > 0) {
      visit(flights.get(airport).pop())
    }
    route.push(airport)
  }

  visit('JFK')
  return route.reverse()
}

// prettier-ignore
const funcs = [
  findItinerary, 
]

const data = [
  // [
  //   [
  //     ['MUC', 'LHR'],
  //     ['JFK', 'MUC'],
  //     ['SFO', 'SJC'],
  //     ['LHR', 'SFO'],
  //   ],
  //   ['JFK', 'MUC', 'LHR', 'SFO', 'SJC'],
  // ],
  // [
  //   [
  //     ['JFK', 'SFO'],
  //     ['JFK', 'ATL'],
  //     ['SFO', 'ATL'],
  //     ['ATL', 'JFK'],
  //     ['ATL', 'SFO'],
  //   ],
  //   ['JFK', 'ATL', 'JFK', 'SFO', 'ATL', 'SFO'],
  // ],
  [
    [
      ['JFK', 'KUL'],
      ['JFK', 'NRT'],
      ['NRT', 'JFK'],
    ],
    ['JFK', 'NRT', 'JFK', 'KUL'],
  ],
  [
    [
      ['EZE', 'TIA'],
      ['EZE', 'HBA'],
      ['AXA', 'TIA'],
      ['JFK', 'AXA'],
      ['ANU', 'JFK'],
      ['ADL', 'ANU'],
      ['TIA', 'AUA'],
      ['ANU', 'AUA'],
      ['ADL', 'EZE'],
      ['ADL', 'EZE'],
      ['EZE', 'ADL'],
      ['AXA', 'EZE'],
      ['AUA', 'AXA'],
      ['JFK', 'AXA'],
      ['AXA', 'AUA'],
      ['AUA', 'ADL'],
      ['ANU', 'EZE'],
      ['TIA', 'ADL'],
      ['EZE', 'ANU'],
      ['AUA', 'ANU'],
    ],
    // prettier-ignore
    [ 'JFK', 'AXA', 'AUA', 'ADL', 'ANU', 'AUA', 'ANU', 'EZE', 'ADL', 'EZE', 'ANU', 'JFK', 'AXA', 'EZE', 'TIA', 'AUA', 'AXA', 'TIA', 'ADL', 'EZE', 'HBA', ],
  ],
]

for (const func of funcs) {
  for (const [tickets, expected] of data) {
    console.log(_.isEqual(func(tickets), expected))
  }
}
