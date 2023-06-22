/**
 * Given an array arr of positive integers sorted in a strictly increasing
 * order, and an integer k.
 *
 * Return the kth positive integer that is missing from this array.
 *
 * Constraints:
 *    1 <= arr.length <= 1000
 *    1 <= arr[i] <= 1000
 *    1 <= k <= 1000
 *    arr[i] < arr[j] for 1 <= i < j <= arr.length
 */

/**
 * @param {number[]} arr
 * @param {number} k
 * @return {number}
 */
const findKthPositive_brute = (arr, k) => {
  const n = arr.length

  const before = arr[0] - 1
  if (k <= before) return k

  k -= before

  const range = arr.at(-1) - arr[0] + 1
  let middle = range - n
  if (k > middle) return arr.at(-1) + k - middle

  for (let i = 1; i < n; i++) {
    if (arr[i] !== arr[i - 1] + 1) {
      const gap = arr[i] - arr[i - 1] - 1
      if (gap >= k) return arr[i - 1] + k
      else k -= gap
    }
  }
}

const findKthPositive_binSearch = (arr, k) => {
  // A quantidade de inteiros positivos que faltam antes de arr[i] é igual a
  // arr[i] - (i + 1)
  const n = arr.length

  let lo = 0
  let hi = n - 1
  while (lo <= hi) {
    const mid = Math.floor((lo + hi) / 2)
    if (arr[mid] - (mid + 1) < k) lo = mid + 1
    else hi = mid - 1
  }
  // Ao final do laço lo = hi + 1 e o k-ésimo elemento não presente estará
  // entre arr[hi] e arr[lo]
  // O número de elementos não presentes antes de arr[hi] é arr[hi] - (hi + 1)
  // O número a ser retornado é:
  //    arr[hi] + k - (arr[hi] - (hi + 1)) =>
  //    arr[hi] + k - arr[hi] + hi + 1 =>
  //    (hi + 1) + k => lo + k
  return lo + k
}

arr = [2, 3, 4, 7, 11]
k = 5
// Output: 9
// Explanation: The missing positive integers are [1,5,6,8,9,10,12,13,...].
// The 5th missing positive integer is 9.

arr = [1, 2, 3, 4]
k = 2
// Output: 6
// Explanation: The missing positive integers are [5,6,7,...].
// The 2nd missing positive integer is 6.

arr = [5, 6, 7]
k = 3
// Output: 3

arr = [1, 10, 21, 22, 25]
k = 12
// Output: 14

console.log(findKthPositive_brute(arr, k))
console.log(findKthPositive_binSearch(arr, k))
