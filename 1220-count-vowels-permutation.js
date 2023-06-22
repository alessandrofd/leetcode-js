/**
 * Given an integer n, your task is to count how many strings of length n can be
 * formed under the following rules:
 *
 * Each character is a lower case vowel ('a', 'e', 'i', 'o', 'u')
 * Each vowel 'a' may only be followed by an 'e'.
 * Each vowel 'e' may only be followed by an 'a' or an 'i'.
 * Each vowel 'i' may not be followed by another 'i'.
 * Each vowel 'o' may only be followed by an 'i' or a 'u'.
 * Each vowel 'u' may only be followed by an 'a'.
 *
 * Since the answer may be too large, return it modulo 10^9 + 7. */

/**
 * @param {number} n
 * @return {number}
 */

// Approach 1: Dynamic Programming (Bottom-up)
const countVowelPermutation_1 = (n) => {
  const MOD = 10 ** 9 + 7
  const aCount = new Uint32Array(n)
  const eCount = new Uint32Array(n)
  const iCount = new Uint32Array(n)
  const oCount = new Uint32Array(n)
  const uCount = new Uint32Array(n)

  aCount[0] = 1
  eCount[0] = 1
  iCount[0] = 1
  oCount[0] = 1
  uCount[0] = 1

  for (let i = 1; i < n; i++) {
    aCount[i] = (eCount[i - 1] + iCount[i - 1] + uCount[i - 1]) % MOD
    eCount[i] = (aCount[i - 1] + iCount[i - 1]) % MOD
    iCount[i] = (eCount[i - 1] + oCount[i - 1]) % MOD
    oCount[i] = iCount[i - 1]
    uCount[i] = (iCount[i - 1] + oCount[i - 1]) % MOD
  }

  return (
    (aCount[n - 1] +
      eCount[n - 1] +
      iCount[n - 1] +
      oCount[n - 1] +
      uCount[n - 1]) %
    MOD
  )
}

// Approach 2: Dynamic Programming (Bottom-up) with Optimized Space
const countVowelPermutation_2_space = (n) => {
  const MOD = 1e9 + 7
  let aCount = 1,
    eCount = 1,
    iCount = 1,
    oCount = 1,
    uCount = 1

  for (let i = 1; i < n; i++) {
    const aCountNew = (eCount + iCount + uCount) % MOD
    const eCountNew = (aCount + iCount) % MOD
    const iCountNew = (eCount + oCount) % MOD
    const oCountNew = iCount
    const uCountNew = (iCount + oCount) % MOD

    aCount = aCountNew
    eCount = eCountNew
    iCount = iCountNew
    oCount = oCountNew
    uCount = uCountNew
  }

  return (aCount + eCount + iCount + oCount + uCount) % MOD
}

// Approach 3: Dynamic Programming (Top-down, Recursion)
const countVowelPermutation = (n) => {
  const MOD = 1e9 + 7
  const memo = new Array(n).fill().map((_) => new Uint32Array(5))

  const count = (i, vowel) => {
    if (memo[i][vowel]) return memo[i][vowel]
    if (i === 0) memo[i][vowel] = 1
    else {
      switch (vowel) {
        case 0:
          memo[i][vowel] =
            (count(i - 1, 1) + count(i - 1, 2) + count(i - 1, 4)) % MOD
          break
        case 1:
          memo[i][vowel] = (count(i - 1, 0) + count(i - 1, 2)) % MOD
          break
        case 2:
          memo[i][vowel] = (count(i - 1, 1) + count(i - 1, 3)) % MOD
          break
        case 3:
          memo[i][vowel] = count(i - 1, 2)
          break
        case 4:
          memo[i][vowel] = (count(i - 1, 2) + count(i - 1, 3)) % MOD
          break
      }
    }
    return memo[i][vowel]
  }

  let result = 0
  for (let i = 0; i < 5; i++) result = (result + count(n - 1, i)) % MOD
  return result
}

n = 1 // Output = 5
n = 2 // Output = 10
// n = 5 // Output = 68

console.log(countVowelPermutation(n))
