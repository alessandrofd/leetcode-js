const sortVowels_sort = (s) => {
    const vowelCharCodes = new Set()
    for (const vowel of ['a', 'e', 'i', 'o', 'u']) {
        vowelCharCodes.add(vowel.charCodeAt())
        vowelCharCodes.add(vowel.toUpperCase().charCodeAt())
    }

    const vowels = []
    const vowelsPos = []
    const letters = [...s]

    for (const [pos, letter] of letters.entries()) {
        const charCode = letter.charCodeAt()
        if (vowelCharCodes.has(charCode)) {
            vowelsPos.push(pos)
            vowels.push([charCode, letter])
        }
    }

    vowels.sort(([a], [b]) => a - b)
    for (const [i, pos] of vowelsPos.entries()) {
        letters[pos] = vowels[i][1]
    }

    return letters.join('')
}

const sortVowels = (s) => {
    const sortedVowels = 'AEIOUaeiou'

    const vowelCharCodes = new Set()
    for (const vowel of sortedVowels) {
        vowelCharCodes.add(vowel.charCodeAt())
    }

    const vowelFreqs = new Map()
    const vowelPos = []
    const letters = s.split('')

    for (const [pos, letter] of letters.entries()) {
        const charCode = letter.charCodeAt()
        if (vowelCharCodes.has(charCode)) {
            vowelPos.push(pos)
            vowelFreqs.set(letter, (vowelFreqs.get(letter) ?? 0) + 1)
        }
    }

    let currVowel = 0
    let currFreq = vowelFreqs.get(sortedVowels[currVowel]) ?? 0

    for (const [i, pos] of vowelPos.entries()) {
        while (currFreq === 0)
            currFreq = vowelFreqs.get(sortedVowels[++currVowel]) ?? 0
        letters[pos] = sortedVowels[currVowel]
        currFreq -= 1
    }

    return letters.join('')
}

// prettier-ignore
const funcs = [
    sortVowels,
]

const data = [
    ['lEetcOde', 'lEOtcede'],
    ['lYmpH', 'lYmpH'],
]

for (const func of funcs) {
    for (const [s, expected] of data) {
        console.log(func(s) === expected)
    }
}
