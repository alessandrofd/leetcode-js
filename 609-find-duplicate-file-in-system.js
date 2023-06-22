/**
 * Given a list paths of directory info, including the directory path, and all
 * the files with contents in this directory, return all the duplicate files in
 * the file system in terms of their paths. You may return the answer in any
 * order.
 *
 * A group of duplicate files consists of at least two files that have the same
 * content.
 *
 * A single directory info string in the input list has the following format:
 *
 *    "root/d1/d2/.../dm f1.txt(f1_content) f2.txt(f2_content) ... fn.txt(fn_content)"
 *
 * It means there are n files (f1.txt, f2.txt ... fn.txt) with content
 * (f1_content, f2_content ... fn_content) respectively in the directory
 * "root/d1/d2/.../dm". Note that n >= 1 and m >= 0. If m = 0, it means the
 * directory is just the root directory.
 *
 * The output is a list of groups of duplicate file paths. For each group, it
 * contains all the file paths of the files that have the same content. A file
 * path is a string that has the following format:
 *
 *    "directory_path/file_name.txt"
 *
 * Constraints:
 *    1 <= paths.length <= 2 * 10^4
 *    1 <= paths[i].length <= 3000
 *    1 <= sum(paths[i].length) <= 5 * 105
 *    paths[i] consist of English letters, digits, '/', '.', '(', ')', and ' '.
 *    You may assume no files or directories share the same name in the same
 *      directory.
 *    You may assume each given directory info represents a unique directory. A
 *      single blank space separates the directory path and file info.
 */

/**
 * @param {string[]} paths
 * @return {string[][]}
 */
// Approach #1 Brute Force [Time Limit Exceeded]
const findDuplicate_1 = (paths) => {
  const list = []
  for (const path of paths) {
    const [dir, ...values] = path.split(' ')
    for (const value of values) {
      const [, file, content] = value.match(/(.+)\((.+)\)/)
      list.push([dir + '/' + file, content])
    }
  }

  const visited = new Array(list.length).fill(false)
  const result = []
  for (let i = 0; i < list.length - 1; i++) {
    if (visited[i]) continue
    const equals = []
    for (let j = i + 1; j < list.length; j++) {
      if (list[i][1] === list[j][1]) {
        equals.push(list[j][0])
        visited[j] = true
      }
    }
    if (equals.length > 0) {
      equals.push(list[i][0])
      result.push(equals)
    }
  }
  return result
}

// Approach #2 Using HashMap [Accepted]
const findDuplicate_2 = (paths) => {
  const map = new Map()
  for (const path of paths) {
    const [dir, ...values] = path.split(' ')
    for (const value of values) {
      const [, file, content] = value.match(/(.+)\((.+)\)/)
      const list = map.get(content) ?? []
      list.push(dir + '/' + file)
      map.set(content, list)
    }
  }

  const result = []
  for (const [, files] of map) if (files.length > 1) result.push(files)
  return result
}

// Submission
const findDuplicate = (paths) => {
  const map = new Map()
  for (const path of paths) {
    const [dir, ...values] = path.split(' ')
    for (const value of values) {
      const [, file, content] = value.match(/(.+)\((.+)\)/)
      const list = map.get(content) ?? []
      list.push(dir + '/' + file)
      map.set(content, list)
    }
  }

  return [...map.values()].filter((list) => list.length > 1)
}

paths = [
  'root/a 1.txt(abcd) 2.txt(efgh)',
  'root/c 3.txt(abcd)',
  'root/c/d 4.txt(efgh)',
  'root 4.txt(efgh)',
]
// Output: [
//   ['root/a/2.txt', 'root/c/d/4.txt', 'root/4.txt'],
//   ['root/a/1.txt', 'root/c/3.txt'],
// ]

paths = [
  'root/a 1.txt(abcd) 2.txt(efgh)',
  'root/c 3.txt(abcd)',
  'root/c/d 4.txt(efgh)',
]
// Output: [
//   ['root/a/2.txt', 'root/c/d/4.txt'],
//   ['root/a/1.txt', 'root/c/3.txt'],
// ]

console.log(findDuplicate(paths))
