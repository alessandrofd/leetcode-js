/**
 * Design an algorithm that collects daily price quotes for some stock and
 * returns the span of that stock's price for the current day.
 *
 * The span of the stock's price today is defined as the maximum number of
 * consecutive days (starting from today and going backward) for which the stock
 * price was less than or equal to today's price.
 *
 * For example, if the price of a stock over the next 7 days were
 * [100,80,60,70,60,75,85], then the stock spans would be [1,1,1,2,1,4,6].
 *
 * Implement the StockSpanner class:
 *    StockSpanner() Initializes the object of the class.
 *    int next(int price) Returns the span of the stock's price given that
 *    today's price is price.
 *
 *  Constraints:
 *    1 <= price <= 10^5
 *    At most 10^4 calls will be made to next.
 */

class StockSpanner_0 {
  constructor() {
    this.array = [[Infinity, 0]]
  }

  next = (price) => {
    let span = 0
    let [prevPrice, prevSpan] = this.array[span]
    while (prevPrice <= price) {
      span += prevSpan
      ;[prevPrice, prevSpan] = this.array[span]
    }
    this.array.unshift([price, span + 1])
    return span + 1
  }
}

class StockSpanner {
  constructor() {
    this.array = []
  }

  next = (price) => {
    let span = 1
    while (this.array.length && this.array.at(-1).price <= price) {
      const popped = this.array.pop()
      popped
      span += popped.span
    }
    this.array.push({ price, span })
    return span
  }
}

// const stockSpanner = new StockSpanner()
// stockSpanner.next(100) // return 1
// stockSpanner.next(80) // return 1
// stockSpanner.next(60) // return 1
// stockSpanner.next(70) // return 2
// stockSpanner.next(60) // return 1
// stockSpanner.next(75) // return 4, because the last 4 prices (including today's price of 75) were less than or equal to today's price.
// stockSpanner.next(85) // return 6

const stockSpanner = new StockSpanner()
stockSpanner.next(28) // 1
stockSpanner.next(14) // 1
stockSpanner.next(28) // 3
stockSpanner.next(35) // 4
stockSpanner.next(46) // 5
stockSpanner.next(53) // 6
stockSpanner.next(66) // 7
stockSpanner.next(80) // 8
stockSpanner.next(87) // 9
stockSpanner.next(88) //10
