const codeDB = new Map()
const urlDB = new Map()
const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'

const getCode = () => {
  const code = new Array(6)
    .fill()
    .map((_) => chars.charAt(Math.floor(Math.random() * 62)))
  return 'http://tinyurl.com/' + code.join('')
}

const encode = (longUrl) => {
  if (urlDB.has(longUrl)) return urlDB.get(longUrl)
  let code = getCode()
  while (codeDB.has(code)) code = getCode()
  codeDB.set(code, longUrl)
  urlDB.set(longUrl, code)
  return code
}

const decode = (code) => codeDB.get(code)

console.log(decode(encode('https://leetcode.com/problems/design-tinyurl')))
