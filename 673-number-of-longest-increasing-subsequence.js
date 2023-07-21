/**
 * Given an integer array nums, return the number of longest increasing
 * subsequences.
 *
 * Notice that the sequence has to be strictly increasing.
 *
 * Constraints:
 *    1 <= nums.length <= 2000
 *    -10^6 <= nums[i] <= 10^6
 */

/**
 * Approach 1: Bottom-up Dynamic Programming
 *
 * ### Intuition ###
 *
 * Before attempting this problem, please first solve 300. Longest Increasing
 * Subsequence, which this problem is a follow up to.
 *
 * Consider an array nums of length n representing a sequence of numbers. To
 * find the number of longest increasing subsequences (LISs) in this array, we
 * introduce two dynamic programming (DP) arrays: length and count. Notice that
 * length here represents the answer to Longest Increasing Subsequence and count
 * represents the answer to this problem.
 *
 * length[i] represents the length of the LIS ending at index i in the nums
 * array, while count[i] denotes the count of LISs ending at index i.
 *
 * For instance, given nums = [1,3,2,4], we can illustrate the purpose of these
 * arrays. Here, length[0] = 1 because the longest increasing subsequence ending
 * at index 0 is the number 1 itself. Similarly, length[1] = 2 as the LIS ending
 * at index 1 is [1,3]. Continuing, length[2]=2 since the LIS ending at index 2
 * is [1,2]. Finally, length[3] = 3 as the LIS ending at index 3 is either
 * [1,3,4] or [1,2,4].
 *
 * In addition, we use count to keep track of the count of the longest
 * increasing subsequences. In the example above, count[0] = 1 because only one
 * LIS ends at index 0. Similarly, count[1] = 1 and count[2] = 1 since one LIS
 * is ending at each of those indices. count[3] = 2 because there are two LISs
 * ending at index 3.
 *
 * By utilizing these two DP arrays, we can efficiently compute the count of the
 * LISs in the given nums array.
 *
 * Initially, every subsequence consisting of a single element is increasing.
 * Therefore, we initialize length[i] = 1 and count[i] = 1 for all indices i in
 * the array. As we iterate through the array, if we encounter a longer
 * subsequence ending at index i, we update the values of length[i] and count[i]
 * accordingly.
 *
 * To compute the DP values for index i, we first calculate the values for all
 * positions j < i.
 *
 * For each index j such that j < i and nums[j] < nums[i], we can extend any
 * increasing subsequence that ends at index j by adding the element at index i.
 * The length of the LIS ending at position j is length[j]. By extending the
 * subsequence, we obtain a new subsequence of length length[j] + 1 that ends at
 * index i. We update the length[i] value to be the maximum length of an
 * increasing subsequence ending at index i seen so far.
 *
 * If length[j] + 1 > length[i], it means we have found a longer subsequence
 * ending at index i. In this case, we update length[i] to length[j] + 1.
 * Additionally, we discard any subsequences we saw earlier since they are no
 * longer LIS: count[i] to zero.
 *
 * Next, we check the equality length[j] + 1 === length[i].
 * If length[j] + 1 == length[i], it implies that we can extend every LIS
 * ending at index j with the nums[i] to create new longest increasing
 * subsequences ending at index i. Therefore, we add count[j] to count[i] to
 * count all subsequences that include both indices j and i. Note that length[i]
 * might have just become length[j] + 1 during the previous step.
 *
 * Let's consider the length of the LIS of the entire array nums, denoted as
 * maxLength, which equals the maximum length[i]. By finding maxLength, we
 * determine the target length we aim to achieve for our subsequences.
 *
 * To calculate result, the total number of LISs in the array, we need to sum up
 * the count[i] values for all indices i where the length of the subsequence,
 * length[i], is equal to maxLength. These indices represent the endpoints of
 * the longest increasing subsequences in the array. By adding up their
 * corresponding count[i] values, we account for all possible LISs.
 *
 * ### Algorithm ###
 *
 * Declare two DP arrays length and count, and initialize length[i] = 1,
 * count[i] = 1.
 *
 * Iterate i from 0 to n − 1.
 *
 *    Iterate j from 0 to i − 1.
 *
 *        If nums[i] > nums[j].
 *
 *            If length[j] + 1 > length[i], update length[i] with length[j] + 1
 *            and set count[i] to zero.
 *
 *            If length[j] + 1 == length[i], add count[j] to count[i].
 *
 * Let maxLength be the maximum value in the array length.
 *
 * Initialize result = 0.
 *
 * Iterate i from 0 to n − 1.
 *
 *    If length[i] == maxLength, add count[i] to result.
 *
 * Return result.
 *
 * ### Complexity Analysis ###
 *
 * Time Complexity: O(n^2)
 *
 *    The nested loops iterate over the input array nums, resulting in an
 *    overall time complexity of O(n^2), where n is the array length. The outer
 *    loop iterates n times, and the inner loop iterates up to i times, where i
 *    ranges from 0 to n − 1.
 *
 * Space Complexity: O(n).
 *
 *    We store two DP arrays: length and count, each with a length of n.
 *    Therefore, the space required to store these arrays is O(n).
 */

/**
 * @param {number[]} nums
 * @return {number}
 */
const findNumberOfLIS_bottomUp_DP = (nums) => {
  const n = nums.length
  const length = Array(n).fill(1)
  const count = Array(n).fill(1)

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < i; j++) {
      if (nums[i] > nums[j]) {
        if (length[j] + 1 > length[i]) {
          length[i] = length[j] + 1
          // Zerado por causa do próximo if que será sempre verdadeiro se esta
          // linha for executada
          count[i] = 0
        }
        if (length[j] + 1 == length[i]) {
          count[i] += count[j]
        }
      }
    }
  }

  console.log(nums)
  console.log(length)
  console.log(count)

  let result = 0
  const maxLength = Math.max(...length)
  for (let i = 0; i < n; i++) {
    if (length[i] === maxLength) {
      result += count[i]
    }
  }

  return result
}

/**
 * Approach 2: Top-down Dynamic Programming (Memoization)
 *
 * ### Intuition ###
 *
 * In this approach, we will calculate the DP arrays length and count using the
 * same recurrence relation as in the previous one, but the organization of
 * computations will be different.
 *
 * We will utilize a recursive function called calculateDP(i) that computes the
 * DP values length[i] and count[i] when called for the first time with a
 * particular i value. Once the values length[i] and count[i] are computed,
 * subsequent calls to calculateDP(i) will terminate immediately.
 *
 * For example, when we first call calculateDP(4), it computes length[4] and
 * count[4]. When we make subsequent calls to calculateDP(4), it returns
 * immediately.
 *
 * This approach ensures that we calculate the DP value for each state (each i)
 * only once.
 *
 * To compute length[i] and count[i], we will follow the same steps as in the
 * previous approach: iterate over j such that j < i and nums[j] < nums[i], and
 * update the DP values for i using the DP values for j.
 *
 * To determine whether we need to compute the DP values for i or return
 * immediately, we can initialize the DP arrays length and count with zeros.
 * Thus, length[i] = 0 will indicate that we have not yet computed the DP values
 * for i. Once we find the result for i, we will update length[i] and count[i],
 * length[i] will no longer be zero, indicating that we have computed the values.
 *
 * ### Algorithm ###
 *
 * The function calculateDP takes a parameter i.
 *
 *    1. If length[i] != 0 (which means that we found this value earlier),
 *      return from the function.
 *
 *    2. Assign length[i] = 1, count[i] = 1 (the DP initialization).
 *
 *    3. Iterate j from 0 to i − 1.
 *
 *        If nums[i] > nums[j].
 *
 *            Call calculateDP(j) recursively to ensure that length[j] and
 *            count[j] are calculated.
 *
 *            If length[j] + 1 > length[i], update length[i] with length[j] + 1
 *            and set count[i] to zero.
 *
 *            If length[j] + 1 == length[i], add count[j] to count[i].
 *
 * In the main function, one needs to do the following.
 *
 *  1. Initialize maxLength = 0 and result = 0.
 *
 *  2. Iterate i from 0 to n − 1.
 *
 *    Call calculateDP(i).
 *
 *    Assign maxLength = max⁡(maxLength, length[i]).
 *
 *  3. Iterate i from 0 to n − 1.
 *
 *    If length[i] == maxLength, add count[i] to result.
 *
 * 4. Return result.
 *
 * ### Complexity Analysis ###
 *
 * Time Complexity: O(n^2).
 *
 *    Even though we changed the order in which we calculate DP, the time
 *    complexity is the same as in the previous approach: for each i, we compute
 *    length[i] and count[i] in O(n).
 *
 * Space Complexity: O(n).
 *
 *    We store the DP arrays length and count of size n, as in the previous
 *    approach.
 */

/**
 * @param {number[]} nums
 * @return {number}
 */
const findNumberOfLIS_topDown_DP = (nums) => {
  const n = nums.length
  const length = Array(n)
  const count = Array(n)

  const calculateDP = (i) => {
    if (length[i]) return

    length[i] = 1
    count[i] = 1

    for (let j = 0; j < i; j++) {
      if (nums[i] > nums[j]) {
        if (length[j] + 1 > length[i]) {
          length[i] = length[j] + 1
          count[i] = 0
        }

        if (length[j] + 1 == length[i]) {
          count[i] += count[j]
        }
      }
    }
  }

  let maxLength = 0
  for (let i = 0; i < n; i++) {
    calculateDP(i)
    maxLength = Math.max(maxLength, length[i])
  }

  let result = 0
  for (let i = 0; i < n; i++) {
    if (length[i] == maxLength) {
      result += count[i]
    }
  }

  return result
}

/**
 * Desenvolve a solução do problema "300. Longest increasing subsequence"
 * que utiliza busca binária.
 *
 * Neste caso utilizamos uma estrutura de apoio que guarda a quantidade de
 * ocorrências de subsequências de comprimento i terminadas em num.
 *
 * A cada iteração calculamos o a subsequência mais comprida terminada em
 * num e somamos todas as ocorrências de subsequências de comprimento um
 * número menor cujo final seja menor que num.
 *
 * O ganho em relação às soluções utilizando DP não foram tão grandes quanto no
 * Python. Talvez pela conversão entre maps e vetores.
 */

/**
 * @param {number[]} nums
 * @return {number}
 */
const findNumberOfLIS_greedy_binSearch = (nums) => {
  const subseq = []
  const dp = []

  for (const num of nums) {
    let lo = 0
    let hi = subseq.length
    while (lo < hi) {
      const mid = Math.floor((lo + hi) / 2)
      if (num > subseq[mid]) lo = mid + 1
      else hi = mid
    }
    const index = lo
    subseq[index] = num

    if (!dp[index]) dp[index] = new Map()
    if (!dp[index].has(num)) dp[index].set(num, 0)

    let count = dp[index].get(num)
    if (index === 0) {
      count += 1
    } else {
      const prevCount = [...dp[index - 1].entries()]
        .filter(([n]) => n < num)
        .reduce((acc, [, c]) => acc + c, 0)
      count += prevCount
    }

    dp[index].set(num, count)
  }

  return [...dp[subseq.length - 1].entries()].reduce((acc, [, c]) => acc + c, 0)
}

nums = [1, 3, 5, 4, 7]
// Expected: 2

// nums = [2, 2, 2, 2, 2]
// Expected: 5

// nums = [1, 2, 4, 3, 5, 4, 7, 2]
// Expected: 3

// nums = [-100, -99, -98, -97, -96, -96]
// Expected: 2

console.log(findNumberOfLIS_bottomUp_DP(nums))
console.log(findNumberOfLIS_topDown_DP(nums))
console.log(findNumberOfLIS_greedy_binSearch(nums))
