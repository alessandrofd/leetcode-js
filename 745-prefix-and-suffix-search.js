// Discussion sgallivan

class WordFilter {
  constructor(words) {
    this.pTrie = new Array(27)
    this.sTrie = new Array(27)
    for (let index = 0; index < words.length; index++) {
      let word = words[index]
      let wlen = word.length
      this.insert(word, index, this.pTrie, 0, wlen, 1)
      this.insert(word, index, this.sTrie, wlen - 1, -1, -1)
    }
  }

  insert(word, index, trie, start, end, step) {
    for (let i = start; i != end; i += step) {
      let c = word.charCodeAt(i) - 97
      if (!trie[c]) trie[c] = new Array(27)
      trie = trie[c]
      if (!trie[26]) trie[26] = []
      trie[26].push(index)
    }
  }

  retrieve(word, trie, start, end, step) {
    for (let i = start; i != end; i += step) {
      let c = word.charCodeAt(i) - 97
      if (!trie[c]) return -1
      trie = trie[c]
    }
    return trie[26]
  }

  f(pre, suf) {
    let pVals = this.retrieve(pre, this.pTrie, 0, pre.length, 1)
    let sVals = this.retrieve(suf, this.sTrie, suf.length - 1, -1, -1)
    let pvix = pVals.length - 1
    let svix = sVals.length - 1
    while (svix >= 0 && pvix >= 0) {
      let pVal = pVals[pvix]
      let sVal = sVals[svix]
      if (sVal === pVal) return sVal
      sVal > pVal ? svix-- : pvix--
    }
    return -1
  }
}

/*
two hybrid N-ary trees to store the strings, that makes both construction and search time optimal.
The tree nodes represent a single character each, and the words beginning with the same letters are merged.

For example, these words:

asd
abc
abx
abcd
b
ax
...are represented as:

      root
      /  \
     a    b
   / | \
  s  b  x
 /  / \
d  c   x
   |
   d
The tree nodes store their children in a hash map, where the key is the character that the child represents. The nodes don't even store their own characters, it's enough that the parent's map has it.

Other than that, the nodes store an array (I used a Set) of indices in the input array that map to the specific node.

So, in the above example, it would be like:

     root[0,1,2,3,4,5]
      /            \
     a[0,1,2,3,5]   b[4]
    /    |       \
   s[0]  b[1,2,3] x[5]
  /     /     \
 d[0]  c[1,3]  x[2]
       |
       d[3]
The generation of this tree also isn't very expensive: since we insert all of the strings character-wise, and each insertion takes O(1) time, the constuction time complexity is O(n), where n is the sum of the strings' lengths.

Search happens similarly to insertion: we traverse the tree consuming 1 character at a time, and the node we end up at contains the list of indices we might be looking for.

As the most search operations in trees, search has O(log n) time complexity, because we decide which path to take at each node, and a hash map lookup usually takes O(1) time.

However, we are still not finished: we also have to search from the end!

For that, my code uses another of the tree described above, but inserts the strings reversed, so searching happens from the end.

On search, we intersect the values that we get from the two trees (so that both searches match), and we get our answer.

To return the match with the greatest index when there are multiple ones, we have to insert values in reverse order as they are in the input array: that way, the values with the greater indices will occur first in the index-arrays.

*/

class Node {
  constructor() {
    this.indices = new Set()
    this.children = new Map()
  }

  static insert(node, word, index) {
    node.indices.add(index)
    for (const char of word) {
      if (!node.children.has(char)) node.children.set(char, new Node())
      node = node.children.get(char)
      node.indices.add(index)
    }
  }

  static lookup(node, prefix) {
    for (const char of prefix) {
      node = node.children.get(char)
      if (!node)
        //if our path is 'broken', we return an empty Set
        return new Set()
    }
    return node.indices
  }
}

class WordFilter {
  constructor(arr) {
    this.startTree = new Node()
    this.endTree = new Node()

    //we insert strings in a reverse order, as mentioned in my explanation
    for (let i = arr.length - 1; i >= 0; i--) {
      Node.insert(this.startTree, arr[i], i)
      Node.insert(this.endTree, reverse(arr[i]), i)
    }
  }

  f(prefix, postfix) {
    const s1 = Node.lookup(this.startTree, prefix)

    //early return if the first search didn't match
    if (!s1.size) return -1

    const s2 = Node.lookup(this.endTree, reverse(postfix))

    //we iterate through the result set
    for (const elem of s1) {
      //if the second set also includes this value, we return it
      if (s2.has(elem)) return elem
    }
    //if we found no matches, return -1
    return -1
  }
}

//reverse function for strings
const reverse = (s) => s.split('').reverse().join('')

filter = new WordFilter(['apple'])
console.log(filter.f('a', 'x'))
