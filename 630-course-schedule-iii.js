/**
 * @param {number[][]} courses
 * @return {number}
 */
//Approach 2: Recursion with Memoization
const scheduleCourse_2 = (courses) => {
  const schedule = (i, time, memo) => {
    if (i === courses.length) return 0
    if (memo[i][time]) return memo[i][time]

    let taken = 0
    if (time + courses[i][0] <= courses[i][1])
      taken = 1 + schedule(i + 1, time + courses[i][0], memo)
    let notTaken = schedule(i + 1, time, memo)
    memo[i][time] = Math.max(taken, notTaken)
    return memo[i][time]
  }

  courses.sort((a, b) => a[1] - b[1])
  memo = new Array(courses.length)
    .fill()
    .map((_) => new Array(courses[courses.length - 1][1] + 1))
  return schedule(0, 0, memo)
}

//Approach 3: Iterative Solution
const scheduleCourse_3 = (courses) => {
  courses.sort((a, b) => a[1] - b[1])
  let time = 0
  let count = 0
  for (let i = 0; i < courses.length; i++) {
    if (time + courses[i][0] <= courses[i][1]) {
      time += courses[i][0]
      count++
    } else {
      let longest = i
      for (j = 0; j < i; j++)
        if (courses[j][0] > courses[longest][0]) longest = j
      if (longest !== i) time += courses[i][0] - courses[longest][0]
      courses[longest][0] = -1
    }
  }
  return count
}

//Approach 4: Optimized Iterative
const scheduleCourse_4 = (courses) => {
  courses.sort((a, b) => a[1] - b[1])
  let time = 0
  let count = 0
  for (let i = 0; i < courses.length; i++) {
    if (time + courses[i][0] <= courses[i][1]) {
      time += courses[i][0]
      courses[count++] = courses[i]
    } else {
      let longest = i
      for (j = 0; j < count; j++)
        if (courses[j][0] > courses[longest][0]) longest = j
      if (longest !== i) time += courses[i][0] - courses[longest][0]
      courses[longest] = courses[i]
    }
  }
  return count
}

// Approach 5: Extra List
const scheduleCourse_5 = (courses) => {
  courses.sort((a, b) => a[1] - b[1])
  coursesTaken = []
  time = 0
  for ([duration, endDate] of courses) {
    if (time + duration <= endDate) {
      coursesTaken.push(duration)
      time += duration
    } else {
      let longest = 0
      for (j = 1; j < coursesTaken.length; j++)
        if (coursesTaken[j] > coursesTaken[longest]) longest = j
      if (coursesTaken[longest] > duration) {
        time += duration - coursesTaken[longest]
        coursesTaken[longest] = duration
      }
    }
  }
  return coursesTaken.length
}

// Approach 6: Priority Queue
const scheduleCourse = (courses) => {
  class MaxHeap {
    constructor() {
      this.data = []
    }

    offer(val) {
      this.data.push(val)
      this.bubbleUp(this.size() - 1)
    }

    peek() {
      return this.data[0]
    }

    poll() {
      if (this.size() == 1) return this.data.pop()
      const top = this.data[0]
      this.data[0] = this.data.pop()
      this.bubbleDown(0)
      return top
    }

    bubbleUp(i) {
      let p = Math.floor((i - 1) / 2)
      if (this.data[p] < this.data[i]) {
        this.swap(p, i)
        this.bubbleUp(p)
      }
    }

    bubbleDown(i) {
      let l = i * 2 + 1
      let r = i * 2 + 2
      let max = i
      if (l < this.size() && this.data[max] < this.data[l]) max = l
      if (r < this.size() && this.data[max] < this.data[r]) max = r
      if (max !== i) {
        this.swap(max, i)
        this.bubbleDown(max)
      }
    }

    swap(a, b) {
      let temp = this.data[a]
      this.data[a] = this.data[b]
      this.data[b] = temp
    }

    size() {
      return this.data.length
    }
  }

  courses.sort((a, b) => a[1] - b[1])
  coursesTaken = new MaxHeap()
  time = 0
  for ([duration, endDate] of courses) {
    if (time + duration <= endDate) {
      coursesTaken.offer(duration)
      time += duration
    } else {
      if (coursesTaken.peek() > duration) {
        time += duration - coursesTaken.poll()
        coursesTaken.offer(duration)
      }
    }
  }
  return coursesTaken.size()
}

courses = [
  [100, 200],
  [200, 1300],
  [1000, 1250],
  [2000, 3200],
]

console.log(scheduleCourse(courses))
