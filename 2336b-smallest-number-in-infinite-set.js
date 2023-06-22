/**
 * You have a set which contains all positive integers [1, 2, 3, 4, 5, ...].
 *
 * Implement the SmallestInfiniteSet class:
 *
 *    SmallestInfiniteSet() Initializes the SmallestInfiniteSet object to
 *    contain all positive integers.
 *
 *    int popSmallest() Removes and returns the smallest integer contained in
 *    the infinite set.
 *
 *    void addBack(int num) Adds a positive integer num back into the infinite
 *    set, if it is not already in the infinite set.
 *
 * Constraints:
 *    1 <= num <= 1000
 *    At most 1000 calls will be made in total to popSmallest and addBack.
 */

import { MinPriorityQueue } from '@datastructures-js/priority-queue'

class SmallestInfiniteSet {
  constructor() {}
  /**
   * @return {number}
   */
  popSmallest() {}
  /**
   * @param {number} num
   * @return {void}
   */
  addBack(num) {}
}

const obj = new SmallestInfiniteSet()
obj.addBack(2)
obj.popSmallest() // return 1
obj.popSmallest() // return 2
obj.popSmallest() // return 3
obj.addBack(1)
obj.popSmallest() // return 1
obj.popSmallest() // return 4
obj.popSmallest() // return 5
