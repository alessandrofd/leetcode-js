const countNicePairs = (nums) => {
    const reverse = (num) => {
        let result = 0
        while (num) {
            const modulo = num % 10
            result = result * 10 + modulo
            num = (num - modulo) / 10
        }
        return result
    }

    const map = new Map()

    for (const num of nums) {
        const key = num - reverse(num)
        map.set(key, (map.get(key) ?? 0) + 1)
    }

    let result = 0

    for (const num of map.values()) {
        result += (num * (num - 1)) / 2
    }

    return result % (1e9 + 7)
}

// prettier-ignore
const funcs = [
    countNicePairs,
]

const data = [
    [[42, 11, 1, 97], 2],
    [[13, 10, 35, 24, 76], 4],
]

for (const func of funcs) {
    for (const [nums, expected] of data) {
        console.log(func(nums))
        console.log(func(nums) === expected)
    }
}
