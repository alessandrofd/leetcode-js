### Approach 1: Binary Tree Traversal

#### Intuition

Let's approach this problem as a binary tree challenge. We'll start with a single node, create two new child nodes for each node in the current row, move to the next row, and repeat the process of creating new child nodes until we have _n_ rows in our tree. Finally, we return the _k-th_ nodes in the _n-th_ row.

The tree we will generate is a Perfect Binary Tree with all levels completely filled.

> Note: The number of nodes in the _i-th_ row of a perfect binary tree is given by: _2^(i - 1)_, where _i = 1, 2, 3,..._

If the current node is 0, its left child will be 0 and the right child will be 1.

Otherwise, if the current node is 1, its left child will be 1 and the right child will be 0.

After generating the binary tree a naive way to reach the k-th node of the n-th row will be to traverse all rows (levels) of the tree one by one by keeping track of the current (row, nodeIndex) position. However, this approach will be sub-optimal as it would require iterating over all nodes in our tree and the number of nodes will grow exponentially with each row.

Instead, we can try to perform a binary search-like algorithm where we discard the left or right half of the sub-tree based on the condition where the final target node must be present. Provided this hint, we recommend you stop here and try thinking a bit about how this method will work here.

> The pre-requisite here will be that you must have a good understanding of how searching in a binary search tree works.

**This approach might not be intuitive to everyone, so let's proceed gradually using an example.**

Consider the case where we need to find the 21st node in 6th row.

The number of nodes in the 6th row will be 2^(6−1) = 2^5 = 32. Therefore, the 21st node will be present in the right half of the last row in our current binary tree. Hence, we can be certain that our target node is not present in the left sub-tree of the current root node. As a result, we can discard the whole left sub-tree.

This simplifies our problem to finding the 21 − 16 (current position - half skipped nodes) = 5th node in the last row of the sub-tree of 5 rows.

Within this **subtree of 5 rows**, we have to find the 5th node in the 5th row.

The number of nodes in the 5th row is given by 2^(5−1) = 2^4 = 16. Therefore, the 5th node will be present in the left sub-tree and we can discard the right sub-tree, and this time the position of the target node will remain unchanged.

Within the **subtree of 4 rows**, we have to find the 5t node in the 4th row.

The number of nodes in the 4t row will be 2^(4−1) = 2^3 = 8. Thus, the 5th node will be present in the right sub-tree and we can discard the left sub-tree.

Within this **subtree of 3 rows**, we have to find the 1st node in the 3rd row.

The number of nodes in the 3rd row will be 2^(3−1) = 2^2 = 4. Therefore, the 1st node will be present in the left sub-tree and we can discard the right sub-tree.

Within this **subtree of 2 rows**, we have to find the 1st node in the 2nd row.

The number of nodes in the 2nd row will be 2^(2−1) = 2^1 = 2. Hence, the 1st node will be present in the left sub-tree and we can discard the right sub-tree.

Now, in this **subtree of 1 row**, we have to find the 1st node in the 1st row. Since this row consists of only one node, the root node will be our target node.

> As shown in the picture above, we can simplify this problem to a recursive binary tree challenge, where we traverse down to the root node of the appropriate sub-tree until we reach the target node.

#### Algorithm

1.  Create a method `depthFirstSearch` which takes `n` number of rows in the current tree, `k` target node position in the last row, and `rootVal` current tree's root's value as parameters:

    - If `n` is `1`, then we will have a single node in our tree and this node is our target node. So, we return its value `rootVal`.

    - Find the number of nodes in the last row of the current tree, `totalNodes`, 2^(n - 1).

    - If the current target node `k` lies in the left half of the last row of the current subtree (i.e. `k <= totalNodes / 2`), we will move to the left sub-tree.
      If the current node's value `rootVal` is `0` then the next node's value will be `0`, otherwise, the next node's value will be `1`.
      Return `depthFirstSearch(n - 1, k, nextRootVal)`.

    - Otherwise, if the current target node `k` lies in the right half of the last row of the current subtree (i.e. `k > totalNodes / 2`), we will move to the right sub-tree.
      If the current node's value `rootVal` is `0` then the next node's value will be `1`, otherwise, the next node's value will be `0`.
      Additionally, the target's position will change to `(k - (totalNodes / 2))`.
      Return `depthFirstSearch(n - 1, newPosition, nextRootVal)`.

2.  We return the result returned by calling `depthFirstSearch(n, k, 0)` with the number of rows as `n`, target node position `k`, and root node's value `0`.

#### Complexity Analysis

- Time complexity: _O(n)_

  - With each recursive call, we reduce `n` by one until `n` becomes equal to `1`. As a result, the overall time complexity is _O(n)_.

- Space complexity: _O(n)_

  - Each recursive call will add a new frame to the stack until we reach the base case (when `n` becomes equal to `1`). Hence, the space complexity is also _O(n)_.

### Approach 2: Normal Recursion

#### Intuition

> The previous approach will be sufficient during a real interview setting as these next approaches are not intuitive enough to think of them during the limited time availability. So don't get disheartened if these approaches seem hard to you. But it's recommended to read these approaches too, to have a new perspective to look at the same problem.

First of all, after generating a few rows using the steps given in the problem description, we can observe two patterns:

1. The previous row is used as the prefix of the next row.

0
01
0110
01101001
0110100110010110

**0** &rarr; **0**1 Comparing 1^st^ and 2^nd^ rows
**01** &rarr; **01**10 Comparing 2^nd^ and 3^rd^ rows
**0110** &rarr; **0110**1001 Comparing 3^rd^ and 4^th^ rows
**01101001** &rarr; **01101001**10010110 Comparing 4^th^ and 5^th^ rows

2. If we divide any row into two equal halves then the symbol at each position will be opposite of each other in both halves (i.e. if we have a `0` in the left half at index `i`, then the right half will have a `1` at index `i`, and vice versa).

> **Note**: To flip (find the opposite of) a symbol X where, X ∈ (0,1 we can perform X′ = 1 − X.
> If X = 0, X' = 1, and if X = 1, X' = 0.

Now, suppose we want to find the 21^st^ symbol of the **6^th^ row**.

The number of nodes in the 6^th^ row will be 2^6−1^ = 2^5^ = 32.
As we discussed the symbols of the first half of any row are opposite of the second half.
  ⟹  21^st^ symbol of the 6^th^ row will be equal to (1 - 5^th^ symbol of the 6^th^ row).

As the prefix of 6^th^ th row will be the same as the **5^th^ row**.
Hence, 5^th^ th symbol of the 6^th^ row will be equal to 5^th^ th symbol of the 5^th^ row.
  ⟹  21^st^ symbol of the 6^th^ th row will be equal to (1 − 5^th^ symbol of the 5^th^ row).

Similarly, the prefix of 5^th^ row will be the same as the **4^th^ row**.
Therefore, 5^th^ symbol of the 5^th^ row will be equal to 5^th^ symbol of the 4^th^ row.
  ⟹  21^st^ symbol of the 6^th^ row will be equal to (1 - 5^th^ symbol of the 4^th^ row ).

The number of nodes in the 4^th^ row will be 2^4-1^ = 2^3^ = 8. As the symbols of the first half of any row are opposite of the second half.
So, 5^th^ symbol of the 4^th^ row will be equal to (1 - 1^st^ symbol of the 4^th^ row ).
  ⟹  21^st^ symbol of the 6^th^ row will be equal to (1 − (1 − 1^st^ symbol of the 4^th^ row)).

As the prefix of the 4^th^ row will be the same as the **3^rd^ row**.
So, 1^st^ symbol of the 4^th^ row will be equal to 1^st^ symbol of the 3^rd^ row.
⟹  21^st^ symbol of the 6^th^ row will be equal to (1− (1 − 1^st^ symbol of the 3^rd^ row)).

Similarly, the prefix of the 3^rd^ row will be the same as the **2^nd^ row**. So, 1^st^ symbol of the 3^rd^ row will be equal to 1^st^ symbol of the 2^nd^ row.
⟹ 21^st^ symbol of the 6^th^ row will be equal to (1 - (1 - 1^st^ symbol of the 2^nd^ row)).

Similarly, the prefix of the 2^nd^ row will be the same as the **1^st^ row**. So, 1^st^ symbol of the 2^nd^ row will be equal to 1^st^symbol of the 1^st^ row.
⟹ 21^st^ symbol of the 6^th^ row will be equal to (1 - (1 - 1^st^ symbol of the 1^st^ row)).

> And, as we know 1^st^ symbol of the 1^st^ row is 0.
> Thus, the 21^st^ symbol of the 6^th^ row will be equal to 1 - (1 - 0) = 0.

With each step, we are converting our bigger problem into a similar smaller sub-problem.

So, here we can write a recursive approach, where our current problem is to find the symbol at a given position K in a given row n.

If the current position lies in the right half of the current row then we know this symbol will be opposite of the symbol present in the left half at the same position, and **recursively we will find what is the symbol at this new position in the same row**.

And, if the current symbol lies in the left half then this symbol will be the same as the symbol in the previous row at the same position, and **recursively we will find what is the symbol at this position in the previous row**.

We will write a method `recursion(n, k)` which takes current row `n`, and the position of the symbol in current row `k` as parameters:

- The recursive step will be:

  - If `k` lies in the right half of the current row. Then we return `1 - recursion(n, k - halfElements)`.

  - Otherwise, we return `recursion(n - 1, k)`.

- The base case to stop recursive calls will be a condition we can evaluate the result without any computation, i.e. we know if `n == 1` it will only have one symbol `0` which will be our result. Thus, this condition will be our base case.

#### Algorithm

1. Create a method `recursion()` which takes `n`, current row number, `k`, and target position as parameters:

   - If `n` is `1`, then we can return `0` as the first row will have only one symbol.

   - Find the number of symbols in the current row, `totalElements`, `2^(n−1)` , and `halfElements = totalElements / 2`.

   - If the current target position `k` lies in the right half of the current row (i.e. `k > halfElements`), then, we switch to the current row's respective left half position symbol, (i.e. at position `k - halfElements`).
     Thus, we return, `1 - recursion(n, k - halfElements)`.

   - If the current target position k lies in the left half of the current row (i.e. `k <= halfElements`), then, we switch to the previous row's respective same position symbol, (i.e. present in the row `n - 1` at position `k`).
     Thus, we return, `recursion(n - 1, k)`.

2. We return the result returned by calling `recursion(n, k)` with the current row as `n`, and target symbol position `k`.

#### Complexity Analysis

- Time complexity: _O(n)_

  - With each recursive call, we reduce `n` by one until `n` becomes equal to `1`.
    Thus, it will take overall _O(n)_ time.

- Space complexity: _O(n)_

  - The recursive stack will also use _O(n)_ space in the worst case.

### Approach 3: Recursion to Iteration

#### Intuition

The previous recursive can be optimized to an iterative approach to eliminate the use of the recursion stack.

Let's explore finding the 21^st^ symbol of the 6^th^ row.
We can follow the same process of the previous approach but in an iterative manner.

In the previous approach, we started with the first row's symbol 0 and flipped it as we switched it from left to right half positions, until we reached the target position.

If we try to go from top to down then it will be difficult to conclude at which step the current symbol needs to be flipped.
However, if we go from the bottom up, we can identify the flips that will be done when the current position exceeds half the count of the symbols of the current row.

Let's assume the 21^st^ symbol of the 6^th^ row is, symbol = X.
We follow the same process, and if at the end symbol changes to 0, it means that we started with the correct 21^st^ symbol of the 6^th^ row, X, otherwise, the correct symbol will be 1 - X.

#### Algorithm

1. If n is 1 we can directly return 0.

2. Otherwise, we assume that the target symbol is 1, and iterate on all rows currRow from n to 2.

3. For each row `currRow`, find the number of symbols in the current row, `totalElements = 2^currRow-1^` , and `halfElements = totalElements / 2`. If `k` lies in the right half of the current row (i.e. `k > halfElements`), switch to the current row's respective left half position symbol.
   Thus, flipping `symbol = 1 - symbol` and changing position `k = k - halfElements`.

4. We will stop when the current row will become 1. We check if the symbol is 0, which means that our assumption that the target symbol is 1 is correct, otherwise, the target symbol is 0.

#### Complexity Analysis

- Time complexity: _O(n)_

  - In each iteration, we reduce n by one until n becomes equal to 1. Therefore, the overall time complexity is _O(n)_.

- Space complexity: _O(1)_

We have not used any additional space.

### Approach 4: Math

#### Intuition

> Note: This approach is highly unintuitive, and it is completely fine to skip it. We list it here for completeness and to offer you an alternative perspective on how to approach the same problem.

After reviewing the previous approaches, we can see that we start with 0 and flip it x number of times.

The most challenging aspect is determining the number of flips required.

From the previous approach, we know that whenever the current `k` is more than half of the total number of symbols of the current row then **we flip it, and subtract the first half symbols count from** `k`.
A flip happens at each subtraction, thus the number of flips is equal to the number of subtractions performed.

Each row will have some 2^a^ elements, it means half of it will be 2^b^. Thus, at each step, we subtract 2^b^ from k until k becomes 1.

We can say that, k − 2^b^ - 2^c^ - 2^d^ - 2^e^ - ... = 1
(k − 1) = 2^b^ + 2^c^ + 2^d^ + 2^e^+ .... (remember this expression)

> Therefore, we can conclude that the number of flips is equal to the number of terms the right hand side of the previous expression has.

Now, we all know that every decimal number d can be expressed as:

d = (A.2^0^) + (B.2^1^) + (C.2^2^) + (D.2^3^) + (E.2^4^) + (F.2^5^) + ...
where, A, B, C, D, E, F, .... ∈ (0,1)
and, the binary representation of _d_ is, d~2~ = ...FEDCBA

For example: 25~2~ = 11001, and
25 = 2^0^ + 2^3^ + 2^4^
25 = 1.2^0^ + 0.2^1^ + 0.2^2^ + 1.2^3^ + 1.2^4^

(k − 1) can also be expressed as (A.2^0^) + (B.2^1^) + (C.2^2^) + (D.2^3^) + (E.2^4^) + (F.2^5^) + ...
We just need to find which all coefficients A, B, C, D, E, F, ... will be 1 to convert it to 2^b^ + 2^c^ + 2^d^ + 2^e^ + ....

Thus, the number of flips required will be the number of 1s present in the binary representation of the number (k - 1).

> Finally, we just need to determine the number of `1` bits `count` in the binary representation of (k - 1). The symbol at the position k^th^ in n^th^ row will be 0 flipped `count` times.
> If `count` is even then `0` will remain `0`, otherwise `0` will change to `1`.

#### Algorithm

1. Find the `count` of the number of `1` bits in `k - 1`.
2. Return `0` if `count` is even, `1` otherwise.

#### Complexity Analysis

- Time complexity: _O(log k)_

  - The number of bits in number k is log k. In Python, Javascript, and Swift, we first convert the number to a binary string which takes O(log ⁡k) time.
  - Counting all 1 bits takes O(log ⁡k) time.
  - Hence, the overall time complexity is O(log ⁡k).

- Space complexity: O(1) or O(log ⁡k)

  - In Python, Javascript, and Swift, we convert the number to a binary string which takes an additional O(log⁡ k) space.
  - In C++ and Java, we don't use any additional space.

### Approach 5: Doubling

> From the discussion board

Each row causes doubling of values, since we are replacing one number by two. So in a row, the kth number is responsible for (2k-1)^th^ and 2k^th^ value in the next row.

Since 0 &rarr; 01 and 1 &rarr; 10, we can say that at every even position we have a flip of previous position that caused it i.e if value at (n, 100) is 0 then that is because (n-1, 50) was 1. So for even positions it's a flip, and for odd positions? For odd positions we just check the previous position that lead to this position and maintain the bit i.e the value at (n, 101) was caused by, and is same as (n-1, 51).
