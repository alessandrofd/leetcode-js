/**
 * You are given a 0-indexed 2D integer array flowers, where
 * flowers[i] = [starti, endi] means the ith flower will be in full bloom from
 * starti to endi (inclusive). You are also given a 0-indexed integer array
 * people of size n, where people[i] is the time that the ith person will arrive
 * to see the flowers.
 *
 * Return an integer array answer of size n, where answer[i] is the number of
 * flowers that are in full bloom when the ith person arrives.
 *
 * Constraints:
 *    1 <= flowers.length <= 5 * 10^4
 *    flowers[i].length == 2
 *    1 <= starti <= endi <= 10^9
 *    1 <= people.length <= 5 * 10^4
 *    1 <= people[i] <= 10^9
 *
 * Topics: Array, Hash Table, Binary Search, Sorting, Prefix Sum, Ordered Set
 *
 * Hints:
 *    Notice that for any given time t, the number of flowers blooming at time t
 *    is equal to the number of flowers that have started blooming minus the
 *    number of flowers that have already stopped blooming.
 *
 *    We can obtain these values efficiently using binary search.
 *
 *    We can store the starting times in sorted order, which then allows us to
 *    binary search to find how many flowers have started blooming for a given
 *    time t.
 *
 *    We do the same for the ending times to find how many flowers have stopped
 *    blooming at time t.
 */

import _ from 'lodash'
import { MinPriorityQueue } from '@datastructures-js/priority-queue'

/**
 * @param {number[][]} flowers
 * @param {number[]} people
 * @return {number[]}
 */
const fullBloomFlowers_priority_queue = (flowers, people) => {
  /**
   * Approach 1: Heap/Priority Queue
   *
   * For each person in people, we need to find how many flower ranges
   * [start, end] contain person. An intuitive first step is to sort both input
   * arrays so that we can process both flowers and people in chronological
   * order.
   *
   * For the first person (in terms of arrival time), we can find all the
   * flowers that have start less than person - these are the flowers that have
   * started blooming before person arrived, and thus person might have a chance
   * of seeing them. Of those flowers, we remove the ones that have end less
   * than person as well, as these are the flowers that have finished blooming,
   * and person missed them. The number of remaining flowers is the answer for
   * the first person. Note that because we sorted people, the flowers we remove
   * here are guaranteed never to be seen again and therefore will not affect
   * anyone else after person.
   *
   * Let's move to the second person. Once again, we find all the flowers that
   * have start less than person. But do we need to start from scratch? No!
   * Because we are processing both the flowers and people in order, we can
   * start from where we left off with the previous person. More specifically,
   * because the second person's arrival time is greater than or equal to the
   * previous person's, the flowers that bloom before the previous person must
   * also bloom before the second person, so there's no need for us to handle
   * this portion of flowers again. Therefore, we will add all the flowers that
   * have start less than the second person, starting after the last flower we
   * took.
   *
   * Similarly, the flowers that the previous person missed are definitely also
   * missed by the second person, so there's no need for us to handle this
   * portion of removed flowers again. Once we have taken all the flowers with
   * start less than person, we can simply remove all the flowers that have end
   * less than person. The number of remaining flowers is the answer for the
   * econd person.
   *
   * We can continue this process for each person. To find the flowers with
   * start less than a given person, we can use a pointer i that starts at 0.
   * We will move i along the flowers array and never decrement or reset it.
   * This allows us to pick up where we left off for each successive person.
   *
   * How can we remove the flowers that have end less than a given person?
   * This one is trickier because we can only sort flowers by one dimension.
   * To use the pointer technique we just described, we must sort by the start
   * times. Thus, the end times are not necessarily in order. For example, you
   * could have flowers like this:
   *
   *     [2, 9], [3, 6]
   *
   * In this case, using another pointer like j for the end times would not work
   * since 9 is greater than 6 but comes earlier in the input.
   *
   * As we are concerned with the flowers that have earlier end times, we can
   * use a heap/priority queue to keep track of which flowers finish blooming.
   * We will maintain a min heap and push end times of flowers onto this heap.
   * Once we have added all flowers with start less than person, we will pop
   * from the heap as long as the top of it is less than person.
   *
   * After popping from heap, it will hold the end times of all flowers that
   * person can see. Thus, the answer for person is simply the size of the heap.
   *
   * To summarize, we use a pointer i to iterate along flowers. For a given
   * person, we find all the flowers that started blooming before person arrives.
   * We push the end time of these flowers onto a heap. We can then remove all
   * the flowers that finished blooming by popping from the heap, since a min
   * heap efficiently gives us the minimum (earliest) times.
   *
   * As we sort both input arrays, flowers that we pop from heap will never be
   * seen again by future people.
   *
   * A note on implementation: here, we are sorting people, but the problem
   * description asks us for the answer according to the original order. We will
   * use a hash map that maps a person to the number of flowers they see.
   * We will also keep the original order of people by creating a copy of it to
   * sort. Once we have calculated the answer for everyone in the sorted order,
   * we can iterate through the original people and refer to the hash map to
   * build the final answer by restoring their original order.
   */

  const times = Array.from(new Set(people)).sort((a, b) => a - b)
  const flowersByTime = new Map()
  const ends = new MinPriorityQueue({ priority: (el) => el })
  flowers.sort(([a], [b]) => a - b)

  let i = 0
  for (const time of times) {
    while (i < flowers.length && flowers[i][0] <= time) {
      ends.enqueue(flowers[i][1])
      i += 1
    }

    while (ends.size() && ends.front().element < time) {
      ends.dequeue()
    }

    flowersByTime.set(time, ends.size())
  }

  const result = []
  for (const time of people) {
    result.push(flowersByTime.get(time))
  }
  return result
}

/**
 * @param {number[][]} flowers
 * @param {number[]} people
 * @return {number[]}
 */
const fullBloomFlowers_diff_array_bin_search = (flowers, people) => {
  /**
   * There is a technique called difference array that can be used to solve many
   * "range" based problems. The technique involves creating an array difference
   * and iterating over all ranges [start, end]. We perform difference[start]++
   * and difference[end + 1]-- for each range.
   *
   * The idea is that each index of difference represents the change in the
   * number of flowers we can see when we cross this index (not the actual
   * number of flowers on this index), with each index representing a unit of
   * time. Thus, we could take a prefix sum of this difference array to find how
   * many flowers can be seen at any given time with prefix[time].
   *
   * Some people also call this technique "line sweep".
   *
   * Unfortunately, if we look at the constraints, we find that values of
   * start, end, people can be up to 10^9.
   *
   * It would not be feasible to create an array with such a large size. Thus,
   * we need to use a map structure instead. Like in the previous approach, we
   * still want to process everything chronologically. We will use the following
   * data structures:
   *
   *    In Java, we will use TreeMap.
   *    In C++, we will use std::map.
   *    In Python, we will use sortedcontainers.SortedDict.
   *
   * Note that if you were not allowed to use these structures in an interview,
   * you could still implement this approach using a normal hash map. You would
   * just need to sort the elements in the hash map by key values after you
   * populated it.
   *
   * Once we have this data structure difference, we will follow the process
   * described above. We iterate over each flower = [start, end] and increment
   * difference[start] while decrementing difference[end + 1]. The idea is that
   * when we reach start, the number of flowers we see increases by one. When we
   * reach end + 1, the number of flowers we see decreases by one.
   *
   * We then create a prefix sum of the values in difference. We also need to
   * know what time each value is associated with, so we will create an array
   * positions to go along with our prefix array. Here, prefix[i] is the number
   *  of flowers available at time positions[i].
   *
   * Finally, we can iterate over people and find the answer for each person.
   * How do we do this? We can perform a binary search over positions to find
   * the index i where person fits. prefix[i] is the answer for this person.
   *
   * There are a few more things to consider before we start implementation.
   *
   *    What happens if there is a person that arrives before any flower blooms?
   *    This may confuse our binary search since the minimum value in positions
   *    will be greater than person. We will initialize difference with 0: 0 to
   *    represent at time 0, we don't see any new flowers.
   *
   *    Regarding the binary search; how should it be configured? Referencing
   *    the above example images, inserting 11 into the given positions array
   *    will put it at index 6. However, we need index 5. Thus, we need the
   *    insertion index minus one. What if the value exists in positions, as is
   *    the case with person = 7? To offset the minus one, we will binary search
   *    for the rightmost insertion index (bisect_right in Python,
   *    upper_bound in C++).
   */

  const bisectRight = (arr, x, lo = 0, hi = arr.length) => {
    while (lo < hi) {
      const mid = Math.floor((lo + hi) / 2)
      if (arr[mid] > x) hi = mid
      else lo = mid + 1
    }
    return lo
  }

  const diffs = new Map([[0, 0]])
  for (const [start, end] of flowers) {
    diffs.set(start, (diffs.get(start) ?? 0) + 1)
    diffs.set(end + 1, (diffs.get(end + 1) ?? 0) - 1)
  }

  const times = [...diffs.keys()].sort((a, b) => a - b)
  let sum = 0
  const flowersInBloom = times.map((pos) => (sum += diffs.get(pos)))

  let result = []
  for (const time of people) {
    const i = bisectRight(times, time) - 1
    result.push(flowersInBloom[i])
  }
  return result
}

/**
 * @param {number[][]} flowers
 * @param {number[]} people
 * @return {number[]}
 */
const fullBloomFlowers_bin_search_start_end = (flowers, people) => {
  /**
   * In the previous approach, we used the concept of a difference array/line
   * sweep to calculate how many flowers are seen at a given time. For each
   * flower = [start, end], we indicated that at time start, we see one more
   * flower, and at time end + 1, we see one less flower. We identified when a
   * flower started blooming and when it finished blooming.
   *
   * The idea behind this strategy is that at any given time, the number of
   * flowers we see is the number of flowers that have already started blooming
   * minus the amount of flowers have finished blooming.
   *
   * Is there a simpler way to identify at a given time, how many flowers have
   * started blooming, and how many flowers have finished blooming? In the first
   * two approaches, we always associate the start and end of the same flower
   * together for processing, which is more intuitive but can be more complex to
   * handle. What if we separately consider these two sets of times?
   *
   * We can simply collect all start points in one array starts, sort it, and
   * then perform a binary search. We can do the exact same thing with another
   * array ends for all end points. Take a look at the following example:
   *
   * Regarding the binary searches: when binary searching on starts, we want to
   * search for the rightmost insertion index. This is because if a person
   * arrives at the same time as a flower starts blooming, we want to include
   * this flower.
   *
   * Note that a flower = [start, end] stops blooming at end + 1, not end.
   * There are two ways we can handle this. We can either binary search on end
   * for the leftmost insertion index (since we want to include all flowers with
   * end equal to the current time), or we can assemble ends using end + 1 for
   * each flower. We will implement the algorithm using the second option in
   * this article.
   */

  const bisectRight = (arr, x, lo = 0, hi = arr.length) => {
    /**
     * The returned insertion point ip partitions the array a into two slices
     * such that:
     *    all(elem <= x for elem in a[lo : ip]) is true for the left slice and
     *    all(elem > x for elem in a[ip : hi]) is true for the right slice.
     */
    while (lo < hi) {
      const mid = Math.floor((lo + hi) / 2)
      if (arr[mid] > x) hi = mid
      else lo = mid + 1
    }
    return lo
  }

  const starts = []
  const ends = []

  flowers.forEach(([start, end]) => {
    starts.push(start)
    ends.push(end + 1)
  })

  starts.sort((a, b) => a - b)
  ends.sort((a, b) => a - b)

  const result = []
  for (const time of people) {
    const i = bisectRight(starts, time)
    const j = bisectRight(ends, time)
    result.push(i - j)
  }
  return result
}

// prettier-ignore
const funcs = [
  // fullBloomFlowers_priority_queue,
  // fullBloomFlowers_diff_array_bin_search,
  fullBloomFlowers_bin_search_start_end,
]

// prettier-ignore
const data = [
  [[[1, 6], [3, 7], [9, 12], [4, 13]], [2, 3, 7, 11], [1, 2, 2, 2]],
  [[[1, 10], [3, 3]], [3, 3, 2], [2, 2, 1]], 
  [[[19,37],[19,38],[19,35]], [6,7,21,1,13,37,5,37,46,43], [0,0,3,0,0,2,0,2,0,0]]
]

for (const func of funcs) {
  for (const [flowers, people, expected] of data) {
    console.log(_.isEqual(func(flowers, people), expected))
  }
}
