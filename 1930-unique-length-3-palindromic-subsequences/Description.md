### 1930. Unique Length-3 Palindromic Subsequences

Given a string `s`, return _the number of **unique palindromes of length three** that are a **subsequence** of `s`_.

Note that even if there are multiple ways to obtain the same subsequence, it is still only counted once.

A **palindrome** is a string that reads the same forwards and backwards.

A **subsequence** of a string is a new string generated from the original string with some characters (can be none) deleted without changing the relative order of the remaining characters.

-   For example, `"ace"` is a subsequence of <code>"<ins>a</ins>b<ins>c</ins>d<ins>e</ins>"</code>.

##### Example 1:

**Input**: s = "aabca"
**Output**: 3
**Explanation**: The 3 palindromic subsequences of length 3 are:

-   "aba" (subsequence of "<ins>a</ins>a<ins>b</ins>c<ins>a</ins>")
-   "aaa" (subsequence of "<ins>aa</ins>bc<ins>a</ins>")
-   "aca" (subsequence of "<ins>a</ins>ab<ins>c</ins><ins>a</ins>")

##### Example 2:

**Input**: s = "adc"
**Output**: 0
**Explanation**: There are no palindromic subsequences of length 3 in "adc".

##### Example 3:

**Input**: s = "bbcbaba"
**Output**: 4
**Explanation**: The 4 palindromic subsequences of length 3 are:

-   "bbb" (subsequence of "<ins>bb</ins>c<ins>b</ins>aba")
-   "bcb" (subsequence of "<ins>b</ins>b<ins>cb</ins>aba")
-   "bab" (subsequence of "<ins>b</ins>bcb<ins>ab</ins>a")
-   "aba" (subsequence of "bbcb<ins>aba</ins>")

#### Constraints:

-   <code>3 <= s.length <= 10<sup>5</sup></code>
-   `s` consists of only lowercase English letters.
