/**
 * There are a total of numCourses courses you have to take, labeled from 0 to
 * numCourses - 1. You are given an array prerequisites where
 * prerequisites[i] = [ai, bi] indicates that you must take course bi first if
 * you want to take course ai.
 *
 *    For example, the pair [0, 1], indicates that to take course 0 you have to
 *    first take course 1.
 *
 * Return true if you can finish all courses. Otherwise, return false.
 *
 * Constraints:
 *    1 <= numCourses <= 2000
 *    0 <= prerequisites.length <= 5000
 *    prerequisites[i].length == 2
 *    0 <= ai, bi < numCourses
 *    All the pairs prerequisites[i] are unique.
 */

// Algoritmo de Kahn

/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {boolean}
 */
const canFinish = (numCourses, prerequisites) => {
  const numPrereqs = Array(numCourses).fill(0)
  const nextCourses = Array.from(Array(numCourses), () => [])
  for (const [course, prereq] of prerequisites) {
    nextCourses[prereq].push(course)
    numPrereqs[course] += 1
  }

  queue = []
  numPrereqs.forEach((n, i) => {
    if (n === 0) queue.push(i)
  })

  let count = 0
  while (queue.length > 0) {
    course = queue.shift()
    count += 1
    for (const nextCourse of nextCourses[course]) {
      numPrereqs[nextCourse] -= 1
      if (numPrereqs[nextCourse] === 0) queue.push(nextCourse)
    }
  }

  return count === numCourses
}

numCourses = 2
prerequisites = [[1, 0]]
// Expected: true

numCourses = 2
// prettier-ignore
prerequisites = [ [1, 0], [0, 1], ]
// Expected: false

console.log(canFinish(numCourses, prerequisites))
