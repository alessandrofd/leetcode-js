/**
 * You are given two strings stamp and target. Initially, there is a string s of
 * length target.length with all s[i] == '?'.
 *
 * In one turn, you can place stamp over s and replace every letter in the s
 * with the corresponding letter from stamp.
 *
 * For example, if stamp = "abc" and target = "abcba", then s is "?????"
 * initially. In one turn you can:
 *    place stamp at index 0 of s to obtain "abc??",
 *    place stamp at index 1 of s to obtain "?abc?", or
 *    place stamp at index 2 of s to obtain "??abc".
 * Note that stamp must be fully contained in the boundaries of s in order to
 * stamp (i.e., you cannot place stamp at index 3 of s).
 *
 * We want to convert s to target using at most 10 * target.length turns.
 *
 * Return an array of the index of the left-most letter being stamped at each
 * turn. If we cannot obtain target from s within 10 * target.length turns,
 * return an empty array.
 *
 * Constraints:
 *    1 <= stamp.length <= target.length <= 1000
 *    stamp and target consist of lowercase English letters.
 */

/**
 * @param {string} stamp
 * @param {string} target
 * @return {number[]}
 */
// Approach 1: Work Backwards
const movesToStamp_1 = (stamp, target) => {
  const answer = []
  const changes = []
  const done = new Array(target.length).fill(false)
  const queue = []

  // For each window (i, i + stamp.length], changes[i] will contain info on what
  // needs to change before we can reverse stamp at this window
  for (let i = 0; i <= target.length - stamp.length; i++) {
    const made = new Set()
    const todo = new Set()
    for (let j = 0; j < stamp.length; j++) {
      if (target[i + j] === stamp[j]) made.add(i + j)
      else todo.add(i + j)
    }
    changes.push({ made, todo })

    // If we can reverse stamp at i immediately, enqueue letters from this window
    if (!todo.size) {
      answer.push(i)
      for (let j = i; j < i + stamp.length; j++) {
        if (!done[j]) {
          queue.push(j)
          done[j] = true
        }
      }
    }
  }

  // For each enqueued letter (position)
  while (queue.length && done.some((b) => !b)) {
    const i = queue.shift()

    // For each window that is potentially affected
    // j: start of window
    const start = Math.max(0, i - stamp.length + 1)
    const end = Math.min(target.length - stamp.length, i)
    for (let j = start; j <= end; j++) {
      const { todo, made } = changes[j]
      // This window is affected
      if (todo.has(i)) {
        todo.delete(i)
        if (!todo.size) {
          answer.push(j)
          made.forEach((letter) => {
            if (!done[letter]) {
              queue.push(letter)
              done[letter] = true
            }
          })
        }
      }
    }
  }

  if (done.some((b) => !b)) return []
  return answer.reverse()
}

// Discussion board - sgallivan
const movesToStamp = (stamp, target) => {
  if (stamp === target) return [0]

  stamp = [...stamp]
  target = [...target]
  const answer = []

  let stampApplied = true
  while (stampApplied) {
    stampApplied = false
    for (let window = 0; window < target.length - stamp.length + 1; window++) {
      let possibleMatch = false
      let letter
      for (letter = 0; letter < stamp.length; letter++)
        if (target[window + letter] === '*') continue
        else if (target[window + letter] != stamp[letter]) break
        else possibleMatch = true

      if (letter === stamp.length && possibleMatch) {
        stampApplied = true
        for (letter = 0; letter < stamp.length; letter++)
          target[window + letter] = '*'
        answer.unshift(window)
      }
    }
  }
  if (target.some((x) => x !== '*')) return []
  return answer
}

stamp = 'abc'
target = 'ababc'
// Output: [0,2]

stamp = 'abca'
target = 'aabcaca'
// Output: [3,0,1]

console.log(movesToStamp(stamp, target))
