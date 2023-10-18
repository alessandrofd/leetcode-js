/**
 * You are given an integer n, which indicates that there are n courses labeled 
 * from 1 to n. You are also given a 2D integer array relations where 
 * relations[j] = [prevCoursej, nextCoursej] denotes that course prevCoursej has 
 * to be completed before course nextCoursej (prerequisite relationship). 
 * Furthermore, you are given a 0-indexed integer array time where time[i] 
 * denotes how many months it takes to complete the (i+1)th course.
 * 
 * You must find the minimum number of months needed to complete all the courses 
 * following these rules:
 * 
 *    You may start taking a course at any time if the prerequisites are met.
 * 
 *    Any number of courses can be taken at the same time.
 * 
 * Return the minimum number of months needed to complete all the courses.
 * 
 * Note: The test cases are generated such that it is possible to complete every 
 * course (i.e., the graph is a directed acyclic graph).
 * 
 * Constraints:
 *    1 <= n <= 5 * 10^4
 *    0 <= relations.length <= min(n * (n - 1) / 2, 5 * 10^4)
 *    relations[j].length == 2
 *    1 <= prevCoursej, nextCoursej <= n
 *    prevCoursej != nextCoursej
 *    All the pairs [prevCoursej, nextCoursej] are unique.
 *    time.length == n
 *    1 <= time[i] <= 104
 *    The given graph is a directed acyclic graph.

Topics: Array, Dynamic Programming, Graph, Topological Sort

Hints:
    
    What is the earliest time a course can be taken?
    
    How would you solve the problem if all courses take equal time?
    
    How would you generalize this approach?
 */

/**
 * @param {number} n
 * @param {number[][]} relations
 * @param {number[]} time
 * @return {number}
 */
const minimumTime = (n, relations, time) => {
  // Topological Sort, Algoritmo de Kahn

  const coursesByPrereq = new Array(n + 1).fill().map((_) => [])
  const countPrereqs = new Array(n + 1).fill(0)
  const maxTime = new Array(n + 1).fill(0)

  for (const [prereq, course] of relations) {
    coursesByPrereq[prereq].push(course)
    countPrereqs[course] += 1
  }

  const queue = []
  for (let course = 1; course <= n; course++) {
    if (countPrereqs[course] === 0) {
      queue.push(course)
      maxTime[course] = time[course - 1]
    }
  }

  while (queue.length > 0) {
    const prereq = queue.shift()
    for (const course of coursesByPrereq[prereq]) {
      maxTime[course] = Math.max(
        maxTime[course],
        maxTime[prereq] + time[course - 1]
      )
      countPrereqs[course] -= 1
      if (countPrereqs[course] === 0) {
        queue.push(course)
      }
    }
  }

  return Math.max(...maxTime)
}

// prettier-ignore
const funcs = [
  minimumTime,
]

// prettier-ignore
const data = [
  [3, [[1,3],[2,3]], [3,2,5], 8],
  [5, [[1,5],[2,5],[3,5],[3,4],[4,5]], [1,2,3,4,5], 12],
  [9, [[2,7],[2,6],[3,6],[4,6],[7,6],[2,1],[3,1],[4,1],[6,1],[7,1],[3,8],[5,8],[7,8],[1,9],[2,9],[6,9],[7,9]], [9,5,9,5,8,7,7,8,4], 32],
  [2, [[2,1]], [10000, 10000], 20000],

]

for (const func of funcs) {
  for (const [n, relations, time, expected] of data) {
    console.log(func(n, relations, time) == expected)
  }
}
