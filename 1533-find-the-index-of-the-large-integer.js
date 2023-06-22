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
const getIndex_1 = (reader) => {
  const n = reader.length()

  let mid = ((n - 1) / 2) | 0
  const left = [0, mid - (n % 2 ? 1 : 0)]
  const right = [mid + 1, n - 1]

  while (left[1] - left[0] > 0) {
    const comparison = reader.compareSub(...left, ...right)
    if (comparison === 0) return mid
    if (comparison === 1) {
      mid = ((left[0] + left[1]) / 2) | 0
      right[0] = mid + 1
      right[1] = left[1]
      left[1] = mid - ((left[1] - left[0] + 1) % 2 ? 1 : 0)
    } else {
      mid = ((right[0] + right[1]) / 2) | 0
      left[1] = mid - ((left[1] - left[0] + 1) % 2 ? 1 : 0)
      left[0] = right[0]
      right[0] = mid + 1
    }
  }
  left
  right
  const comparison = reader.compareSub(...left, ...right)
  if (comparison === 0) return left[0] + 1
  if (comparison === 1) return left[0]
  else return right[0]
}

const getIndex = (reader) => {
  let len = reader.length()
  let left = 0
  while (len > 1) {
    len = (len / 2) | 0
    const comp = reader.compareSub(
      left,
      left + len - 1,
      left + len,
      left + 2 * len - 1
    )
    if (comp === 0) return left + 2 * len
    if (comp < 0) left += len
  }
  return left
}

nums = [7, 7, 7, 7, 10, 7, 7, 7]
// Output: 4
// Explanation: The following calls to the API
// reader.compareSub(0, 0, 1, 1) //
//    returns 0 this is a query comparing the sub-array (0, 0) with the sub
//    array (1, 1), (i.e. compares arr[0] with arr[1]).
//    Thus we know that arr[0] and arr[1] doesn't contain the largest element.
// reader.compareSub(2, 2, 3, 3)
//    returns 0, we can exclude arr[2] and arr[3].
// reader.compareSub(4, 4, 5, 5)
//    returns 1, thus for sure arr[4] is the largest element in the array.
// Notice that we made only 3 calls, so the answer is valid.

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
