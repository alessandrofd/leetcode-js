/**
 * @param {number} startValue
 * @param {number} target
 * @return {number}
 */
const brokenCalc = (start, target) => {
  let count = 0
  while (target > start) {
    if (target % 2) target++
    else target /= 2
    count++
  }
  return count + (start - target)
}

/*
Input: startValue = 2, target = 3
Output: 2
Explanation: Use double operation and then decrement operation {2 -> 4 -> 3}.
*/
console.log(brokenCalc(2, 3))

/*
Input: startValue = 5, target = 8
Output: 2
Explanation: Use decrement and then double {5 -> 4 -> 8}.
*/
console.log(brokenCalc(5, 8))

/*
Input: startValue = 3, target = 10
Output: 3
Explanation: Use double, decrement and double {3 -> 6 -> 5 -> 10}.
*/
console.log(brokenCalc(3, 10))

console.log(brokenCalc(1, 1000000000))
