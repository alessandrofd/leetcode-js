/**
 * The string "PAYPALISHIRING" is written in a zigzag pattern on a given number
 * of rows like this: (you may want to display this pattern in a fixed font for
 * better legibility)
 *
 * P   A   H   N
 * A P L S I I G
 * Y   I   R
 *
 * And then read line by line: "PAHNAPLSIIGYIR"
 *
 * Write the code that will take a string and make this conversion given a
 * number of rows.
 *
 * Constraints:
 *    1 <= s.length <= 1000
 *    s consists of English letters (lower-case and upper-case), ',' and '.'.
 *    1 <= numRows <= 1000
 */

// 2 laços
const convert_doisLacos = (s, numRows) => {
  const n = s.length
  const output = new Array(numRows).fill().map((_) => [])

  let i = 0
  while (i < n) {
    for (let j = 0; j < numRows && i < n; j++, i++) output[j].push(s[i])
    for (let k = numRows - 2; k >= 1 && i < n; k--, i++) output[k].push(s[i])
  }

  return output.map((row) => row.join('')).join('')
}

// template e um único laço
const convert_template = (s, n) => {
  const template = [...new Array(n).keys()]
  template.push(...template.slice(1, -1).reverse())

  const rows = new Array(n).fill('')
  ;[...s].forEach((c, i) => (rows[template[i % template.length]] += c))
  return rows.join('')
}

s = 'PAYPALISHIRING'
numRows = 3
// Output: "PAHNAPLSIIGYIR"

// s = 'PAYPALISHIRING'
// numRows = 4
// Output: "PINALSIGYAHRPI"
// Explanation:
// P     I    N
// A   L S  I G
// Y A   H R
// P     I

// s = 'A'
// numRows = 1
// Output: "A"

console.log(convert_doisLacos(s, numRows))
console.log(convert_template(s, numRows))

s = 'alessandro'
z = [...new Array(4).keys()]
z.push(...z.slice(1, -1).reverse())
