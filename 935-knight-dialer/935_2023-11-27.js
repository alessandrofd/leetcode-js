const knightDialer = (length) => {
    if (length === 1) return 10

    const mod = 10 ** 9 + 7

    let A = 4,
        B = 2,
        C = 2,
        D = 1

    for (let i = 1; i < length; i++) {
        const newA = (2 * (B + C)) % mod
        const newB = A
        const newC = (A + 2 * D) % mod
        const newD = C

        A = newA
        B = newB
        C = newC
        D = newD
    }

    return (A + B + C + D) % mod
}

const knightDialer_dp_bottom_up_optimized = (length) => {
    const mod = 10 ** 9 + 7
    const graph = [
        [4, 6],
        [6, 8],
        [7, 9],
        [4, 8],
        [0, 3, 9],
        [],
        [0, 1, 7],
        [2, 6],
        [1, 3],
        [2, 4],
    ]

    let previous = Array(10).fill(1)

    for (let i = 1; i < length; i++) {
        const current = Array(10).fill(0)
        for (let j = 0; j < 10; j++) {
            current[j] =
                graph[j].reduce((acc, digit) => acc + previous[digit], 0) % mod
        }
        previous = current
    }

    return previous.reduce((acc, digit) => acc + digit, 0) % mod
}

const knightDialer_dp_bottom_up = (length) => {
    const mod = 10 ** 9 + 7
    const graph = [
        [4, 6],
        [6, 8],
        [7, 9],
        [4, 8],
        [0, 3, 9],
        [],
        [0, 1, 7],
        [2, 6],
        [1, 3],
        [2, 4],
    ]

    const dp = Array.from({ length }, () => Array(10).fill(1))

    for (let i = 1; i < length; i++) {
        for (let j = 0; j < 10; j++) {
            dp[i][j] =
                graph[j].reduce((acc, curr) => acc + dp[i - 1][curr], 0) % mod
        }
    }

    return dp[length - 1].reduce((acc, curr) => acc + curr, 0) % mod
}

// prettier-ignore
const funcs = [
    knightDialer,
    knightDialer_dp_bottom_up_optimized,
    knightDialer_dp_bottom_up,
]

const data = [
    [1, 10],
    [2, 20],
    [3131, 136006598],
]

for (const func of funcs) {
    for (const [length, expected] of data) {
        console.log(func(length) === expected)
    }
}
