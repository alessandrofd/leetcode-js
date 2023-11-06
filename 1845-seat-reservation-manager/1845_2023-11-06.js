import { MinPriorityQueue } from '@datastructures-js/priority-queue'

class SeatManager_pq {
  constructor(n) {
    this.pq = new MinPriorityQueue({ priority: (element) => element })
    for (let i = 1; i <= n; i++) this.pq.enqueue(i)
  }

  reserve() {
    return this.pq.dequeue().element
  }

  unreserve(seatNumber) {
    this.pq.enqueue(seatNumber)
  }
}

class SeatManager {
  constructor(n) {
    this.pq = new MinPriorityQueue({ priority: (element) => element })
    this.marker = 0
  }

  reserve() {
    if (this.pq.size() > 0) return this.pq.dequeue().element

    this.marker += 1
    return this.marker
  }

  unreserve(seatNumber) {
    this.pq.enqueue(seatNumber)
  }
}

const seatManager = new SeatManager(5)
console.log(seatManager.reserve() === 1)
console.log(seatManager.reserve() === 2)
seatManager.unreserve(2)
console.log(seatManager.reserve() === 2)
console.log(seatManager.reserve() === 3)
console.log(seatManager.reserve() === 4)
console.log(seatManager.reserve() === 5)
seatManager.unreserve(5)
