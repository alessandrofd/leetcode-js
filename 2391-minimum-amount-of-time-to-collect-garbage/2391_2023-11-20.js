const garbageCollection = (garbage, travel) => {
    let sum = 0
    const prefixSum = [0, ...travel.map((n) => (sum += n))]

    let result = 0
    let lastStop = { M: false, P: false, G: false }
    let allStops = false

    for (let i = garbage.length - 1; i >= 0; i--) {
        for (const material of garbage[i]) {
            result += material.length

            if (allStops) continue

            if (!lastStop[material]) {
                result += prefixSum[i]
                lastStop[material] = true
                allStops = Object.values(lastStop).every(Boolean)
            }
        }
    }

    return result
}

// prettier-ignore
const funcs = [
    garbageCollection,
]

const data = [
    [['G', 'P', 'GP', 'GG'], [2, 4, 3], 21],
    [['MMM', 'PGM', 'GP'], [3, 10], 37],
]

for (const func of funcs) {
    for (const [garbage, travel, expected] of data) {
        console.log(func(garbage, travel) === expected)
    }
}
