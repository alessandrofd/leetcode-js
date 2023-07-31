/**
 * The printer can only print a sequence of the same character each time.
 *
 * At each turn, the printer can print new characters starting from and ending
 * at any place and will cover the original existing characters.
 *
 * Given a string s, return the minimum number of turns the printer needed to
 * print it.
 *
 * Constraints:
 *     1 <= s.length <= 100
 *     s consists of lowercase English letters.
 */

/**
 * In this article, we will denote the ith character of the string s as si, and
 * the substring from the lth to the rt character (inclusive) as sl..r
 *
 *    Let s = leetcode. Then s4 = c, s7 = e, s4..7 = code.
 *
 * One can represent each strange printer operation with a triplet (c, l, r)
 * meaning that it prints the character c over the substring sl..r.
 *
 * Consider two examples.
 *
 *    When one needs to print s = aba, the first step is to print aaa (3
 *    occurrences of a) and then transform it into aba in one operation.
 *
 *    To print leetcode, we first print eeeeeeee (8 occurrences of e) and then
 *    transform it into leetcode: eeeeeeee → leeeeeee → leeteeee → leetceee →
 *    leetcoee → leetcode.
 *
 * Take a closer look at the sequences of operations in these two examples.
 * For all operations (c, l, r), c = sr holds.
 *
 * In the first example, we have s = aba and the operations:
 *
 *    (a, 0, 2) prints the character a over the entire string s. Here we have
 *    c = a, l = 0, r = 2. The character c = a equals sr = s2 = a.
 *
 *    (b, 1, 1) prints b at the index 1 (the range of this operation contains
 *    only one position). Again, c = b equals s1 = b.
 *
 * In the second example, s = leetcode. The operations are:
 *
 *    (e, 0, 7) prints the character c =s7 = e over the entire string s.
 *
 *    (l, 0, 0) prints c = s0 = l at the index 0.
 *
 *    (t, 3, 3) prints c = s3 = t at the index 3.
 *
 *    (c, 4, 4) prints c = s4 = c at the index 4.
 *
 *    (o, 5, 5) prints c = s5 = o at the index 5.
 *
 *    (d, 6, 6) prints c = s6 = d at the index 6.
 *
 * Now, we want to prove the following lemma.
 *
 *    Lemma. There exists at least one optimal sequence, where for each
 *    operation (c, l, r), c = sr holds.
 *
 * Proof. Consider an optimal answer (with the minimum number of operations) not
 * satisfying the condition, i.e. containing a "bad" operation (c, l, r) with
 * c != sr. Immediately after this operation, the character at the rth position
 * is c, but in the end, it must be sr, meaning that printing c at the rth
 * position was useless. Thus one can safely replace the operation (c, l, r)
 * with (c, l, r - 1). Note, that (c, l, r - 1) might still be "bad", i.e.
 * satisfying c != sr−1.
 *
 * One can replace "bad" operations (c, l, r) with (c, l, r - 1) iteratively
 * until there are no more "bad" operations in the sequence. At the end of this
 * iterative process, each triplet (c, l, r) will satisfy c = sr. Since the new
 * sequence remains optimal (the number of operations did not increase), we have
 * proved the lemma.
 *
 * We will seek a solution to the problem among the sequences satisfying the
 * condition in the lemma.
 *
 * INTUITION
 *
 * To solve the problem, we break it down into smaller subproblems. One way to
 * do this is to consider all possible substrings of the input string and find
 * the minimum number of operations required to print each substring using the
 * strange printer.
 *
 * Given a pair of indices (l, r), consider a string t of length r - l + 1 that
 * only has the character sr.
 *
 * Let dp[l][r] be the minimum number of operations needed to transform t into
 * the substring sl..r. Notice how this dp definition is based on choosing to
 * print on the indices [l, r], and then figuring out how many operations will
 * be needed after.
 *
 *    For example, let s = leetcode.
 *      dp[1][5] = 3 is the number of operations to transform ooooo into eetco.
 *      dp[4][7] = 3 is the answer for transforming eeee into code.
 *
 * The base cases of this DP are the substrings entirely consisting of the same
 * character. For such of these substrings, dp[l][r] = 0, since one does not
 * have to do any operations.
 *
 *    For example, for s = leetcode, dp[1][2] = 0, because transforming ee into
 *    ee requires 0 operations.
 *
 * Now we need to write down the transitions for this DP.
 *
 * Consider a substring sl..r containing at least two distinct characters. Let j
 * be the leftmost index such that j ≥ l and sj != sr (the first character in
 * the range that doesn't equal the last character in the range).
 *
 * We want to transform the string of r - l + 1 occurrences of sr into sl..r.
 * Since sj != sr, we will eventually have to change the character at the jth
 * position by printing another character over it. The characters in the
 * substring sl..j−1 are all equal to sr (based on how we defined j), so we will
 * not worry about them anymore for the rest of the algorithm. Now, we focus on
 * the range [j, r].
 *
 * Consider the first operation that prints at the position j. We know that we
 * start printing at position j, but we do not know where we end. Let's call the
 * ending position i so that the operation is (si, j, i).
 *
 * Let's see what happens for a fixed i.
 *
 *    With the operation (si, j, i) we print the character si over the substring
 *    sj..i. After that, the problem reduces to two independent smaller problems.
 *
 *    Now the segment sj..i contains j - i + 1 occurrences of si. By definition
 *    of DP, it takes dp[j][i] operations to "fix" this segment.
 *
 *    The segment si+1..r contains r - i occurrences of sr (remember that
 *    originally, we have [l, r] all equal to sr, and we didn't override the
 *    range [i + 1, r] with the operation (si, j, i). Similarly, it takes
 *    dp[i+1][r] operations to "fix" it.
 *
 * For a fixed i, the answer is 1+ dp[j][i] + dp[i+1][r]. To find dp[l][r], we
 * first find j according to how we defined it above, then we try all possible
 * j <= i < r and take the minimum value from the recurrence just defined.
 *
 * The length of the substring sl..r is r - l + 1, we will denote it length.
 * Since length = r - l + 1, thus r = l + length - 1.
 *
 * Since we calculate the value of dp for larger substrings via the smaller
 * ones, we need to compute dp for strings in ascending order of their length:
 * first consider the substrings having length = 1, then length = 2, etc.
 *
 * Now we need to find the answer to the problem using DP.
 *
 * Let n be the size of s.
 *
 * Our first operation should always be to print the final character of s
 * n times. Then, we transform this string into ss in dp[0][n - 1] operations.
 * We need to start with this print operation because of the lemma we proved
 * before; it is the only way we can get the last character printed optimally.
 *
 * The answer to the problem is dp[0][n - 1] + 1. The +1 is due to the first
 * print operation which is not considered in the DP.
 */

/**
 * @param {string} s
 * @return {number}
 */
const strangePrinter_bottom_up_dp = (s) => {}

const strangePrinter_top_down_dp = (s) => {}

s = 'aaabbb'
// Expected: 2

s = 'aba'
// Expected: 2

console.log(strangePrinter_bottom_up_dp(s))
console.log(strangePrinter_top_down_dp(s))
