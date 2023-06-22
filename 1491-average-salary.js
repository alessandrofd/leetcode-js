const average = salary => {
  let sum = salary.reduce((acc, val) => acc + val, 0)
  console.log(...salary)
  sum -= Math.max(...salary)
  sum -= Math.min(...salary)
  return sum / (salary.length - 2)
}


console.log(average([4000, 3000, 1000, 2000]))
console.log(Math.min(...[1, 2, 3]))
