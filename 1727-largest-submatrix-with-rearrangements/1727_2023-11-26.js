import _ from 'lodash'

const largestSubmatrix = (matrix) => {
    const m = matrix.length
    const n = matrix[0].length

    let maxArea = 0

    let prevHeights = []
    for (let row = 0; row < m; row++) {
        const heights = []
        const seen = []

        for (const [height, col] of prevHeights) {
            if (matrix[row][col] === 1) {
                heights.push([height + 1, col])
                seen[col] = true
            }
        }

        for (let col = 0; col < n; col++) {
            if (matrix[row][col] === 1 && !seen[col]) {
                heights.push([1, col])
            }
        }

        for (const [i, [height]] of heights.entries()) {
            maxArea = Math.max(maxArea, height * (i + 1))
        }

        prevHeights = heights
    }

    return maxArea
}

const largestSubmatrix_immutable = (matrix) => {
    const m = matrix.length
    const n = matrix[0].length

    let prevRow = matrix[0]
    let max = prevRow.reduce((acc, curr) => acc + curr, 0)
    for (let row = 1; row < m; row++) {
        const currRow = [...matrix[row]]
        for (let col = 0; col < n; col++) {
            if (currRow[col] === 1) {
                currRow[col] += prevRow[col]
            }
        }
        prevRow = [...currRow]
        currRow.sort((a, b) => b - a)
        for (let col = 0; col < n; col++) {
            max = Math.max(max, currRow[col] * (col + 1))
        }
    }
    return max
}

const largestSubmatrix_change_matrix = (matrix) => {
    const m = matrix.length
    const n = matrix[0].length

    let max = Math.max(...matrix[0])
    for (let row = 1; row < m; row++) {
        for (let col = 0; col < n; col++) {
            if (matrix[row][col] === 1) {
                matrix[row][col] += matrix[row - 1][col]
            }
        }
    }

    for (let row = 0; row < m; row++) {
        const currRow = matrix[row]
        currRow.sort((a, b) => b - a)
        for (let col = 0; col < n; col++) {
            max = Math.max(max, currRow[col] * (col + 1))
        }
    }

    return max
}

// prettier-ignore
const funcs = [
    largestSubmatrix,
    // largestSubmatrix_immutable,
    // largestSubmatrix_change_matrix,
]

// prettier-ignore
const data = [
    [[[0,0,1],[1,1,1],[1,0,1]], 4],
    [[[1,0,1,0,1]], 3],
    [[[1,1,0],[1,0,1]], 2],
]

for (const func of funcs) {
    for (const [matrix, expected] of data) {
        console.log(func(_.cloneDeep(matrix)) === expected)
    }
}
