/**
 * Weekly Challenge 15/01/2023
 *
 * We have an integer array arr, where all the integers in arr are equal except
 * for one integer which is larger than the rest of the integers. You will not
 * be given direct access to the array, instead, you will have an API
 * ArrayReader which have the following functions:
 *
 *    int compareSub(int l, int r, int x, int y):
 *    where 0 <= l, r, x, y < ArrayReader.length(), l <= r and x <= y. The
 *    function compares the sum of sub-array arr[l..r] with the sum of the
 *    sub-array arr[x..y] and returns:
 *        1 if arr[l]+arr[l+1]+...+arr[r] > arr[x]+arr[x+1]+...+arr[y].
 *        0 if arr[l]+arr[l+1]+...+arr[r] == arr[x]+arr[x+1]+...+arr[y].
 *        -1 if arr[l]+arr[l+1]+...+arr[r] < arr[x]+arr[x+1]+...+arr[y].
 *
 *    int length(): Returns the size of the array.
 *
 *    You are allowed to call compareSub() 20 times at most. You can assume both
 *    functions work in O(1) time.
 *
 *    Return the index of the array arr which has the largest integer.
 *
 * Constraints:
 *    2 <= arr.length <= 5 * 10^5
 *    1 <= arr[i] <= 100
 *    All elements of arr are equal except for one element which is larger than
 *    all other elements.
 */

/**
 * // This is the ArrayReader's API interface.
 * // You should not implement it, or speculate about its implementation
 * function ArrayReader() {
 *     // Compares the sum of arr[l..r] with the sum of arr[x..y]
 *     // return 1 if sum(arr[l..r]) > sum(arr[x..y])
 *     // return 0 if sum(arr[l..r]) == sum(arr[x..y])
 *     // return -1 if sum(arr[l..r]) < sum(arr[x..y])
 *     @param {number} l, r, x, y
 *     @return {number}
 *     this.compareSub = function(l, r, x, y) {
 *         ...
 *     };
 *
 *     // Returns the length of the array
 *     @return {number}
 *     this.length = function() {
 *         ...
 *     };
 * };
 */

class ArrayReader {
  constructor(array) {
    this.array = array
  }

  compareSub = (l, r, x, y) => {
    const a = this.array.slice(l, r + 1).reduce((acc, val) => acc + val)
    const b = this.array.slice(x, y + 1).reduce((acc, val) => acc + val)
    if (a > b) return 1
    if (a === b) return 0
    return -1
  }

  length = () => this.array.length
}

/**
 * @param {ArrayReader} reader
 * @return {number}
 */
const getIndex = (reader) => {
  const n = reader.length()
  let half = (n / 2) | 0
  let l = 0
  let y = n - 1
  while (l < y) {
    const r = l + half - 1
    const x = y - (half - 1)
    const comparison = reader.compareSub(l, r, x, y)

    if (comparison > 0) y = r
    else if (comparison < 0) l = x
    else return l + half

    half = (half / 2) | 0
  }
  return l
}

nums = [7, 7, 7, 7, 10, 7, 7, 7]
// Output: 4

nums = [6, 6, 12]
// Output: 2

nums = [
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  1, 1, 1, 1, 1, 17,
]
// Output: 31

nums = [1, 1, 1, 1, 1, 2, 1, 1, 1]
// Output: 5

nums = [
  46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46,
  46, 57, 46, 46, 46, 46,
]
// Output: 20

console.log(getIndex(new ArrayReader(nums)))
