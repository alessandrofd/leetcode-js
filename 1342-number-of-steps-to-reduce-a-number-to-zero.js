/**
 * @param {number} num
 * @return {number}
 */
const numberOfSteps = (num) => {
  let count = 0
  while (num > 0) {
    num = num % 2 ? num - 1 : num / 2
    count++
  }
  return count
}

console.log(numberOfSteps(123))
