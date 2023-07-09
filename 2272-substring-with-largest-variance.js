/**
 * The variance of a string is defined as the largest difference between
 * the number of occurrences of any 2 characters present in the string. Note
 * the two characters may or may not be the same.
 *
 * Given a string s consisting of lowercase English letters only, return
 * the largest variance possible among all substrings of s.
 *
 * A substring is a contiguous sequence of characters within a string.
 *
 * Constraints:
 *    1 <= s.length <= 10^4
 *    s consists of lowercase English letters.
 */

// O algoritmo de Kadane resolve o problema da máxima soma de um subarray.

// Considerando cada dupla de letras e atribuindo a elas os valores +1 e -1,
// podemos utilizaro o algoritmo de Kadane para resolver o problema.

// Temos que ter dois cuidados. Primeiro, não podemos contabilizar uma diferença
// entre ocorrência das letras sem que ambas estejam presentes. Segundo, não
// podemos zerar os contadores simplesmente quando a diferença entre
// as ocorrências for negativa. Em decorrência da necessidade da presença das
// duas letras, só podemos zerá-los quando ainda restar uma letra de valor
// negativa a ser processada.

/**
 * @param {string} s
 * @return {number}
 */
const largestVariance = (s) => {
  const codes = Array.from(s, (l) => l.charCodeAt() - 97)
  const freqs = Array(26).fill(0)
  for (const code of codes) freqs[code] += 1

  let maxVariance = 0

  for (let i = 0; i < 26; i++) {
    for (let j = 0; j < 26; j++) {
      if (i == j || freqs[i] === 0 || freqs[j] === 0) continue

      let major = 0
      let minor = 0
      let rest = freqs[j]

      for (const code of codes) {
        if (code === i) major += 1
        if (code === j) {
          minor += 1
          rest -= 1
        }

        const variance = major - minor

        if (minor > 0) maxVariance = Math.max(maxVariance, variance)
        if (variance < 0 && rest > 0) major = minor = 0
      }
    }
  }

  return maxVariance
}

// Podemos otimizar a solução filtrando apenas as ocorrências das letras da dupla
// que estamos analizando.

/**
 * @param {string} s
 * @return {number}
 */
const largestVariance_filtered = (s) => {
  const codes = Array.from(s, (l) => l.charCodeAt() - 97)
  const freqs = Array(26).fill(0)
  const idxs = new Array(26).fill().map((_) => [])

  for (let i = 0; i < codes.length; i++) {
    const code = codes[i]
    freqs[code] += 1
    idxs[code].push([i, code])
  }

  let maxVariance = 0

  for (let major = 0; major < 26; major++) {
    for (let minor = 0; minor < 26; minor++) {
      if (major == minor || freqs[major] === 0 || freqs[minor] === 0) continue

      let majorCount = 0
      let minorCount = 0
      let minorRest = freqs[minor]

      const filtered = idxs[major]
        .concat(idxs[minor])
        .sort(([a], [b]) => a - b)
        .map(([_, code]) => code)

      for (const code of filtered) {
        if (code === major) majorCount += 1
        if (code === minor) {
          minorCount += 1
          minorRest -= 1
        }

        const variance = majorCount - minorCount

        if (minorCount > 0) maxVariance = Math.max(maxVariance, variance)
        if (variance < 0 && minorRest > 0) majorCount = minorCount = 0
      }
    }
  }

  return maxVariance
}

s = 'aababbb'
// Expected: 3

s = 'abcde'
// Expected: 0

s = 'abbaaabzaabaaaaaaaaaaaaa'
// Expected: 18

console.log(largestVariance(s))
console.log(largestVariance_filtered(s))
