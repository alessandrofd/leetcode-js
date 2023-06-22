/**
 * @param {number} num
 * @return {string}
  
Constraints: 1 <= num <= 3999
*/

const intToRoman1 = (num) => {
  const romanize = (digit, unit, five, ten) => {
    if (digit === undefined) return ''
    let result = ''
    if (digit < 5) {
      if (digit === 4) result = unit + five
      else for (i = 0; i < digit; i++) result = result + unit
    } else {
      if (digit === 9) result = unit + ten
      else {
        result = five
        for (i = 0; i < digit - 5; i++) result = result + unit
      }
    }
    return result
  }

  let result = ''
  const digits = [...num.toString()].map((d) => Number(d))

  result = romanize(digits.pop(), 'I', 'V', 'X')
  result = romanize(digits.pop(), 'X', 'L', 'C') + result
  result = romanize(digits.pop(), 'C', 'D', 'M') + result
  result = romanize(digits.pop(), 'M', '_', '_') + result

  return result
}

const intToRoman = (num) => {
  const arabic = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1]
  const roman = [
    'M',
    'CM',
    'D',
    'CD',
    'C',
    'XC',
    'L',
    'XL',
    'X',
    'IX',
    'V',
    'IV',
    'I',
  ]

  let result = ''
  for (let i = 0; i < arabic.length; i++)
    while (num >= arabic[i]) (num -= arabic[i]), (result += roman[i])
  return result
}

/*
Input: num = 3
Output: "III"
Explanation: 3 is represented as 3 ones.
*/
console.log(intToRoman(3))

/*
Input: num = 58
Output: "LVIII"
Explanation: L = 50, V = 5, III = 3.
*/
console.log(intToRoman(58))

/*
Input: num = 1994
Output: "MCMXCIV"
Explanation: M = 1000, CM = 900, XC = 90 and IV = 4.
*/
console.log(intToRoman(1994))
