const isHappy1 = (n, set = new Set()) => {
  if (set.has(n)) return false
  if (n === 1) return true
  set.add(n)
  return isHappy(
    [...n.toString()].reduce((acc, val) => acc + Math.pow(Number(val), 2), 0),
    set
  )
}

const isHappy = (n, set = new Set()) => {
  const squareDigits = (n) => {
    let squared = 0
    while (n > 0) {
      squared += Math.pow(n % 10, 2)
      n = Math.trunc(n / 10)
    }
    return squared
  }

  if (set.has(n)) return false
  if (n === 1) return true
  set.add(n)
  return isHappy(squareDigits(n), set)
}

console.log(isHappy(19))
console.log(isHappy(2))
