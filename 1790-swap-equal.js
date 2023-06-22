const areAlmostEqual1 = (s1, s2) => {
  // Não atende 'aa', 'bb'
  const hash = {}
  for (let i = 0; i < s1.length; i++) {
    if (s1[i] !== s2[i]) {
      hash[s1[i]] = (hash[s1[i]] || 0) + 1
      hash[s2[i]] = (hash[s2[i]] || 0) + 1
    }
  }
  const values = Object.values(hash)
  if (
    values.length === 0 ||
    (values.length === 2 && values.every((n) => n === 2))
  )
    return true
  return false
}

const areAlmostEqual = (s1, s2) => {
  // Não atende 'aa', 'bb'
  const hash1 = {},
    hash2 = {}

  for (let i = 0; i < s1.length; i++) {
    if (s1[i] !== s2[i]) {
      hash1[s1[i]] = (hash1[s1[i]] || 0) + 1
      hash2[s2[i]] = (hash2[s2[i]] || 0) + 1
    }
  }

  const entries = Object.entries(hash1)
  if (
    entries.length === 0 ||
    (entries.length === 2 &&
      entries.every(([k, v]) => hash2.hasOwnProperty(k) && v === 1))
  )
    return true
  return false
}

console.log(areAlmostEqual('bank', 'kanb'))
console.log(areAlmostEqual('kelb', 'kelb'))
console.log(areAlmostEqual('attack', 'defend'))
console.log(areAlmostEqual('aa', 'bb'))
console.log(areAlmostEqual('qgqeg', 'gqgeq'))
