/**
 * You are given an integer array nums and you have to return a new counts array.
 * The counts array has the property where counts[i] is the number of smaller elements to the right of nums[i].
 */

/**
 * @param {number[]} nums
 * @return {number[]}
 */
// Approach 1: Segment Tree
const countSmaller = (nums) => {
  const OFFSET = 10 ** 4
  const SIZE = 2 * OFFSET + 1
  const tree = new Array(2 * SIZE).fill(0)

  const update = (index, value) => {
    index += SIZE // shift the index to the leaf
    // update from leaf to root
    tree[index] += value
    while (index > 1) {
      index = Math.floor(index / 2)
      tree[index] = tree[index * 2] + tree[index * 2 + 1]
    }
  }

  const query = (left, right) => {
    // return sum of [left, right)
    let result = 0
    // shift the indeces to the leaves
    left += SIZE
    right += SIZE
    while (left < right) {
      // if left is a right node (odd)
      // bring the value and move to the parent's right node
      if (left % 2) {
        result += tree[left]
        left++
      }
      // else directly move to the parent
      left /= 2

      // if right is a right node
      // bring the value of the left node and move to the parent
      if (right % 2) {
        right--
        result += tree[right]
      }
      // else directly move to the parent
      right /= 2
    }
    return result
  }

  const counts = []
  for (let i = nums.length - 1; i >= 0; i--) {
    const count = query(0, nums[i] + OFFSET)
    counts.push(count)
    update(nums[i] + OFFSET, 1)
  }
  return counts.reverse()
}

nums = [5, 2, 6, 1]
// Output: [2,1,1,0]

// nums = [-1]
// Output: [0]

// nums = [-1, -1]
//  Output: [0,0]

console.log(countSmaller(nums))
