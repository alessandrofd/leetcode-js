/**
 * @param {number[]} cards
 * @param {number} k
 * @return {number}
 */

//Approach 1: Dynamic Programming
const maxScore_1 = (cards, k) => {
  const front = new Array(k + 1).fill(0)
  const rear = new Array(k + 1).fill(0)
  for (let i = 0; i < k; i++) {
    front[i + 1] = front[i] + cards[i]
    rear[i + 1] = rear[i] + cards[cards.length - 1 - i]
  }
  let max = 0
  for (let i = 0; i <= k; i++) {
    current = front[i] + rear[k - i]
    max = Math.max(max, current)
  }
  return max
}

//Approach 2: Dynamic Programming - Space Optimized
const maxScore_2 = (cards, k) => {
  front = 0
  rear = 0
  for (let i = 0; i < k; i++) {
    front += cards[i]
  }
  let max = front
  for (let i = k - 1; i >= 0; i--) {
    front -= cards[i]
    rear += cards[cards.length - (k - i)]
    current = front + rear
    max = Math.max(max, current)
  }
  return max
}


//Approach 3: Sliding Window
const maxScore = (cards, k) => {
  total = cards.reduce((acc, nxt) => acc + nxt)
  if (k === cards.length) return total

  minScore = total
  windowScore = 0
  start = 0
  for (i = 0; i < cards.length; i++) {
    windowScore += cards[i]
    windowLength  = i - start + 1
    if (windowLength === cards.length - k) {
      minScore = Math.min(minScore, windowScore)
      windowScore -= cards[start++]
    }
  }
  return total - minScore
}


// cardPoints = [1, 2, 3, 4, 5, 6, 1]
// k = 3
//Output: 12

// cardPoints = [2, 2, 2]
// k = 2
//Output: 4

cardPoints = [9, 7, 7, 9, 7, 7, 9]
k = 7
// Output: 55

console.log(maxScore(cardPoints, k))
