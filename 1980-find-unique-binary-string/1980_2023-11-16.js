const findDifferentBinaryString_loop_integers = (nums) => {
    const n = nums.length

    const uniques = new Set()
    for (const num of nums) {
        uniques.add(parseInt(num, 2))
    }

    for (let num = 0; num < n + 1; num++) {
        if (!uniques.has(num)) {
            return num.toString(2).padStart(n, '0')
        }
    }

    return ''
}

const findDifferentBinaryString_recursion = (nums) => {
    const n = nums.length
    const numSet = new Set(nums)

    const generate = (num) => {
        if (num.length === n) {
            if (!numSet.has(num)) return num
            return ''
        }

        const addZero = generate(num + '0')
        if (addZero) return addZero

        return generate(num + 1)
    }

    return generate('')
}

const findDifferentBinaryString_random = (nums) => {
    const n = nums.length

    const integers = new Set()
    for (const num of nums) {
        integers.add(parseInt(num, 2))
    }

    let result = 0
    while (integers.has(result)) result = Math.floor(Math.random() * 2 ** n)
    return result.toString(2).padStart(n, '0')
}

const findDifferentBinaryString_cantor = (nums) => {
    const n = nums.length
    const result = []
    for (let i = 0; i < n; i++) {
        if (nums[i][i] === '0') result.push('1')
        else result.push('0')
    }
    return result.join('')
}

// prettier-ignore
const funcs = [
    // findDifferentBinaryString_loop_integers,
    // findDifferentBinaryString_recursion,
    // findDifferentBinaryString_random,
    findDifferentBinaryString_cantor,
]

// prettier-ignore
const data = [
    [['01', '10'], ['00', '11']],
    [['00', '01'], ['10', '11']],
    [['111', '011', '001'], ['000', '010', '100', '110', '101']],
]

for (const func of funcs) {
    for (const [nums, expected] of data) {
        console.log(expected.includes(func(nums)))
    }
}
