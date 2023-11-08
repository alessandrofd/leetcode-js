const isReachableAtTime = (sx, sy, fx, fy, t) => {
    const width = Math.abs(sx - fx)
    const height = Math.abs(sy - fy)
    const minTime = Math.max(width, height)

    if (minTime === 0 && t === 1) return false

    return minTime <= t
}

// prettier-ignore
const funcs = [
    isReachableAtTime,
]

const data = [
    [2, 4, 7, 7, 6, true],
    [3, 1, 7, 3, 3, false],
]

for (const func of funcs) {
    for (const [sx, sy, fx, fy, t, expected] of data) {
        console.log(func(sx, sy, fx, fy, t) === expected)
    }
}
