const canMakeArithmeticProgression = (nums) => {
  nums.sort((a, b) => a - b)
  const diff = nums[1] - nums[0]

  for (let i = 0; i < nums.length - 1; i++)
    if (nums[i + 1] - nums[i] !== diff) return false

  return true
}

console.log(canMakeArithmeticProgression([3, 5, 1]))
console.log(canMakeArithmeticProgression([1, 2, 4]))
