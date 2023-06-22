/**
 * A k-booking happens when k events have some non-empty intersection (i.e.,
 * there is some time that is common to all k events.)
 *
 * You are given some events [start, end), after each given event, return an
 * integer k representing the maximum k-booking between all the previous events.
 *
 * Implement the MyCalendarThree class:
 *  MyCalendarThree()
 *    Initializes the object.
 *
 *  int book(int start, int end)
 *    Returns an integer k representing the largest integer such that there
 *    exists a k-booking in the calendar.
 *
 * Constraints:
 *    0 <= start < end <= 10^9
 *    At most 400 calls will be made to book.
 */

// Approach 1: Sweep-line Algorithm
class MyCalendarThree_1 {
  constructor() {
    this.diff = []
  }

  /**
   * @param {number} start
   * @param {number} end
   * @return {number}
   */
  book = (start, end) => {
    this.diff[start] = (this.diff[start] ?? 0) + 1
    this.diff[end] = (this.diff[end] ?? 0) + -1
    let curr = 0
    let result = 0
    for (const i in this.diff) {
      curr += this.diff[i]
      result = Math.max(result, curr)
    }
    return result
  }
}

// Approach 2: Segment Tree
class MyCalendarThree {
  constructor() {
    this.vals = []
    this.lazy = []
  }

  update = (start, end, left, right, idx) => {
    if (start > right || end < left) return
    if (start <= left && end >= right) {
      this.vals[idx] = (this.vals[idx] ?? 0) + 1
      this.lazy[idx] = (this.lazy[idx] ?? 0) + 1
    } else {
      const middle = (left + right) / 2
      this.update(start, end, left, middle, idx * 2)
      this.update(start, end, middle + 1, right, idx * 2 + 1)
      this.vals[idx] =
        (this.lazy[idx] ?? 0) +
        Math.max(this.vals[idx * 2] ?? 0, this.vals[idx * 2 + 1] ?? 0)
    }
  }

  book = (start, end) => {
    this.update(start, end, 0, 10 ** 9, 1)
    return this.vals[1] ?? 0
  }
}

const myCalendarThree = new MyCalendarThree()
myCalendarThree.book(10, 20) // return 1
myCalendarThree.book(50, 60) // return 1
myCalendarThree.book(10, 40) // return 2
myCalendarThree.book(5, 15) // return 3
myCalendarThree.book(5, 10) // return 3
myCalendarThree.book(25, 55) // return 3
