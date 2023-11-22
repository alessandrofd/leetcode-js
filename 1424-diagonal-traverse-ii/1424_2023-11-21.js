import _ from 'lodash'

const findDiagonalOrder = (nums) => {
    const result = []
    const queue = [[0, 0]]

    while (queue.length) {
        const [row, col] = queue.shift()
        result.push(nums[row][col])

        if (col === 0 && row + 1 < nums.length) queue.push([row + 1, col])
        if (col + 1 < nums[row].length) queue.push([row, col + 1])
    }

    return result
}

const findDiagonalOrder_by_diagonal = (nums) => {
    const diags = new Map()

    for (let row = nums.length - 1; row >= 0; row--) {
        for (let col = 0; col < nums[row].length; col++) {
            const diag = row + col
            if (!diags.has(diag)) diags.set(diag, [])
            diags.get(diag).push(nums[row][col])
        }
    }

    let result = []
    let diag = 0
    while (diags.has(diag)) {
        result.push(...diags.get(diag))
        diag += 1
    }

    return result
}

// prettier-ignore
const funcs = [
    findDiagonalOrder,
    findDiagonalOrder_by_diagonal,
]

// prettier-ignore
const data = [
    [
        [
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9],
        ],
        [1, 4, 2, 7, 5, 3, 8, 6, 9],
    ],
    [
        [
            [1, 2, 3, 4, 5], 
            [6, 7], 
            [8], 
            [9, 10, 11], 
            [12, 13, 14, 15, 16]
        ],
        [1, 6, 2, 8, 7, 3, 9, 4, 12, 10, 5, 13, 11, 14, 15, 16],
    ],
]

for (const func of funcs) {
    for (const [nums, expected] of data) {
        console.log(_.isEqual(func(nums), expected))
    }
}
