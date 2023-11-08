import { MinPriorityQueue } from '@datastructures-js/priority-queue'

const eliminateMaximum_sort = (dist, speed) => {
    const n = dist.length
    const arrivalTime = Array.from(dist, (x, i) => x / speed[i])
    arrivalTime.sort((a, b) => a - b)

    let result = 0
    for (let i = 0; i < n; i++) {
        if (i < arrivalTime[i]) result += 1
        else break
    }
    return result
}

const eliminateMaximum_pq = (dist, speed) => {
    const n = dist.length
    const pq = new MinPriorityQueue()
    for (let i = 0; i < n; i++) pq.enqueue(dist[i] / speed[i])

    let result = 0
    while (!pq.isEmpty()) {
        const time = pq.dequeue().element
        if (time <= result) break
        result += 1
    }
    return result
}

// Solução sem sort
const eliminateMaximum = (dist, speed) => {
    const n = dist.length
    const arrivalTime = Array.from(dist, (x, i) => Math.ceil(x / speed[i]))

    const monstersByTime = new Array(n).fill(0)
    for (const time of arrivalTime) {
        if (time >= n) continue
        monstersByTime[time] += 1
    }

    // Como só é possível matar um monstro por minuto. O valor acumulado de
    // monstros por minuto não pode ser maior que os minutos transcorridos.
    for (let i = 1; i < n; i++) {
        monstersByTime[i] += monstersByTime[i - 1]
        if (monstersByTime[i] > i) return i
    }

    return n
}

// prettier-ignore
const funcs = [
    eliminateMaximum,
]

// prettier-ignore
const data = [
    [[1, 3, 4], [1, 1, 1], 3],
    [[1, 1, 2, 3], [1, 1, 1, 1], 1],
    [[3, 2, 4], [5, 3, 2], 1],
    [[5, 4, 3, 3, 3], [1, 1, 5, 3, 1], 1, ], 
]

for (const func of funcs) {
    for (const [dist, speed, expected] of data) {
        console.log(func(dist, speed) === expected)
    }
}
