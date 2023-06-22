/**
 * @param {number} h
 * @param {number} w
 * @param {number[]} horizontalCuts
 * @param {number[]} verticalCuts
 * @return {number}
 */
const maxArea = (h, w, hCuts, vCuts) => {
  hCuts.sort((a, b) => a - b)
  len = hCuts.length
  maxHeight = Math.max(hCuts[0], h - hCuts[len - 1])
  for (i = 1; i < len; i++)
    maxHeight = Math.max(maxHeight, hCuts[i] - hCuts[i - 1])

    vCuts.sort((a, b) => a - b)
    len = vCuts.length
    maxWidth = Math.max(vCuts[0], w - vCuts[len - 1])
    for (i = 1; i < len; i++)
      maxWidth = Math.max(maxWidth, vCuts[i] - vCuts[i - 1])

    return (BigInt(maxHeight) * BigInt(maxWidth)) % 1000000007n
}

h = 5
w = 4
horizontalCuts = [1, 2, 4]
verticalCuts = [1, 3]
//Output: 4

;(h = 5), (w = 4), (horizontalCuts = [3]), (verticalCuts = [3])

h = 1000000000
w = 1000000000
horizontalCuts = [2]
verticalCuts = [2]

console.log(maxArea(h, w, horizontalCuts, verticalCuts))
