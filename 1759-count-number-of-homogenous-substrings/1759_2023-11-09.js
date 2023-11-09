const countHomogenous = (s) => {
    let streak = 1
    let result = 1
    for (let i = 1; i < s.length; i++) {
        if (s[i] === s[i - 1]) streak += 1
        else streak = 1
        result += streak
    }

    return result % (10 ** 9 + 7)
}

// prettier-ignore
const funcs = [
    countHomogenous,
]

const data = [
    ['abbcccaa', 13],
    ['xy', 2],
    ['zzzzz', 15],
]

for (const func of funcs) {
    for (const [s, expected] of data) {
        console.log(func(s) === expected)
    }
}
