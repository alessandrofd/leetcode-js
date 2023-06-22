/**
 * Design your implementation of the circular queue. The circular queue is a
 * linear data structure in which the operations are performed based on FIFO
 * (First In First Out) principle and the last position is connected back to the
 * first position to make a circle. It is also called "Ring Buffer".
 *
 * One of the benefits of the circular queue is that we can make use of the
 * spaces in front of the queue. In a normal queue, once the queue becomes full,
 * we cannot insert the next element even if there is a space in front of the
 * queue. But using the circular queue, we can use the space to store new values.
 *
 * Implementation the MyCircularQueue class:
 *    MyCircularQueue(k) Initializes the object with the size of the queue to be k.
 *    int Front() Gets the front item from the queue. If the queue is empty, return -1.
 *    int Rear() Gets the last item from the queue. If the queue is empty, return -1.
 *    boolean enQueue(int value) Inserts an element into the circular queue. Return true if the operation is successful.
 *    boolean deQueue() Deletes an element from the circular queue. Return true if the operation is successful.
 *    boolean isEmpty() Checks whether the circular queue is empty or not.
 *    boolean isFull() Checks whether the circular queue is full or not.
 *
 * You must solve the problem without using the built-in queue data structure in
 * your programming language.
 *
 * Constraints:
 *    1 <= k <= 1000
 *    0 <= value <= 1000
 *    At most 3000 calls will be made to enQueue, deQueue, Front, Rear, isEmpty,
 *    and isFull.
 */

/**
 * @param {number} k
 */

class MyCircularQueue {
  constructor(k) {
    this.capacity = k
    this.queue = new Array(k)
    this.head = 0
    this.count = 0
  }

  enQueue = (value) => {
    if (this.count === this.capacity) return false
    this.queue[(this.head + this.count) % this.capacity] = value
    this.count += 1
    return true
  }

  deQueue = () => {
    if (this.count === 0) return false
    this.head = (this.head + 1) % this.capacity
    this.count -= 1
    return true
  }

  Front = () => (this.count ? this.queue[this.head] : -1)

  Rear = () =>
    this.count ? this.queue[(this.head + this.count - 1) % this.capacity] : -1

  isEmpty = () => this.count === 0

  isFull = () => this.count === this.capacity
}

var obj = new MyCircularQueue(3)
var param_1 = obj.enQueue(1)
var param_1 = obj.enQueue(2)
var param_1 = obj.enQueue(3)
var param_1 = obj.enQueue(4)
var param_4 = obj.Rear()
var param_6 = obj.isFull()
var param_2 = obj.deQueue()
var param_1 = obj.enQueue(4)
var param_3 = obj.Front()
var param_4 = obj.Rear()
