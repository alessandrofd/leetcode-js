import _ from 'lodash'

const restoreArray = (adjacentPairs) => {
    const n = adjacentPairs.length

    // const endings = new Set()
    const numToAdjs = new Map()

    for (const [u, v] of adjacentPairs) {
        // if (endings.has(u)) endings.delete(u)
        // else endings.add(u)

        // if (endings.has(v)) endings.delete(v)
        // else endings.add(v)

        const uAdjs = numToAdjs.get(u) || []
        uAdjs.push(v)
        numToAdjs.set(u, uAdjs)

        const vAdjs = numToAdjs.get(v) || []
        vAdjs.push(u)
        numToAdjs.set(v, vAdjs)
    }

    // let curr = [...endings][0]
    let curr = undefined
    for (const [num, adjs] of numToAdjs) {
        if (adjs.length === 1) {
            curr = num
            break
        }
    }

    let prev = undefined
    const result = [curr]

    while (result.length <= n) {
        const adjs = numToAdjs.get(curr)
        for (const adj of adjs) {
            if (adj !== prev) {
                prev = curr
                curr = adj
                result.push(curr)
                break
            }
        }
    }

    return result
}

// prettier-ignore
const funcs = [
    restoreArray,
]

// prettier-ignore
const data = [
    [[[2,1],[3,4],[3,2]], [1,2,3,4]],
    [[[4,-2],[1,4],[-3,1]], [-2,4,1,-3]],
    [[[100000,-100000]], [100000,-100000]],
]

for (const func of funcs) {
    for (const [adjacentPairs, expected] of data) {
        const output = func(adjacentPairs)
        const reversedOutput = output.toReversed()
        console.log(
            _.isEqual(output, expected) || _.isEqual(reversedOutput, expected)
        )
    }
}
