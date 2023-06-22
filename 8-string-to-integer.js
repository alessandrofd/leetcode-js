const myAtoi1 = (s) => {
  const INT_MAX = Math.pow(2, 31) - 1
  const INT_MIN = -Math.pow(2, 31)

  const re = /^\s*(\-|\+)?(\d+).*/
  const match = s.match(re)
  if (!match) return 0

  const [_, sign, number] = match

  let res = 0
  for (digit of number) {
    res = res * 10 + Number(digit)
  }

  if (sign === '-') res *= -1

  return res < INT_MIN ? INT_MIN : res > INT_MAX ? INT_MAX : res
}

const myAtoi = (s) => {
  const INT_MAX = Math.pow(2, 31) - 1
  const INT_MIN = -Math.pow(2, 31)

  INT_MAX
  let num = 0
  let sign = 1

  let i = 0

  while (s[i] === ' ') i++

  if (s[i] === '+' || s[i] === '-') {
    sign = s[i] === '-' ? -1 : 1
    i++
  }

  while (s[i] >= '0' && s[i] <= '9') {
    if (
      num > Math.trunc(INT_MAX / 10) ||
      (num === Math.trunc(INT_MAX / 10) && s[i] - '0' > INT_MAX % 10)
    )
      return sign === -1 ? INT_MIN : INT_MAX

    num = num * 10 + (s[i] - '0')
    i++
  }

  return num * sign
}

console.log(myAtoi('21474836460'))
