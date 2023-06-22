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
  constructor() {}

  addNum(value) {}

  getIntervals() {}
}

// class SummaryRanges_intervalsOnTheFly {
class SummaryRanges {
  constructor() {}

  addNum = (value) => {}

  getIntervals = () => {}
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
