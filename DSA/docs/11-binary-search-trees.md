# 📚 Day 11: Binary Search Trees (BST) — Complete Mastery Guide

## SECTION 1: COMPLETE DEFINITIONS & CORE CONCEPTS

### What is a Binary Search Tree (BST)? 🤔

#### **Definition (Official):**

> **A Binary Search Tree (BST)** is a **binary tree** where each node satisfies the **BST property**:
> - **Left subtree**: All nodes have values **strictly less than** the node's value
> - **Right subtree**: All nodes have values **strictly greater than** the node's value
> - **Both subtrees**: Must also be BSTs (recursive property)
>
> This ordering property makes BST **efficient for search, insertion, and deletion** operations.

**Key Properties:**

| Property | Description | Why Important |
|----------|-------------|---------------|
| **BST Property** | Left < Root < Right | Enables binary search |
| **Unique Keys** | No duplicate values (usually) | Simplifies search |
| **Inorder = Sorted** | Inorder traversal gives sorted sequence | Verification |
| **O(log n) Search** | Average case for balanced tree | FAST search |
| **O(n) Worst** | Skewed tree (linked list) | Balance needed |

**Visual Diagram:**

```text
Valid BST:
        8
       / \
      3   10
     / \    \
    1   6    14
       / \   /
      4   7 13

Check:
- 3 < 8 < 10 ✓
- 1 < 3 < 6 ✓
- 4 < 6 < 7 ✓
- 10 < 14, 13 < 14 ✓

Inorder Traversal: 1, 3, 4, 6, 7, 8, 10, 13, 14 (SORTED!) ✓
```

```text
NOT a BST:
        8
       / \
      3   10
     / \    \
    1   9    14  ← 9 > 8 (should be < 8)

Invalid: 9 in left subtree of 8, but 9 > 8 ❌
```

**Key Difference: Binary Tree vs BST**

| Binary Tree | BST |
|-------------|-----|
| No ordering | Left < Root < Right |
| Any structure | Sorted structure |
| O(n) search | O(log n) search (balanced) |
| General purpose | Search-optimized |

---

## SECTION 2: COMPLETE NOTES MAKING POINTS

### 📝 **Essential Notes for Exam/Interviews**

#### **Point 1: BST OPERATIONS (SEARCH, INSERT, DELETE)**

**SEARCH in BST:**

**Algorithm:**
```text
Step 1: Start from root
curr = root

Step 2: Compare and traverse
while (curr != null) {
    if (target == curr.val) return curr;  // Found
    if (target < curr.val) curr = curr.left;   // Go left
    else curr = curr.right;  // Go right
}

Step 3: Not found
return null;

Time: O(h) where h = height
Balanced: O(log n)
Skewed: O(n)
```

**Recursive:**
```java
public TreeNode searchBST(TreeNode root, int target) {
    if (root == null || root.val == target) return root;
    
    if (target < root.val) {
        return searchBST(root.left, target);
    } else {
        return searchBST(root.right, target);
    }
}
```

**Iterative:**
```java
public TreeNode searchBST(TreeNode root, int target) {
    while (root != null && root.val != target) {
        if (target < root.val) {
            root = root.left;
        } else {
            root = root.right;
        }
    }
    return root;
}
```

**Time**: O(h) | **Space**: O(h) recursive, O(1) iterative

---

**INSERT in BST:**

**Algorithm:**
```text
Step 1: Search for position
curr = root
prev = null

while (curr != null) {
    prev = curr;
    if (target < curr.val) curr = curr.left;
    else curr = curr.right;
}

Step 2: Insert at correct position
if (target < prev.val) prev.left = new TreeNode(target);
else prev.right = new TreeNode(target);

Time: O(h)
```

**Recursive:**
```java
public TreeNode insertIntoBST(TreeNode root, int val) {
    if (root == null) return new TreeNode(val);
    
    if (val < root.val) {
        root.left = insertIntoBST(root.left, val);
    } else {
        root.right = insertIntoBST(root.right, val);
    }
    
    return root;
}
```

**Iterative:**
```java
public TreeNode insertIntoBST(TreeNode root, int val) {
    if (root == null) return new TreeNode(val);
    
    TreeNode curr = root;
    TreeNode prev = null;
    
    while (curr != null) {
        prev = curr;
        if (val < curr.val) {
            curr = curr.left;
        } else {
            curr = curr.right;
        }
    }
    
    if (val < prev.val) {
        prev.left = new TreeNode(val);
    } else {
        prev.right = new TreeNode(val);
    }
    
    return root;
}
```

**Time**: O(h) | **Space**: O(h) recursive, O(1) iterative

---

**DELETE in BST:**

**Cases:**
1. **Leaf node**: Simply remove
2. **One child**: Replace with child
3. **Two children**: Replace with inorder successor (or predecessor)

**Algorithm:**
```text
Step 1: Search for node
Step 2: Handle 3 cases
Step 3: Return updated root

Time: O(h)
```

**Code:**
```java
public TreeNode deleteNode(TreeNode root, int key) {
    if (root == null) return null;
    
    // Search
    if (key < root.val) {
        root.left = deleteNode(root.left, key);
    } else if (key > root.val) {
        root.right = deleteNode(root.right, key);
    } else {
        // Found node to delete
        
        // Case 1: Leaf node (no children)
        if (root.left == null && root.right == null) {
            return null;
        }
        
        // Case 2: One child
        if (root.left == null) {
            return root.right;
        }
        if (root.right == null) {
            return root.left;
        }
        
        // Case 3: Two children
        // Find inorder successor (smallest in right subtree)
        TreeNode successor = findMin(root.right);
        root.val = successor.val;  // Replace with successor
        root.right = deleteNode(root.right, successor.val);  // Delete successor
    }
    
    return root;
}

private TreeNode findMin(TreeNode node) {
    while (node.left != null) {
        node = node.left;
    }
    return node;
}
```

**Time**: O(h) | **Space**: O(h) (recursion)

---

#### **Point 2: VALIDATE BST (Check if Binary Tree is BST)**

**Definition:**

> **A valid BST** must satisfy:
> - Left subtree contains only nodes with values **< node.val**
> - Right subtree contains only nodes with values **> node.val**
> - Both subtrees are also BSTs

**Recursive (Range Check):**
```java
public boolean isValidBST(TreeNode root) {
    return validate(root, null, null);
}

private boolean validate(TreeNode node, Integer min, Integer max) {
    if (node == null) return true;
    
    // Check current node
    if ((min != null && node.val <= min) || 
        (max != null && node.val >= max)) {
        return false;
    }
    
    // Recurse left and right with updated bounds
    return validate(node.left, min, node.val) &&
           validate(node.right, node.val, max);
}
```

**Visual:**
```text
BST:
        8
       / \
      3   10
     / \    \
    1   6    14

Validation:
- Root 8: min=null, max=null ✓
- Left 3: min=null, max=8 ✓
- Left 1: min=null, max=3 ✓
- Right 6: min=3, max=8 ✓
- Right 10: min=8, max=null ✓
- Right 14: min=10, max=null ✓

All valid → TRUE
```

**Inorder Traversal (Alternative):**
```java
TreeNode prev = null;

public boolean isValidBST(TreeNode root) {
    if (root == null) return true;
    
    if (!isValidBST(root.left)) return false;
    
    if (prev != null && root.val <= prev.val) return false;
    prev = root;
    
    return isValidBST(root.right);
}
```

**Time**: O(n) | **Space**: O(h)

---

#### **Point 3: KTH SMALLEST/LARGEST IN BST**

**Intuition:**
- **Inorder traversal** of BST gives **sorted** sequence
- Kth smallest = Kth element in inorder

**Recursive:**
```java
int count = 0;
int result = -1;

public int kthSmallest(TreeNode root, int k) {
    inorder(root, k);
    return result;
}

private void inorder(TreeNode node, int k) {
    if (node == null) return;
    
    inorder(node.left, k);
    
    count++;
    if (count == k) {
        result = node.val;
        return;
    }
    
    inorder(node.right, k);
}
```

**Iterative (Stack):**
```java
public int kthSmallest(TreeNode root, int k) {
    Stack<TreeNode> stack = new Stack<>();
    TreeNode curr = root;
    
    while (curr != null || !stack.isEmpty()) {
        while (curr != null) {
            stack.push(curr);
            curr = curr.left;
        }
        
        curr = stack.pop();
        k--;
        
        if (k == 0) return curr.val;
        
        curr = curr.right;
    }
    
    return -1;
}
```

**Time**: O(h + k) | **Space**: O(h)

---

#### **Point 4: LOWEST COMMON ANCESTOR (LCA) IN BST**

**Intuition:**
- If both p, q < root → LCA in left subtree
- If both p, q > root → LCA in right subtree
- Else root is LCA

**Recursive:**
```java
public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
    if (root == null) return null;
    
    if (p.val < root.val && q.val < root.val) {
        return lowestCommonAncestor(root.left, p, q);
    }
    
    if (p.val > root.val && q.val > root.val) {
        return lowestCommonAncestor(root.right, p, q);
    }
    
    return root;  // Split point = LCA
}
```

**Iterative:**
```java
public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
    while (root != null) {
        if (p.val < root.val && q.val < root.val) {
            root = root.left;
        } else if (p.val > root.val && q.val > root.val) {
            root = root.right;
        } else {
            return root;
        }
    }
    return null;
}
```

**Time**: O(h) | **Space**: O(1) iterative

---

#### **Point 5: RANGE SUM IN BST**

**Intuition:**
- Prune subtrees outside range
- Add only nodes in range [low, high]

**Recursive:**
```java
public int rangeSumBST(TreeNode root, int low, int high) {
    if (root == null) return 0;
    
    // Prune left subtree (all values < root.val)
    if (root.val < low) {
        return rangeSumBST(root.right, low, high);
    }
    
    // Prune right subtree (all values > root.val)
    if (root.val > high) {
        return rangeSumBST(root.left, low, high);
    }
    
    // Current node in range
    return root.val + 
           rangeSumBST(root.left, low, high) +
           rangeSumBST(root.right, low, high);
}
```

**Time**: O(n) worst, O(h + k) average | **Space**: O(h)

---

#### **Point 6: CONSTRUCT BST FROM SORTED ARRAY**

**Intuition:**
- Middle element → root
- Left half → left subtree
- Right half → right subtree
- Recursively build

**Code:**
```java
public TreeNode sortedArrayToBST(int[] nums) {
    return buildBST(nums, 0, nums.length - 1);
}

private TreeNode buildBST(int[] nums, int left, int right) {
    if (left > right) return null;
    
    int mid = left + (right - left) / 2;
    TreeNode root = new TreeNode(nums[mid]);
    
    root.left = buildBST(nums, left, mid - 1);
    root.right = buildBST(nums, mid + 1, right);
    
    return root;
}
```

**Time**: O(n) | **Space**: O(log n)

---

#### **Point 7: MINIMUM ABSOLUTE DIFFERENCE IN BST**

**Intuition:**
- Inorder traversal = sorted
- Min diff = min(adjacent differences)

**Code:**
```java
TreeNode prev = null;
int minDiff = Integer.MAX_VALUE;

public int getMinimumDifference(TreeNode root) {
    inorder(root);
    return minDiff;
}

private void inorder(TreeNode node) {
    if (node == null) return;
    
    inorder(node.left);
    
    if (prev != null) {
        minDiff = Math.min(minDiff, node.val - prev.val);
    }
    prev = node;
    
    inorder(node.right);
}
```

**Time**: O(n) | **Space**: O(h)

---

#### **Point 8: TWO SUM IN BST**

**Intuition:**
- Inorder = sorted array
- Use two pointers

**Code:**
```java
public boolean findTarget(TreeNode root, int k) {
    List<Integer> list = new ArrayList<>();
    inorder(root, list);
    
    int left = 0, right = list.size() - 1;
    
    while (left < right) {
        int sum = list.get(left) + list.get(right);
        
        if (sum == k) return true;
        if (sum < k) left++;
        else right--;
    }
    
    return false;
}

private void inorder(TreeNode node, List<Integer> list) {
    if (node == null) return;
    
    inorder(node.left, list);
    list.add(node.val);
    inorder(node.right, list);
}
```

**Time**: O(n) | **Space**: O(n)

---

#### **Point 9: TRIM A BST**

**Intuition:**
- If node.val < low → trim left, return right
- If node.val > high → trim right, return left
- Else trim both subtrees

**Code:**
```java
public TreeNode trimBST(TreeNode root, int low, int high) {
    if (root == null) return null;
    
    if (root.val < low) {
        return trimBST(root.right, low, high);
    }
    
    if (root.val > high) {
        return trimBST(root.left, low, high);
    }
    
    root.left = trimBST(root.left, low, high);
    root.right = trimBST(root.right, low, high);
    
    return root;
}
```

**Time**: O(n) | **Space**: O(h)

---

#### **Point 10: TIME COMPLEXITY COMPARISON**

| Operation | Binary Tree | BST | Balanced BST |
|-----------|-------------|-----|--------------|
| **Search** | O(n) | O(h) avg | O(log n) |
| **Insert** | O(n) | O(h) avg | O(log n) |
| **Delete** | O(n) | O(h) avg | O(log n) |
| **Min/Max** | O(n) | O(h) | O(log n) |
| **Inorder** | O(n) | O(n) | O(n) |
| **LCA** | O(n) | O(h) | O(log n) |

**Height (h):**
- Balanced: h = log n
- Skewed: h = n

---

## SECTION 3: PROBLEM PROGRESSION

### LeetCode Problems

#### Level 1: Very Easy

#### **1. Minimum Absolute Difference in BST**
- **Platform**: LeetCode
- **Link**: https://leetcode.com/problems/minimum-absolute-difference-in-bst/
- **Company Tags**: Google, Meta, Amazon, Microsoft
- **Frequency**: 9/10

**Solution:**
```java
TreeNode prev = null;
int minDiff = Integer.MAX_VALUE;

public int getMinimumDifference(TreeNode root) {
    inorder(root);
    return minDiff;
}

private void inorder(TreeNode node) {
    if (node == null) return;
    
    inorder(node.left);
    
    if (prev != null) {
        minDiff = Math.min(minDiff, node.val - prev.val);
    }
    prev = node;
    
    inorder(node.right);
}
```

**Time**: O(n) | **Space**: O(h)

---

#### **2. Search in a Binary Search Tree**
- **Platform**: LeetCode
- **Link**: https://leetcode.com/problems/search-in-a-binary-search-tree/
- **Company Tags**: Google, Meta, Amazon, Microsoft
- **Frequency**: 9/10

**Solution:**
```java
public TreeNode searchBST(TreeNode root, int val) {
    while (root != null && root.val != val) {
        if (val < root.val) {
            root = root.left;
        } else {
            root = root.right;
        }
    }
    return root;
}
```

**Time**: O(h) | **Space**: O(1)

---

#### Level 2: Easy

#### **3. Range Sum of BST**
- **Platform**: LeetCode
- **Link**: https://leetcode.com/problems/range-sum-of-bst/
- **Company Tags**: Google, Meta, Amazon, Microsoft
- **Frequency**: 10/10

**Solution:**
```java
public int rangeSumBST(TreeNode root, int low, int high) {
    if (root == null) return 0;
    
    if (root.val < low) {
        return rangeSumBST(root.right, low, high);
    }
    
    if (root.val > high) {
        return rangeSumBST(root.left, low, high);
    }
    
    return root.val + 
           rangeSumBST(root.left, low, high) +
           rangeSumBST(root.right, low, high);
}
```

**Time**: O(n) | **Space**: O(h)

---

#### **4. Convert Sorted Array to Binary Search Tree**
- **Platform**: LeetCode
- **Link**: https://leetcode.com/problems/convert-sorted-array-to-binary-search-tree/
- **Company Tags**: Google, Meta, Amazon, Microsoft
- **Frequency**: 9/10

**Solution:**
```java
public TreeNode sortedArrayToBST(int[] nums) {
    return buildBST(nums, 0, nums.length - 1);
}

private TreeNode buildBST(int[] nums, int left, int right) {
    if (left > right) return null;
    
    int mid = left + (right - left) / 2;
    TreeNode root = new TreeNode(nums[mid]);
    
    root.left = buildBST(nums, left, mid - 1);
    root.right = buildBST(nums, mid + 1, right);
    
    return root;
}
```

**Time**: O(n) | **Space**: O(log n)

---

#### **5. Insert into a Binary Search Tree**
- **Platform**: LeetCode
- **Link**: https://leetcode.com/problems/insert-into-a-binary-search-tree/
- **Company Tags**: Google, Meta, Amazon, Microsoft
- **Frequency**: 8/10

**Solution:**
```java
public TreeNode insertIntoBST(TreeNode root, int val) {
    if (root == null) return new TreeNode(val);
    
    if (val < root.val) {
        root.left = insertIntoBST(root.left, val);
    } else {
        root.right = insertIntoBST(root.right, val);
    }
    
    return root;
}
```

**Time**: O(h) | **Space**: O(h)

---

#### Level 3: Medium

#### **6. Kth Smallest Element in a BST**
- **Platform**: LeetCode
- **Link**: https://leetcode.com/problems/kth-smallest-element-in-a-bst/
- **Company Tags**: Google, Meta, Amazon, Microsoft
- **Frequency**: 10/10

**Solution:**
```java
int count = 0;
int result = -1;

public int kthSmallest(TreeNode root, int k) {
    inorder(root, k);
    return result;
}

private void inorder(TreeNode node, int k) {
    if (node == null) return;
    
    inorder(node.left, k);
    
    count++;
    if (count == k) {
        result = node.val;
        return;
    }
    
    inorder(node.right, k);
}
```

**Time**: O(h + k) | **Space**: O(h)

---

#### **7. Lowest Common Ancestor of a Binary Search Tree**
- **Platform**: LeetCode
- **Link**: https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/
- **Company Tags**: Google, Meta, Amazon, Microsoft
- **Frequency**: 10/10

**Solution:**
```java
public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
    while (root != null) {
        if (p.val < root.val && q.val < root.val) {
            root = root.left;
        } else if (p.val > root.val && q.val > root.val) {
            root = root.right;
        } else {
            return root;
        }
    }
    return null;
}
```

**Time**: O(h) | **Space**: O(1)

---

#### **8. Validate Binary Search Tree**
- **Platform**: LeetCode
- **Link**: https://leetcode.com/problems/validate-binary-search-tree/
- **Company Tags**: Google, Meta, Amazon, Microsoft
- **Frequency**: 10/10

**Solution:**
```java
public boolean isValidBST(TreeNode root) {
    return validate(root, null, null);
}

private boolean validate(TreeNode node, Integer min, Integer max) {
    if (node == null) return true;
    
    if ((min != null && node.val <= min) || 
        (max != null && node.val >= max)) {
        return false;
    }
    
    return validate(node.left, min, node.val) &&
           validate(node.right, node.val, max);
}
```

**Time**: O(n) | **Space**: O(h)

---

#### **9. Delete Node in a BST**
- **Platform**: LeetCode
- **Link**: https://leetcode.com/problems/delete-node-in-a-bst/
- **Company Tags**: Google, Meta, Amazon, Microsoft
- **Frequency**: 9/10

**Solution:**
```java
public TreeNode deleteNode(TreeNode root, int key) {
    if (root == null) return null;
    
    if (key < root.val) {
        root.left = deleteNode(root.left, key);
    } else if (key > root.val) {
        root.right = deleteNode(root.right, key);
    } else {
        // Found node to delete
        
        if (root.left == null && root.right == null) {
            return null;
        }
        
        if (root.left == null) {
            return root.right;
        }
        if (root.right == null) {
            return root.left;
        }
        
        TreeNode successor = findMin(root.right);
        root.val = successor.val;
        root.right = deleteNode(root.right, successor.val);
    }
    
    return root;
}

private TreeNode findMin(TreeNode node) {
    while (node.left != null) {
        node = node.left;
    }
    return node;
}
```

**Time**: O(h) | **Space**: O(h)

---

#### **10. Trim a Binary Search Tree**
- **Platform**: LeetCode
- **Link**: https://leetcode.com/problems/trim-a-binary-search-tree/
- **Company Tags**: Google, Meta, Amazon, Microsoft
- **Frequency**: 8/10

**Solution:**
```java
public TreeNode trimBST(TreeNode root, int low, int high) {
    if (root == null) return null;
    
    if (root.val < low) {
        return trimBST(root.right, low, high);
    }
    
    if (root.val > high) {
        return trimBST(root.left, low, high);
    }
    
    root.left = trimBST(root.left, low, high);
    root.right = trimBST(root.right, low, high);
    
    return root;
}
```

**Time**: O(n) | **Space**: O(h)

---

#### **11. Two Sum IV - Input is a BST**
- **Platform**: LeetCode
- **Link**: https://leetcode.com/problems/two-sum-iv-input-is-a-bst/
- **Company Tags**: Google, Meta, Amazon, Microsoft
- **Frequency**: 8/10

**Solution:**
```java
public boolean findTarget(TreeNode root, int k) {
    List<Integer> list = new ArrayList<>();
    inorder(root, list);
    
    int left = 0, right = list.size() - 1;
    
    while (left < right) {
        int sum = list.get(left) + list.get(right);
        
        if (sum == k) return true;
        if (sum < k) left++;
        else right--;
    }
    
    return false;
}

private void inorder(TreeNode node, List<Integer> list) {
    if (node == null) return;
    
    inorder(node.left, list);
    list.add(node.val);
    inorder(node.right, list);
}
```

**Time**: O(n) | **Space**: O(n)

---

#### **12. BST Iterator**
- **Platform**: LeetCode
- **Link**: https://leetcode.com/problems/binary-search-tree-iterator/
- **Company Tags**: Google, Meta, Amazon, Microsoft
- **Frequency**: 9/10

**Solution:**
```java
class BSTIterator {
    Stack<TreeNode> stack;
    
    public BSTIterator(TreeNode root) {
        stack = new Stack<>();
        pushLeft(root);
    }
    
    public int next() {
        TreeNode node = stack.pop();
        if (node.right != null) {
            pushLeft(node.right);
        }
        return node.val;
    }
    
    public boolean hasNext() {
        return !stack.isEmpty();
    }
    
    private void pushLeft(TreeNode node) {
        while (node != null) {
            stack.push(node);
            node = node.left;
        }
    }
}
```

**Time**: O(1) amortized | **Space**: O(h)

---

#### **13. Convert BST to Greater Tree**
- **Platform**: LeetCode
- **Link**: https://leetcode.com/problems/convert-bst-to-greater-tree/
- **Company Tags**: Google, Meta, Amazon, Microsoft
- **Frequency**: 8/10

**Solution:**
```java
int sum = 0;

public TreeNode convertBST(TreeNode root) {
    if (root == null) return null;
    
    convertBST(root.right);
    
    sum += root.val;
    root.val = sum;
    
    convertBST(root.left);
    
    return root;
}
```

**Time**: O(n) | **Space**: O(h)

---

#### **14. Search in a Binary Search Tree**
- **Platform**: LeetCode
- **Link**: https://leetcode.com/problems/search-in-a-binary-search-tree/
- **Company Tags**: Google, Meta, Amazon, Microsoft
- **Frequency**: 9/10

**Solution:**
```java
public TreeNode searchBST(TreeNode root, int val) {
    while (root != null && root.val != val) {
        if (val < root.val) {
            root = root.left;
        } else {
            root = root.right;
        }
    }
    return root;
}
```

**Time**: O(h) | **Space**: O(1)

---

#### Level 4: Hard

#### **15. Serialize and Deserialize BST**
- **Platform**: LeetCode
- **Link**: https://leetcode.com/problems/serialize-and-deserialize-bst/
- **Company Tags**: Google, Meta, Amazon, Microsoft
- **Frequency**: 9/10

**Solution:**
```java
public class Codec {
    public String serialize(TreeNode root) {
        StringBuilder sb = new StringBuilder();
        preorder(root, sb);
        return sb.toString();
    }
    
    private void preorder(TreeNode node, StringBuilder sb) {
        if (node == null) return;
        sb.append(node.val).append(",");
        preorder(node.left, sb);
        preorder(node.right, sb);
    }
    
    public TreeNode deserialize(String data) {
        if (data.isEmpty()) return null;
        Queue<Integer> queue = new LinkedList<>();
        for (String s : data.split(",")) {
            queue.offer(Integer.parseInt(s));
        }
        return buildTree(queue);
    }
    
    private TreeNode buildTree(Queue<Integer> queue) {
        if (queue.isEmpty()) return null;
        int val = queue.poll();
        TreeNode root = new TreeNode(val);
        Queue<Integer> smaller = new LinkedList<>();
        while (!queue.isEmpty() && queue.peek() < val) {
            smaller.offer(queue.poll());
        }
        root.left = buildTree(smaller);
        root.right = buildTree(queue);
        return root;
    }
}
```

**Time**: O(n) | **Space**: O(n)

---

#### **16. Recover Binary Search Tree**
- **Platform**: LeetCode
- **Link**: https://leetcode.com/problems/recover-binary-search-tree/
- **Company Tags**: Google, Meta, Amazon, Microsoft
- **Frequency**: 9/10

**Solution:**
```java
TreeNode first = null, second = null, prev = null;

public void recoverTree(TreeNode root) {
    inorder(root);
    // Swap values
    int temp = first.val;
    first.val = second.val;
    second.val = temp;
}

private void inorder(TreeNode node) {
    if (node == null) return;
    
    inorder(node.left);
    
    if (prev != null && prev.val > node.val) {
        if (first == null) first = prev;
        second = node;
    }
    prev = node;
    
    inorder(node.right);
}
```

**Time**: O(n) | **Space**: O(h)

---

#### **17. Count of Smaller Numbers After Self**
- **Platform**: LeetCode
- **Link**: https://leetcode.com/problems/count-of-smaller-numbers-after-self/
- **Company Tags**: Google, Meta, Amazon, Microsoft
- **Frequency**: 8/10

**Solution:**
```java
class Node {
    int val, count, leftSize;
    Node left, right;
    Node(int v, int c) { val = v; count = c; leftSize = 0; }
}

public List<Integer> countSmaller(int[] nums) {
    List<Integer> result = new ArrayList<>();
    if (nums.length == 0) return result;
    
    Node root = null;
    
    for (int i = nums.length - 1; i >= 0; i--) {
        root = insert(root, nums[i], 0, result);
    }
    
    return result;
}

private Node insert(Node node, int val, int sum, List<Integer> result) {
    if (node == null) {
        result.add(sum);
        return new Node(val, 1);
    }
    
    if (val < node.val) {
        node.leftSize++;
        node.left = insert(node.left, val, sum, result);
    } else {
        node.left = insert(node.left, val, sum + node.leftSize, result);
        node.count++;
        node.right = insert(node.right, val, sum + node.leftSize + node.count, result);
    }
    
    return node;
}
```

**Time**: O(n log n) avg | **Space**: O(n)

---

#### **18. Median from Data Stream**
- **Platform**: LeetCode
- **Link**: https://leetcode.com/problems/find-median-from-data-stream/
- **Company Tags**: Google, Meta, Amazon, Microsoft
- **Frequency**: 10/10

**Solution:**
```java
class MedianFinder {
    PriorityQueue<Integer> maxHeap;  // Left half
    PriorityQueue<Integer> minHeap;  // Right half
    
    public MedianFinder() {
        maxHeap = new PriorityQueue<>(Collections.reverseOrder());
        minHeap = new PriorityQueue<>();
    }
    
    public void addNum(int num) {
        maxHeap.offer(num);
        minHeap.offer(maxHeap.poll());
        
        if (maxHeap.size() < minHeap.size()) {
            maxHeap.offer(minHeap.poll());
        }
    }
    
    public double findMedian() {
        if (maxHeap.size() == minHeap.size()) {
            return (maxHeap.peek() + minHeap.peek()) / 2.0;
        }
        return maxHeap.peek();
    }
}
```

**Time**: O(log n) addNum, O(1) findMedian | **Space**: O(n)

---

### CodeChef Problems

#### **19. BST Operations**
- **Platform**: CodeChef
- **Link**: https://www.codechef.com/learn/course/data-structures/trees
- **Rating**: 800

Practice search, insert, delete operations.

---

### Codeforces Problems

#### **20. BST Problems**
- **Platform**: Codeforces
- **Link**: https://codeforces.com/problemset?tags=binary+search+trees
- **Rating**: 1000-1400

Practice validation, LCA, range sum problems.

---

## SECTION 4: LeetCode Top 20

### Easy (5 problems)

| # | Problem | Link |
|---|---------|------|
| 1 | Minimum Absolute Difference in BST | https://leetcode.com/problems/minimum-absolute-difference-in-bst/ |
| 2 | Search in a Binary Search Tree | https://leetcode.com/problems/search-in-a-binary-search-tree/ |
| 3 | Range Sum of BST | https://leetcode.com/problems/range-sum-of-bst/ |
| 4 | Convert Sorted Array to BST | https://leetcode.com/problems/convert-sorted-array-to-binary-search-tree/ |
| 5 | Insert into a Binary Search Tree | https://leetcode.com/problems/insert-into-a-binary-search-tree/ |

---

### Medium (8 problems)

| # | Problem | Link |
|---|---------|------|
| 1 | Kth Smallest Element in BST | https://leetcode.com/problems/kth-smallest-element-in-a-bst/ |
| 2 | Lowest Common Ancestor of BST | https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/ |
| 3 | Validate Binary Search Tree | https://leetcode.com/problems/validate-binary-search-tree/ |
| 4 | Delete Node in a BST | https://leetcode.com/problems/delete-node-in-a-bst/ |
| 5 | Trim a Binary Search Tree | https://leetcode.com/problems/trim-a-binary-search-tree/ |
| 6 | Two Sum IV - Input is BST | https://leetcode.com/problems/two-sum-iv-input-is-a-bst/ |
| 7 | BST Iterator | https://leetcode.com/problems/binary-search-tree-iterator/ |
| 8 | Convert BST to Greater Tree | https://leetcode.com/problems/convert-bst-to-greater-tree/ |

---

### Hard (5 problems)

| # | Problem | Link |
|---|---------|------|
| 1 | Serialize and Deserialize BST | https://leetcode.com/problems/serialize-and-deserialize-bst/ |
| 2 | Recover Binary Search Tree | https://leetcode.com/problems/recover-binary-search-tree/ |
| 3 | Count of Smaller Numbers After Self | https://leetcode.com/problems/count-of-smaller-numbers-after-self/ |
| 4 | Median from Data Stream | https://leetcode.com/problems/find-median-from-data-stream/ |
| 5 | My Calendar I | https://leetcode.com/problems/my-calendar-i/ |

---

## SECTION 5: Active Learning — 5 Questions

1. **Minimum Absolute Difference in BST** — LeetCode 530  
   [Link](https://leetcode.com/problems/minimum-absolute-difference-in-bst/)

2. **Range Sum of BST** — LeetCode 938  
   [Link](https://leetcode.com/problems/range-sum-of-bst/)

3. **Kth Smallest Element in BST** — LeetCode 230  
   [Link](https://leetcode.com/problems/kth-smallest-element-in-a-bst/)

4. **Validate Binary Search Tree** — LeetCode 98  
   [Link](https://leetcode.com/problems/validate-binary-search-tree/)

5. **Lowest Common Ancestor of BST** — LeetCode 235  
   [Link](https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/)

---

## SECTION 6: Revision Notes — CHEAT SHEET

### 📝 **BST Cheat Sheet**

| Concept | Java Code | C++ Code | Time |
|---------|-----------|----------|------|
| **Search** | `searchBST(root, val)` | `searchBST(root, val)` | O(h) |
| **Insert** | `insertIntoBST(root, val)` | `insertIntoBST(root, val)` | O(h) |
| **Delete** | `deleteNode(root, key)` | `deleteNode(root, key)` | O(h) |
| **Validate** | `isValidBST(root)` | `isValidBST(root)` | O(n) |
| **LCA** | `lowestCommonAncestor(root, p, q)` | `lowestCommonAncestor(root, p, q)` | O(h) |
| **Kth Smallest** | `kthSmallest(root, k)` | `kthSmallest(root, k)` | O(h+k) |
| **Range Sum** | `rangeSumBST(root, low, high)` | `rangeSumBST(root, low, high)` | O(n) |
| **Inorder** | `inorder(root)` | `inorder(root)` | O(n) |
| **Trim** | `trimBST(root, low, high)` | `trimBST(root, low, high)` | O(n) |
| **Sorted Array to BST** | `sortedArrayToBST(nums)` | `sortedArrayToBST(nums)` | O(n) |

**Key Patterns:**
```java
// Validate BST (Range Check)
public boolean isValidBST(TreeNode root) {
    return validate(root, null, null);
}

private boolean validate(TreeNode node, Integer min, Integer max) {
    if (node == null) return true;
    
    if ((min != null && node.val <= min) || 
        (max != null && node.val >= max)) {
        return false;
    }
    
    return validate(node.left, min, node.val) &&
           validate(node.right, node.val, max);
}

// LCA in BST
public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
    while (root != null) {
        if (p.val < root.val && q.val < root.val) {
            root = root.left;
        } else if (p.val > root.val && q.val > root.val) {
            root = root.right;
        } else {
            return root;
        }
    }
    return null;
}

// Kth Smallest (Inorder)
int count = 0, result = -1;
public int kthSmallest(TreeNode root, int k) {
    inorder(root, k);
    return result;
}

private void inorder(TreeNode node, int k) {
    if (node == null) return;
    inorder(node.left, k);
    count++;
    if (count == k) { result = node.val; return; }
    inorder(node.right, k);
}

// Range Sum (Pruning)
public int rangeSumBST(TreeNode root, int low, int high) {
    if (root == null) return 0;
    if (root.val < low) return rangeSumBST(root.right, low, high);
    if (root.val > high) return rangeSumBST(root.left, low, high);
    return root.val + rangeSumBST(root.left, low, high) + 
                        rangeSumBST(root.right, low, high);
}

// Delete Node (3 Cases)
public TreeNode deleteNode(TreeNode root, int key) {
    if (root == null) return null;
    
    if (key < root.val) {
        root.left = deleteNode(root.left, key);
    } else if (key > root.val) {
        root.right = deleteNode(root.right, key);
    } else {
        if (root.left == null && root.right == null) return null;
        if (root.left == null) return root.right;
        if (root.right == null) return root.left;
        
        TreeNode successor = findMin(root.right);
        root.val = successor.val;
        root.right = deleteNode(root.right, successor.val);
    }
    return root;
}

private TreeNode findMin(TreeNode node) {
    while (node.left != null) node = node.left;
    return node;
}
```

---

## SECTION 7: KEYWORDS & FUNCTIONS SUMMARY

### 🔑 **ALL KEYWORDS**

| Keyword | Type | Purpose |
|---------|------|---------|
| **BST** | Type | Binary Search Tree |
| **BST Property** | Rule | Left < Root < Right |
| **Inorder** | Traversal | Sorted sequence |
| **LCA** | Concept | Lowest Common Ancestor |
| **Range** | Concept | Min-Max bounds |
| **Successor** | Node | Next inorder node |
| **Predecessor** | Node | Previous inorder node |
| **Balanced** | Type | Height diff ≤ 1 |
| **Skewed** | Type | Linked list-like |
| **Pruning** | Technique | Skip subtrees |

---

### ⚙️ **ALL FUNCTIONS**

| Function | Purpose | Time |
|----------|---------|------|
| `searchBST(root, val)` | Search in BST | O(h) |
| `insertIntoBST(root, val)` | Insert in BST | O(h) |
| `deleteNode(root, key)` | Delete from BST | O(h) |
| `isValidBST(root)` | Validate BST | O(n) |
| `lowestCommonAncestor(root, p, q)` | Find LCA | O(h) |
| `kthSmallest(root, k)` | Kth smallest | O(h+k) |
| `rangeSumBST(root, low, high)` | Range sum | O(n) |
| `sortedArrayToBST(nums)` | Build BST | O(n) |
| `trimBST(root, low, high)` | Trim BST | O(n) |
| `findTarget(root, k)` | Two sum | O(n) |
| `getMinimumDifference(root)` | Min diff | O(n) |
| `convertBST(root)` | Greater tree | O(n) |
| `recoverTree(root)` | Recover BST | O(n) |
