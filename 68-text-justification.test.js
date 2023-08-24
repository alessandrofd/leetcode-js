const fullJustify = require('./68-text-justification')

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

test('default test', () => {
  for (const [words, maxWidth, expected] of data) {
    const output = fullJustify(words, maxWidth)
    expect(output.length).toBe(expected.length)
    for (let i = 0; i < output.length; i++) {
      expect(output[i]).toBe(expected[i])
    }
  }
})
