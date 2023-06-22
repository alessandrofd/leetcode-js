/**
 * @param {number} big
 * @param {number} medium
 * @param {number} small
 */
var ParkingSystem = function (big, medium, small) {
  this.spaces = {}
  this.spaces[3] = big
  this.spaces[2] = medium
  this.spaces[1] = small
}

/**
 * @param {number} carType
 * @return {boolean}
 */
ParkingSystem.prototype.addCar = function (carType) {
  if (!this.spaces[carType]) return false
  this.spaces[carType]--
  return true
}

/**
 * Your ParkingSystem object will be instantiated and called as such:
 * var obj = new ParkingSystem(big, medium, small)
 * var param_1 = obj.addCar(carType)
 */

/*
Input:
  ['ParkingSystem', 'addCar', 'addCar', 'addCar', 'addCar']
  [[1, 1, 0], [1], [2], [3], [1]]
Output:
  [null, true, true, false, false]
*/
const obj = new ParkingSystem(1, 1, 0)
console.log(obj.addCar(1))
console.log(obj.addCar(2))
console.log(obj.addCar(3))
console.log(obj.addCar(1))
