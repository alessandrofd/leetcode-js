/**
 * Implement a SnapshotArray that supports the following interface:
 *
 *    SnapshotArray(int length) initializes an array-like data structure with
 *    the given length. Initially, each element equals 0.
 *
 *    void set(index, val) sets the element at the given index to be equal to val.
 *
 *    int snap() takes a snapshot of the array and returns the snap_id: the total
 *    number of times we called snap() minus 1.
 *
 *    int get(index, snap_id) returns the value at the given index, at the time
 *    we took the snapshot with the given snap_id
 *
 * Constraints:
 *    1 <= length <= 5 * 10^4
 *    0 <= index < length
 *    0 <= val <= 10^9
 *    0 <= snap_id < (the total number of times we call snap())
 *    At most 5 * 10^4 calls will be made to set, snap, and get.
 */

/**
 * @param {number} length
 */
class SnapshotArray {
  constructor(length) {}

  /**
   * @param {number} index
   * @param {number} val
   * @return {void}
   */
  set(index, val) {}

  /**
   * @return {number}
   */
  snap() {}

  /**
   * @param {number} index
   * @param {number} snap_id
   * @return {number}
   */
  get(index, snap_id) {}
}

let snapshotArr = new SnapshotArray(3)
snapshotArr.set(0, 5)
snapshotArr.snap() // 0
snapshotArr.set(0, 6)
snapshotArr.get(0, 0) // 5

snapshotArr = new SnapshotArray(3)
snapshotArr.set(1, 6)
snapshotArr.snap() // 0
snapshotArr.snap() // 1
snapshotArr.set(1, 19)
snapshotArr.set(0, 4)
snapshotArr.get(2, 1) // 0
snapshotArr.get(2, 0) // 0
snapshotArr.get(0, 1) // 0
