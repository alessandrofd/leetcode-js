/**
 * You are given an array of integers nums (0-indexed) and an integer k.
 *
 * The score of a subarray (i, j) is defined as min(nums[i], nums[i+1], ...,
 * nums[j]) * (j - i + 1). A good subarray is a subarray where i <= k <= j.
 *
 * Return the maximum possible score of a good subarray.
 *
 * Constraints:
 *    1 <= nums.length <= 10^5
 *    1 <= nums[i] <= 2 * 10^4
 *    0 <= k < nums.length
 */

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
const maximumScore_bin_search = (nums, k) => {
  /**
   * Approach 1: Binary Search
   *
   * The score of a subarray is its length multiplied by its minimum element.
   * In this problem, we must find the maximum score of all subarrays that
   * contain nums[k].
   *
   * How can we improve our score? When we take more elements we increase the
   * length of the subarray, which helps the score. However, we may find new
   * minimums, which would decrease our score.
   *
   * We can start by separating the array - numbers to the left of k and numbers
   * to the right of k (and including k).
   *
   * Notice that k is the meeting point of these sections. If we want to take
   * elements in the left section, we start from the end of the left section and
   * move toward the beginning. If we want to take elements in the right section,
   * we start from the beginning and move toward the end.
   *
   * Of course, each element we take will increase our length by 1. But how will
   * it affect our minimum? To compute this quickly, we can create new arrays
   * for each section. These arrays will represent the minimum element we have
   * seen in the section if we started from k.
   *
   *    [1, 4, 3, 7, 4, 5], k = 3
   *    left = [1, 4, 3], right = [ 7, 4, 5]
   *
   * In the above example, let's say that we took two elements from the left
   * section. We can quickly see that the minimum element from the left section
   * is 3 using these arrays. Similarly, if we took all elements from the right
   * section, we could quickly see that the minimum element from the right
   * section is 4.
   *
   * Now that we have these arrays, how can we solve the problem? Because
   * nums[k] is in the right section, we will iterate over the entire right
   * section and try to take each element. Let's say we take some number of
   * elements from the right section, and the minimum is x. How many elements
   * can we take from the left section without changing x as the minimum? We
   * must only take elements from the left that are greater than or equal to x.
   *
   * Let's switch to another example. For a given array, assuming we have
   * already built the left and right arrays using the previous method.
   *
   *    right = [12, 5, 5, 5, 1]
   *    If we take 4 elements ([12, 5, 5, 5]), the minimum is 5. How many
   *    elements can we take from the left section?
   *
   *    left = [2, 4, 7, 7]
   *    We can take two elements ([7, 7]) withou changing the minimum.
   *
   * In the above example, let's say that we take four elements from the right
   * section. The minimum is 5. How many elements can we take from the left
   * section without changing the minimum? Two. This gives us a total size of
   * 4 + 2 = 6, and a total score of 6 * 5 = 30.
   *
   * How do we quickly find the number of elements we can take from the left
   * section? Note that when we are building the array left from right to left,
   * each time we go left we encounter a new number that is only likely to lower
   * the minimum value, and the further to the left we go, the smaller the
   * minimum value becomes, i.e., left is already sorted from smallest to
   * largest. Therefore, we can perform a binary search to identify how many
   * elements we can take.
   *
   * This brings us to our solution. We iterate with j over each index of right
   * and assign currMin = right[j], which represents the minimum of our subarray.
   * We then perform a binary search to find i, the insertion index of currMin
   * in left. Once we have i, we can calculate the size of our subarray, and
   * thus the score. We take the maximum of all scores.
   *
   * Because the right section starts at index k, its indices are offset by k
   * from the real indices. Thus, in the original array, right[j] points to
   * index k + j. The left section is not offset at all, so i is correctly
   * positioned. The size of a subarray bounded by [left, right] is
   * right - left + 1. Thus, the size of our subarray [i, k + j] is
   * (k + j) - i + 1. We can multiply this by right[j] to calculate our score.
   *
   * You may have noticed: this algorithm assumes that in the optimal subarray,
   * the minimum value is in the right section. But what if this assumption is
   * wrong, and its actually in the left section? We can check the left section
   * by simply reversing the array and then applying the same algorithm to it.
   * Note that when we reverse the array, k will change. After reversal, the
   * original k will be at nums.length - k - 1.
   */
}

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
const maximumScore_monotonic_stack = (nums, k) => {
  /**
   * Approach 2: Monotonic Stack
   *
   * In this approach, we will use a similar idea as in the previous approach.
   * For a given index i, if we treat nums[i] as the minimum element, we need to
   * know how many elements we can take on the left and right such that we do
   * not take any elements less than nums[i].
   *
   * Essentially, we need to know how far away the next lesser element is on
   * both sides. If we have this information for all indices, we can quickly
   * calculate the maximum score possible by treating every nums[i] as the
   * minimum, since in the optimal solution, one of the indices must be the
   * minimum.
   *
   * There is a very similar problem called Next Greater Element. The logic is
   * identical, except that we are looking for the next smaller element. We can
   * accomplish this using a monotonic stack.
   *
   * We will create an array left, where left[i] has the index of the first
   * element to the left of i that has a lower value in nums than nums[i].
   *
   * Similarly, we will create an array right where right[i] has the index of
   * the first element to the right of i that has a lower value in nums than
   * nums[i].
   *
   * So how do we calculate right? Let's say that we are iterating over nums
   * from the left and we have a chain of increasing numbers:
   *
   *    [3, 6, 8, 12, 52, 335, 1, ...]
   *
   * As you can see in the example, we have 6 increasing numbers, and then a 1
   * that is less than all of them. This 1 (at index 6) should be the value of
   * right for all the indices of the increasing numbers. If we maintain a
   * monotonic increasing stack, then this 1 will cause all those numbers to be
   * popped out.
   *
   * With a monotonic increasing stack, whenever we see an element that is
   * smaller than the top of the stack, it is guaranteed to be the first smaller
   * element for the element at the top of the stack. This is exactly what we
   * are looking for.
   *
   * To calculate left, we use the exact same process, except we iterate
   * backward starting from the end of nums.
   *
   * Note that because we need to remember what indices to update when we pop
   * from the stack, we will store indices on the stack instead of the elements
   * themselves. We can easily find the values by referencing nums.
   *
   * Note that because we need to remember what indices to update when we pop
   * from the stack, we will store indices on the stack instead of the elements
   * themselves. We can easily find the values by referencing nums.
   *
   * Once we have left and right, we can iterate over all indices i and try to
   * find a maximum score. Remember that the subarray must contain index k.
   * Thus, we can only use an index i as the minimum if left[i] < k and
   * right[i] > k.
   *
   * When we treat an index i as the minimum, what score can we achieve? Our
   * window starts one index after left[i] because including left[i] would
   * create a new minimum. Similarly, our window ends one index before right[i].
   * Thus, we need to subtract 2 from the normal subarray size formula.
   * his gives us a subarray size of right[i] - left[i] - 1. We multiply this
   * size by nums[i] to get our score.
   */
}

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
const maximumScore_greedy = (nums, k) => {
  /**
   * Approach 3: Greedy
   *
   * Sometimes the simplest approach is the best! The optimal subarray must
   * contain index k, so it makes sense to consider the subarray with only
   * nums[k] as a starting point.
   *
   * From here, how do we expand the subarray? We can either add an element to
   * the left or an element to the right. Let's say we have two pointers, left
   * and right that represent our subarray. Which direction should we go?
   *
   * If we move left, it's equivalent to adding nums[left - 1] to our subarray.
   * If we move right, it's equivalent to adding nums[right + 1] to our
   * subarray. We should move in the direction of the greater element.
   *
   * At each step, we update currMin which is initially set to nums[k], and try
   * to update ans which is also initially set to nums[k]. We can update ans
   * with currMin * (right - left + 1) if it is larger.
   *
   * This greedy process is very similar to the one used to solve Container With
   * Most Water. But why does it work? We will use a proof by contradiction to
   * demonstrate that not doing it this way wouldn't result in a higher value
   * either.
   *
   * At each step, we choose between having our subarray as [left - 1, right] or
   * [left, right + 1]. Let's assume that nums[left - 1] > nums[right + 1] and
   * the optimal subarray has not been found yet. The optimal subarray must
   * include nums[left - 1]. If it doesn't, then it must include
   * nums[right + 1], since we could only move right to "avoid" nums[left - 1].
   * However, any subarray that includes nums[right + 1] could also include
   * nums[left - 1] without affecting the minimum, while also increasing the
   * length of the subarray and thus the score. Thus, it is impossible for the
   * optimal subarray to include nums[right + 1] and not nums[left - 1], and in
   * general the optimal subarray must include nums[left - 1].
   */
}

// prettier-ignore
const funcs = [
  maximumScore_bin_search,
  maximumScore_monotonic_stack,
  maximumScore_greedy,
]

const data = [
  [[1, 4, 3, 7, 4, 5], 3, 15],
  [[5, 5, 4, 5, 4, 1, 1, 1], 0, 20],
]

for (const func of funcs) {
  for (const [nums, k, expected] of data) {
    console.log(func(nums, k) === expected)
  }
}
