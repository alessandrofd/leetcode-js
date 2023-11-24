import { MaxPriorityQueue } from '@datastructures-js/priority-queue'

const maxCoins = (piles) => {
    const n = piles.length

    piles.sort((a, b) => a - b)

    let result = 0
    for (let i = n / 3; i < n; i += 2) {
        result += piles[i]
    }
    return result
}

const maxCoins_queue = (piles) => {
    piles.sort((a, b) => a - b)

    const turns = piles.length / 3
    let sum = 0
    for (let i = 0; i < turns; i++) {
        piles.pop()
        sum += piles.pop()
    }

    return sum
}

const maxCoins_pq = (piles) => {
    const pq = new MaxPriorityQueue()
    for (const pile of piles) {
        pq.enqueue(pile)
    }

    const turns = piles.length / 3
    let sum = 0
    for (let i = 0; i < turns; i++) {
        pq.dequeue()
        sum += pq.dequeue().element
    }

    return sum
}

// prettier-ignore
const funcs = [
    maxCoins,
    // maxCoins_queue,
    // maxCoins_pq,
]

const data = [
    [[2, 4, 1, 2, 7, 8], 9],
    [[2, 4, 5], 4],
    [[9, 8, 7, 6, 5, 1, 2, 3, 4], 18],
]

for (const func of funcs) {
    for (const [piles, expected] of data) {
        console.log(func(piles) === expected)
    }
}
