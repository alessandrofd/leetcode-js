/**
 * Given an integer array nums and an integer k, return the maximum sum of a
 * non-empty subsequence of that array such that for every two consecutive
 * integers in the subsequence, nums[i] and nums[j], where i < j, the condition
 * j - i <= k is satisfied.
 *
 * A subsequence of an array is obtained by deleting some number of elements
 * (can be zero) from the array, leaving the remaining elements in their
 * original order.
 *
 * Constraints:
 *    1 <= k <= nums.length <= 10^5
 *    -10^4 <= nums[i] <= 10^4
 *
 * Overview:
 *
 * Before we start developing a strategy, we must carefully understand what the
 * problem is asking for.
 *
 * We need to maximize the sum of a subsequence. We can take as many integers as
 * we want, but the primary constraint is that we cannot have a gap of k or more
 * in our subsequence.
 *
 * You may immediately notice that in an array of positive integers, we should
 * always take the entire array. The tricky part comes in when we have negative
 * integers. Of course, we would prefer to avoid negative integers since they
 * will decrease our sum. However, it may be worth taking a negative integer as
 * a sort of "bridge". Take a look at the following example:
 *
 *    [16, -13, -5, -10, 4, 3, 9], k = 2
 *
 * In this example, we have a group of negative numbers separating a 16 and a
 * group of positive numbers that sum to 16. We would like to take all the
 * positive numbers while avoiding the negative numbers, but we aren't allowed
 * to as that would result in a gap of three numbers. As k = 2, the biggest gap
 * we can have is one number. The optimal solution here is to take the -5.
 *
 * As you can see, the -5 acts as a bridge for the positive numbers. The
 * question now is, how do we know when it is worth it to take negative numbers?
 * In this case, taking the -5 allowed us to take the first element of 16. This
 * results in a net gain of 11. Anytime we have a positive net gain, we should
 * consider taking this element because it can contribute to a positive sum and
 * potentially increase the sum of subsequent subsequences.
 *
 *
 */

import { MaxPriorityQueue } from '@datastructures-js/priority-queue'

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
const constrainedSubsetSum_pq = (nums, k) => {
  /**
   * Approach 1: Heap/Priority Queue
   *
   * We will iterate over the input from left to right. At each index i, we will
   * consider the maximum possible sum of a subsequence that includes and ends
   * at nums[i]. Let's call this value curr. How do we calculate curr for a
   * given index i? We want the maximum possible sum of a subsequence that ends
   * within the last k indices. We will then add nums[i] to this sum.
   *
   * We could solve this using dynamic programming - let dp[i] represent the
   * maximum possible sum of a subsequence that includes and ends at nums[i].
   * We can calculate dp[i] by taking the maximum dp[j] for all j in the range
   * [i - k, i - 1] (the last k indices), then adding nums[i] to it.
   *
   * However, we would be iterating up to k times to calculate each state.
   * As k can be large, this approach is too slow. We need a faster way to find
   * the maximum dp[j] for all indices j in the range [i - k, i - 1].
   *
   * Because we are only concerned with the maximum sum, we could use a max heap.
   * The max heap would store dp[j] for all j in the last k indices. We can
   * easily calculate curr by simply checking the top of this heap.
   *
   * We need to make sure we don't use elements of the heap that are more than k
   * away from the current index. Before we calculate curr, we pop from the top
   * of the heap if it is outside our range. This means each entry in the heap
   * will also need its associated index, so we can tell when an element is out
   * of range.
   *
   * Note that if the top of the heap is negative, it is better to not take it.
   * This is a process very similar to Kadane's Algorithm, which solves the
   * Maximum Subarray problem. When the top of the heap is negative, it
   * indicates that selecting this subsequence would result in a sum less than 0.
   * Every element in the array to the left of the current index should be
   * abandoned - any "bridge" would not be worth taking. It's better to discard
   * these subsequences altogether and reset the sum to 0.
   */
}

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
const constrainedSubsetSum_treeMap = (nums, k) => {
  /**
   * Approach 2: TreeMap-Like Data Structure
   * 
   * As we saw in the previous approach, the crux of the dynamic programming 
   * idea was finding the maximum value of dp in the last k indices. We 
   * accomplished this in O(log⁡ n) time with a heap, but we could achieve 
   * O(log ⁡k) with a tree map data structure (like a red-black tree). Because 
   * k <= n, this is a slight improvement in terms of big O.
   *
   * Let's actually use the dp array that we spoke of in the previous approach 
   * this time. We will have a data structure window that holds all values of dp 
   * in the last k indices. We can easily calculate dp[i] as nums[i] plus the 
   * maximum value in window. Then, we can add dp[i] to window.
   * 
   * To maintain window, once we reach index k, we need to start removing 
   * dp[i - k] from window at each iteration.
   * 
   *    In Java, we will use TreeMap. Each key will be a value in dp which we 
   *    will map to its frequency. To remove dp[i - k] from the window, we will 
   *    decrement its frequency, and if its frequency becomes 0, we will delete 
   *    the key.
   * 
   *    In C++, we will use std::map, which functions similarly to Java's 
   *    TreeMap.
   * 
   *    In Python, we will use sortedcontainers.SortedList, which is more like a 
   *    list than a map, but still provides us with the efficient operations we 
   *    require.
   * 
   *    OBS: Javascript não tem um mapa ordernado. Fica o dever de casa :)
   *    https://github.com/vadimg/js_bintrees
   *    Red-Black tree - Cormen, Leiserson, and Rivest's Introduction to Algorithms
   * 
   * For all implementations, we will initialize window with a key of 0 to make 
   * the code cleaner, otherwise we would need to handle the first index 
   * differently (check if window is empty before accessing the maximum key).
   * 
   * The answer to the problem will be the max value in dp in the end.


   */
}

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
const constrainedSubsetSum_monotonic_deque = (nums, k) => {
  /**
   * Approach 3: Monotonic Deque
   *
   * This approach is very similar to the solution to Sliding Window Maximum.
   * We recommend you try this problem as well if you haven't already.
   *
   * Is it possible to find the maximum value of dp in the last k indices in
   * O(1)? Yes, by using a monotonic queue!
   *
   * A monotonic data structure is one where the elements are always sorted. If
   * we have a monotonic decreasing data structure, then the elements are always
   * sorted descending. Thus, if we can maintain a monotonic data structure that
   * holds values of dp for the last k indices, then the first element in this
   * data structure will be the value we are interested in.
   *
   * To maintain this data structure, we need to make sure that whenever we push
   * a new element, it will be the smallest value. Before we push an element
   * dp[i], we check the last element. If it is less than dp[i], we must pop it,
   * otherwise, the monotonic property would be broken. Since there may be
   * multiple elements less than dp[i], we need to use a while loop to "clean"
   * the data structure before pushing dp[i].
   *
   * Only once there are no elements in the data structure less than dp[i] will
   * we push dp[i]. Additionally, we will only push positive values of dp[i] to
   * queue.
   *
   * The reason we want to remove elements that are less than dp[i] is because
   * dp[i] comes after those elements. Thus, those elements will be out of range
   * before dp[i], and because dp[i] is greater than them, there is no chance
   * those elements will ever be the maximum value in the last k indices anymore.
   *
   * Before we check the max value, we must make sure it is not out of range.
   * If it is, we will remove this invalid max value. As you can see, we need to
   * remove elements from both the front and the back. Thus, we will use a deque
   * (double-ended queue) as our data structure.
   *
   * To detect if the max value is out of range, we must store the indices in
   * the queue.
   *
   *    To check if the max value is out of range, we check if
   *    i - queue.front() > k.
   *
   *    To obtain the max value of the queue, we check dp[queue.front()]
   *
   *    To obtain the value at the end of the queue, we check dp[queue.back()]
   *
   * Note that we could also store pairs (dp[i], i) on the queue.
   */
}

// prettier-ignore
const funcs = [
  // constrainedSubsetSum_pq,
  // constrainedSubsetSum_treeMap,
  constrainedSubsetSum_monotonic_deque,
]

const data = [
  [[10, 2, -10, 5, 20], 2, 37],
  [[-1, -2, -3], 1, -1],
  [[10, -2, -10, -5, 20], 2, 23],
]

for (const func of funcs) {
  for (const [nums, k, expected] of data) {
    console.log(func(nums, k) === expected)
  }
}
