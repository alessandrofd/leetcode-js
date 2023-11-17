const minPairSum = (nums) => {
    const n = nums.length
    nums.sort((a, b) => a - b)

    let result = 0
    for (let i = 0; i < n / 2; i++) {
        result = Math.max(result, nums[i] + nums[n - 1 - i])
    }

    return result
}

// prettier-ignore
const funcs = [
    minPairSum,
]

const data = [
    [[3, 5, 2, 3], 7],
    [[3, 5, 4, 2, 4, 6], 8],
]

for (const func of funcs) {
    for (const [nums, expected] of data) {
        console.log(func(nums) === expected)
    }
}
