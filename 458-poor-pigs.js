/**
 * There are buckets buckets of liquid, where exactly one of the buckets is
 * poisonous. To figure out which one is poisonous, you feed some number of
 * (poor) pigs the liquid to see whether they will die or not. Unfortunately,
 * you only have minutesToTest minutes to determine which bucket is poisonous.
 *
 * You can feed the pigs according to these steps:
 *  1. Choose some live pigs to feed.
 *  2. For each pig, choose which buckets to feed it. The pig will consume all
 *     the chosen buckets simultaneously and will take no time.
 *  3. Wait for minutesToDie minutes. You may not feed any other pigs during
 *     this time.
 *  4. After minutesToDie minutes have passed, any pigs that have been fed the
 *     poisonous bucket will die, and all others will survive.
 *  5. Repeat this process until you run out of time.
 *
 * Given buckets, minutesToDie, and minutesToTest, return the minimum number of
 * pigs needed to figure out which bucket is poisonous within the allotted time.
 */

/**
 * @param {number} buckets
 * @param {number} minutesToDie
 * @param {number} minutesToTest
 * @return {number}
 */
// Approach 1: Pig as a qubit
const poorPigs = (buckets, minutesToDie, minutesToTest) => {
  states = ((minutesToTest / minutesToDie) | 0) + 1
  return Math.ceil(Math.log(buckets) / Math.log(states))
}

buckets = 1000
minutesToDie = 15
minutesToTest = 60
// Output: 5

// buckets = 4
// minutesToDie = 15
// minutesToTest = 15
// Output: 2

// buckets = 4
// minutesToDie = 15
// minutesToTest = 30
// Output: 2

console.log(poorPigs(buckets, minutesToDie, minutesToTest))
