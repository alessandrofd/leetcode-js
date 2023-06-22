/**
 * @param {string[]} ops
 * @return {number}
 */
const calPoints = (ops) => {
  const arr = []
  for (let op of ops) {
    switch (op) {
      case '+':
        arr.push(arr[arr.length - 1] + arr[arr.length - 2])
        break
      case 'D':
        arr.push(arr[arr.length - 1] * 2)
        break
      case 'C':
        arr.pop()
        break
      default:
        arr.push(Number(op))
    }
  }

  return arr.reduce((acc, next) => acc + next, 0)
}

/*
Input: ops = ["5","2","C","D","+"]
Output: 30
Explanation:
"5" - Add 5 to the record, record is now [5].
"2" - Add 2 to the record, record is now [5, 2].
"C" - Invalidate and remove the previous score, record is now [5].
"D" - Add 2 * 5 = 10 to the record, record is now [5, 10].
"+" - Add 5 + 10 = 15 to the record, record is now [5, 10, 15].
The total sum is 5 + 10 + 15 = 30.
*/

let ops = ['5', '2', 'C', 'D', '+']
console.log(calPoints(ops))

/*
Input: ops = ["5","-2","4","C","D","9","+","+"]
Output: 27
Explanation:
"5" - Add 5 to the record, record is now [5].
"-2" - Add -2 to the record, record is now [5, -2].
"4" - Add 4 to the record, record is now [5, -2, 4].
"C" - Invalidate and remove the previous score, record is now [5, -2].
"D" - Add 2 * -2 = -4 to the record, record is now [5, -2, -4].
"9" - Add 9 to the record, record is now [5, -2, -4, 9].
"+" - Add -4 + 9 = 5 to the record, record is now [5, -2, -4, 9, 5].
"+" - Add 9 + 5 = 14 to the record, record is now [5, -2, -4, 9, 5, 14].
The total sum is 5 + -2 + -4 + 9 + 5 + 14 = 27.
*/
ops = ['5', '-2', '4', 'C', 'D', '9', '+', '+']
console.log(calPoints(ops))
