/**
 * You are given an array trees where trees[i] = [xi, yi] represents the
 * location of a tree in the garden.
 *
 * You are asked to fence the entire garden using the minimum length of rope as
 * it is expensive. The garden is well fenced only if all the trees are enclosed.
 *
 * Return the coordinates of trees that are exactly located on the fence
 * perimeter.
 *
 * Constraints:
 *    1 <= points.length <= 3000
 *    points[i].length == 2
 *    0 <= xi, yi <= 100
 *    All the given points are unique.
 */

// Approach 1: Jarvis Algorithm
const outerTrees_jarvis = (trees) => {
  const orientation = ([px, py], [qx, qy], [rx, ry]) =>
    (qy - py) * (rx - qx) - (qx - px) * (ry - qy)

  const inBetween = ([px, py], [ix, iy], [qx, qy]) =>
    ((ix >= px && ix <= qx) || (ix <= px && ix >= qx)) &&
    ((iy >= py && iy <= qy) || (iy <= py && iy >= qy))

  if (trees.length < 4) return trees

  const hull = []

  let bottomLeft = 0
  for (let i = 0; i < trees.length; i++)
    bottomLeft =
      trees[i][1] < trees[bottomLeft][1]
        ? i
        : trees[i][1] == trees[bottomLeft][1] &&
          trees[i][0] < trees[bottomLeft][0]
        ? i
        : bottomLeft

  let p = bottomLeft
  do {
    let q = (p + 1) % trees.length
    for (let i = 0; i < trees.length; i++)
      q = orientation(trees[p], trees[i], trees[q]) < 0 ? i : q
    for (let i = 0; i < trees.length; i++)
      if (
        i !== p &&
        i !== q &&
        orientation(trees[p], trees[i], trees[q]) === 0 &&
        inBetween(trees[p], trees[i], trees[q])
      )
        hull.push(trees[i])
    hull.push(trees[q])
    p = q
  } while (p !== bottomLeft)

  const map = new Map()
  for (const tree of hull) map.set(tree.toString(), tree)
  return [...map.values()]
}

// Approach 2: Graham Scan
const outerTrees_graham = (trees) => {
  const orientation = ([px, py], [qx, qy], [rx, ry]) =>
    (qy - py) * (rx - qx) - (qx - px) * (ry - qy)

  const distance = ([px, py], [qx, qy]) => (px - qx) ** 2 + (py - qy) ** 2

  const n = trees.length

  if (n < 4) return trees

  let bottomLeft = trees[0]
  for (const tree of trees)
    bottomLeft =
      tree[1] < bottomLeft[1]
        ? tree
        : tree[1] == bottomLeft[1] && tree[0] < bottomLeft[0]
        ? tree
        : bottomLeft

  trees.sort((p, q) => {
    const diff = orientation(bottomLeft, p, q) - orientation(bottomLeft, q, p)
    return diff == 0 ? distance(bottomLeft, p) - distance(bottomLeft, q) : diff
  })

  const last = trees[n - 1]
  let i = n - 2
  while (i >= 0 && orientation(bottomLeft, last, trees[i]) == 0) i--

  for (let l = i + 1, h = n - 1; l < h; l++, h--) {
    const temp = trees[l]
    trees[l] = trees[h]
    trees[h] = temp
  }

  const stack = []
  stack.push(trees[0])
  stack.push(trees[1])
  for (let i = 2; i < n; i++) {
    let top = stack.pop()
    while (orientation(stack.at(-1), top, trees[i]) > 0) top = stack.pop()
    stack.push(top)
    stack.push(trees[i])
  }

  return stack
}

// Approach 3: Monotone Chain
const outerTrees_monotone = (trees) => {
  const orientation = ([px, py], [qx, qy], [rx, ry]) =>
    (qy - py) * (rx - qx) - (qx - px) * (ry - qy)

  const n = trees.length

  if (n < 4) return trees

  trees.sort(([px, py], [qx, qy]) => (qx - px === 0 ? qy - py : qx - px))

  const stack = []
  for (let i = 0; i < n; i++) {
    let m = stack.length
    while (m >= 2 && orientation(stack[m - 2], stack[m - 1], trees[i]) > 0) {
      stack.pop()
      m--
    }
    stack.push(trees[i])
  }
  stack.pop()
  for (let i = n - 1; i >= 0; i--) {
    let m = stack.length
    while (m >= 2 && orientation(stack[m - 2], stack[m - 1], trees[i]) > 0) {
      stack.pop()
      m--
    }
    stack.push(trees[i])
  }

  const map = new Map()
  for (const tree of stack) map.set(tree.toString(), tree)
  return [...map.values()]
}


points = [
  [1, 1],
  [2, 2],
  [2, 0],
  [2, 4],
  [3, 3],
  [4, 2],
]
// Output: [
//   [1, 1],
//   [2, 0],
//   [3, 3],
//   [2, 4],
//   [4, 2],
// ]

// points = [
//   [1, 2],
//   [2, 2],
//   [4, 2],
// ]
//  Output: [
//    [4, 2],
//    [2, 2],
//    [1, 2],
//  ]

// points = [
//   [0, 5],
//   [10, 0],
//   [10, 10],
//   [0, 10],
//   [0, 0],
// ]

// points = [
//   [5, 5],
//   [4, 8],
//   [1, 3],
//   [5, 9],
//   [3, 0],
//   [0, 4],
//   [3, 2],
//   [8, 9],
//   [9, 3],
// ]

console.log(outerTrees(points))

const array = 'alessandro'.split('')
const isEven = (n) => n % 2 === 0
while ((m = array.length) >= 3 && isEven(m)) {
  array.pop()
  console.log(m)
}
