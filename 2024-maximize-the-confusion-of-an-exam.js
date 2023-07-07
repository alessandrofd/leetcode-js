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
const maxConsecutiveAnswers_window_binSearch = (answerKey, k) => {
  const n = answerKey.length

  const isValidWindow = (windowLen) => {
    let countT = 0
    for (let i = 0; i < windowLen; i++) countT += answerKey[i] === 'T' ? 1 : 0

    if (countT <= k || countT >= windowLen - k) return true

    for (let i = windowLen; i < n; i++) {
      countT -= answerKey[i - windowLen] === 'T' ? 1 : 0
      countT += answerKey[i] === 'T' ? 1 : 0
      if (countT <= k || countT >= windowLen - k) return true
    }

    return false
  }

  let lo = 1
  let hi = n + 1
  while (lo < hi) {
    const mid = Math.floor((lo + hi) / 2)
    if (isValidWindow(mid)) lo = mid + 1
    else hi = mid
  }

  return lo - 1
}

const maxConsecutiveAnswers_sliding_window = (answerKey, k) => {
  const n = answerKey.length
  let maxWindow = 0
  let left = 0
  let countT = 0

  for (let right = 0; right < n; right++) {
    const window = right - left + 1
    countT += answerKey[right] === 'T' ? 1 : 0

    if (countT <= k || countT >= window - k) {
      // maxWindow = Math.max(maxWindow, window)
      maxWindow += 1
    } else {
      countT -= answerKey[left++] === 'T' ? 1 : 0
    }
  }

  return maxWindow
}

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
