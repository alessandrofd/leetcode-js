const maxFrequency_count_freqs = (nums, k) => {
    const freqs = new Map()
    for (const num of nums) freqs.set(num, (freqs.get(num) ?? 0) + 1)

    const sortedFreqs = Array.from(freqs).sort(([a], [b]) => a - b)

    let result = 0
    for (let [i, [num, freq]] of sortedFreqs.entries()) {
        let extra = k
        while (extra > 0) {
            if (i === 0) break

            const [smallerNum, smallerFreq] = sortedFreqs[--i]
            const extraFreq = Math.min(
                Math.floor(extra / (num - smallerNum)),
                smallerFreq
            )

            if (extraFreq === 0) break

            extra -= extraFreq * (num - smallerNum)
            freq += extraFreq
        }
        result = Math.max(result, freq)
    }

    return result
}

const maxFrequency_sliding_window = (nums, k) => {
    const n = nums.length
    nums.sort((a, b) => a - b)

    let result = 0

    for (let curr = 0, left = 0, right = 0; right < n; right++) {
        const target = nums[right]
        curr += target
        let width = right - left + 1
        while (width * target - curr > k) {
            curr -= nums[left]
            left += 1
            width = right - left + 1
        }

        result = Math.max(result, width)
    }
    return result
}

const maxFrequency_sliding_window_advanced = (nums, k) => {
    const n = nums.length
    nums.sort((a, b) => a - b)

    let curr = 0
    let left = 0
    for (let right = 0; right < n; right++) {
        const target = nums[right]
        curr += target
        let width = right - left + 1
        if (width * target - curr > k) {
            curr -= nums[left]
            left += 1
        }
    }
    return n - left
}

const maxFrequency_bin_search = (nums, k) => {
    const n = nums.length
    nums.sort((a, b) => a - b)

    let sum = 0
    const prefixSum = nums.map((n) => (sum += n))

    let result = 0

    for (let i = 0; i < n; i++) {
        const target = nums[i]

        let lo = 0
        let hi = i
        while (lo < hi) {
            const mid = Math.floor((lo + hi) / 2)
            const width = i - mid + 1
            const finalSum = width * target
            const originalSum = prefixSum[i] - prefixSum[mid] + nums[mid]
            if (finalSum - originalSum > k) lo = mid + 1
            else hi = mid
        }

        result = Math.max(result, i - lo + 1)
    }

    return result
}

// prettier-ignore
const funcs = [
    // maxFrequency_count_freqs,
    // maxFrequency_sliding_window,
    // maxFrequency_sliding_window_advanced,
    maxFrequency_bin_search,
]

const data = [
    [[1, 2, 4], 5, 3],
    [[1, 4, 8, 13], 5, 2],
    [[3, 9, 6], 2, 1],
]

for (const func of funcs) {
    for (const [nums, k, expected] of data) {
        console.log(func(nums, k) === expected)
    }
}
