/**
 * You are implementing a program to use as your calendar. We can add a new
 * event if adding the event will not cause a double booking.
 *
 * A double booking happens when two events have some non-empty intersection
 * (i.e., some moment is common to both events.).
 *
 * The event can be represented as a pair of integers start and end that
 * represents a booking on the half-open interval [start, end), the range of
 * real numbers x such that start <= x < end.
 *
 * Implement the MyCalendar class:
 *  * MyCalendar() Initializes the calendar object.
 *  * boolean book(int start, int end) Returns true if the event can be added to
 *    the calendar successfully without causing a double booking. Otherwise,
 *    return false and do not add the event to the calendar.
 *
 * Your MyCalendar object will be instantiated and called as such:
 *    var obj = new MyCalendar()
 *    var param_1 = obj.book(start,end)
 */

// Approach #1: Brute Force [Accepted]
class MyCalendar_1 {
  calendar = []
  book = (start, end) => {
    for (const event of this.calendar)
      if (event[0] < end && event[1] > start) return false
    this.calendar.push([start, end])
    return true
  }
}

class Node {
  constructor(start, end) {
    this.start = start
    this.end = end
    this.left = null
    this.right = null
  }
}

class MyCalendar {
  constructor() {
    this.root = null
  }

  book(start, end, node = null) {
    if (!node) node = this.root
    if (!node) {
      this.root = new Node(start, end)
      return true
    }
    if (start >= node.end) {
      if (!node.right) {
        node.right = new Node(start, end)
        return true
      }
      return this.book(start, end, node.right)
    } else if (end <= node.start) {
      if (!node.left) {
        node.left = new Node(start, end)
        return true
      }
      return this.book(start, end, node.left)
    }
    return false
  }
}

cal = new MyCalendar()
console.log(cal.book(10, 20))
console.log(cal.book(15, 25))
console.log(cal.book(20, 30))
