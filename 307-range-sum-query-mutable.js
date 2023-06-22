// Approach 2: Sqrt Decomposition
class NumArray_2 {
  constructor(nums) {
    this.nums = nums
    const len = Math.ceil(nums.length / Math.sqrt(nums.length))
    this.blocks = new Array(len).fill(0)
    for (let i = 0; i < nums.length; i++) this.blocks[(i / len) | 0] += nums[i]
  }

  update = (i, val) => {
    const index = (i / this.blocks.length) | 0
    this.blocks[index] = this.blocks[index] - this.nums[i] + val
    this.nums[i] = val
  }

  sumRange = (start, end) => {
    let sum = 0
    const startBlock = (start / this.blocks.length) | 0
    const endBlock = (end / this.blocks.length) | 0
    if (startBlock === endBlock) {
      for (let i = start; i <= end; i++) sum += this.nums[i]
    } else {
      for (let i = start; i <= (startBlock + 1) * this.blocks.length - 1; i++)
        sum += this.nums[i]
      for (let i = startBlock + 1; i <= endBlock - 1; i++) sum += this.blocks[i]
      for (let i = endBlock * this.blocks.length; i <= end; i++)
        sum += this.nums[i]
    }
    return sum
  }
}

// Approach 3: Segment Tree
class NumArray {
  constructor(nums) {
    this.len = nums.length
    this.tree = new Array(nums.length * 2)
    for (let i = nums.length, j = 0; i < nums.length * 2; i++, j++)
      this.tree[i] = nums[j]
    for (let i = nums.length - 1; i > 0; i--)
      this.tree[i] = this.tree[2 * i] + this.tree[2 * i + 1]
  }

  update = (index, val) => {
    index += this.len
    this.tree[index] = val
    while (index > 0) {
      let left = index
      let right = index
      if (index % 2) left--
      else right++
      this.tree[(index / 2) | 0] = this.tree[left] + this.tree[right]
      index = (index / 2) | 0
    }
  }

  sumRange = (start, end) => {
    start += this.len
    end += this.len
    let sum = 0
    while (start <= end) {
      if (start % 2 === 1) {
        sum += this.tree[start]
        start++
      }
      if (end % 2 === 0) {
        sum += this.tree[end]
        end--
      }
      start = (start / 2) | 0
      end = (end / 2) | 0
    }
    return sum
  }
}

const obj = new NumArray([1, 3, 5])
console.log(obj.sumRange(0, 2))
obj.update(1, 2)
console.log(obj.sumRange(0, 2))
// Output: [null, 9, null, 8]
