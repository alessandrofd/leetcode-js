/**
 * @param {string} s
 * @return {number}
 */
const scoreOfParentheses1 = (string) => {
  function Node(parent = null, children = []) {
    this.parent = parent
    this.children = children
  }

  const head = new Node()
  let current = head
  for (let i = 0; i < string.length; i++) {
    if (string[i] === '(') {
      const node = new Node()
      node.parent = current
      current.children.push(node)
      current = node
    } else current = current.parent
  }

  const sum = (node) =>
    node.children.length
      ? 2 * node.children.reduce((acc, child) => acc + sum(child), 0)
      : 1

  return head.children.reduce((acc, node) => acc + sum(node), 0)
}

const scoreOfParentheses2 = (string) => {
  const arr = [0]
  for (char of string) {
    if (char === '(') arr.push(0)
    /* char === ')' */ else {
      let val = arr.pop()
      if (val > 0) val *= 2
      else val = 1
      arr[arr.length - 1] += val
    }
  }
  return arr.pop()
}

const scoreOfParentheses = (string) => {
  let score = 0
  const stack = []
  for (char of string) {
    if (char === '(') {
      stack.push(score)
      score = 0
    } else {
      score = stack.pop() + (score ? score * 2 : 1)
    }
  }
  return score
}

// Input: s = "()"
// Output: 1
console.log(scoreOfParentheses('()'))

// Input: s = "(())"
// Output: 2
console.log(scoreOfParentheses('(())'))

// Input: s = "()()"
// Output: 2
console.log(scoreOfParentheses('()()'))
