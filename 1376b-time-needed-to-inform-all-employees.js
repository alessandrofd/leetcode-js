/**
 * A company has n employees with a unique ID for each employee from 0 to n - 1.
 * The head of the company is the one with headID.
 *
 * Each employee has one direct manager given in the manager array where
 * manager[i] is the direct manager of the i-th employee, manager[headID] = -1.
 * Also, it is guaranteed that the subordination relationships have a tree
 * structure.
 *
 * The head of the company wants to inform all the company employees of an
 * urgent piece of news. He will inform his direct subordinates, and they will
 * inform their subordinates, and so on until all employees know about
 * the urgent news.
 *
 * The i-th employee needs informTime[i] minutes to inform all of his direct
 * subordinates (i.e., After informTime[i] minutes, all his direct subordinates
 * can start spreading the news).
 *
 * Return the number of minutes needed to inform all the employees about
 * the urgent news.
 *
 * Constraints:
 *    1 <= n <= 10^5
 *    0 <= headID < n
 *    manager.length == n
 *    0 <= manager[i] < n
 *    manager[headID] == -1
 *    informTime.length == n
 *    0 <= informTime[i] <= 1000
 *    informTime[i] == 0 if employee i has no subordinates.
 *    It is guaranteed that all the employees can be informed.
 */

/**
 * @param {number} n
 * @param {number} headID
 * @param {number[]} manager
 * @param {number[]} informTime
 * @return {number}
 */
const numOfMinutes_dfs = (n, headID, manager, informTime) => {}

// No BFS podemos ter a impressão que basta pegar o maior tempo de um mesmo nível hierárquico. No entanto, isto não funciona, temos que verificar o tempo total de cada funcionários. Veja o 4o. exemplo em que temos no 5o nível 3 gerentes 1, 8 e 6 com tempos respectivos de 213, 261 e 975. No nível seguinte apenas o funcionário do gerente 8 também é um gerente com o tempo de 170. Logo, ao adotarmos os níveis hierárquicos como referência, adicionaremos o tempo máximo do 5o nível (do gerente 6) 975 e do 6o nível (gerente 5) 170. No entanto, o tempo necessário para percorrer o circuito 8 -> 5 -> 0 (este último, funcionário da equipe do gerente 5 que, por sua vez não é gerente) é de 261 + 170, valor inferior a 975. Logo, o valor 170 não deve ser adicionado ao tempo total o que invalida a solução orientada a níveis hierárquicos.

/**
 * @param {number} n
 * @param {number} headID
 * @param {number[]} manager
 * @param {number[]} informTime
 * @return {number}
 */
const numOfMinutes_bfs = (n, headID, managers, informTime) => {}

n = 1
headID = 0
manager = [-1]
informTime = [0]
// Expected: 0

n = 6
headID = 2
manager = [2, 2, -1, 2, 2, 2]
informTime = [0, 0, 1, 0, 0, 0]
// Expected: 1

n = 8
headID = 0
manager = [-1, 5, 0, 6, 7, 0, 0, 0]
informTime = [89, 0, 0, 0, 0, 523, 241, 519]
// Expected: 612

n = 11
headID = 4
manager = [5, 9, 6, 10, -1, 8, 9, 1, 9, 3, 4]
informTime = [0, 213, 0, 253, 686, 170, 975, 0, 261, 309, 337]
// Expected: 2560

console.log(numOfMinutes_dfs(n, headID, manager, informTime))
console.log(numOfMinutes_bfs(n, headID, manager, informTime))
