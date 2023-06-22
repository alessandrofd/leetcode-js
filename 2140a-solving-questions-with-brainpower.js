/**
 * You are given a 0-indexed 2D integer array questions where
 * questions[i] = [pointsi, brainpoweri].
 *
 * The array describes the questions of an exam, where you have to process
 * the questions in order (i.e., starting from question 0) and make a decision
 * whether to solve or skip each question. Solving question i will earn you
 * pointsi points but you will be unable to solve each of the next brainpoweri
 * questions. If you skip question i, you get to make the decision on the next
 * question.
 *
 * For example, given questions = [[3, 2], [4, 3], [4, 4], [2, 5]]:
 *
 *    If question 0 is solved, you will earn 3 points but you will be unable to
 *    solve questions 1 and 2.]
 *
 *    If instead, question 0 is skipped and question 1 is solved, you will earn
 *    4 points but you will be unable to solve questions 2 and 3.
 *
 * Return the maximum points you can earn for the exam.
 *
 * Constraints
 *    1 <= questions.length <= 10^5
 *    questions[i].length == 2
 *    1 <= pointsi, brainpoweri <= 10^5
 */

/**
 * Programação dinâmica, processando de trás para a frente com uma única
 * dimensão, a questão da prova
 * Caso base: dp[n-1] = points[n-1]
 * Transição: dp[i] = max(points[i] + dp[i + brainpower[i]], dp[i + 1])
 * Resultado final: dp[0]
 */

/**
 * @param {number[][]} questions
 * @return {number}
 */
const mostPoints = (questions) => {}

questions = [
  [3, 2],
  [4, 3],
  [4, 4],
  [2, 5],
]
// Expected: 5

questions = [
  [1, 1],
  [2, 2],
  [3, 3],
  [4, 4],
  [5, 5],
]
// Expected: 7

console.log(mostPoints(questions))
