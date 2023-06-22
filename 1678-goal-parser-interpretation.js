/**
 * @param {string} command
 * @return {string}
 */
const interpret1 = (command) => {
  return command.replaceAll('()', 'o').replaceAll('(al)', 'al')
}

const interpret = (command) => {
  const dict = new Map()
  dict.set('G', 'G')
  dict.set('()', 'o')
  dict.set('(al)', 'al')

  let result = ''
  for (let start = 0, end = 1; end <= command.length; end++) {
    const str = command.slice(start, end)
    if (dict.has(str)) {
      result += dict.get(str)
      start = end
    }
  }
  return result
}

// Input: command = "G()(al)"
// Output: "Goal"
console.log(interpret('G()(al)'))

// Input: command = "G()()()()(al)"
// Output: "Gooooal"
console.log(interpret('G()()()()(al)'))

// Input: command = "(al)G(al)()()G"
// Output: "alGalooG"
console.log(interpret('(al)G(al)()()G'))
