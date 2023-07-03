/**
 * We have n buildings numbered from 0 to n - 1. Each building has a number of
 * employees. It's transfer season, and some employees want to change
 * the building they reside in.
 *
 * You are given an array requests where requests[i] = [fromi, toi] represents
 * an employee's request to transfer from building fromi to building toi.
 *
 * All buildings are full, so a list of requests is achievable only if for each
 * building, the net change in employee transfers is zero. This means the number
 * of employees leaving is equal to the number of employees moving in. For
 * example if n = 3 and two employees are leaving building 0, one is leaving
 * building 1, and one is leaving building 2, there should be two employees
 * moving to building 0, one employee moving to building 1, and one employee
 * moving to building 2.
 *
 * Return the maximum number of achievable requests.
 *
 * Constraints:
 *    1 <= n <= 20
 *    1 <= requests.length <= 16
 *    requests[i].length == 2
 *    0 <= fromi, toi < n
 */

/**
 * @param {number} n
 * @param {number[][]} requests
 * @return {number}
 */
const maximumRequests = (numBuildings, requests) => {
  const numRequests = requests.length
  const balance = Array(numBuildings).fill(0)

  let maxRequests = 0

  const backtrack = (currRequest, acceptedRequests) => {
    if (currRequest === numRequests) {
      if (balance.every((n) => n == 0))
        maxRequests = Math.max(maxRequests, acceptedRequests)
      return
    }

    // Deny request
    backtrack(currRequest + 1, acceptedRequests)

    // Accept request
    const [from, to] = requests[currRequest]

    balance[from] -= 1
    balance[to] += 1

    backtrack(currRequest + 1, acceptedRequests + 1)

    balance[from] += 1
    balance[to] -= 1
  }

  backtrack(0, 0)
  return maxRequests
}

n = 5
// prettier-ignore
requests = [[0,1],[1,0],[0,1],[1,2],[2,0],[3,4]]
//Expected : 5

n = 3
// prettier-ignore
requests = [[0,0],[1,2],[2,1]]
//Expected : 3

n = 4
// prettier-ignore
requests = [[0,3],[3,1],[1,2],[2,0]]
//Expected : 4

console.log(maximumRequests(n, requests))
