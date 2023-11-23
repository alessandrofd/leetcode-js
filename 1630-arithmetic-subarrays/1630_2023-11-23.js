import _ from 'lodash'

const checkArithmeticSubarrays = (nums, l, r) => {
    const ans = []
    for (let i = 0; i < l.length; i++) {
        const sub = nums.slice(l[i], r[i] + 1)
        const min = Math.min(...sub)
        const max = Math.max(...sub)
        if ((max - min) % (sub.length - 1) !== 0) {
            ans.push(false)
            continue
        }
        const diff = (max - min) / (sub.length - 1)
        const set = new Set(sub)
        let isArithmetic = true
        for (let j = 0; j < sub.length; j++) {
            if (!set.has(min + j * diff)) {
                isArithmetic = false
                break
            }
        }
        ans.push(isArithmetic)
    }
    return ans
}

const checkArithmeticSubarrays_sort = (nums, l, r) => {
    const ans = []
    for (let i = 0; i < l.length; i++) {
        const sub = nums.slice(l[i], r[i] + 1).sort((a, b) => a - b)
        let isArithmetic = true
        for (let j = 1; j < sub.length; j++) {
            if (sub[j] - sub[j - 1] !== sub[1] - sub[0]) {
                isArithmetic = false
                break
            }
        }
        ans.push(isArithmetic)
    }
    return ans
}

const funcs = [checkArithmeticSubarrays, checkArithmeticSubarrays_sort]

const data = [
    [
        [4, 6, 5, 9, 3, 7],
        [0, 0, 2],
        [2, 3, 5],
        [true, false, true],
    ],
    [
        [-12, -9, -3, -12, -6, 15, 20, -25, -20, -15, -10],
        [0, 1, 6, 4, 8, 7],
        [4, 4, 9, 7, 9, 10],
        [false, true, false, false, true, true],
    ],
]

for (const func of funcs) {
    for (const [nums, l, r, expected] of data) {
        console.log(_.isEqual(func(nums, l, r), expected))
    }
}
