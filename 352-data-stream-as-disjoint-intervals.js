/*
Given a data stream input of non-negative integers a1, a2, ..., an, summarize the numbers seen so far as a list of disjoint intervals.

Implement the SummaryRanges class:
  SummaryRanges() Initializes the object with an empty stream.
  void addNum(int value) Adds the integer value to the stream.
  int[][] getIntervals() Returns a summary of the integers in the stream currently as a list of disjoint intervals [starti, endi]. The answer should be sorted by starti.

Constraints:
    0 <= value <= 10^4
    At most 3 * 10^4 calls will be made to addNum and getIntervals.
*/

class SummaryRanges_orderedSet {
  constructor() {
    this.set = new Set()
  }

  addNum(value) {
    this.set.add(value)
  }

  getIntervals() {
    const intervals = []
    let left = -1,
      right = -1
    for (const num of [...this.set].sort((a, b) => a - b)) {
      if (left < 0) left = right = num
      else if (num === right + 1) right = num
      else {
        intervals.push([left, right])
        left = right = num
      }
    }
    intervals.push([left, right])
    return intervals
  }
}

// class SummaryRanges_intervalsOnTheFly {
class SummaryRanges {
  constructor() {
    this.intervals = []
  }

  addNum = (value) => {
    for (let i = 0; i < this.intervals.length; i++) {
      const [start, end] = this.intervals[i]

      if (start <= value && value <= end) return

      if (value === end + 1) {
        this.intervals[i][1] = value
        if (value + 1 === this.intervals[i + 1]?.[0]) {
          this.intervals[i + 1][0] = this.intervals[i][0]
          this.intervals.splice(i, 1)
        }
        return
      }

      if (value < start) {
        if (value === start - 1) this.intervals[i][0] = value
        else this.intervals.splice(i, 0, [value, value])
        return
      }
    }

    this.intervals.push([value, value])
  }

  getIntervals = () => this.intervals
}

const sa1 = new SummaryRanges()
sa1.addNum(1) // arr = [1]
console.log(sa1.getIntervals()) // return [[1, 1]]
sa1.addNum(3) // arr = [1, 3]
console.log(sa1.getIntervals()) // return [[1, 1], [3, 3]]
sa1.addNum(7) // arr = [1, 3, 7]
console.log(sa1.getIntervals()) // return [[1, 1], [3, 3], [7, 7]]
sa1.addNum(2) // arr = [1, 2, 3, 7]
console.log(sa1.getIntervals()) // return [[1, 3], [7, 7]]
sa1.addNum(6) // arr = [1, 2, 3, 6, 7]
console.log(sa1.getIntervals()) // return [[1, 3], [6, 7]]

const sa2 = new SummaryRanges()
sa2.addNum(1)
console.log(sa2.getIntervals())
sa2.addNum(3)
console.log(sa2.getIntervals())
sa2.addNum(7)
console.log(sa2.getIntervals())
sa2.addNum(2)
console.log(sa2.getIntervals())
sa2.addNum(6)
console.log(sa2.getIntervals())
sa2.addNum(9)
console.log(sa2.getIntervals())
sa2.addNum(4)
console.log(sa2.getIntervals())
sa2.addNum(10)
console.log(sa2.getIntervals())
sa2.addNum(5)
console.log(sa2.getIntervals())
