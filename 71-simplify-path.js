/**
 * Given a string path, which is an absolute path (starting with a slash '/') to
 * a file or directory in a Unix-style file system, convert it to the simplified
 * canonical path.
 *
 * In a Unix-style file system, a period '.' refers to the current directory,
 * a double period '..' refers to the directory up a level, and any multiple
 * consecutive slashes (i.e. '//') are treated as a single slash '/'. For this
 * problem, any other format of periods such as '...' are treated as
 * file/directory names.
 *
 * The canonical path should have the following format:
 *    The path starts with a single slash '/'.
 *    Any two directories are separated by a single slash '/'.
 *    The path does not end with a trailing '/'.
 *    The path only contains the directories on the path from the root directory
 *    to the target file or directory (i.e., no period '.' or double period '..')
 *
 * Return the simplified canonical path.
 *
 * Constraints:
 *    1 <= path.length <= 3000
 *    path consists of English letters, digits, period '.', slash '/' or '_'.
 *    path is a valid absolute Unix path.
 */

/**
 * @param {string} path
 * @return {string}
 */
const simplifyPath = (path) => {
  const tokens = path.split('/').filter((t) => t !== '' && t !== '.')
  const stack = []
  for (const token of tokens)
    if (token === '..') stack.pop()
    else stack.push(token)

  return '/' + stack.join('/')
}

path = '/home/'
// Output: "/home"

// path = '/../'
// Output: "/"

// path = '/home//foo/'
// Output: "/home/foo"

// path = '/a/./b/../../c/'
// Output: "/c"

// path = '/a/../../b/../c//.//'
// Output: '/c'

console.log(simplifyPath(path))
