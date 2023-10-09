/**
 * You are given three integers n, m and k. Consider the following algorithm to
 * find the maximum element of an array of positive integers:
 *
 *    maximum_value = -1
 *    maximum_index = -1
 *    search_cost = 0
 *    n = arr.length
 *    for (i = 0; i < n; i++) {
 *        if (maximum_value < arr[i]) {
 *          maximum_value = arr[i]
 *          maximum_index = i
 *          search_cost = search_cost + 1
 *        }
 *    }
 *    return maximum_index
 *
 * You should build the array arr which has the following properties:
 *
 *    arr has exactly n integers.
 *
 *    1 <= arr[i] <= m where (0 <= i < n).
 *
 *    After applying the mentioned algorithm to arr, the value search_cost is
 *    equal to k.
 *
 * Return the number of ways to build the array arr under the mentioned
 * conditions. As the answer may grow large, the answer must be computed modulo
 * 10^9 + 7.
 *
 * Constraints:
 *    1 <= n <= 50
 *    1 <= m <= 100
 *    0 <= k <= n
 *
 * Hints:
 *
 *    Use dynamic programming approach. Build dp table where dp[a][b][c] is the
 *    number of ways you can start building the array starting from index a
 *    where the search_cost = c and the maximum used integer was b.
 *
 *    Recursively, solve the small sub-problems first. Optimize your answer by
 *    stopping the search if you exceeded k changes.
 */

/**
 * @param {number} n
 * @param {number} m
 * @param {number} k
 * @return {number}
 */
const numOfArrays_dp_top_down = (n, m, k) => {
  /**
   * Approach 1: Top-Down Dynamic Programming  - TLE
   *
   * Before we start solving the problem, let's carefully read the algorithm
   * given in the problem description to try to figure out exactly what the
   * problem is asking for. Upon careful inspection, we can deduce that the
   * problem is asking:
   *
   *    How many arrays of length n with values in the range [1, m] exist, such
   *    that you will find exactly k new maximums when traversing from left to
   *    right?
   *
   * Given the massive number of possibilities, it seems impossible to actually
   * try to build the arrays. Can we break the problem down?
   *
   * Let's say you are currently building a candidate array. We don't need to
   * know the exact contents of the array, but we need to know the following:
   *
   *    How many elements have we placed so far? Suppose we add elements to the
   *    array in order. We can represent this with an index i that indicates the
   *    index of the next element we will place. For example, if the current
   *    array is [1, 6, 4], the next element we will place is at i = 3.
   *
   *    The maximum element in the array. We can represent this with an integer
   *    maxSoFar. In the example of [1, 6, 4], we have maxSoFar = 6.
   *
   *    How many remaining new maximums must we encounter before the end? We can
   *    represent this with an integer remain. In the example of [1, 6, 4], both
   *    1 and 6 are maximums, so if we need a total of x maximums, we have
   *    remain = x - 2.
   *
   * Given a state i, maxSoFar, remain, can we come up with a recursive way to
   * solve the problem? Let's define a function dp(i, maxSoFar, remain) that
   * returns the number of ways to build a valid array if we have already placed
   * i elements, the maximum element we have placed so far is maxSoFar, and we
   * need to place remain more new maximums. Then, the answer to the original
   * problem would be dp(0, 0, k). We start with an empty array and need to
   * place k new maximums.
   *
   * What would our base cases be?
   *
   *    If i == n, we have filled the array. The array is valid if remain == 0
   *    and we will return 1 in that case, or 0 otherwise.
   *
   *    If remain < 0, then we have placed too many new maximums. We should
   *    immediately return 0 as it is impossible to form a valid array from this
   *    point forward.
   *
   * Now that we have the base cases, how do we calculate a given state i,
   * maxSoFar, remain? We will attempt to place a new element at index i. There
   * are 2 possibilities:
   *
   *    We place a number that is not a new maximum. How many ways are there to
   *    do this? The range of numbers we could choose from is [1, maxSoFar].
   *    The size of this range is maxSoFar - 1 + 1 = maxSoFar. After placing a
   *    number, the next state is i + 1, maxSoFar, remain. We move to the next
   *    index, and maxSoFar and remain are unchanged since we didn't place a new
   *    maximum. Thus, the total possibilities is
   *    maxSoFar * dp(i + 1, maxSoFar, remain).
   *
   *    We place a number that is a new maximum. How many ways are there to do
   *    this? The range of numbers we could choose from is [maxSoFar + 1, m].
   *    Let's say that we choose a number num from this range. The state would
   *    be i + 1, num, remain - 1. We move to the next index, maxSoFar is
   *    updated, and we placed a new maximum. We need to try all possibilities
   *    in the range [maxSoFar + 1, m].
   *
   * This gives us a recursive solution. Unfortunately, this solution is too
   * slow as many states will be visited an exponential number of times. To
   * solve this, we will memoize our dp function. The first time we solve a
   * state, we will save the result in memory. The next time we visit the same
   * state, we will refer to the result we saved instead of recalculating it.
   * Also, remember that we need to perform operations modulo 10^9 + 7
   */

  const MOD = 1e9 + 7
  const memo = new Array(n)
    .fill()
    .map((_) => new Array(m + 1).fill().map((_) => new Array(k + 1)))

  /**
   * @param {number} i
   * @param {number} maxSoFar
   * @param {number} remain
   * @return {number}
   */
  const dp = (i, maxSoFar, remain) => {
    if (i === n) return remain === 0 ? 1 : 0
    if (remain < 0) return 0
    if (memo[i][maxSoFar][remain]) return memo[i][maxSoFar][remain]

    let result = 0

    // Adicionamos os resultados de dp(i+1, maxSoFar, remain) um a um devido ao
    // módulo. Se simplesmente multiplicarmos o resultado de dp por maxSoFar,
    //  há a possibilidade de estourarmos os limites da variável.
    for (let num = 0; num < maxSoFar; num++)
      result = result + (dp(i + 1, maxSoFar, remain) % MOD)

    for (let newMax = maxSoFar + 1; newMax <= m; newMax++)
      result = result + (dp(i + 1, newMax, remain - 1) % MOD)

    return (memo[i][maxSoFar][remain] = result)
  }

  return dp(0, 0, k)
}

/**
 * @param {number} n
 * @param {number} m
 * @param {number} k
 * @return {number}
 */
const numOfArrays_dp_bottom_up = (n, m, k) => {
  /**
   * We can also implement this dynamic programming algorithm iteratively.
   * In top-down, we start at the answer state i = 0, maxSoFar = 0, remain = k
   * and make recursive calls until we reach our base cases. In bottom-up,
   * we will iterate starting from the base cases toward our answer state.
   *
   * Instead of using a recursive function, we will use a 3d table also called
   * dp. Here, dp[i][maxSoFar][remain] is equal to dp(i, maxSoFar, remain) from
   * the previous approach. To convert a top-down algorithm to a bottom-up one,
   * we can do the following:
   *
   * First, set the base cases in your dp table. As we initialize dp with values
   * of 0, we need to manually set the base case of 1 when i = n and remain = 0.
   * We can set dp[n][...][0] = 1, where ... represents all indices.
   *
   * Next, we need to configure our for loops. We want one nested for loop per
   * state variable, and we want the innermost loop to represent one state,
   * analogous to a function call from the previous approach. We will iterate
   * starting away from the answer state, moving toward it.
   *
   *      1. Our loop for i will start at n - 1 and iterate until 0.
   *
   *      2. Our loop for maxSoFar will start at m and iterate until 0.
   *
   *      3. Our loop for remain will start at 0 and iterate until k.
   *
   * Now, within each iteration of the innermost loop, we will calculate the
   * state i, maxSoFar, remain just like we did in the previous approach. Note
   * that we need to be careful here - if remain = 0, we should not consider the
   * case of placing a new maximum at all, since remain - 1 will be a negative
   * index.
   *
   * Finally, we can return dp[0][0][k], analogous to dp(0, 0, k), the answer
   * to the original problem.
   */

  const MOD = 1e9 + 7

  // Na solução bottom-up nós simulamos a condição de retorno da função
  // recursiva da solução top-down com uma matriz cujas dimensões correspondem
  // ao parâmetros da função. Há um paraleleo entre a matriz do bottom-up e
  // aquela usada para memoization no top-down. No entanto, a condição de
  // retorno da função (i === n) não requer memoization, mas deve ser simulada
  // pela matriz. Por esse motivo, a dimensão de i no bottom-up tem comprimento
  // n+1, enquanto que a matriz de memoization no top-down tem comprimento n.
  const dp = new Array(n + 1)
    .fill()
    .map((_) => new Array(m + 1).fill().map((_) => new Array(k + 1).fill(0)))

  for (let num = 0; num <= m; num++) {
    dp[n][num][0] = 1
  }

  for (let i = n - 1; i >= 0; i--) {
    for (let maxSoFar = m; maxSoFar >= 0; maxSoFar--) {
      for (let remain = 0; remain <= k; remain++) {
        let result = 0
        for (let num = 1; num <= maxSoFar; num++) {
          result = (result + dp[i + 1][maxSoFar][remain]) % MOD
        }
        if (remain > 0) {
          for (let num = maxSoFar + 1; num <= m; num++) {
            result = (result + dp[i + 1][num][remain - 1]) % MOD
          }
        }
        dp[i][maxSoFar][remain] = result
      }
    }
  }

  return dp[0][0][k]
}

/**
 * @param {number} n
 * @param {number} m
 * @param {number} k
 * @return {number}
 */
const numOfArrays_dp_optimized = (n, m, k) => {
  /**
   * Approach 3: Space-Optimized Dynamic Programming
   *
   * Notice that in the previous two approaches, when we calculate a state i,
   * max_so_far, remain, we only depend on values of dp[i + 1]. For example,
   * when the outermost for loop has i = 6, we only reference values in dp[7].
   * Values that we previously calculated in dp[8], dp[9], dp[10] etc. are no
   * longer required.
   *
   * We can use this observation to improve our space complexity. We only need
   * to store the current row dp[i] and previous row dp[i + 1]. We will resize
   * dp so that it has dimensions m * k, and use a second array (of the same
   * size) prevDp. At any given iteration, dp is analogous to dp[i] from the
   * previous approach, and prevDp is analogous to dp[i + 1] from the previous
   * approach.
   *
   * We will reset dp whenever we move to a new value of i. When we finish
   * calculating dp for a value of i, we update prevDp = dp so that on the next
   * iteration, prevDp holds the correct values.
   *
   * Because our first value of i is n - 1, prevDp initially holds dp[n] from
   * the previous approach. This means we must initialize our base case in
   * prevDp. The final value of i is 0, so dp will represent dp[0] from the
   * previous approach. We can return dp[0][k] as the answer to the original
   * problem.
   */

  const MOD = 1e9 + 7

  let prevDp = new Array(m + 1).fill().map((_) => new Array(k + 1).fill(0))
  for (let num = 1; num <= m; num++) prevDp[num][0] = 1

  for (let i = n - 1; i >= 0; i--) {
    const dp = new Array(m + 1).fill().map((_) => new Array(k + 1))
    for (let maxSoFar = m; maxSoFar >= 0; maxSoFar--) {
      for (let remain = 0; remain <= k; remain++) {
        let result = 0
        for (let num = 1; num <= maxSoFar; num++) {
          result = (result + prevDp[maxSoFar][remain]) % MOD
        }
        if (remain > 0) {
          for (let num = maxSoFar + 1; num <= m; num++) {
            result = result + prevDp[num][remain - 1]
          }
        }
        dp[maxSoFar][remain] = result
      }
    }
    prevDp = dp
  }

  return prevDp[0][k]
}

/**
 * @param {number} n
 * @param {number} m
 * @param {number} k
 * @return {number}
 */
const numOfArrays_dp_prefix_sum = (n, m, k) => {
  /**
   * Approach 4: A Different DP + Prefix Sums
   * 
   * Let's look at the dynamic programming in a different way. It will allow us 
   * to optimize the time complexity through prefix sums. In the previous two 
   * approaches, we had O(n*m*k) states and each state required O(m) to 
   * calculate. Is there a way that we can rid of this extra O(m)?
   * 
   * In our original DP, our state (i, maxSoFar, remain) represented the 
   * following idea:
   * 
   *    We have placed i elements so far.
   * 
   *    The maximum element we placed so far is maxSoFar.
   * 
   *    We must place remain more new maximums.
   * 
   *    Given this information, how many ways could we place elements such that 
   *    we will eventually place n elements with remain = 0?
   * 
   * Let's change the DP to represent this idea, replacing maxSoFar -> maxNum 
   * and remain -> cost:
   * 
   *    There is an array of length i.
   * 
   *    The maximum element in this array is maxNum.
   * 
   *    If you were to move from left to right, you would encounter cost new 
   *    maximums.
   * 
   *    How many ways can you build this array?
   * 
   * As you can see, our original DP was in the context of "Given the state of 
   * an array we are building, how many ways can we finish?", while this new DP 
   * is in the context of "How many ways can we build an array that looks like 
   * this?".
   * 
   * The answer to this new DP will be the sum of dp[n][maxNum][k] for 
   * all values of maxNum in the range [1, m]. It represents all possible arrays 
   * of length n with k new maximums.
   * 
   * What is our base case? If i = 1, it means the array only has one element. 
   * It is valid if cost is also equal to 1, because any array of length 1 that 
   * goes through the algorithm in the problem description will have 
   * search_cost = 1 (the number itself is a new maximum).
   * 
   * To calculate a given state (i, maxNum, cost), we have two cases, similar to 
   * the previous DP:
   * 
   *    The most recently added number to the array was not a new maximum. That 
   *    means it could have any value from [1, maxNum]. The size of this range 
   *    is maxNum. Any of these numbers could have been added to an array with 
   *    size i - 1, maximum value maxNum, and cost new maximums. Thus, there are 
   *    maxNum * dp[i - 1][maxNum][cost] ways we could have reached this state.
   * 
   *    The most recently added number to the array was a new maximum. The    
   *    previous maximum value in the array must have been in the range 
   *    [1, maxNum - 1]. Let's say it was num. Then we must have arrived at this 
   *    state from an array of length i - 1, with a maximum value of num, and 
   *    cost - 1 new maximums. The total number of ways we could have reached 
   *    this state is the sum of dp[i - 1][num][cost - 1] for all num in the 
   *    range [1, maxNum - 1].
   * 
   * As you can see, the recurrence relation in this DP is quite similar to our 
   * old one. Here is an example recursive implementation of this new DP in 
   * Python to help you visualize the algorithm:
   * 
  class Solution:
    def numOfArrays(self, n: int, m: int, k: int) -> int:
        dp = [[[0] * (k + 1) for _ in range(m + 1)] for __ in range(n + 1)]
        MOD = 10 ** 9 + 7
        
        for num in range(1, m + 1):
            dp[1][num][1] = 1
            
        for i in range(1, n + 1):
            for max_num in range(1, m + 1):
                for cost in range(1, k + 1):                    
                    ans = (max_num * dp[i - 1][max_num][cost]) % MOD
                    
                    for num in range(1, max_num):
                        ans = (ans + dp[i - 1][num][cost - 1]) % MOD

                    dp[i][max_num][cost] += ans
                    dp[i][max_num][cost] %= MOD
    
        ans = 0
        for num in range(1, m + 1):
            ans = (ans + dp[n][num][k]) % MOD
        
        return ans
   * 
   * But what was the point of this? We still have an O(m) for loop when 
   * calculating a state.
   * 
   * The expensive part of the recurrence relation is iterating from 1 to maxNum 
   * to find all dp[i - 1][...][cost - 1]. We can optimize this using prefix 
   * sums to achieve an O(1) complexity.
   * 
   * We will have a prefix sum array which is the same size as dp. We will have:
   * 
   *    prefix[i][maxNum][cost] = 
   *      dp[i][0][cost] + 
   *      dp[i][1][cost] + ... + 
   *      dp[i][maxNum][cost]
   * 
   * Essentially, for a given (i, cost) pair, we can query a value of maxNum and 
   * find the sum of all dp[i][num][cost] where num is in the range [0, maxNum]. 
   * You may notice that this is almost exactly what we are calculating in the 
   * for loop for each state!
   * 
   * For each state i, maxNum, cost, we can replace the for loop with 
   * prefix[i - 1][maxNum - 1][cost - 1], which is O(1)!
   * 
   * How do we maintain prefix? To calculate prefix[i] for a given maxNum, cost 
   * pair, we simply reference prefix[i][maxNum - 1][cost] and add it to 
   * dp[i][maxNum][cost]. Remember that this is a prefix sum on the maxNum 
   * dimension, so prefix[i][maxNum - 1][cost] is the previous element, and 
   * dp[i][maxNum][cost] is the current value.
   * 
   * For each iteration of i, we require prefix[i - 1] to calculate dp[i]. To 
   * ensure the convenient calculation of dp[i + 1] for the subsequent index 
   * i + 1, we can build prefix[i] while calculating dp[i]. Once we move to the 
   * next index i + 1, prefix[i] will hold the necessary information. For 
   * example, when i = 7, we require data from prefix[6]. We calculate prefix[7] 
   * during this iteration. Then, in the next iteration when i = 8, we require 
   * data from prefix[7], which we have just calculated.
   * 
   * When the algorithm is finished running, we can return prefix[n][m][k], 
   * which represents the answer to the original problem (the sum of all 
   * dp[n][...][k]).
   */
  const MOD = 1e9 + 7

  const dp = new Array(n + 1)
    .fill()
    .map((_) => new Array(m + 1).fill().map((_) => new Array(k + 1).fill(0)))

  const prefix = new Array(n + 1)
    .fill()
    .map((_) => new Array(m + 1).fill().map((_) => new Array(k + 1).fill(0)))

  for (let num = 1; num <= m; num++) {
    dp[1][num][1] = 1
    prefix[1][num][1] = prefix[1][num - 1][1] + 1
  }

  for (let i = 1; i <= n; i++) {
    for (let maxNum = 1; maxNum <= m; maxNum++) {
      for (let cost = 1; cost <= k; cost++) {
        let result = (maxNum * dp[i - 1][maxNum][cost]) % MOD
        result = (result + prefix[i - 1][maxNum - 1][cost - 1]) % MOD

        dp[i][maxNum][cost] += result
        dp[i][maxNum][cost] %= MOD

        prefix[i][maxNum][cost] =
          prefix[i][maxNum - 1][cost] + dp[i][maxNum][cost]
        prefix[i][maxNum][cost] %= MOD
      }
    }
  }

  return prefix[n][m][k]
}

/**
 * @param {number} n
 * @param {number} m
 * @param {number} k
 * @return {number}
 */
const numOfArrays_prefix_optimized = (n, m, k) => {
  /**
   * Approach 5: Space-Optimized Better DP
   *
   * Just like approach 3, we can optimize space by realizing that dp[i] only
   * depends on dp[i - 1] and prefix[i - 1]. We will use four arrays, all
   * sized m * k. At any given iteration of i,
   *
   *    1. dp is analogous to dp[i]
   *    2. prefix is analogous to prefix[i]
   *    3. prevDp is analogous to dp[i - 1]
   *  4. prevPrefix is analogous to prefix[i - 1]
   *
   * For more details on how exactly this idea works, please read approach 3
   * carefully. We are applying the exact same process here.
   */

  const MOD = 1e9 + 7

  let prevDp = new Array(m + 1).fill().map((_) => new Array(k + 1).fill(0))
  let prevPrefix = new Array(m + 1).fill().map((_) => new Array(k + 1).fill(0))

  for (let i = 1; i <= n; i++) {
    const dp = new Array(m + 1).fill().map((_) => new Array(k + 1).fill(0))
    if (i === 1) {
      for (let num = 1; num <= m; num++) {
        dp[num][1] = 1
      }
    }
    const prefix = new Array(m + 1).fill().map((_) => new Array(k + 1).fill(0))

    for (let maxNum = 1; maxNum <= m; maxNum++) {
      for (let cost = 1; cost <= k; cost++) {
        let result = (maxNum * prevDp[maxNum][cost]) % MOD
        result = (result + prevPrefix[maxNum - 1][cost - 1]) % MOD

        dp[maxNum][cost] += result
        dp[maxNum][cost] %= MOD

        prefix[maxNum][cost] = prefix[maxNum - 1][cost] + dp[maxNum][cost]
        prefix[maxNum][cost] %= MOD
      }
    }
    prevDp = dp
    prevPrefix = prefix
  }

  return prevPrefix[m][k]
}

// prettier-ignore
const funcs = [
  // numOfArrays_dp_top_down,
  // numOfArrays_dp_bottom_up,
  // numOfArrays_dp_optimized,
  // numOfArrays_dp_prefix_sum,
  numOfArrays_prefix_optimized,
]

const data = [
  [2, 3, 1, 6],
  [5, 2, 3, 0],
  [9, 1, 1, 1],
]

for (const func of funcs) {
  for (const [n, m, k, expected] of data) {
    console.log(func(n, m, k) === expected)
  }
}
