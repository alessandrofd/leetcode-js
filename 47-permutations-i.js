const permuteUnique = (nums) => {
  const backtrack = () => {
    if (comb.length === nums.length) {
      results.push([...comb])
      return
    }

    for (const [num, count] of counter) {
      if (count == 0) continue
      comb.push(num)
      counter.set(num, count - 1)

      backtrack(comb)

      comb.pop()
      counter.set(num, count)
    }
  }
  const results = []
  const counter = new Map()
  for (let num of nums)
    counter.set(num, counter.has(num) ? counter.get(num) + 1 : 1)

  const comb = []
  backtrack()
  return results
}

console.log(permuteUnique([1, 2, 3]))
