function numberOfWays(corridor) {
    const n = corridor.length
    const mod = 10 ** 9 + 7

    let seats = 0
    let plants = 0
    let ways = 1
    for (const letter of corridor) {
        if (seats < 2) {
            if (letter === 'S') {
                seats++
            }
        } else {
            if (letter === 'S') {
                ways = (ways * (plants + 1)) % mod
                seats = 1
                plants = 0
            } else {
                plants++
            }
        }
    }

    return seats === 2 ? ways : 0
}

// prettier-ignore
const funcs = [
    numberOfWays
]

const data = [
    ['SSPPSPS', 3],
    ['PPSPSP', 1],
    ['S', 0],
]

for (const func of funcs) {
    for (const [corridor, expected] of data) {
        console.log(func(corridor) === expected)
    }
}
