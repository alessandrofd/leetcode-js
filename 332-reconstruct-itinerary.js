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

  // A função recursiva abaixo faz um backtracking implícito. Um aeroporto só é
  // incluído no resultado final quando não houver mais vôos saindo dele.
  // No entanto, há a possibilidade de chegarmos ao destino final e ainda haver
  // vôos que não foram usados no trajeto. Por definição estes vôos restantes
  // formarão um ciclo. Logo, quando a função recursiva retornar todos os vôos
  // partindo de um aeroporto serão visitados antes que ele possa ser incluído
  // no trajeto.

  // Por exemplo, se tivermos os seguintes vôos: [[Início, A], [A, Fim], [A, B],
  // [B, A]], o trajeto final será [Início, A, B, A, Fim] (desconsideramos o
  // ordenamento léxico no exemplo, os vôos serão processados na ordem em que
  // são apresentados). O resultado é construído em ordem inversa, do fim para o
  // Início. As primeiras chamadas à função recursiva serão Início, A e Fim.
  // Como não há vôos saindo de Fim, o incluímos no trajeto. Ao retornar para A
  // constatamos que ainda há vôos saindo de lá, especificamente para B. Logo,
  // as próximas chamadas à função recursiva serão B e A. Ao chegar em A pela
  // segunda vez percebemos que todos os vôos sainda de lá (Fim e B) já foram
  // utilizados, logo podemos incluir A no trajeto. Neste ponto todos os vôos
  // foram utilizados, logo a função recursiva retornará para B, A e Início,
  // incluindo cada um deles no trajeto nesta ordem.

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
  [
    [
      ['MUC', 'LHR'],
      ['JFK', 'MUC'],
      ['SFO', 'SJC'],
      ['LHR', 'SFO'],
    ],
    ['JFK', 'MUC', 'LHR', 'SFO', 'SJC'],
  ],
  [
    [
      ['JFK', 'SFO'],
      ['JFK', 'ATL'],
      ['SFO', 'ATL'],
      ['ATL', 'JFK'],
      ['ATL', 'SFO'],
    ],
    ['JFK', 'ATL', 'JFK', 'SFO', 'ATL', 'SFO'],
  ],
]

for (const func of funcs) {
  for (const [tickets, expected] of data) {
    console.log(_.isEqual(func(tickets), expected))
  }
}
