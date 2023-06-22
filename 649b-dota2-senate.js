/**
 * In the world of Dota2, there are two parties: the Radiant and the Dire.
 *
 * The Dota2 senate consists of senators coming from two parties. Now the Senate
 * wants to decide on a change in the Dota2 game. The voting for this change is
 * a round-based procedure. In each round, each senator can exercise one of the
 * two rights:
 *
 *    Ban one senator's right: A senator can make another senator lose all his
 * rights in this and all the following rounds.
 *
 *    Announce the victory: If this senator found the senators who still have
 * rights to vote are all from the same party, he can announce the victory and
 * decide on the change in the game.
 *
 * Given a string senate representing each senator's party belonging.
 * The character 'R' and 'D' represent the Radiant party and the Dire party.
 * Then if there are n senators, the size of the given string will be n.
 *
 * The round-based procedure starts from the first senator to the last senator
 * in the given order. This procedure will last until the end of voting. All
 * the senators who have lost their rights will be skipped during the procedure.
 *
 * Suppose every senator is smart enough and will play the best strategy for his
 * own party. Predict which party will finally announce the victory and change
 * the Dota2 game. The output should be "Radiant" or "Dire".
 *
 * Constraints:
 *  n == senate.length
 *  1 <= n <= 10^4
 *  senate[i] is either 'R' or 'D'.
 */

/**
 * A solução baseia-se em uma fila com duas abordagens para administrá-la.
 * Na primeira - mais direta e menos elegante - entram na fila apenas
 * os senadores que ainda não foram banidos e quando não houver mais senadores
 * do partido oposto, o vencedor é declarado. Para tanto, é necessário
 * contabilizar a quantidade total de senadores e de senadores banidos em cada
 * partido.
 *
 * Na segunda solução, a fila já é formada a partir da sequência de votação
 * dos senadores. Um senador poderá lançar o seu voto apenas se tiver sido
 * banido anteriormente. A forma de controlar os votos (ou melhor, banimentos) é
 * por meio de uma pilha. Logo, se o senator for elegível a votar nós o
 * colocamos na pilha. Se o próximo senador for do mesmo partido, ele também
 * será empilhado. No entanto, se for do partido oposto, este último senador não
 * será empilhado (sendo efetivamente banido). O senador que o baniu, o último
 * da pilha, é retirado dela (pois já teve a oportunidade de votar) e é
 * enfileirado para novas rodadas de votação. Prosseguimos desta forma até que
 * a fila esteja vazia, o partido vencedor será o partido do senador que estiver
 * no topo da pilha - na verdade espera-se que a pilha final seja composto
 * apenas por senadores do mesmo partido.
 */

/**
 * @param {string} senate
 * @return {string}
 */
const predictPartyVictory_queue = (senate) => {}
/**
 * @param {string} senate
 * @return {string}
 */

const predictPartyVictory_stack = (senate) => {}

senate = 'RD'
// Expected: "Radiant"

senate = 'RDD'
// Expected: "Dire"

senate = 'DDRRR'
// Expected = 'Dire'

console.log(predictPartyVictory_stack(senate))
