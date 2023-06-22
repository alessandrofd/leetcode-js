/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */

// Approach 1: Merge and sort

// const merge = (nums1, m, nums2, n) => {
//     for (let i = 0; i < n; i++) nums1[m + i] = nums2[i]
//     nums1.sort((a, b) => a - b)
// };

//Approach 2: Three Pointers (Start From the Beginning)

// const merge = (nums1, m, nums2, n) => {
//     const copy = [...nums1]
//     let p1 = 0, p2 = 0
//     for  (let p = 0; p < m+n; p++) {
//       if (p2 >= n || (p1 < m && copy[p1] < nums2[p2])) nums1[p] = copy[p1++]
//       else nums1[p] = nums2[p2++]
//     }
// };

// Approach 3: Three Pointers (Start From the End)

const merge = (nums1, m, nums2, n) => {
  let p1 = m - 1,
    p2 = n - 1
  for (let p = m + n - 1; p >= 0; p--) {
    if (p2 < 0 || (p1 >= 0 && nums1[p1] > nums2[p2])) nums1[p] = nums1[p1--]
    else nums1[p] = nums2[p2--]
  }
}

let nums1 = [1, 2, 3, 0, 0, 0]
let m = 3
let nums2 = [2, 5, 6]
let n = 3

merge(nums1, m, nums2, n)
console.log(nums1)
