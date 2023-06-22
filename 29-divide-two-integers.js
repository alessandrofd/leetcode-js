/**
 * @param {number} dividend
 * @param {number} divisor
 * @return {number}
 */

//Approach 2: Repeated Exponential Searches

// const divide = (dividend, divisor) => {
//   const MAX_INT = 2147483647 //2**31 - 1
//   const MIN_INT = -2147483648 // -2**31
//   const HALF_MIN_INT = -1073741824 // MIN_INT / 2

//   // Special case: overflow
//   if (dividend === MIN_INT && divisor === -1) return MAX_INT

//   // We need to convert both numbers to negatives
//   // Also, we count the number of negative signs
//   let negatives = 2
//   if (dividend > 0) {
//     negatives--
//     dividend = -dividend
//   }
//   if (divisor > 0) {
//     negatives--
//     divisor = -divisor
//   }

//   console.log(dividend, divisor)

//   let quotient = 0
//   // Once the divisor is bigger than the current dividend,
//   // we can't fit any more copies of the divisor into it.
//   while (divisor >= dividend) {
//     // We know it'll fit at least once since dividend >= divisor
//     // Note: We use a negative powerOfTwo as it's possible we might
//     // have the case divide(MIN_INT, -1)
//     let powerOfTwo = -1
//     let value = divisor
//     // Check if double the current value is too big. If not,continue doubling.
//     // If it is too big, stop doubling and continue with the next step.
//     while (value >= HALF_MIN_INT && value + value >= dividend) {
//       value += value
//       powerOfTwo += powerOfTwo
//     }
//     // We have been able to subtract divisor another powerOfTwoTimes
//     quotient += powerOfTwo
//     // Remove value so far so we can continue the process with remainder
//     dividend -= value
//   }

//   // If there was originally one negative sign, then
//   // the quotient remains negative, Otherwise, switch
//   // it to positive.
//   if (negatives != 1) quotient = -quotient
//   return quotient
// }

// Approach 3: Adding Powers of Two

// const divide = (dividend, divisor) => {
//   const MAX_INT = 2147483647 //2**31 - 1
//   const MIN_INT = -2147483648 // -2**31
//   const HALF_MIN_INT = -1073741824 // MIN_INT / 2

//   // Special case: overflow
//   if (dividend === MIN_INT && divisor === -1) return MAX_INT

//   // We need to convert both numbers to negatives
//   // Also, we count the number of negative signs
//   let negatives = 2
//   if (dividend > 0) {
//     negatives--
//     dividend = -dividend
//   }
//   if (divisor > 0) {
//     negatives--
//     divisor = -divisor
//   }

//   const arr = []
//   let powerOfTwo = -1
//   while (divisor >= dividend) {
//     arr.push([divisor, powerOfTwo])
//     if (divisor < HALF_MIN_INT) break
//     divisor += divisor
//     powerOfTwo += powerOfTwo
//   }

//   let quotient = 0
//   for (let i = arr.length - 1; i >= 0; i--) {
//     if (arr[i][0] >= dividend) {
//       quotient += arr[i][1]
//       dividend -= arr[i][0]
//     }
//   }

//   if (negatives != 1) quotient = -quotient
//   return quotient
// }

// Approach 4: Adding Powers of Two with Bit-Shifting

const divide = (dividend, divisor) => {
  const MAX_INT = 2147483647 //2**31 - 1
  const MIN_INT = -2147483648 // -2**31
  const HALF_MIN_INT = -1073741824 // MIN_INT / 2

  // Special case: overflow
  if (dividend === MIN_INT && divisor === -1) return MAX_INT

  // We need to convert both numbers to negatives
  // Also, we count the number of negative signs
  let negatives = 2
  if (dividend > 0) {
    negatives--
    dividend = -dividend
  }
  if (divisor > 0) {
    negatives--
    divisor = -divisor
  }

  /* In the first loop, we simply find the largest double of divisor
   * that fits into the dividend.
   * The >= is because we're working in negatives. In essence, that
   * piece of code is checking that we're still nearer to 0 than we
   * are to INT_MIN. */
  let highestDouble = divisor
  let highestPowerOfTwo = -1
  while (
    highestDouble >= HALF_MIN_INT &&
    dividend <= highestDouble + highestDouble
  ) {
    highestDouble += highestDouble
    highestPowerOfTwo += highestPowerOfTwo
  }

  /* In the second loop, we work out which powers of two fit in, by
   * halving highestDouble and highestPowerOfTwo repeatedly.
   * We can do this using bit shifting so that we don't break the
   * rules of the question :-) */
  let quotient = 0
  while (dividend <= divisor) {
    if (dividend <= highestDouble) {
      quotient += highestPowerOfTwo
      dividend -= highestDouble
    }
    /* We know that these are always even, so no need to worry about the
     * annoying "bit-shift-odd-negative-number" case. */
    highestPowerOfTwo >>= 1
    highestDouble >>= 1
  }

  if (negatives != 1) quotient = -quotient
  return quotient
}

// let dividend = 10
// let divisor = 3
// Output: 3

let dividend = 7
let divisor = -3
// Output: -2

console.log(divide(dividend, divisor))
