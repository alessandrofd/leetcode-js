const FreqStack = function () {
  this.counter = {}
  this.byFrequency = {}
  this.maxFreq = 0
}

/**
 * @param {number} val
 * @return {void}
 */
FreqStack.prototype.push = function (val) {
  let count = this.counter[val] ?? 0
  this.counter[val] = ++count
  this.maxFreq = Math.max(this.maxFreq, count)

  if (!this.byFrequency[count]) this.byFrequency[count] = []
  this.byFrequency[count].push(val)
}

/**
 * @return {number}
 */
FreqStack.prototype.pop = function () {
  const popped = this.byFrequency[this.maxFreq].pop()
  this.counter[popped] = this.counter[popped] - 1
  if (this.byFrequency[this.maxFreq].length === 0) this.maxFreq--
  return popped
}

let result
const arr = []
const freqStack = new FreqStack()

freqStack.push(5)
freqStack.push(1)
freqStack.push(2)
freqStack.push(5)
freqStack.push(5)
freqStack.push(5)
freqStack.push(1)
freqStack.push(6)
freqStack.push(1)
freqStack.push(5)

console.log(freqStack.stack)
console.log(freqStack.counter)

result = freqStack.pop()
arr.push(result)

result
console.log(freqStack.stack)
console.log(freqStack.counter)

result = freqStack.pop()
arr.push(result)

result
console.log(freqStack.stack)
console.log(freqStack.counter)

result = freqStack.pop()
arr.push(result)

result
console.log(freqStack.stack)
console.log(freqStack.counter)

result = freqStack.pop()
arr.push(result)

result
console.log(freqStack.stack)
console.log(freqStack.counter)

result = freqStack.pop()
arr.push(result)

result
console.log(freqStack.stack)
console.log(freqStack.counter)

result = freqStack.pop()
arr.push(result)

result
console.log(freqStack.stack)
console.log(freqStack.counter)

result = freqStack.pop()
arr.push(result)

result
console.log(freqStack.stack)
console.log(freqStack.counter)

result = freqStack.pop()
arr.push(result)

result
console.log(freqStack.stack)
console.log(freqStack.counter)

result = freqStack.pop()
arr.push(result)

result
console.log(freqStack.stack)
console.log(freqStack.counter)

result = freqStack.pop()
arr.push(result)

result
console.log(freqStack.stack)
console.log(freqStack.counter)

// [null,null,null,null,null,null,null,4,null,6,null,1,null,1,null,4,2,3,9,0,4]
arr

/*
const freqStack = new FreqStack()

freqStack.push(5) // The stack is [5]
freqStack.push(7) // The stack is [5,7]
freqStack.push(5) // The stack is [5,7,5]
freqStack.push(7) // The stack is [5,7,5,7]
freqStack.push(4) // The stack is [5,7,5,7,4]
freqStack.push(5) // The stack is [5,7,5,7,4,5]
let result

console.log(freqStack.stack)
console.log(freqStack.counter)

result = freqStack.pop() // return 5, as 5 is the most frequent. The stack becomes [5,7,5,7,4].
console.log(result)
console.log(freqStack.stack)
console.log(freqStack.counter)

result = freqStack.pop() // return 7, as 5 and 7 is the most frequent, but 7 is closest to the top. The stack becomes [5,7,5,4].
console.log(result)

result = freqStack.pop()   // return 5, as 5 is the most frequent. The stack becomes [5,7,4].
console.log(result)

result = freqStack.pop()   // return 4, as 4, 5 and 7 is the most frequent, but 4 is closest to the top. The stack becomes [5,7].
console.log(result)

*/

/*
["FreqStack","push","push","push","push","push","push","pop","push","pop","push","pop","push","pop","push","pop","pop","pop","pop","pop","pop"]
[[],[4],[0],[9],[3],[4],[2],[],[6],[],[1],[],[1],[],[4],[],[],[],[],[],[]]
Output
[null,null,null,null,null,null,null,4,null,2,null,1,null,1,null,4,6,3,9,0,4]
Expected
[null,null,null,null,null,null,null,4,null,6,null,1,null,1,null,4,2,3,9,0,4]
*/

/*
let result
const arr = []
const freqStack = new FreqStack()

freqStack.push(4)
freqStack.push(0)
freqStack.push(9)
freqStack.push(3)
freqStack.push(4)
freqStack.push(2)

console.log(freqStack.stack)
console.log(freqStack.counter)

result = freqStack.pop()
arr.push(result)
console.log(result)
console.log(freqStack.stack)
console.log(freqStack.counter)

freqStack.push(6)
console.log(freqStack.stack)
console.log(freqStack.counter)

result = freqStack.pop()
arr.push(result)
console.log(result)
console.log(freqStack.stack)
console.log(freqStack.counter)

freqStack.push(1)
console.log(freqStack.stack)
console.log(freqStack.counter)

result = freqStack.pop()
arr.push(result)
console.log(result)
console.log(freqStack.stack)
console.log(freqStack.counter)

freqStack.push(1)
console.log(freqStack.stack)
console.log(freqStack.counter)

result = freqStack.pop()
arr.push(result)
console.log(result)
console.log(freqStack.stack)
console.log(freqStack.counter)

freqStack.push(4)
console.log(freqStack.stack)
console.log(freqStack.counter)

result = freqStack.pop()
arr.push(result)
console.log(result)
console.log(freqStack.stack)
console.log(freqStack.counter)

result = freqStack.pop()
arr.push(result)
console.log(result)
console.log(freqStack.stack)
console.log(freqStack.counter)

result = freqStack.pop()
arr.push(result)
console.log(result)
console.log(freqStack.stack)
console.log(freqStack.counter)

result = freqStack.pop()
arr.push(result)
console.log(result)
console.log(freqStack.stack)
console.log(freqStack.counter)

result = freqStack.pop()
arr.push(result)
console.log(result)
console.log(freqStack.stack)
console.log(freqStack.counter)

result = freqStack.pop()
arr.push(result)
console.log(result)
console.log(freqStack.stack)
console.log(freqStack.counter)

// [null,null,null,null,null,null,null,4,null,6,null,1,null,1,null,4,2,3,9,0,4]
arr
*/

//["FreqStack","push","push","push","push","push","push","push","push","push","push","pop","pop","pop","pop","pop","pop","pop","pop","pop","pop"]
//[[],[5],[1],[2],[5],[5],[5],[1],[6],[1],[5],[],[],[],[],[],[],[],[],[],[]]
