/**
 * A valid IP address consists of exactly four integers separated by single
 * dots. Each integer is between 0 and 255 (inclusive) and cannot have
 * leading zeros.
 *
 * For example, "0.1.2.201" and "192.168.1.1" are valid IP addresses,
 * but "0.011.255.245", "192.168.1.312" and "192.168@1.1" are invalid
 * IP addresses.
 *
 * Given a string s containing only digits, return all possible valid IP
 * addresses that can be formed by inserting dots into s. You are not allowed to
 * reorder or remove any digits in s. You may return the valid IP addresses in
 * any order.
 *
 * Constraints:
 *    1 <= s.length <= 20
 *    s consists of digits only.
 */

/**
 * @param {string} s
 * @return {string[]}
 */
// Approach 1: Backtracking
const restoreIpAddresses_backtracking1 = (s) => {
  const result = []

  const backtrack = (start, position, addresses) => {
    if (position === 4) {
      if (start === s.length) result.push(addresses.join('.'))
      return
    }
    for (let len = 0; len < 3 && start + len < s.length; len++) {
      const end = start + len + 1
      const num = parseInt(s.slice(start, end))
      if (num < 256 && (s[start] !== '0' || len === 0)) {
        addresses.push(s.slice(start, end))
        backtrack(end, position + 1, addresses)
        addresses.pop()
      }
    }
  }

  backtrack(0, 0, [])
  return result
}

const restoreIpAddresses_backtracking2 = (s) => {
  const result = []

  const backtrack = (start, position, address) => {
    if (position === 4) {
      if (start === s.length) result.push(address.slice(0, address.length - 1))
      return
    }
    for (let end = 0; end < Math.min(start + 3, s.length); end++) {
      const str = s.slice(start, end + 1)
      const num = parseInt(str)
      if (num < 256 && (s[start] !== '0' || end === start)) {
        backtrack(end + 1, position + 1, address + str + '.')
      }
    }
  }

  backtrack(0, 0, [])
  return result
}

// Approach 2: Iterative
const restoreIpAddresses_iterative = (s) => {
  const isValid = (start, len) => {
    const str = s.slice(start, start + len)
    const num = parseInt(str)
    return num < 256 && (s[start] !== '0' || len === 1)
  }

  const result = []

  for (
    let len1 = Math.max(1, s.length - 9);
    len1 <= Math.min(3, s.length - 3);
    len1++
  ) {
    if (!isValid(0, len1)) continue
    for (
      let len2 = Math.max(1, s.length - len1 - 6);
      len2 <= Math.min(3, s.length - len1 - 2);
      len2++
    ) {
      if (!isValid(len1, len2)) continue
      for (
        let len3 = Math.min(1, s.length - len1 - len2 - 3);
        len3 <= Math.min(3, s.length - len1 - len2 - 1);
        len3++
      ) {
        const len4 = s.length - len1 - len2 - len3
        if (isValid(len1 + len2, len3) && isValid(len1 + len2 + len3, len4)) {
          const octet1 = s.slice(0, len1)
          const octet2 = s.slice(len1, len1 + len2)
          const octet3 = s.slice(len1 + len2, len1 + len2 + len3)
          const octet4 = s.slice(len1 + len2 + len3)
          const address = `${octet1}.${octet2}.${octet3}.${octet4}`
          result.push(address)
        }
      }
    }
  }
  return result
}

s = '25525511135'
// Output: ["255.255.11.135","255.255.111.35"]

// s = '0000'
// Output: ["0.0.0.0"]

// s = '101023'
// Output: ["1.0.10.23","1.0.102.3","10.1.0.23","10.10.2.3","101.0.2.3"]

// s = '1111'
// Output: ['1.1.1.1']

console.log(restoreIpAddresses_backtracking1(s))
console.log(restoreIpAddresses_backtracking2(s))
console.log(restoreIpAddresses_iterative(s))
