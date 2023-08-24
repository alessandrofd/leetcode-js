/**
 * Given an array of strings words and a width maxWidth, format the text such
 * that each line has exactly maxWidth characters and is fully (left and right)
 * justified.
 *
 * You should pack your words in a greedy approach; that is, pack as many words
 * as you can in each line. Pad extra spaces ' ' when necessary so that each
 * line has exactly maxWidth characters.
 *
 * Extra spaces between words should be distributed as evenly as possible. If
 * the number of spaces on a line does not divide evenly between words, the
 * empty slots on the left will be assigned more spaces than the slots on the
 * right.
 *
 * For the last line of text, it should be left-justified, and no extra space is
 * inserted between words.
 *
 * Note:
 *
 *    A word is defined as a character sequence consisting of non-space
 *    characters only.
 *
 *    Each word's length is guaranteed to be greater than 0 and not exceed
 *    axWidth.
 *
 *    The input array words contains at least one word.
 *
 * Constraints:
 *    1 <= words.length <= 300
 *    1 <= words[i].length <= 20
 *    words[i] consists of only English letters and symbols.
 *    1 <= maxWidth <= 100
 *    words[i].length <= maxWidth
 */

/**
 * @param {string[]} words
 * @param {number} maxWidth
 * @return {string[]}
 */
const fullJustify = (words, maxWidth) => {
  const lines = []
  const lengths = []

  let line = []
  let wordsLength = 0
  for (const word of words) {
    if (wordsLength + line.length + word.length > maxWidth) {
      lines.push(line)
      lengths.push(wordsLength)
      line = []
      line.push(word)
      wordsLength = word.length
    } else {
      line.push(word)
      wordsLength += word.length
    }
  }

  if (line.length > 0) {
    lines.push(line)
    lengths.push(wordsLength)
  }

  result = []
  for (let i = 0; i < lines.length - 1; i++) {
    const numWords = lines[i].length
    const spaces = maxWidth - lengths[i]

    let spacedLine = ''
    if (numWords > 1) {
      const spacing = Math.floor(spaces / (numWords - 1))
      let extraSpaces = spaces - spacing * (numWords - 1)

      for (let j = 0; j < lines[i].length - 1; j++) {
        spacedLine += lines[i][j] + ' '.repeat(spacing)
        if (extraSpaces > 0) {
          spacedLine += ' '
          extraSpaces -= 1
        }
      }
      spacedLine += lines[i].at(-1)
    } else {
      spacedLine = lines[i][0] + ' '.repeat(spaces)
    }

    result.push(spacedLine)
  }

  const numWords = lines.at(-1).length
  const spaces = maxWidth - lengths.at(-1) - (numWords - 1)
  result.push(lines.at(-1).join(' ') + ' '.repeat(spaces))

  return result
}

const data = [
  [
    ['This', 'is', 'an', 'example', 'of', 'text', 'justification.'],
    16,
    // prettier-ignore
    [
      "This    is    an",
      "example  of text",
      "justification.  "
    ],
  ],

  [
    ['What', 'must', 'be', 'acknowledgment', 'shall', 'be'],
    16,
    ['What   must   be', 'acknowledgment  ', 'shall be        '],
  ],

  [
    // prettier-ignore
    [
      'Science', 'is', 'what', 'we', 'understand', 'well', 'enough', 'to',
      'explain', 'to', 'a', 'computer.', 'Art', 'is', 'everything', 'else', 'we',
      'do',
    ],
    20,
    [
      'Science  is  what we',
      'understand      well',
      'enough to explain to',
      'a  computer.  Art is',
      'everything  else  we',
      'do                  ',
    ],
  ],
]

const [words, maxWidth, expected] = data[1]
const output = fullJustify(words, maxWidth)
for (const line of output) {
  console.log(line, line.length)
}

module.exports = fullJustify
