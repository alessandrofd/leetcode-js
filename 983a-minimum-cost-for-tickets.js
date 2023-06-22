/**
 * You have planned some train traveling one year in advance. The days of the
 * year in which you will travel are given as an integer array days. Each day is
 * an integer from 1 to 365.
 *
 * Train tickets are sold in three different ways:
 *    a 1-day pass is sold for costs[0] dollars,
 *    a 7-day pass is sold for costs[1] dollars, and
 *    a 30-day pass is sold for costs[2] dollars.
 *
 * The passes allow that many days of consecutive travel.
 *
 *    For example, if we get a 7-day pass on day 2, then we can travel for 7
 *    days: 2, 3, 4, 5, 6, 7, and 8.
 *
 * Return the minimum number of dollars you need to travel every day in the
 * given list of days.
 *
 * Constraints:
 *    1 <= days.length <= 365
 *    1 <= days[i] <= 365
 *    days is in strictly increasing order.
 *    costs.length == 3
 *    1 <= costs[i] <= 1000
 */

/**
 * Em uma primeira análise, seria uma aplicação simples de programação dinâmica
 * em que a resposta seria um menor custo considerando o valor de face da
 * passagem e sua vigência. Por exemplo, o cálculo do custo de transporte no
 * dia 10 leva em consideração o custo da passagem diária mais o custo acumulado
 * do dia anterior, o custo da passagem semanal mais o custo da passagem no
 * dia 3 e o custo da passagem mensal (não há o que somar neste caso final pois
 * ainda não completamos um mês).
 *
 * Como lidar com o fato de que ao calcular a melhor opção no futuro eu posso
 * alterar um cálculo anterior? A solução é o que consideramos de valor
 * acumulado conforme citado no parágrafo anterior. Se a cada dia processado
 * estipularmos qual a melhor solução até aquele dia, mesmo que no futuro
 * alternativas sejam tomadas que abranjam aquela data, a compra de um passe com
 * uma vigência que a compreenda, conseguiremos compartimentalizar a decisão
 * pela melhor opção naquele momento. Portanto, se comprarmos um passe mensal,
 * o valor acumulado a ser contabilizado será o da última data a não ser
 * atendida pelo passe - passe mensal utilizado em seu limite no dia 40,
 * por exemplo, terá sido adquirido no dia 11, logo, o valor acumulado a ser
 * utilizado no seu cálculo de vantajosidade será a da última data a partir do
 * dia 10.
 *
 * No entanto, o problema não nos dá apenas uma data final e espera que haja a
 * possibilidade de se viajar durante todo o período. A lista de dias pode
 * apresentar "buracos" entre si que potencialmente diminuem a efetividade das
 * passagens de mais longa vigência. Podemos resolver o problema considerando
 * o custo não apenas nos dias em que se viaja mas em todos os dias até a data
 * final. Vamos supor que tenhamos que viajar em duas datas, 10 e 40. Muito
 * embora os custos só serão efetivamente calculados nestas datas, todas
 * as demais, até o limite de 40, terão custos acumulados "herdados". Ou seja,
 * de 1 a 9 o custo será 0 e de 11 a 39 será o custo de se viajar no dia 10.
 * No caso do dia 10, considerando que há um custo crescente entre passes
 * iários, semanais e mensais, temos que avaliar o custo-efetividade de um passe
 * diário quando comparado com um semanal. Ao custo do passe diário será
 * acrescido o custo acumulado do dia anterior, zero, enquanto que ao do passe
 * diário será acrescido o custo do dia anterior ao da data de aquisição
 * do passe, um semana antes, ou seja, dia 3 - que também terá custo zero. Assim
 * conseguimos resolver a questão dos buracos nos dias de viagens. No cálculo
 * do dia 40, utilizaremos para selecionar o passe diário, semanal ou mensal,
 * os valores acumulados do dia 39, 33 e 10, respectivamente. Todos estes terão
 * o mesmo valor, o custo de se viajar no dia 10. Logo, a tendência é que
 * o passe diário seja o mais vantajoso.
 */

/**
 * @param {number[]} days
 * @param {number[]} costs
 * @return {number}
 */
const mincostTickets = (days, costs) => {}

days = [1, 4, 6, 7, 8, 20]
costs = [2, 7, 15]
// Output: 11

days = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 30, 31]
costs = [2, 7, 15]
// Output: 17

console.log(mincostTickets(days, costs))
