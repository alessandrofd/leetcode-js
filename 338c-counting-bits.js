/**
 * Given an integer n, return an array ans of length n + 1 such that for each i
 * (0 <= i <= n), ans[i] is the number of 1's in the binary representation of i.
 *
 * Constraints:
 *    0 <= n <= 10^5
 */

/**
 * @param {number} n
 * @return {number[]}
 */
const countBits_pattern = (n) => {}

/**
 * @param {number} n
 * @return {number[]}
 */
const countBits_shift = (n) => {}

const funcs = [countBits_pattern, countBits_shift]

const data = [
  [2, [0, 1, 1]],
  [5, [0, 1, 1, 2, 1, 2]],
]

for (const func of funcs) {
  for (const [n, expected] of data) {
    console.log(func(n))
  }
}

for (let i = 0; i <= 15; i++) {
  console.log(countBits_shift(i).at(-1))
}

/*
0 --> 0   --> 0
1 --> 1   --> 1

2 --> 10  --> 1
3 --> 11  --> 2

4 --> 100 --> 1
5 --> 101 --> 2
6 --> 110 --> 2
7 --> 111 --> 3

8  --> 1000 --> 1
9  --> 1001 --> 2
10 --> 1010 --> 2
11 --> 1011 --> 3
12 --> 1100 --> 2
13 --> 1101 --> 3
14 --> 1110 --> 3
15 --> 1111 --> 4
*/
