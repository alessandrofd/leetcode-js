/**
 * A teacher is writing a test with n true/false questions, with 'T' denoting
 * true and 'F' denoting false. He wants to confuse the students by maximizing
 * the number of consecutive questions with the same answer (multiple trues or
 * multiple falses in a row).
 *
 * You are given a string answerKey, where answerKey[i] is the original answer
 * to the ith question. In addition, you are given an integer k, the maximum
 * number of times you may perform the following operation:
 *
 *    Change the answer key for any question to 'T' or 'F' (i.e., set
 *    answerKey[i] to 'T' or 'F').
 *
 * Return the maximum number of consecutive 'T's or 'F's in the answer key after
 * performing the operation at most k times.
 *
 * Constraints:
 *    n == answerKey.length
 *    1 <= n <= 5 * 10^4
 *    answerKey[i] is either 'T' or 'F'
 *    1 <= k <= n
 */

/**
 * @param {string} answerKey
 * @param {number} k
 * @return {number}
 */
const maxConsecutiveAnswers_window_binSearch = (answerKey, k) => {}

const maxConsecutiveAnswers_sliding_window = (answerKey, k) => {}

answerKey = 'TTFF'
k = 2
// Expected: 4

answerKey = 'TFFT'
k = 1
// Expected: 3

answerKey = 'TTFTTFTT'
k = 1
// Expected: 5

answerKey = 'FFFTTFTTFT'
k = 3
// Expected: 8

console.log(maxConsecutiveAnswers_window_binSearch(answerKey, k))
console.log(maxConsecutiveAnswers_sliding_window(answerKey, k))
