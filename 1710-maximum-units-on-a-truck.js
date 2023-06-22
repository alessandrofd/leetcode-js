/**
 * @param {number[][]} boxTypes
 * @param {number} truckSize
 * @return {number}
 */
const maximumUnits = (boxTypes, truckSize) => {
  boxTypes.sort(([, a], [, b]) => b - a)
  units = 0
  for (i = 0; i < boxTypes.length && truckSize > 0; i++) {
    boxes = Math.min(truckSize, boxTypes[i][0])
    units += boxes * boxTypes[i][1]
    truckSize -= boxes
  }
  return units
}

boxTypes = [
  [1, 3],
  [2, 2],
  [3, 1],
]
truckSize = 4
// Output: 8

// boxTypes = [
//   [5, 10],
//   [2, 5],
//   [4, 7],
//   [3, 9],
// ]
// truckSize = 10
// Output: 91

console.log(maximumUnits(boxTypes, truckSize))
