/**
 * You are given an integer array nums. Two players are playing a game with this
 * array: player 1 and player 2.]
 *
 * Player 1 and player 2 take turns, with player 1 starting first. Both players
 * start the game with a score of 0. At each turn, the player takes one of the
 * numbers from either end of the array (i.e., nums[0] or nums[nums.length - 1])
 * which reduces the size of the array by 1. The player adds the chosen number
 * to their score. The game ends when there are no more elements in the array.
 *
 * Return true if Player 1 can win the game. If the scores of both players are
 * equal, then player 1 is still the winner, and you should also return true.
 * You may assume that both players are playing optimally.
 *
 * Constraints:
 *    1 <= nums.length <= 20
 *    0 <= nums[i] <= 10^7
 */

/**
 * Na alternância entre jogadores, ao invés de mantermos duas pontuações
 * separadas, arbitramos que os pontos do jogador 1 são positivos e os do
 * jogador 2 negativos. Logo, basta mantermos o saldo de pontos, caso seja
 * positivo, o jogador 1 é o vencedor, caso contrário, o jogador 2 vencerá.
 * Além da economia de espaço, seja na solução recursiva ou na iterativa, esse
 * artifício torna desnecessário ter que controlar qual jogador o pontuação está
 * sendo calculada, basta subtrairmos o valor selecionado do cálculo anterior.
 */

/**
 * @param {number[]} nums
 * @return {boolean}
 */
const PredictTheWinner_top_down_dp = (nums) => {}

/**
 * O caso base da DP iterativa são as situações em que há apenas uma escolha,
 * ou seja, os índices à esquerda e à direita do subvetor contendo esta escolha
 * são iguais (left == right). A partir daí podemos iterar a diferença entre
 * estes índices de 1 a n-1. Na transição selecionamos a opção cujo valor
 * acumulado, número selecionado menos a melhor opção da oponente na rodada
 * anterior, for maior.
 *
 * O resultado final será dado pelo valor calculado quando tivermos todos os
 * valores disponíveis para o jogo, left == 0 e right == n - 1, armazenado em
 * dp[0][n - 1].
 *
 * Como exemplo, na primeira iteração em que right - left == 1, se o valor à
 * esquerda for escolhido, o valor acumulado será igual a
 * nums[left] - dp[left + 1][right], que é equivalente a
 * nums[left] - dp[right][right], ou nums[left] - nums[right]. O que
 * intuitivamente faz sentido, pois a primeira iteração corresponde à segunda
 * rodada do jogo, com um vetor de apenas 2 números. Logo, se o jogador 2
 * (o jogo começa com o jogador 1), escolheu o valor à esquerda,
 * obrigatoriamente o jogador 1 já teria escolhido o valor à direita. De forma
 * equivalente, se o valor à direita for escolhido, o valor acumulado, será
 * igual a nums[right] - nums[left]. O valor a ser armazenado em dp[left][right]
 * será o maior destes dois valores acumulados.
 *
 * As iterações seguintes seguem a mesma lógica. Basta considerar que para
 * calcular dp[left][right] temos que ter calculado previamente
 * dp[left + 1][right] e dp[left][right - 1]. Em outras palavras quando
 * calculamos o  melhor resultado de um jogo com vetor de comprimento n, temos
 * que ter calculado antes os melhores resultados dos dois jogos com vetores de
 * comprimento n - 1 que deram origem ao vetor atual - um sem o primeiro
 * elemento à esqueda [1 : n) e outro sem o último elemento à direita [0: n-1).
 *
 * Cabe lembrar que não estamos as pontuações dos jogadores mas sim o saldo
 * entre elas. Logo, a cada rodada subtraímos a melhor jogada do oponente na
 * rodada anterior. Desta forma, não sabemos exatamente de quem é a jogada a não
 * ser ao término do processamento, pois o jogador 1 sempre começará e terá à
 * sua disposição o vetor completo. Logo, o saldo do jogo, dp[0][n-1],
 * corresponderá ao saldo do jogador 1.
 */

/**
 * @param {number[]} nums
 * @return {boolean}
 */
const PredictTheWinner_bottom_up_dp = (nums) => {}

/**
 * Se considerarmos que left <= right, a matriz que utilizamos para armazenar os
 * saldos parciais do jogo é subutilizada. Precisamos apenas de sua diagonal
 * superior. Cada diagonal representa as melhores jogadas possíveis dada uma
 * diferença entre left e right. A diagonal principal (i == i) representa a
 * melhor jogada tendo apenas um elemento no vetor de números, ou seja,
 * dp[i][i] == nums[i], da mesma forma que na solução anterior. A diagonal
 * seguinte, que começa em dp[0][1] e termina em dp[n-2][n-1], conterá o saldo
 * das melhores jogadas com a diferença de 1 posição entre left e right, ou seja,
 * right - left = 1. Esta diagonal será uma unidada menor, para a acomodar a
 * diferença entre os índices, e requererá apenas a diagonal anterior para
 * calcular seus valores. Esta lógica se repete até que atinjamos a diferença
 * entre os índices de n - 1 e teremos uma diagonal contendo um único valor,
 * dp[0][n-1], que corresponderá ao saldo final do jogo.
 *
 * Portanto, a cada iteração calculamos uma diagonal da matriz. Como não
 * precisamos de toda a matriz para calculá-las, apenas da diagonal anterior,
 * podemos armazená-las em vetores distintos. O vetor original corresponderrá ao
 * caso base em que left == right, que na matriz corresponde à diagonal
 * principal, ou seja, dp[i][i] = nums[i]. Logo, o vetor original será igual ao
 * vetor nums. Se denominarmos este vetor de diag e new_diag o vetor
 * correspondente à nova diagonal, teremos a seguinte relação
 * new_diag[left] = max(nums[left] - diag[left + 1], nums[right] - diag[left]).
 * Como colapsamos uma diagonal de uma matriz em um vetor, transformando uma
 * strutura bidimensional em uma unidimensional, o saldo da jogada anterior em
 * que o número à esquerda é escolhido, que era armazenado em dp[left + 1][right]
 * será armazenado em diag[left + 1] e o saldo em que o número à direita é
 * escolhido será armazenado em diag[left].
 *
 * Podemos otimizar ainda mais o algoritmo utilizando um único vetor e
 * sobrescrevendo os valores que não são mais necessários.  Como diag[left] não
 * será utilizado nos cálculos subsequentes, podems sobrescrevê-lo, o que torna
 * new_diag desnecessário.
 */

/**
 * @param {number[]} nums
 * @return {boolean}
 */
const PredictTheWinner_bottom_up_dp_space_optimized = (nums) => {}

nums = [1, 5, 2]
// Expected: false

// nums = [1, 5, 233, 7]
// Expected: true

console.log(PredictTheWinner_top_down_dp(nums))
console.log(PredictTheWinner_bottom_up_dp(nums))
console.log(PredictTheWinner_bottom_up_dp_space_optimized(nums))
