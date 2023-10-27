const longestPalindrome = (s) => {
  let ll = 0,
    rr = 0

  for (let i = 0; i < s.length; i++)
    for (j of [i, i + 1])
      for (l = i, r = j; s[l] && s[l] === s[r]; l--, r++)
        [ll, rr] = r - l > rr - ll ? [l, r] : [ll, rr]
  return s.substring(ll, rr + 1)
}
