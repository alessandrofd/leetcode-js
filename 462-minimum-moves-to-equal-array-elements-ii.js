/**
 * @param {number[]} nums
 * @return {number}
 */
// Approach 3: Using Sorting
const minMoves2_3 = (nums) => {
  nums.sort((a, b) => a - b)
  const total = nums.reduce((acc, nxt) => acc + nxt)

  let min = Infinity
  let sum = 0
  for (let i = 0; i < nums.length; i++) {
    // number of moves = [(K * count before K) - sum before K] + [sum after K - (K * count after K)]
    const ans = nums[i] * i - sum + (total - sum - nums[i] * (nums.length - i))
    sum += nums[i]
    min = Math.min(ans, min)
  }
  return min
}

// Approach 4: Using Median and Sorting
var minMoves2_4 = function (nums) {
  nums.sort((a, b) => a - b)
  const median = nums[Math.floor(nums.length / 2)]
  return nums.reduce((acc, nxt) => acc + Math.abs(nxt - median), 0)
}

// Approach 5: Without Finding Median
var minMoves2_5 = function (nums) {
  let l = 0,
    r = nums.length - 1,
    sum = 0
  nums.sort((a, b) => a - b)
  while (l < r) {
    sum += nums[r] - nums[l]
    l++
    r--
  }
  return sum
}

// Approach 6: Using Quick-Select
const minMoves2 = (nums) => {
  const swap = (list, i, j) => ([list[i], list[j]] = [list[j], list[i]])

  const partition = (list, left, right) => {
    pivotValue = list[right]
    i = left
    for (j = left; j <= right; j++) {
      if (list[j] < pivotValue) {
        swap(list, i, j)
        i++
      }
    }
    swap(list, right, i)
    return i
  }

  const select = (list, left, right, k) => {
    if (left === right) return list[left]

    pivotIndex = partition(list, left, right)

    if (k === pivotIndex) return list[k]
    else if (k < pivotIndex) return select(list, left, pivotIndex - 1, k)
    else return select(list, pivotIndex + 1, right, k)
  }

  median = select(nums, 0, nums.length - 1, Math.floor(nums.length / 2))
  sum = 0
  for (i = 0; i < nums.length; i++) sum += Math.abs(nums[i] - median)
  return sum

  //return nums.reduce((acc, nxt) => acc + Math.abs(nxt - median), 0)
}

// nums = [1, 2, 3]
// Output: 2

nums = [1, 10, 2, 9]
// Output: 16

console.log(minMoves2(nums))
