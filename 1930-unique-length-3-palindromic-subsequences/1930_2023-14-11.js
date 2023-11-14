const countPalindromicSubsequence = (string) => {
    const first = new Array(26)
    const last = new Array(26)

    for (let i = 0; i < string.length; i++) {
        const charCode = string[i].charCodeAt() - 97
        if (first[charCode] === undefined) first[charCode] = i
        last[charCode] = i
    }

    let result = 0
    for (let i = 0; i < 26; i++) {
        const mids = new Set()
        for (let j = first[i] + 1; j < last[i]; j++) {
            mids.add(string[j])
        }
        result += mids.size
    }
    return result
}

// prettier-ignore
const funcs = [
    countPalindromicSubsequence,
]

const data = [
    ['aabca', 3],
    ['adc', 0],
    ['bbcbaba', 4],
]

for (const func of funcs) {
    for (const [string, expected] of data) {
        console.log(func(string) === expected)
    }
}
