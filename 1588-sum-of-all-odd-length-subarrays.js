/**
 * @param {number[]} arr
 * @return {number}
 **
Constraints:
* 1 <= arr.length <= 100
* 1 <= arr[i] <= 1000
*/

const sumOddLengthSubarrays1 = (arr) => {
  const odds = []
  for (let i = 1; i <= arr.length; i += 2) {
    for (let j = 0; j + i <= arr.length; j++) {
      odds.push(arr.slice(j, j + i))
    }
  }
  return odds.reduce((acc, a) => acc + a.reduce((acc, n) => acc + n, 0), 0)
}

/*
 * Nova estratégia em que se calcula quantas vezes cada elemento deve ser
 * somado ao invés de se determinar quais são os arrays a serem somados.
 *
 * Como o fator limite que determina se um elemento será somado é o fato deste
 * ser o primeiro elemento do vetor, pois nas próximas iterações a janela
 * progredirá para além do elemento em consideração, devemos considerar as
 * situações em que o elemento considerado é o primeiro de um conjunto de vetores
 * possíveis e a condição inversa em que ele não é o primeiro elemento.
 *
 * Considerando len = arr.length, para qualquer elemento i, haverá (len - i)
 * vetores possíveis em que ele será o primeiro item do vetor.
 *
 * Considerando ainda que i elementos o antecedem no vetor original e que para
 * cada conjuto de subvetores em que estes elementos anteriores sejam os primeiros
 * haverá (len - i) subvetores dos quais o elemento i fará parte.
 *
 * Logo, considerando todos as combinações possíveis de subvetores, o elemento i
 * ocorrerá (i * (len - i)) + (len - 1) vezes. Deste total, ceil(total/2) é a
 * somatória dos vetores ímpares, enquanto que floor(total/2) corresponde aos
 * vetores de comprimento par.
 *
 * */

const sumOddLengthSubarrays = (arr) => {
  let sum = 0
  const len = arr.length
  for (let i = 0; i < len; i++) {
    const total = i * (len - i) + (len - i)
    const odds = Math.ceil(total / 2)
    sum += odds * arr[i]
  }

  return sum
}

/*
Input: arr = [1,4,2,5,3]
Output: 58
*/
console.log(sumOddLengthSubarrays([1, 4, 2, 5, 3]))

/*
Input: arr = [1,2]
Output: 3
*/
console.log(sumOddLengthSubarrays([1, 2]))

/*
Input: arr = [10,11,12]
Output: 66
*/
console.log(sumOddLengthSubarrays([10, 11, 12]))
