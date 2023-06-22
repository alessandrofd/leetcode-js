var hammingWeight = function (n) {
  console.log(n.toString(2))
  return [...n.toString()].filter((c) => c === '1').length
}

