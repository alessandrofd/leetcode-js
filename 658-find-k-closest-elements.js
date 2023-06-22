/**
 * Given a sorted integer array arr, two integers k and x, return the k closest
 * integers to x in the array. The result should also be sorted in ascending
 * order.
 *
 * An integer a is closer to x than an integer b if:
 *    |a - x| < |b - x|, or
 *    |a - x| == |b - x| and a < b
 *
 * Constraints:
 *    1 <= k <= arr.length
 *    1 <= arr.length <= 10^4
 *    arr is sorted in ascending order.
 *    -10^4 <= arr[i], x <= 10^4
 */

/**
 * @param {number[]} arr
 * @param {number} k
 * @param {number} x
 * @return {number[]}
 */
const findClosestElements = (arr, k, x) =>
  [...arr]
    .map((n) => [n, Math.abs(n - x)])
    .sort(([, a], [, b]) => a - b)
    .map(([n]) => n)
    .splice(0, k)
    .sort((a, b) => a - b)

arr = [1, 2, 3, 4, 5]
k = 4
x = 3
// Output: [1,2,3,4]

// arr = [1, 2, 3, 4, 5]
// k = 4
// x = -1
// Output: [1,2,3,4]

console.log(findClosestElements(arr, k, x))
