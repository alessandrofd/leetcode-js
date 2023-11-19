import { MaxPriorityQueue } from '@datastructures-js/priority-queue'

const reductionOperations_pq = (nums) => {
    const pq = new MaxPriorityQueue()
    for (const num of nums) pq.enqueue(num)
    const smallest = pq.back().element

    let operations = 0
    let repeats = 0
    while (pq.size() > 0) {
        const num = pq.dequeue().element
        repeats += 1

        if (num === smallest) break

        while (num === pq.front().element) {
            pq.dequeue()
            repeats += 1
        }

        operations += repeats
    }

    return operations
}

const reductionOperations_repeats = (nums) => {
    nums.sort((a, b) => b - a)

    let operations = 0
    let repeats = 0
    for (let i = 0; i < nums.length; i++) {
        repeats += 1

        if (nums[i] === nums.at(-1)) break

        while (nums[i] === nums[i + 1]) {
            i += 1
            repeats += 1
        }

        operations += repeats
    }

    return operations
}

const reductionOperations_steps = (nums) => {
    nums.sort((a, b) => a - b)

    let operations = 0
    let up = 0
    for (let i = 1; i < nums.length; i++) {
        if (nums[i] !== nums[i - 1]) up += 1

        operations += up
    }

    return operations
}

// prettier-ignore
const funcs = [
    // reductionOperations_pq,
    reductionOperations_repeats,
    reductionOperations_steps,
]

const data = [
    [[5, 1, 3], 3],
    [[1, 1, 1], 0],
    [[1, 1, 2, 2, 3], 4],
]

for (const func of funcs) {
    for (const [nums, expected] of data) {
        console.log(func(nums) === expected)
    }
}
