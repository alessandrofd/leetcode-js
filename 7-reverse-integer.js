var reverse1 = function (x) {
  const n =
    Number([...Math.abs(x).toString()].reverse().join('')) * (x < 0 ? -1 : 1)
  return n < -Math.pow(2, 31) || n > Math.pow(2, 31) - 1 ? 0 : n
}

const reverse = (x) => {
  const INT_MAX = Math.pow(2, 31) - 1
  const INT_MIN = -Math.pow(2, 31)
  let rev = 0

  while (x != 0) {
    let pop = x % 10
    x = Math.trunc(x / 10)
    rev = rev * 10 + pop
  }

  return rev < INT_MIN || rev > INT_MAX ? 0 : rev
}

console.log(reverse(900000))
