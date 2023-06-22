/**
 * Given two integer arrays arr1 and arr2, return the minimum number of
 * operations (possibly zero) needed to make arr1 strictly increasing.
 *
 * In one operation, you can choose two indices 0 <= i < arr1.length and
 * 0 <= j < arr2.length and do the assignment arr1[i] = arr2[j].
 *
 * If there is no way to make arr1 strictly increasing, return -1.
 *
 * Constraints:
 *    1 <= arr1.length, arr2.length <= 2000
 *    0 <= arr1[i], arr2[i] <= 10^9
 */

/**
 * @param {number[]} arr1
 * @param {number[]} arr2
 * @return {number}
 */
var makeArrayIncreasing_DP_TopDown = function (arr1, arr2) {}

var makeArrayIncreasing_DP_BottomUp = function (arr1, arr2) {}

arr1 = [1, 5, 3, 6, 7]
arr2 = [1, 3, 2, 4]
// Expected: 1

arr1 = [1, 5, 3, 6, 7]
arr2 = [4, 3, 1]
// Expected: 2

arr1 = [1, 5, 3, 6, 7]
arr2 = [1, 6, 3, 3]
// Expected: -1

arr1 = [5, 16, 19, 2, 1, 12, 7, 14, 5, 16]
arr2 = [6, 17, 4, 3, 6, 13, 4, 3, 18, 17, 16, 7, 14, 1, 16]
// Expected: 8

console.log(makeArrayIncreasing_DP_TopDown(arr1, arr2))
console.log(makeArrayIncreasing_DP_BottomUp(arr1, arr2))
