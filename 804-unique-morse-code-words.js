/**
 * International Morse Code defines a standard encoding where each letter is
 * mapped to a series of dots and dashes, as follows:
 *
 * 'a' maps to ".-",
 * 'b' maps to "-...",
 * 'c' maps to "-.-.", and so on.
 *
 * For convenience, the full table for the 26 letters of the English alphabet is
 * given below:
 *
 * [".-","-...","-.-.","-..",".","..-.","--.","....","..",".---","-.-",".-..","--","-.","---",".--.","--.-",".-.","...","-","..-","...-",".--","-..-","-.--","--.."]
 *
 * Given an array of strings words where each word can be written as a
 * concatenation of the Morse code of each letter.
 *
 * For example, "cab" can be written as "-.-..--...", which is the concatenation
 * of "-.-.", ".-", and "-...". We will call such a concatenation the
 * transformation of a word.
 *
 * Return the number of different transformations among all words we have.
 */

/**
 * @param {string[]} words
 * @return {number}
 */

// Approach 1: Hash Set
var uniqueMorseRepresentations = function (words) {
  const MORSE = [
    '.-',
    '-...',
    '-.-.',
    '-..',
    '.',
    '..-.',
    '--.',
    '....',
    '..',
    '.---',
    '-.-',
    '.-..',
    '--',
    '-.',
    '---',
    '.--.',
    '--.-',
    '.-.',
    '...',
    '-',
    '..-',
    '...-',
    '.--',
    '-..-',
    '-.--',
    '--..',
  ]
  const transformations = words.map((word) =>
    [...word]
      .map((char) => MORSE[char.charCodeAt(0) - 'a'.charCodeAt(0)])
      .join('')
  )

  const seen = new Set(transformations)
  return seen.size
}

// Morse code as a hash
var uniqueMorseRepresentations = function (words) {
  const alphabet = new Map([
    ['a', '.-'],
    ['b', '-...'],
    ['c', '-.-.'],
    ['d', '-..'],
    ['e', '.'],
    ['f', '..-.'],
    ['g', '--.'],
    ['h', '....'],
    ['i', '..'],
    ['j', '.---'],
    ['k', '-.-'],
    ['l', '.-..'],
    ['m', '--'],
    ['n', '-.'],
    ['o', '---'],
    ['p', '.--.'],
    ['q', '--.-'],
    ['r', '.-.'],
    ['s', '...'],
    ['t', '-'],
    ['u', '..-'],
    ['v', '...-'],
    ['w', '.--'],
    ['x', '-..-'],
    ['y', '-.--'],
    ['z', '--..'],
  ])
  return new Set(
    words.map((word) =>
      [...word].map((letter) => alphabet.get(letter)).join('')
    )
  ).size
}

// Morse code as an object
var uniqueMorseRepresentations = function (words) {
  const alphabet = {
    a: '.-',
    b: '-...',
    c: '-.-.',
    d: '-..',
    e: '.',
    f: '..-.',
    g: '--.',
    h: '....',
    i: '..',
    j: '.---',
    k: '-.-',
    l: '.-..',
    m: '--',
    n: '-.',
    o: '---',
    p: '.--.',
    q: '--.-',
    r: '.-.',
    s: '...',
    t: '-',
    u: '..-',
    v: '...-',
    w: '.--',
    x: '-..-',
    y: '-.--',
    z: '--..',
  }
  return new Set(
    words.map((word) => [...word].map((letter) => alphabet[letter]).join(''))
  ).size
}

words = ['gin', 'zen', 'gig', 'msg']
// Output: 2

// words = ['a']
// Output: 1

console.log(uniqueMorseRepresentations(words))
