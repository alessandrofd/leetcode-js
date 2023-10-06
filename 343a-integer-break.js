/**
 * Given an integer n, break it into the sum of k positive integers, where
 * k >= 2, and maximize the product of those integers.
 *
 * Return the maximum product you can get.
 *
 * Constraints:
 *    2 <= n <= 58
 */

/**
 * @param {number} num
 * @return {number}
 */
const integerBreak_dp_top_down = (num) => {
  /*   
  Approach 1: Top-Down Dynamic Programming

  Let's say we have an integer num and split it into two integers: i and
  num - i. The highest product possible would be i * BEST, where BEST is the
  highest product possible from splitting up num - i.

  Notice that the variable BEST represents the original problem with a
  different input (num - i). This allows us to think in terms of dynamic
  programming. Let's define a function dp(num) that returns the highest
  possible product from splitting num up.

  We have the following base cases for this function:

      If num == 1, then it isn't possible to split the number up, so we just
      return 1.

      If num == 2, then it would be better to not split the number at all,
      since the only possible split 1 * 1 is less than 2, so just return 2.
      The exact same argument can be made for num == 3: the only possible
      split 1 * 2 is less than 3 itself, so just return 3.

  Otherwise, we have two options:

      Don't split the number up at all. We can initialize the answer as
      ans = num.

      Split the number. We can try all possible splits. Iterate i from 2
      until num. For each value of i, try to update ans with i * dp(num - i)
      if it is larger.

  You may be thinking: what about the constraint where we need to have at
  least 2 integers? We need to check for 2 separate cases before performing
  the recursion.

      If n == 2, we immediately return 1. The only possible split is 1 * 1.

      If n == 3, we immediately return 2. The only possible split is 1 * 2.

  We need to explicitly check for these cases before going into the recursion,
  otherwise, we would incorrectly return a larger answer since we initialize
  ans = num.

  For all other values of n, the recursion will work. Take a look at the first
  few numbers:

      For num = 4, we can do 2 * 2 = 4, which is not less than 4 itself.

      For num = 5, we can do 2 * 3 = 6, which is not less than 5 itself.

      For num = 6, we can do 3 * 3 = 9, which is not less than 6 itself.

  As you can see, as n increases, the product from splitting becomes larger
  and larger, and thus we will always satisfy the requirement of needing to
  perform at least one split. The only cases where performing a split results
  n a lower product is 2, 3.

  This solution will work, but you may notice that it will end up in a lot of
  duplicated computation. We will end up calculating many states multiple
  times. For example, if we called dp(15), it would make a call to dp(12)
  when calculating 3 * dp(12). If we later call dp(14), it will also make a
  call to dp(12) when calculating 2 * dp(12). To avoid computing the same
  states multiple times, we will use a technique called memoization. The first
  time we calculate dp(num), we will store the result. In the future, we can
  reference this result for num instead of having to recalculate it.
 */
  return 0
}

/**
 * @param {number} num
 * @return {number}
 */
const integerBreak_dp_bottom_up = (num) => {
  /*   
  Approach 2: Bottom-Up Dynamic Programming

  We can implement the same algorithm iteratively. In top-down, we start at
  the answer (num = n) and work our way down to the base cases (if num <= 3,
    return num).

  In bottom-up, we will start from these base cases and iterate toward the
  answer. We will use a table dp which is equivalent to the function from the
  previous approach. Here, dp[num] is equal to dp(num) from the previous
  approach.

  We have a for loop for num starting from 4 and iterating to n. Each
  iteration of this loop represents a state, like a function call. We can
  calculate this state the same way we did in the previous approach, by
  checking all possible splits with a for loop over i.
 */
  return 0
}

/**
 * @param {number} num
 * @return {number}
 */
const integerBreak_mathematics = (num) => {
  /*   
  Approach 3: Mathematics

  Interestingly, it is optimal to only split n into 2 and 3! Why is this the
  case? The following is not a strict mathematical proof, but gives an
  intuition as to why we should only split n into 2 and 3.

  The "inequality of arithmetic and geometric means" shows that to maximize
  the product of a set of numbers with a fixed sum, the numbers should all be
  equal. This means that we should split n into a copies of x.
  We have: n = a * x. So, a = n / x

  The product of these copies will be x ^ a, we will substitute a = n / x and
  represent this function as f.

  f(x)= x ^ (n / x)

  We need to maximize this function. Let's start by taking the derivative of
  f with respect to x (here, log⁡ is the natural logarithm).

  f'(x) = -n * x ^ ((n / x) - 2) * (log x - 1)

  Now, we set this equal to 0 and solve for x to find a critical point.

  The term x ^ ((n / x) - 2) converges to 0 as x tends to 0. However, we are
  clearly not interested in values of x less than 1, as that would lead to a
  product less than 1.

  This means f = 0 when (log x - 1) = 0. This is the case when
  x = e = 2.71828...

  f is maximized at e. Unfortunately, e is not an integer, and this problem
  is called Integer Break. The nearest integer is 3, which suggests that we
  should try to use 3 as much as we can.

  For numbers that are not divisible by 3, we will have remainders. This is
  where 2 comes in. For example, when n = 11, the maximum product is
  54 = 3 * 3 * 3 * 2.

  When we have n = 4, it is better to split it into 2 * 2 versus 3 * 1. Thus,
  the strategy of splitting into as many 3s as we can only applies when n > 4.
  This brings us to our algorithm. As long as n > 4, keep splitting 3s. Once
  n <= 4, we can just multiply it directly with whatever product we have built
  up to that point.

  Note that due to the constraint of needing to perform at least one split, we
  still need to account for the special cases when n <= 3.
 */
  return 0
}

/**
 * @param {number} num
 * @return {number}
 */
const integerBreak_equation = (num) => {
  /*   
  Approach 4: Equation

  Instead of manually multiplying by 3 repeatedly, we can use math to figure
  out how many 3s and 2s will make up the optimal product.

  First, we will again consider the cases when n <= 3 separately.

  Now, for n > 3, we have three possibilities:

      1. n % 3 == 0. If n is divisible by 3, then we can simply just break it
      into n / 3 3s.

      2. n % 3 == 1. If we were to break n into n / 3 3s, we would have a
      remainder of 1. As mentioned in the previous approach, it would be
      better to combine this 1 with one of the 3s to form a sum of 4, which we
      can break into 2 * 2. In this case, we break n into (n / 3) - 1  3s,
      and two 2s.

      3. n % 3 == 2. If we were to break n into n / 3 3s, we would have a
      remainder of 2. We simply break n into n / 3 3s and a single 2.
 */
  return 0
}

// prettier-ignore
const funcs = [
  integerBreak_dp_top_down,
  integerBreak_dp_bottom_up,
  integerBreak_mathematics,
  integerBreak_equation,
]

const data = [
  [2, 1],
  [10, 36],
]

for (const func of funcs) {
  for (const [num, expected] of data) {
    console.log(func(num) === expected)
  }
}
