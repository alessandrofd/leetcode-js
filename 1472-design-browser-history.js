/**
 * You have a browser of one tab where you start on the homepage and you can
 * visit another url, get back in the history number of steps or move forward in
 * the history number of steps.
 *
 * Implement the BrowserHistory class:
 *
 *    BrowserHistory(string homepage) Initializes the object with the homepage
 *    of the browser.
 *
 *    void visit(string url) Visits url from the current page. It clears up all
 *    the forward history.
 *
 *    string back(int steps) Move steps back in history. If you can only return
 *     x steps in the history and steps > x, you will return only x steps. Return
 *    the current url after moving back in history at most steps.
 *
 *    string forward(int steps) Move steps forward in history. If you can only
 *    forward x steps in the history and steps > x, you will forward only x steps.
 *    Return the current url after forwarding in history at most steps.
 *
 * Constraints:
 *    1 <= homepage.length <= 20
 *    1 <= url.length <= 20
 *    1 <= steps <= 100
 *    homepage and url consist of  '.' or lower case English letters.
 *    At most 5000 calls will be made to visit, back, and forward.
 */

class BrowserHistory {
  /**
   * @param {string} homepage
   */
  constructor(homepage) {
    this.history = [homepage]
    this.currentPage = 0
  }
  /**
   * @param {string} url
   * @return {void}
   */
  visit(url) {
    this.history.splice(this.currentPage + 1)
    this.history.push(url)
    this.currentPage++
  }
  /**
   * @param {number} steps
   * @return {string}
   */
  back(steps) {
    this.currentPage = Math.max(0, this.currentPage - steps)
    return this.history[this.currentPage]
  }
  /**
   * @param {number} steps
   * @return {string}
   */
  forward(steps) {
    this.currentPage = Math.min(
      this.history.length - 1,
      this.currentPage + steps
    )
    return this.history[this.currentPage]
  }
}

const browserHistory = new BrowserHistory('leetcode.com')
console.log(browserHistory.visit('google.com')) // You are in "leetcode.com". Visit "google.com"
console.log(browserHistory.visit('facebook.com')) // You are in "google.com". Visit "facebook.com"
console.log(browserHistory.visit('youtube.com')) // You are in "facebook.com". Visit "youtube.com"
console.log(browserHistory.back(1)) // You are in "youtube.com", move back to "facebook.com" return "facebook.com"
console.log(browserHistory.back(1)) // You are in "facebook.com", move back to "google.com" return "google.com"
console.log(browserHistory.forward(1)) // You are in "google.com", move forward to "facebook.com" return "facebook.com"
console.log(browserHistory.visit('linkedin.com')) // You are in "facebook.com". Visit "linkedin.com"
console.log(browserHistory.forward(2)) // You are in "linkedin.com", you cannot move forward any steps.
console.log(browserHistory.back(2)) // You are in "linkedin.com", move back two steps to "facebook.com" then to "google.com". return "google.com"
console.log(browserHistory.back(7)) // You are in "google.com", you can move back only one step to "leetcode.com". return "leetcode.com"
