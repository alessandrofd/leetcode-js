/**
 * Given an integer columnNumber, return its corresponding column title as it
 * appears in an Excel sheet.
 *
 * For example:
 *    A -> 1
 *    B -> 2
 *    C -> 3
 *    ...
 *    Z -> 26
 *    AA -> 27
 *    AB -> 28
 *    ...
 *
 * Constraints:
 *    1 <= columnNumber <= 2^31 - 1
 */

/**
 * @param {number} col
 * @return {string}
 */
const convertToTitle = (col) => {}

columnNumber = 1
// Expected: "A"

// columnNumber = 28
// Expected: "AB"
// 26 * 1 + 2

// columnNumber = 701
// Expected: "ZY"
// 26 * 26 + 25

console.log(convertToTitle(columnNumber))
