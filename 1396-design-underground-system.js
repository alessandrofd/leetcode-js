var UndergroundSystem_1 = function () {
  this.arr = []
}

/**
 * @param {number} id
 * @param {string} stationName
 * @param {number} t
 * @return {void}
 */
UndergroundSystem_1.prototype.checkIn = function (id, startStation, t) {
  this.arr.push({ id, startStation, t })
}

/**
 * @param {number} id
 * @param {string} stationName
 * @param {number} t
 * @return {void}
 */
UndergroundSystem_1.prototype.checkOut = function (id, endStation, t) {
  const ticket = this.arr.find((t) => t.id === id && t.endStation === undefined)
  if (ticket) {
    ticket.endStation = endStation
    ticket.t = t - ticket.t
  }
}

/**
 * @param {string} startStation
 * @param {string} endStation
 * @return {number}
 */
UndergroundSystem_1.prototype.getAverageTime = function (
  startStation,
  endStation
) {
  const tickets = this.arr.filter(
    (t) => t.startStation === startStation && t.endStation === endStation
  )
  if (tickets.length === 0) return 0
  return tickets.reduce((acc, { t }) => acc + t, 0) / tickets.length
}



var UndergroundSystem = function () {
  this.ongoingTrips = new Map()
  this.history = new Map()
}

UndergroundSystem.prototype.checkIn = function (id, startStation, checkInTime) {
  this.ongoingTrips.set(id, { startStation, checkInTime })
}

UndergroundSystem.prototype.checkOut = function (id, endStation, checkOutTime) {
  const { startStation, checkInTime } = this.ongoingTrips.get(id)
  this.ongoingTrips.delete(id)
  const key = `${startStation}-${endStation}`
  let records = this.history.get(key)
  if (!records) {
    records = { time: 0, count: 0 }
    this.history.set(key, records)
  }
  records.time += checkOutTime - checkInTime
  records.count++
}

UndergroundSystem.prototype.getAverageTime = function (
  startStation,
  endStation
) {
  const key = `${startStation}-${endStation}`
  const records = this.history.get(key)
  return records.time / records.count
}

/*
const undergroundSystem = new UndergroundSystem()
undergroundSystem.checkIn(45, 'Leyton', 1)
undergroundSystem.checkOut(45, 'Waterloo', 2)
console.log(undergroundSystem.history)
undergroundSystem.checkIn(45, 'Leyton', 1)
undergroundSystem.checkOut(45, 'Waterloo', 20)
console.log(undergroundSystem.getAverageTime('Leyton', 'Waterloo'))
*/


// const undergroundSystem = new UndergroundSystem();
// undergroundSystem.checkIn(45, "Leyton", 3);
// undergroundSystem.checkIn(32, "Paradise", 8);
// undergroundSystem.checkIn(27, "Leyton", 10);
// undergroundSystem.checkOut(45, "Waterloo", 15);  // Customer 45 "Leyton" -> "Waterloo" in 15-3 = 12
// undergroundSystem.checkOut(27, "Waterloo", 20);  // Customer 27 "Leyton" -> "Waterloo" in 20-10 = 10
// undergroundSystem.checkOut(32, "Cambridge", 22); // Customer 32 "Paradise" -> "Cambridge" in 22-8 = 14
// console.log(undergroundSystem.getAverageTime("Paradise", "Cambridge")); // return 14.00000. One trip "Paradise" -> "Cambridge", (14) / 1 = 14
// console.log(undergroundSystem.getAverageTime("Leyton", "Waterloo"));    // return 11.00000. Two trips "Leyton" -> "Waterloo", (10 + 12) / 2 = 11
// undergroundSystem.checkIn(10, "Leyton", 24);
// console.log(undergroundSystem.getAverageTime("Leyton", "Waterloo"));    // return 11.00000
// undergroundSystem.checkOut(10, "Waterloo", 38);  // Customer 10 "Leyton" -> "Waterloo" in 38-24 = 14
// console.log(undergroundSystem.getAverageTime("Leyton", "Waterloo"));    // return 12.00000. Three trips "Leyton" -> "Waterloo", (10 + 12 + 14) / 3 = 12 


// const undergroundSystem = new UndergroundSystem();
// undergroundSystem.checkIn(10, "Leyton", 3);
// undergroundSystem.checkOut(10, "Paradise", 8); // Customer 10 "Leyton" -> "Paradise" in 8-3 = 5
// console.log(undergroundSystem.getAverageTime("Leyton", "Paradise")); // return 5.00000, (5) / 1 = 5
// undergroundSystem.checkIn(5, "Leyton", 10);
// undergroundSystem.checkOut(5, "Paradise", 16); // Customer 5 "Leyton" -> "Paradise" in 16-10 = 6
// console.log(undergroundSystem.getAverageTime("Leyton", "Paradise")); // return 5.50000, (5 + 6) / 2 = 5.5
// undergroundSystem.checkIn(2, "Leyton", 21);
// undergroundSystem.checkOut(2, "Paradise", 30); // Customer 2 "Leyton" -> "Paradise" in 30-21 = 9
// console.log(undergroundSystem.getAverageTime("Leyton", "Paradise")); // return 6.66667, (5 + 6 + 9) / 3 = 6.66667

