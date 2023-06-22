/**
 * A gene string can be represented by an 8-character long string, with choices
 * from 'A', 'C', 'G', and 'T'.
 *
 * Suppose we need to investigate a mutation from a gene string start to a gene
 * string end where one mutation is defined as one single character changed in
 * the gene string.
 *
 *    For example, "AACCGGTT" --> "AACCGGTA" is one mutation.
 *
 * There is also a gene bank bank that records all the valid gene mutations. A
 * gene must be in bank to make it a valid gene string.
 *
 * Given the two gene strings start and end and the gene bank bank, return the
 * minimum number of mutations needed to mutate from start to end. If there is
 * no such a mutation, return -1.
 *
 * Note that the starting point is assumed to be valid, so it might not be
 * included in the bank.
 *
 * Constraints:
 *    start.length == 8
 *    end.length == 8
 *    0 <= bank.length <= 10
 *    bank[i].length == 8
 *    start, end, and bank[i] consist of only the characters ['A', 'C', 'G', 'T'].
 */

/**
 * @param {string} start
 * @param {string} end
 * @param {string[]} bank
 * @return {number}
 */

// Approach: BFS (Breadth-First Search)
const minMutation_1 = (start, end, bank) => {
  const bases = ['A', 'C', 'G', 'T']
  let queue = [start]
  const seen = new Set([start])

  let steps = 0
  while (queue.length) {
    const newQueue = []
    for (const gene of queue) {
      if (gene === end) return steps
      for (const base of bases) {
        for (let i = 0; i < gene.length; i++) {
          const mutation = gene.slice(0, i) + base + gene.slice(i + 1)
          if (!seen.has(mutation) && bank.includes(mutation)) {
            newQueue.push(mutation)
            seen.add(mutation)
          }
        }
      }
    }
    steps++
    queue = newQueue
  }
  return -1
}

const minMutation_2 = (start, end, bank) => {
  const bankSet = new Set(bank)
  if (!bankSet.has(end)) return -1

  const bases = ['A', 'C', 'G', 'T']

  let queue = [[start, 0]]
  const seen = new Set([start])

  while (queue.length) {
    const [gene, step] = queue.shift()
    if (gene === end) return step
    for (const base of bases) {
      for (let i = 0; i < gene.length; i++) {
        const mutation = gene.slice(0, i) + base + gene.slice(i + 1)
        if (!seen.has(mutation) && bankSet.has(mutation)) {
          queue.push([mutation, step + 1])
          seen.add(mutation)
        }
      }
    }
  }
  return -1
}

const minMutation = (start, end, bank) => {
  if (!bank.includes(end)) return -1

  const bases = ['A', 'C', 'G', 'T']

  let queue = [[start, 0]]
  const seen = new Set([start])

  while (queue.length) {
    const [gene, step] = queue.shift()
    if (gene === end) return step
    for (const base of bases) {
      for (let i = 0; i < gene.length; i++) {
        const mutation = gene.slice(0, i) + base + gene.slice(i + 1)
        if (!seen.has(mutation) && bank.includes(mutation)) {
          queue.push([mutation, step + 1])
          seen.add(mutation)
        }
      }
    }
  }
  return -1
}

start = 'AACCGGTT'
end = 'AACCGGTA'
bank = ['AACCGGTA']
// Output: 1

// start = 'AACCGGTT'
// end = 'AAACGGTA'
// bank = ['AACCGGTA', 'AACCGCTA', 'AAACGGTA']
// Output: 2

// start = 'AAAAACCC'
// end = 'AACCCCCC'
// bank = ['AAAACCCC', 'AAACCCCC', 'AACCCCCC']
// Output: 3

console.log(minMutation(start, end, bank))

const string = 'alessandro'
const subString = string.slice(1)
subString
