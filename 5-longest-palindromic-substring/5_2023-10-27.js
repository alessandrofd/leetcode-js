const longestPalindrome_brute_force = (s) => {
  const n = s.length

  const check = (start, length) => {
    let left = start
    let right = start + length - 1
    while (left < right) {
      if (s[left] !== s[right]) return false
      left += 1
      right -= 1
    }
    return true
  }

  for (let length = n; length >= 1; length--) {
    for (let start = 0; start <= n - length; start++) {
      if (check(start, length)) return s.slice(start, start + length)
    }
  }
}

const longestPalindrome_dp = (s) => {
  const n = s.length
  const dp = new Array(n).fill().map((_) => new Array(n).fill(false))

  for (let i = 0; i < n; i++) dp[i][i] = true
  let result = [0, 0]

  for (let i = 0; i < n - 1; i++) {
    if (s[i] === s[i + 1]) {
      dp[i][i + 1] = true
      result = [i, i + 1]
    }
  }

  for (let diff = 2; diff < n; diff++) {
    for (let i = 0; i < n - diff; i++) {
      const j = i + diff
      if (s[i] === s[j] && dp[i + 1][j - 1]) {
        dp[i][j] = true
        result = [i, j]
      }
    }
  }

  const [i, j] = result
  return s.slice(i, j + 1)
}

const longestPalindrome_expand_from_center = (s) => {
  const n = s.length

  const expand = (i, j) => {
    while (i >= 0 && j < n && s[i] === s[j]) {
      i -= 1
      j += 1
    }
    return j - i - 1
  }

  let result = [0, 0]
  let maxLength = 1

  for (let i = 0; i < n; i++) {
    const oddLength = expand(i, i)
    if (oddLength > maxLength) {
      const diff = Math.floor(oddLength / 2)
      result = [i - diff, i + diff]
      maxLength = oddLength
    }

    const evenLength = expand(i, i + 1)
    if (evenLength > maxLength) {
      const diff = evenLength / 2 - 1
      result = [i - diff, i + 1 + diff]
      maxLength = evenLength
    }
  }

  const [i, j] = result
  return s.slice(i, j + 1)
}

// prettier-ignore
const funcs = [
  // longestPalindrome_brute_force,
  // longestPalindrome_dp,
  longestPalindrome_expand_from_center,
]

const data = [
  ['babad', 'bab'],
  ['cbbd', 'bb'],
]

for (const func of funcs) {
  for (const [s, expected] of data) {
    console.log(func(s))
    console.log(func(s) === expected)
  }
}
