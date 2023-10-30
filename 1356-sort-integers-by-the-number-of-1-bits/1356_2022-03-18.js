/**
 * @param {number[]} arr
 * @return {number[]}
 */
const sortByBits = (arr) => {
  return arr
    .map((n) => [
      n,
      n
        .toString(2)
        .split('')
        .filter((c) => c === '1').length,
    ])
    .sort(([a1, a2], [b1, b2]) => a2 - b2 || a1 - b1)
    .map(([a]) => a)

}

// Input: arr = [0,1,2,3,4,5,6,7,8]
// Output: [0,1,2,4,8,3,5,6,7]
console.log(sortByBits([0, 1, 2, 3, 4, 5, 6, 7, 8]))

// Input: arr = [1024,512,256,128,64,32,16,8,4,2,1]
// Output: [1,2,4,8,16,32,64,128,256,512,1024]
console.log(sortByBits([1024, 512, 256, 128, 64, 32, 16, 8, 4, 2, 1]))


const n = 7
const c = n.toString(2)
c
