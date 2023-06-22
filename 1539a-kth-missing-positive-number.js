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
const findKthPositive_brute = (arr, k) => {}

const findKthPositive_binSearch = (arr, k) => {}

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
