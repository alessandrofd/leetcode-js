/**
 * Given an array of integers nums, sort the array in ascending order and
 * return it.
 *
 * You must solve the problem without using any built-in functions in O(nlog(n))
 * time complexity and with the smallest space complexity possible.
 *
 * Constraints:
 *    1 <= nums.length <= 5 * 10^4
 *    -5 * 10^4 <= nums[i] <= 5 * 10^4
 */

/**
 * @param {number[]} nums
 * @return {number[]}
 */
const sortArray_merge = (nums) => {
  const temp = new Array(nums.length)

  const merge = (left, mid, right) => {
    const start1 = left
    const n1 = mid - left + 1
    const start2 = mid + 1
    const n2 = right - mid

    for (let i = left; i <= right; i++) temp[i] = nums[i]

    let i = 0,
      j = 0,
      k = left
    while (i < n1 && j < n2) {
      if (temp[start1 + i] <= temp[start2 + j]) nums[k] = temp[start1 + i++]
      else nums[k] = temp[start2 + j++]
      k++
    }

    // Remaining elements
    while (i < n1) nums[k++] = temp[start1 + i++]
    while (j < n2) nums[k++] = temp[start2 + j++]
  }

  const mergeSort = (left, right) => {
    if (left >= right) return

    const mid = Math.floor((left + right) / 2)
    mergeSort(left, mid)
    mergeSort(mid + 1, right)
    merge(left, mid, right)
  }

  mergeSort(0, nums.length - 1)
  return nums
}

const sortArray_heap = (nums) => {
  const heapify = (n, i) => {
    // Initialize largest as root
    let largest = i
    let left = i * 2 + 1
    let right = i * 2 + 2

    // If left child is largest than root
    if (left < n && nums[left] > nums[largest]) largest = left

    // If right child is largest than largest so far
    if (right < n && nums[right] > nums[largest]) largest = right

    // If largest is not root swap root with largest element
    // Recursively heapify the affected sub-tree (i.e. move down)
    if (largest != i) {
      ;[nums[i], nums[largest]] = [nums[largest], nums[i]]
      heapify(n, largest)
    }
  }

  const heapSort = () => {
    const n = nums.length

    // Build heap; hepify (top-down) all elements except leaf-nodes
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) heapify(n, i)

    // Traverse elements one by one, to move current root to the end, and
    for (let i = n - 1; i > 0; i--) {
      ;[nums[0], nums[i]] = [nums[i], nums[0]]
      // call max heapify on the reduced heap.
      heapify(i, 0)
    }
  }

  heapSort()
  return nums
}

const sortArray_counting = (nums) => {
  const countNums = new Map()
  const max = Math.max(...nums)
  const min = Math.min(...nums)

  for (const num of nums) countNums.set(num, (countNums.get(num) ?? 0) + 1)

  let i = 0
  for (let num = min; num <= max; num++)
    for (let count = 0; count < countNums.get(num) ?? 0; count++)
      nums[i++] = num

  return nums
}

const sortArray_radix = (nums) => {
  const countingSort = (placeValue) => {
    const digitsToNums = new Map()
    for (const num of nums) {
      const digit = Math.floor(Math.abs(num) / placeValue) % 10
      if (!digitsToNums.get(digit)) digitsToNums.set(digit, [])
      digitsToNums.get(digit).push(num)
    }

    let index = 0
    for (let digit = 0; digit < 10; digit++)
      for (const num of digitsToNums.get(digit) ?? []) nums[index++] = num
  }

  const maxNum = nums.reduce((max, num) => Math.max(max, Math.abs(num)), 0)
  const maxDigits = maxNum.toString().length

  // Radix sort, least significant digit place to most significat
  for (let digit = 0; digit < maxDigits; digit++) countingSort(10 ** digit)

  // Separate negatives from positives and reverse them
  const negatives = []
  const positives = []
  for (const num of nums)
    if (num >= 0) positives.push(num)
    else negatives.push(num)

  return (nums = [...negatives.reverse(), ...positives])
}

nums = [5, 2, 3, 1]
// Output: [1,2,3,5]

nums = [5, 1, 1, 2, 0, 0, -11, -4, -25]
// Output: [0,0,1,1,2,5]

console.log(sortArray_merge(nums))
console.log(sortArray_heap(nums))
console.log(sortArray_counting(nums))
console.log(sortArray_radix(nums))

for (let i = 0, val = 1; i < 3; i++, val *= 10 ** i) console.log(10 ** i)
