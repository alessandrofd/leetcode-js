/**
 * There are n people that are split into some unknown number of groups. Each
 * person is labeled with a unique ID from 0 to n - 1.
 *
 * You are given an integer array groupSizes, where groupSizes[i] is the size of
 * the group that person i is in. For example, if groupSizes[1] = 3, then person
 * 1 must be in a group of size 3.
 *
 * Return a list of groups such that each person i is in a group of size
 * groupSizes[i].
 *
 * Each person should appear in exactly one group, and every person must be in a
 * group. If there are multiple answers, return any of them. It is guaranteed
 * that there will be at least one valid solution for the given input.
 *
 * Constraints:
 *    groupSizes.length == n
 *    1 <= n <= 500
 *    1 <= groupSizes[i] <= n
 */

import _ from 'lodash'

/**
 * @param {number[]} groupSizes
 * @return {number[][]}
 */
const groupThePeople = (groupSizes) => {
  const n = groupSizes.length

  const peopleBySize = new Map()
  for (let i = 0; i < n; i++) {
    const size = groupSizes[i]
    if (!peopleBySize.get(size)) peopleBySize.set(size, [])
    peopleBySize.get(size).push(i)
  }

  const result = []
  for (const [size, people] of peopleBySize) {
    while (people.length) {
      const group = []
      for (let i = 0; i < size; i++) {
        group.push(people.pop())
      }
      result.push(group)
    }
  }
  result
  return result
}

const funcs = [groupThePeople]

const data = [
  [
    [3, 3, 3, 3, 3, 1, 3],
    [[5], [0, 1, 2], [3, 4, 6]],
  ],
  // [
  //   [2, 1, 3, 3, 3, 2],
  //   [[1], [0, 5], [2, 3, 4]],
  // ],
]

for (const func of funcs) {
  for (const [groupSizes, expected] of data) {
    const output = func(groupSizes)
      .map((p) => p.sort((a, b) => a - b))
      .sort((a, b) =>
        a.length === b.length ? a[0] - b[0] : a.length - b.length
      )

    console.log(_.isEqual(output, expected))
  }
}
