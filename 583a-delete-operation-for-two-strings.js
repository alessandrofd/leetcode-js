/**
 * Given two strings word1 and word2, return the minimum number of steps
 * required to make word1 and word2 the same.
 *
 * In one step, you can delete exactly one character in either string.
 *
 * Constraints:
 *    1 <= word1.length, word2.length <= 500
 *    word1 and word2 consist of only lowercase English letters.
 */

/**
 * Approach #1 Using Longest Common Subsequence [Time Limit Exceeded]
 *
 * In order to determine the minimum number of delete operations needed, we can
 * make use of the length of the longest common sequence among the two given
 * strings s1 and s2, say given by lcs. If we can find this lcs value, we can
 * easily determine the required result as m + n - 2*lcs. Here, m and n refer to
 * the length of the two given strings s1 and s2.
 *
 * The above equation works because in case of complete mismatch(i.e. if the two
 * strings can't be equalized at all), the total number of delete operations
 * required will be m + n. Now, if there is a common sequence among the two
 * strings of length lcs, we need to do lcs lesser deletions in both the strings
 * leading to a total of 2lcs lesser deletions, which then leads to the above
 * equation.
 *
 * In order to find the length of the longest common sequence, we make use of a
 * recursive function lcs(s1,s2,i,j) which returns the length of the longest
 * common sequence among the strings s1 and s2 considering their lengths upto i
 * and j respectively. For evaluating the function, we check if the characters
 * s1[m-1] and s2[n-1] for equality. If they match, we can consider the
 * corresponding strings upto 1 lesser lengths since the last characters have
 * already been considered and add 1 to the result to be returned for strings of
 * 1 lesser lengths. Thus, we make the function call lcs(s1, s2, i-1, j-1).
 *
 * If the last characters don't match, we have two options, either we can
 * consider the second last character of s1 and the last character of 2s2, or we
 * can consider the second last character of s2 and the last character of s1. We
 * need to consider the larger result obtained out of the two considerations for
 * getting the required length.
 *
 * Thus, the function call lcs(s1,s2,m,n) returns the required lcs value.
 */

/**
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */

const minDistance_lcs = (word1, word2) => {}

// Approach #2 Longest Common Subsequence with Memoization [Accepted]

/**
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */

const minDistance_lcs_memo = (word1, word2) => {}

/**
 * Approach #3 Using Longest Common Subsequence- Dynamic Programming [Accepted]
 *
 * Another method to obtain the value of lcslcslcs is to make use of Dynamic
 * Programming. We'll look at the implemenation and carry-on alongside the idea
 * behind it.
 *
 * We make use of a 2-D dp, in which dp[i][j] represents the length of the
 * longest common subsequence among the strings s1 and s2 considering their
 * lengths upto (i−1)th index and (j−1)th index only respectively. We fill the
 * dp array in row-by-row order.
 *
 * In order to fill the entry for dp[i][j], we can have two cases:
 *
 *    The characters s1[i−1] and s2[j-1] match with each other. In this case,
 *    the entry for dp[i][j] will be one more than the entry obtained for the
 *    strings considering their lengths upto one lesser index, since the matched
 *    character adds one to the length of LCS formed till the current indices.
 *    Thus, the dp[i][j] entry is updated as dp[i][j] = 1 + dp[i-1][j-1]. Note
 *    that dp[i-1][j-1] has been used because the matched character belongs to
 *    both s1 and s2.
 *
 *    The characters s1[i−1] and s2[j−1] don't match with each other. In this
 *    case, we can't increment the current entry as compared to entries
 *    corresponding to the previous indices, but we need to replicate the
 *    previous entry again to indicate that the length of LCS upto the current
 *    indices also remains the same. But, which entry to pick up? Now, since the
 *    current character hasn't matched, we have got two options. We can remove
 *    the current character from consideration from either s1 or s2 and use the
 *    corresponding dp entries given by dp[i−1][j] and dp[i][j−1] respectively.
 *    Since we are considering the length of LCS upto the current indices we
 *    need to pick up the larger entry out of these two to update the current dp
 *    entry.
 *
 *    At the end, again, we obtain the number of deletions required as
 *    m + n - 2*dp[m][n], where m and n refer to the lengths of s1 and s2.
 *    dp[m][n] now refers to the length of LCS among the two given strings.
 *
 *    OBS: As soluções acima também são DP, mas top down (ou recursiva),
 *    enquanto a solução abaixo é bottom up (ou iterativa)
 */

/**
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
const minDistance_lcs_bottom_up_dp = (word1, word2) => {}

/**
 * Approach #4 Without using LCS Dynamic Programmming [Accepted]:
 *
 * Instead of finding the length of LCS and then determining the number of
 * deletions required, we can make use of Dynamic Programming to directly
 * determine the number of deletions required till the current indices of the
 * strings.
 *
 * In order to do so, we make use of a 2-D dp array. Now, dp[i][j] refers to the
 * number of deletions required to equalize the two strings if we consider the
 * strings' length upto (i−1)th index and (j−1)th index for s1 and s2
 * respectively. Again, we fill in the dp array in a row-by-row order. Now, in
 * order to fill the entry for dp[i][j], we need to consider two cases only:
 *
 *    The characters s1[i−1] and s2[j−1] match with each other. In this case, we
 *    need to replicate the entry corresponding to dp[i−1][j−1] itself. This is
 *    because, the matched character doesn't need to be deleted from any of the
 *    strings.
 *
 *    The characters s1[i−1] and s2[j−1] don't match with each other. In this
 *    case, we need to delete either the current character of s1 or s2. Thus, an
 *    increment of 1 needs to be done relative to the entries corresponding to
 *    the previous indices. The two options available at this moment are
 *    dp[i−1][j]d and dp[i][j−1]. Since, we are keeping track of the minimum
 *    number of deletions required, we pick up the minimum out of these two
 *    values.
 *
 *    At the end, dp[m][n] gives the required minimum number of deletions. Here,
 *    m and n refer to the lengths of s1 and s2.
 */

/**
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
const minDistance_deletes_bottom_up_dp = (word1, word2) => {}

/**
 * Approach #5 1-D Dynamic Programming [Accepted]:
 * 
 * We can observe that in the last approach, in order to update the current dp 
 * entries, we need only the values of the previous row of dp. Thus, rather than 
 * using a 2-D array, we can do the same job by making use of a 1-D dp array.
 * 
 * Thus, now, dp[i] refers to the number of deletions that need to be made in 
 * order to equalize the strings s1 and s2 if we consider string s1 upto the 
 * (i−1)th index and string s2 upto the last to current index of s2.
 * 
 * Now, we make the updations for the current row in an array temp of the same 
 * size as dp, and use the dp entries as if they correspond to the previous 
 * row's entries. When, the whole temp array has been filled, we copy it the dp 
 * array so that dp array now reflects the new row's entries.

 */

/**
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */

const minDistance_deletes_bottom_up_1D_dp = (word1, word2) => {}

word1 = 'sea'
word2 = 'eat'
// Expected: 2

// word1 = 'leetcode'
// word2 = 'etco'
// Expected: 4

console.log(minDistance_lcs(word1, word2))
console.log(minDistance_lcs_memo(word1, word2))
console.log(minDistance_lcs_bottom_up_dp(word1, word2))
console.log(minDistance_deletes_bottom_up_dp(word1, word2))
console.log(minDistance_deletes_bottom_up_1D_dp(word1, word2))
