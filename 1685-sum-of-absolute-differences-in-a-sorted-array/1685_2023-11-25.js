import _ from 'lodash'

const getSumAbsoluteDifferences = (nums) => {
    const n = nums.length
    const totalSum = nums.reduce((acc, num) => acc + num, 0)

    const result = new Array(n)
    let leftSum = 0
    for (let i = 0; i < n; i++) {
        const left = i * nums[i] - leftSum

        const rightSum = totalSum - leftSum - nums[i]
        const right = rightSum - (n - i - 1) * nums[i]

        result[i] = left + right

        leftSum += nums[i]
    }
    return result
}

const getSumAbsoluteDifferences_prefix_sum = (nums) => {
    const n = nums.length

    let sum = 0
    const prefixSum = nums.map((num) => (sum += num))

    const result = []
    for (let i = 0; i < n; i++) {
        const left = (i + 1) * nums[i] - prefixSum[i]
        const right = prefixSum[n - 1] - prefixSum[i] - (n - i - 1) * nums[i]
        result.push(left + right)
    }

    return result
}

// prettier-ignore
const funcs = [ 
    getSumAbsoluteDifferences,
    getSumAbsoluteDifferences_prefix_sum,
]

const data = [
    [
        [2, 3, 5],
        [4, 3, 5],
    ],
    [
        [1, 4, 6, 8, 10],
        [24, 15, 13, 15, 21],
    ],
]

for (const func of funcs) {
    for (const [nums, expected] of data) {
        console.log(_.isEqual(func(nums), expected))
    }
}
