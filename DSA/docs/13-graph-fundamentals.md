# 📚 Day 13: Graph Fundamentals — Complete Mastery Guide

## SECTION 1: INTUITION BUILDING (Why Graphs Exist?)

### 🤔 **Why This Topic Exists?**

**Real-World Problem:**

> Imagine you have **cities** and **roads** connecting them. You need to figure out:
> - Can we **reach** city B from city A?
> - What is the **shortest path**?
> - What is the **minimum number of roads** needed to connect everyone?
>
> All these problems are solved using **Graphs**!

**Real-World Analogies:**

| Real World | Graph Equivalent |
|------------|------------------|
| Cities + Roads | Nodes + Edges |
| Social Media Friends | Users + Connections |
| Web Pages + Links | Pages + Hyperlinks |
| Flight Routes | Airports + Flights |
| Task Dependencies | Tasks + Prerequisites |
| Family Tree | People + Relationships |

**Visual Example:**

```text
Social Network:
You — Alice — Bob
 |      |
Carol — Dave

Graph Representation:
    You
   /   \
Alice  Carol
  |      |
  Dave — Bob

Nodes: You, Alice, Bob, Carol, Dave
Edges: (You-Alice), (You-Carol), (Alice-Dave), (Carol-Dave), (Dave-Bob)
```

**Mental Model:**

> **Graph = Collection of Objects (Nodes) + Connections between them (Edges)**
>
> Whenever you see **relationships**, **connections**, **networks**, or **dependencies** → **THINK GRAPH!**

**Common Interview Use Cases:**
- **Social Networks**: Friends, followers, connections
- **Navigation**: Maps, GPS, shortest path
- **Web Crawling**: Pages linked together
- **Task Scheduling**: Prerequisites, dependencies
- **Network Analysis**: Connectivity, components
- **Recommendation Systems**: Similar users/items

---

## SECTION 2: COMPLETE THEORY

### 📖 **Core Concepts & Definitions**

#### **Definition:**

> **A Graph** is a **non-linear data structure** consisting of:
> - **Vertices (Nodes)**: Objects/entities
> - **Edges (Connections)**: Relationships between objects
>
> Formally: **G = (V, E)** where V = set of vertices, E = set of edges

**Visual:**

```text
Graph with 5 nodes and 6 edges:

    0
   / \
  1 — 2
  |   |
  3 — 4

Vertices (V): {0, 1, 2, 3, 4}
Edges (E): {(0,1), (0,2), (1,2), (1,3), (2,4), (3,4)}

|V| = 5 (number of vertices)
|E| = 6 (number of edges)
```

---

### **Types of Graphs:**

| Type | Definition | Example | Visual |
|------|------------|---------|--------|
| **Undirected Graph** | Edges have no direction (bidirectional) | Friendships | A — B |
| **Directed Graph (Digraph)** | Edges have direction (one-way) | Task dependencies | A → B |
| **Weighted Graph** | Edges have weights/costs | Distance between cities | A —5— B |
| **Unweighted Graph** | All edges have same weight | Social connections | A — B |
| **Cyclic Graph** | Contains at least one cycle | Circular dependencies | A → B → C → A |
| **Acyclic Graph** | No cycles | Task prerequisites | A → B → C |
| **Connected Graph** | Path exists between any two nodes | Single network | All nodes reachable |
| **Disconnected Graph** | Some nodes not reachable | Multiple networks | Separate components |
| **Complete Graph** | Every node connected to every other | Full mesh network | All pairs connected |
| **Sparse Graph** | Few edges (\|E\| ≈ \|V\|) | Social network | Low connectivity |
| **Dense Graph** | Many edges (\|E\| ≈ \|V\|²) | Flight network | High connectivity |

**Visual Examples:**

```text
Undirected Graph (Bidirectional):
    A — B
    |   |
    C — D

Edge A-B: Can go A→B AND B→A ✓

Directed Graph (One-way):
    A → B
    ↓   ↓
    C → D

Edge A→B: Can ONLY go A→B (NOT B→A) ✗

Weighted Graph:
    A —5— B
    |     |
    3     4
    |     |
    C —2— D

A-B costs 5, A-C costs 3, etc.

Cyclic Graph:
    A → B
    ↓   ↓
    C ← D

Cycle: A → B → D → C → A ✓

Acyclic Graph:
    A → B → C
    ↓
    D

No cycles ✓
```

---

### **Graph Representations:**

#### **1. Adjacency Matrix:**

**Definition:**
> 2D array of size V×V where `matrix[i][j] = 1` if edge exists from i to j, else 0.

**Visual:**

```text
Graph:
    0 — 1
    |   |
    2 — 3

Adjacency Matrix (Undirected):
    0  1  2  3
  ┌────────────
0 │ 0  1  1  0
1 │ 1  0  0  1
2 │ 1  0  0  1
3 │ 0  1  1  0

matrix[0][1] = 1 (edge 0-1 exists)
matrix[0][3] = 0 (no edge 0-3)

Space: O(V²)
Time: Check edge = O(1)
```

**Java Code:**
```java
int[][] adjMatrix = new int[V][V];

// Add edge (undirected)
adjMatrix[u][v] = 1;
adjMatrix[v][u] = 1;

// Check if edge exists
if (adjMatrix[u][v] == 1) {
    // Edge exists
}
```

**Pros:**
- ✅ Fast edge lookup: O(1)
- ✅ Simple implementation

**Cons:**
- ❌ Wastes space for sparse graphs: O(V²)
- ❌ Hard to iterate neighbors: O(V)

---

#### **2. Adjacency List:**

**Definition:**
> Array/Map of lists where `list[i]` contains all neighbors of node i.

**Visual:**

```text
Graph:
    0 — 1
    |   |
    2 — 3

Adjacency List (Undirected):
0: [1, 2]
1: [0, 3]
2: [0, 3]
3: [1, 2]

Space: O(V + E)
Time: Iterate neighbors = O(degree)
```

**Java Code:**
```java
List<List<Integer>> adjList = new ArrayList<>();

// Initialize
for (int i = 0; i < V; i++) {
    adjList.add(new ArrayList<>());
}

// Add edge (undirected)
adjList.get(u).add(v);
adjList.get(v).add(u);

// Iterate neighbors
for (int neighbor : adjList.get(u)) {
    // Process neighbor
}
```

**Pros:**
- ✅ Space efficient for sparse graphs: O(V + E)
- ✅ Easy to iterate neighbors

**Cons:**
- ❌ Edge lookup slower: O(degree)

---

#### **3. Edge List:**

**Definition:**
> List of all edges as pairs (u, v).

**Visual:**

```text
Graph:
    0 — 1
    |   |
    2 — 3

Edge List:
[(0,1), (0,2), (1,3), (2,3)]

Space: O(E)
```

**Use Case:**
- Kruskal's algorithm
- When you need all edges

---

### **Comparison Table:**

| Representation | Space | Add Edge | Check Edge | Iterate Neighbors |
|----------------|-------|----------|------------|-------------------|
| **Adjacency Matrix** | O(V²) | O(1) | O(1) | O(V) |
| **Adjacency List** | O(V + E) | O(1) | O(degree) | O(degree) |
| **Edge List** | O(E) | O(1) | O(E) | O(E) |

**Recommendation for Interviews:**
- **Use Adjacency List** for most problems (space efficient, easy to traverse)
- **Use Adjacency Matrix** only for small dense graphs (V < 100)

---

### **Key Terminology:**

| Term | Definition | Example |
|------|------------|---------|
| **Vertex (Node)** | Individual object | City, person, web page |
| **Edge** | Connection between nodes | Road, friendship, link |
| **Degree** | Number of edges connected to a node | Node with 3 edges has degree 3 |
| **In-Degree** | Number of incoming edges (directed) | Tasks depending on this |
| **Out-Degree** | Number of outgoing edges (directed) | Tasks this depends on |
| **Path** | Sequence of nodes connected by edges | A → B → C |
| **Cycle** | Path that starts and ends at same node | A → B → C → A |
| **Connected** | Path exists between any two nodes | Single network |
| **Component** | Maximal connected subgraph | Separate networks |
| **Weight** | Cost/distance associated with edge | Distance, time, cost |
| **Neighbor** | Node directly connected by edge | Friends in social network |

---

### **Time & Space Complexity:**

| Operation | Adjacency Matrix | Adjacency List |
|-----------|------------------|----------------|
| **Add Vertex** | O(V²) | O(1) |
| **Add Edge** | O(1) | O(1) |
| **Remove Edge** | O(1) | O(degree) |
| **Check Edge** | O(1) | O(degree) |
| **Iterate Neighbors** | O(V) | O(degree) |
| **Space** | O(V²) | O(V + E) |

**Where:**
- V = number of vertices
- E = number of edges
- degree = average number of neighbors

---

## SECTION 3: PATTERN RECOGNITION

### 🔍 **How to Identify Graph Problems?**

**Keywords in Interview Questions:**

| Keyword | Indicates | Example |
|---------|-----------|---------|
| **Network** | Graph | Social network, computer network |
| **Connections** | Edges | Friend connections, roads |
| **Path** | Traversal | Shortest path, any path |
| **Reachable** | Connectivity | Can A reach B? |
| **Dependencies** | Directed edges | Prerequisites, tasks |
| **Cycles** | Cyclic graph | Circular dependencies |
| **Components** | Connected subgraphs | Friend groups, islands |
| **Neighbors** | Adjacent nodes | Friends, nearby cities |
| **Hierarchy** | Tree/DAG | Organization chart, family tree |
| **Web/Pages** | Directed graph | Hyperlinks |

**When to Use Graph:**

✅ **Use Graph when:**
- Objects have relationships/connections
- You need to find paths or connectivity
- There are dependencies or prerequisites
- Problem involves networks or maps
- You see terms like "friends", "connected", "path"

❌ **Don't Use Graph when:**
- Only linear relationships (use Array/Linked List)
- Hierarchical with single parent (use Tree)
- Simple key-value lookups (use HashMap)

---

### **Common Graph Patterns:**

| Pattern | When to Use | Example Problems |
|---------|-------------|------------------|
| **BFS (Breadth-First Search)** | Shortest path in unweighted graph, level-by-level traversal | Shortest path, minimum steps |
| **DFS (Depth-First Search)** | Explore all paths, detect cycles, topological sort | Path finding, cycle detection |
| **Topological Sort** | Task scheduling, dependencies | Course schedule, build order |
| **Union Find (DSU)** | Dynamic connectivity, merging components | Number of islands, connections |
| **Dijkstra's Algorithm** | Shortest path in weighted graph | GPS navigation, network routing |
| **Bellman-Ford** | Shortest path with negative weights | Currency arbitrage |
| **Floyd-Warshall** | All-pairs shortest path | Distance matrix |
| **Minimum Spanning Tree** | Connect all nodes with minimum cost | Network design, road planning |

---

## SECTION 4: VISUAL LEARNING

### **Graph Representation Comparison:**

```text
Graph:
    0 — 1
    |   |
    2 — 3

Adjacency Matrix:
    0  1  2  3
  ┌────────────
0 │ 0  1  1  0
1 │ 1  0  0  1
2 │ 1  0  0  1
3 │ 0  1  1  0

Space: 4×4 = 16 cells
Check edge 0-1: matrix[0][1] = 1 ✓
Check edge 0-3: matrix[0][3] = 0 ✗

Adjacency List:
0: [1, 2]
1: [0, 3]
2: [0, 3]
3: [1, 2]

Space: 4 lists with total 8 entries
Iterate neighbors of 0: [1, 2] ✓
```

---

### **BFS vs DFS Visualization:**

```text
Graph:
        0
       / \
      1   2
     / \   \
    3   4   5

BFS (Level Order):
Queue: [0]
Visit: 0
Queue: [1, 2]
Visit: 1
Queue: [2, 3, 4]
Visit: 2
Queue: [3, 4, 5]
Visit: 3
Queue: [4, 5]
Visit: 4
Queue: [5]
Visit: 5
Order: 0, 1, 2, 3, 4, 5 ✓

DFS (Recursive):
0 → 1 → 3 (backtrack) → 4 (backtrack) → 2 → 5
Order: 0, 1, 3, 4, 2, 5 ✓
```

---

## SECTION 5: CORE TEMPLATES

### **Template 1: Graph Representation (Adjacency List)**

**Java:**
```java
class Graph {
    int V;  // Number of vertices
    List<List<Integer>> adjList;  // Adjacency list
    
    // Constructor
    Graph(int V) {
        this.V = V;
        adjList = new ArrayList<>();
        
        // Initialize adjacency list
        for (int i = 0; i < V; i++) {
            adjList.add(new ArrayList<>());
        }
    }
    
    // Add edge (undirected)
    void addEdge(int u, int v) {
        adjList.get(u).add(v);
        adjList.get(v).add(u);
    }
    
    // Add edge (directed)
    void addDirectedEdge(int u, int v) {
        adjList.get(u).add(v);
    }
    
    // Print graph
    void printGraph() {
        for (int i = 0; i < V; i++) {
            System.out.print("Vertex " + i + ": ");
            for (int neighbor : adjList.get(i)) {
                System.out.print(neighbor + " ");
            }
            System.out.println();
        }
    }
}

// Usage:
Graph g = new Graph(5);
g.addEdge(0, 1);
g.addEdge(0, 2);
g.addEdge(1, 3);
g.addEdge(2, 4);
g.printGraph();
```

**C++:**
```cpp
class Graph {
    int V;
    vector<vector<int>> adjList;
    
public:
    Graph(int V) {
        this->V = V;
        adjList.resize(V);
    }
    
    void addEdge(int u, int v) {
        adjList[u].push_back(v);
        adjList[v].push_back(u);
    }
    
    void addDirectedEdge(int u, int v) {
        adjList[u].push_back(v);
    }
    
    void printGraph() {
        for (int i = 0; i < V; i++) {
            cout << "Vertex " << i << ": ";
            for (int neighbor : adjList[i]) {
                cout << neighbor << " ";
            }
            cout << endl;
        }
    }
};
```

---

### **Template 2: BFS Traversal**

**Java:**
```java
public void bfs(Graph g, int start) {
    boolean[] visited = new boolean[g.V];
    Queue<Integer> queue = new LinkedList<>();
    
    // Mark start as visited and enqueue
    visited[start] = true;
    queue.offer(start);
    
    while (!queue.isEmpty()) {
        int curr = queue.poll();
        System.out.print(curr + " ");
        
        // Visit all neighbors
        for (int neighbor : g.adjList.get(curr)) {
            if (!visited[neighbor]) {
                visited[neighbor] = true;
                queue.offer(neighbor);
            }
        }
    }
}

// Time: O(V + E) | Space: O(V)
```

---

### **Template 3: DFS Traversal (Recursive)**

**Java:**
```java
public void dfs(Graph g, int start) {
    boolean[] visited = new boolean[g.V];
    dfsHelper(g, start, visited);
}

private void dfsHelper(Graph g, int curr, boolean[] visited) {
    visited[curr] = true;
    System.out.print(curr + " ");
    
    // Visit all neighbors
    for (int neighbor : g.adjList.get(curr)) {
        if (!visited[neighbor]) {
            dfsHelper(g, neighbor, visited);
        }
    }
}

// Time: O(V + E) | Space: O(V) (recursion stack)
```

---

### **Template 4: DFS Traversal (Iterative)**

**Java:**
```java
public void dfsIterative(Graph g, int start) {
    boolean[] visited = new boolean[g.V];
    Stack<Integer> stack = new Stack<>();
    
    stack.push(start);
    
    while (!stack.isEmpty()) {
        int curr = stack.pop();
        
        if (!visited[curr]) {
            visited[curr] = true;
            System.out.print(curr + " ");
            
            // Push neighbors (reverse order for correct sequence)
            for (int i = g.adjList.get(curr).size() - 1; i >= 0; i--) {
                int neighbor = g.adjList.get(curr).get(i);
                if (!visited[neighbor]) {
                    stack.push(neighbor);
                }
            }
        }
    }
}

// Time: O(V + E) | Space: O(V)
```

---

## SECTION 6: PROBLEM PROGRESSION

### **Level 1: Very Easy**

#### **1. Number of Provinces (LeetCode 547)**
- **Platform**: LeetCode
- **Link**: https://leetcode.com/problems/number-of-provinces/
- **Company Tags**: Google, Meta, Amazon, Microsoft
- **Frequency**: 9/10
- **Problem**: Find number of connected components in undirected graph

**Brute Force:**
- Check every pair of cities: O(V²)
- Use DFS/BFS to group connected cities

**Optimized (DFS):**
```java
public int findCircleNum(int[][] isConnected) {
    int V = isConnected.length;
    boolean[] visited = new boolean[V];
    int provinces = 0;
    
    for (int i = 0; i < V; i++) {
        if (!visited[i]) {
            dfs(isConnected, visited, i);
            provinces++;
        }
    }
    
    return provinces;
}

private void dfs(int[][] isConnected, boolean[] visited, int curr) {
    visited[curr] = true;
    
    for (int neighbor = 0; neighbor < isConnected.length; neighbor++) {
        if (isConnected[curr][neighbor] == 1 && !visited[neighbor]) {
            dfs(isConnected, visited, neighbor);
        }
    }
}

// Time: O(V²) | Space: O(V)
```

**Interview Discussion:**
- **Q**: Why DFS works?
  - **A**: DFS explores all reachable nodes from start → one connected component
- **Q**: Can we use BFS?
  - **A**: Yes! Same logic, just different traversal order
- **Q**: Time complexity?
  - **A**: O(V²) because we check all pairs in adjacency matrix

---

#### **2. Find the Town Judge (LeetCode 997)**
- **Platform**: LeetCode
- **Link**: https://leetcode.com/problems/find-the-town-judge/
- **Company Tags**: Google, Meta, Amazon
- **Frequency**: 8/10
- **Problem**: Find node with in-degree = V-1 and out-degree = 0

**Solution:**
```java
public int findJudge(int N, int[][] trust) {
    int[] inDegree = new int[N + 1];
    int[] outDegree = new int[N + 1];
    
    for (int[] t : trust) {
        outDegree[t[0]]++;
        inDegree[t[1]]++;
    }
    
    for (int i = 1; i <= N; i++) {
        if (inDegree[i] == N - 1 && outDegree[i] == 0) {
            return i;
        }
    }
    
    return -1;
}

// Time: O(E) | Space: O(V)
```

---

### **Level 2: Easy**

#### **3. Find Center of Star Graph (LeetCode 1791)**
- **Platform**: LeetCode
- **Link**: https://leetcode.com/problems/find-center-of-star-graph/
- **Company Tags**: Amazon, Microsoft
- **Frequency**: 7/10

**Solution:**
```java
public int findCenter(int[][] edges) {
    // Center appears in every edge
    // Just check first two edges
    if (edges[0][0] == edges[1][0] || edges[0][0] == edges[1][1]) {
        return edges[0][0];
    }
    return edges[0][1];
}

// Time: O(1) | Space: O(1)
```

---

#### **4. Find if Path Exists in Graph (LeetCode 1971)**
- **Platform**: LeetCode
- **Link**: https://leetcode.com/problems/find-if-path-exists-in-graph/
- **Company Tags**: Amazon, Microsoft
- **Frequency**: 8/10

**Solution (BFS):**
```java
public boolean validPath(int n, int[][] edges, int source, int destination) {
    List<List<Integer>> adjList = new ArrayList<>();
    for (int i = 0; i < n; i++) {
        adjList.add(new ArrayList<>());
    }
    
    for (int[] edge : edges) {
        adjList.get(edge[0]).add(edge[1]);
        adjList.get(edge[1]).add(edge[0]);
    }
    
    boolean[] visited = new boolean[n];
    Queue<Integer> queue = new LinkedList<>();
    queue.offer(source);
    visited[source] = true;
    
    while (!queue.isEmpty()) {
        int curr = queue.poll();
        if (curr == destination) return true;
        
        for (int neighbor : adjList.get(curr)) {
            if (!visited[neighbor]) {
                visited[neighbor] = true;
                queue.offer(neighbor);
            }
        }
    }
    
    return false;
}

// Time: O(V + E) | Space: O(V)
```

---

### **Level 3: Medium**

#### **5. Shortest Path with Alternating Colors (LeetCode 1129)**
- **Platform**: LeetCode
- **Link**: https://leetcode.com/problems/shortest-path-with-alternating-colors/
- **Company Tags**: Google, Meta
- **Frequency**: 7/10

**Solution (BFS with State):**
```java
public int[] shortestAlternatingPaths(int n, int[][] redEdges, int[][] blueEdges) {
    List<List<Integer>> redAdj = new ArrayList<>();
    List<List<Integer>> blueAdj = new ArrayList<>();
    
    for (int i = 0; i < n; i++) {
        redAdj.add(new ArrayList<>());
        blueAdj.add(new ArrayList<>());
    }
    
    for (int[] edge : redEdges) {
        redAdj.get(edge[0]).add(edge[1]);
    }
    for (int[] edge : blueEdges) {
        blueAdj.get(edge[0]).add(edge[1]);
    }
    
    int[] result = new int[n];
    Arrays.fill(result, Integer.MAX_VALUE);
    
    // BFS: [node, color (0=red, 1=blue)]
    Queue<int[]> queue = new LinkedList<>();
    queue.offer(new int[]{0, 0});  // Start with red
    queue.offer(new int[]{0, 1});  // Start with blue
    
    boolean[][] visited = new boolean[n][2];
    int steps = 0;
    
    while (!queue.isEmpty()) {
        int size = queue.size();
        
        for (int i = 0; i < size; i++) {
            int[] curr = queue.poll();
            int node = curr[0];
            int color = curr[1];
            
            result[node] = Math.min(result[node], steps);
            
            List<List<Integer>> nextAdj = (color == 0) ? blueAdj : redAdj;
            int nextColor = 1 - color;
            
            for (int neighbor : nextAdj.get(node)) {
                if (!visited[neighbor][nextColor]) {
                    visited[neighbor][nextColor] = true;
                    queue.offer(new int[]{neighbor, nextColor});
                }
            }
        }
        
        steps++;
    }
    
    for (int i = 0; i < n; i++) {
        if (result[i] == Integer.MAX_VALUE) {
            result[i] = -1;
        }
    }
    
    return result;
}

// Time: O(V + E) | Space: O(V)
```

---

### **Level 4: Hard**

#### **6. Minimum Time to Visit Disappearing Nodes (LeetCode 3143)**
- **Platform**: LeetCode
- **Link**: https://leetcode.com/problems/minimum-time-to-visit-disappearing-nodes/
- **Company Tags**: Google, Meta, Amazon
- **Frequency**: 6/10

**Solution (Dijkstra's with Modification):**
```java
// Similar to Dijkstra but with time constraints
// Implementation omitted for brevity
```

---

### **Level 5: FAANG Level**

#### **7. Course Schedule (LeetCode 207)**
- **Platform**: LeetCode
- **Link**: https://leetcode.com/problems/course-schedule/
- **Company Tags**: Google, Meta, Amazon, Microsoft
- **Frequency**: 10/10
- **Problem**: Detect cycle in directed graph (topological sort)

**Solution (DFS with Cycle Detection):**
```java
public boolean canFinish(int numCourses, int[][] prerequisites) {
    List<List<Integer>> adjList = new ArrayList<>();
    for (int i = 0; i < numCourses; i++) {
        adjList.add(new ArrayList<>());
    }
    
    for (int[] prereq : prerequisites) {
        adjList.get(prereq[1]).add(prereq[0]);
    }
    
    // 0 = unvisited, 1 = visiting, 2 = visited
    int[] visited = new int[numCourses];
    
    for (int i = 0; i < numCourses; i++) {
        if (visited[i] == 0 && hasCycle(adjList, visited, i)) {
            return false;
        }
    }
    
    return true;
}

private boolean hasCycle(List<List<Integer>> adjList, int[] visited, int curr) {
    if (visited[curr] == 1) return true;  // Cycle detected
    if (visited[curr] == 2) return false;  // Already processed
    
    visited[curr] = 1;  // Mark as visiting
    
    for (int neighbor : adjList.get(curr)) {
        if (hasCycle(adjList, visited, neighbor)) {
            return true;
        }
    }
    
    visited[curr] = 2;  // Mark as visited
    return false;
}

// Time: O(V + E) | Space: O(V)
```

**Interview Discussion:**
- **Q**: Why three states (0, 1, 2)?
  - **A**: To detect back edges (cycle). State 1 = in current path, if we see it again → cycle
- **Q**: Can we use BFS?
  - **A**: Yes! Use Kahn's algorithm (topological sort with in-degree)
- **Q**: Real-world application?
  - **A**: Course prerequisites, task dependencies, build systems

---

## SECTION 7: COMPANY QUESTIONS

### **Google:**
- Course Schedule (Cycle Detection)
- Shortest Path in Grid (BFS)
- Network Delay Time (Dijkstra)

### **Meta:**
- Number of Provinces (Connected Components)
- Find if Path Exists (BFS/DFS)
- Reconstruct Itinerary (Graph Traversal)

### **Amazon:**
- Course Schedule II (Topological Sort)
- Cheapest Flights Within K Stops (Bellman-Ford)
- Critical Connections in Network (Tarjan's Algorithm)

### **Microsoft:**
- Clone Graph (Graph Copy)
- Is Graph Bipartite? (BFS/DFS)
- Evaluate Division (Graph + DFS)

### **Netflix:**
- Movie Recommendations (Graph + BFS)
- User Similarity (Graph Traversal)

### **Uber:**
- Minimum Time to Visit All Nodes (BFS)
- Shortest Path in Grid (BFS)

### **Airbnb:**
- Find All People With Secret (BFS/DFS)
- Network Connectivity (Union Find)

### **LinkedIn:**
- Find Closest Connections (BFS)
- Connection Suggestions (Graph Traversal)

### **Atlassian:**
- Task Dependencies (Topological Sort)
- Build Order (Kahn's Algorithm)

### **Databricks:**
- Distributed Task Scheduling (Graph + Topological Sort)

---

## SECTION 8: LeetCode Top 20 Must-Solve

### **Easy (7 problems)**

| # | Problem | Link | Frequency | Importance |
|---|---------|------|-----------|------------|
| 1 | Number of Provinces | https://leetcode.com/problems/number-of-provinces/ | 9/10 | 10/10 |
| 2 | Find the Town Judge | https://leetcode.com/problems/find-the-town-judge/ | 8/10 | 9/10 |
| 3 | Find Center of Star Graph | https://leetcode.com/problems/find-center-of-star-graph/ | 7/10 | 8/10 |
| 4 | Find if Path Exists | https://leetcode.com/problems/find-if-path-exists-in-graph/ | 8/10 | 9/10 |
| 5 | Keys and Rooms | https://leetcode.com/problems/keys-and-rooms/ | 8/10 | 9/10 |
| 6 | Is Graph Bipartite? | https://leetcode.com/problems/is-graph-bipartite/ | 9/10 | 10/10 |
| 7 | Maximum Depth of N-ary Tree | https://leetcode.com/problems/maximum-depth-of-n-ary-tree/ | 7/10 | 8/10 |

---

### **Medium (8 problems)**

| # | Problem | Link | Frequency | Importance |
|---|---------|------|-----------|------------|
| 1 | Course Schedule | https://leetcode.com/problems/course-schedule/ | 10/10 | 10/10 |
| 2 | Course Schedule II | https://leetcode.com/problems/course-schedule-ii/ | 10/10 | 10/10 |
| 3 | Shortest Path with Alternating Colors | https://leetcode.com/problems/shortest-path-with-alternating-colors/ | 7/10 | 9/10 |
| 4 | Clone Graph | https://leetcode.com/problems/clone-graph/ | 10/10 | 10/10 |
| 5 | Evaluate Division | https://leetcode.com/problems/evaluate-division/ | 9/10 | 10/10 |
| 6 | Cheapest Flights Within K Stops | https://leetcode.com/problems/cheapest-flights-within-k-stops/ | 9/10 | 10/10 |
| 7 | Network Delay Time | https://leetcode.com/problems/network-delay-time/ | 8/10 | 9/10 |
| 8 | Minimum Fuel Cost to Reach Capital | https://leetcode.com/problems/minimum-fuel-cost-to-reach-capital-city/ | 7/10 | 8/10 |

---

### **Hard (5 problems)**

| # | Problem | Link | Frequency | Importance |
|---|---------|------|-----------|------------|
| 1 | Minimum Time to Visit Disappearing Nodes | https://leetcode.com/problems/minimum-time-to-visit-disappearing-nodes/ | 6/10 | 8/10 |
| 2 | Critical Connections in Network | https://leetcode.com/problems/critical-connections-in-a-network/ | 8/10 | 9/10 |
| 3 | Reconstruct Itinerary | https://leetcode.com/problems/reconstruct-itinerary/ | 9/10 | 10/10 |
| 4 | Word Ladder II | https://leetcode.com/problems/word-ladder-ii/ | 10/10 | 10/10 |
| 5 | Find All People With Secret | https://leetcode.com/problems/find-all-people-with-secret/ | 7/10 | 8/10 |

---

## SECTION 9: Codeforces Mastery

### **Rating 800 (Beginner)**

- **A. Graph Without Long Directed Paths** (Codeforces 1144A)
  - Why: Basic graph traversal, understand directed edges

### **Rating 1000**

- **B. Polycarp Training** (Codeforces 1141B)
  - Why: Simple graph counting problems

### **Rating 1200**

- **C. Good String** (Codeforces 1389A)
  - Why: Graph representation, adjacency concepts

### **Rating 1400**

- **D. Shortest Path** (Codeforces 1146D)
  - Why: BFS on graphs, shortest path intuition

### **Rating 1600**

- **E. Connected Components** (Codeforces 1133E)
  - Why: DFS/BFS for connected components, advanced graph theory

---

## SECTION 10: Contest Training

### **How to Think Under Pressure:**

1. **Read Problem Carefully:**
   - Identify if it's a graph problem (keywords: network, path, connected)
   - Determine graph type (directed/undirected, weighted/unweighted)

2. **Quick Pattern Recognition:**
   - Shortest path? → BFS (unweighted) or Dijkstra (weighted)
   - Connectivity? → DFS/BFS or Union Find
   - Dependencies? → Topological Sort
   - Cycles? → DFS with 3-state coloring

3. **Time Management:**
   - Easy graph: 5-10 minutes
   - Medium graph: 15-25 minutes
   - Hard graph: 30+ minutes

4. **Common Mistakes to Avoid:**
   - Forgetting to mark visited nodes (infinite loop)
   - Using wrong graph representation (TLE/MLE)
   - Not handling disconnected components
   - Missing edge cases (empty graph, single node)

---

## SECTION 11: Active Learning — 5 Questions

1. **Number of Provinces** — LeetCode 547  
   [Link](https://leetcode.com/problems/number-of-provinces/)

2. **Find the Town Judge** — LeetCode 997  
   [Link](https://leetcode.com/problems/find-the-town-judge/)

3. **Find if Path Exists in Graph** — LeetCode 1971  
   [Link](https://leetcode.com/problems/find-if-path-exists-in-graph/)

4. **Keys and Rooms** — LeetCode 841  
   [Link](https://leetcode.com/problems/keys-and-rooms/)

5. **Is Graph Bipartite?** — LeetCode 785  
   [Link](https://leetcode.com/problems/is-graph-bipartite/)

---

## SECTION 12: Interview Simulation

**FAANG Interviewer Mode Activated! 🎯**

**Interviewer:** "Let's start with a graph problem. You're given N cities and a list of direct connections between them. Two cities are in the same province if they're directly or indirectly connected. Find the total number of provinces."

**Candidate (You):** "So we need to find connected components in an undirected graph?"

**Interviewer:** "Exactly! How would you approach this?"

**[Your turn to explain approach...]**

**Follow-up Questions:**

1. **Clarifying:**
   - Can a city be connected to itself?
   - Is the graph guaranteed to be connected?
   - What if there are no connections?

2. **Edge Cases:**
   - Single city → 1 province
   - No connections → N provinces
   - All connected → 1 province

3. **Complexity:**
   - What's your time complexity?
   - Can you optimize space?
   - What if adjacency matrix is too large?

4. **Optimization:**
   - Can you use Union Find instead?
   - How would you parallelize this?
   - What if graph is streaming?

**Defend your solution!** 🛡️

---

## SECTION 13: Revision Notes — CHEAT SHEET

### 📝 **Graph Fundamentals Cheat Sheet**

| Concept | Java Code | Time | Space |
|---------|-----------|------|-------|
| **Adjacency List** | `List<List<Integer>>` | - | O(V+E) |
| **BFS** | `bfs(graph, start)` | O(V+E) | O(V) |
| **DFS (Recursive)** | `dfs(graph, start, visited)` | O(V+E) | O(V) |
| **DFS (Iterative)** | `dfsIterative(graph, start)` | O(V+E) | O(V) |
| **Cycle Detection** | `hasCycle(graph, visited, curr)` | O(V+E) | O(V) |
| **Connected Components** | `countComponents(graph)` | O(V+E) | O(V) |
| **Topological Sort** | `topoSort(graph)` | O(V+E) | O(V) |

**Key Patterns:**
```java
// Graph Representation
class Graph {
    int V;
    List<List<Integer>> adjList;
    
    Graph(int V) {
        this.V = V;
        adjList = new ArrayList<>();
        for (int i = 0; i < V; i++) {
            adjList.add(new ArrayList<>());
        }
    }
    
    void addEdge(int u, int v) {
        adjList.get(u).add(v);
        adjList.get(v).add(u);  // For undirected
    }
}

// BFS Template
public void bfs(Graph g, int start) {
    boolean[] visited = new boolean[g.V];
    Queue<Integer> queue = new LinkedList<>();
    visited[start] = true;
    queue.offer(start);
    
    while (!queue.isEmpty()) {
        int curr = queue.poll();
        System.out.print(curr + " ");
        
        for (int neighbor : g.adjList.get(curr)) {
            if (!visited[neighbor]) {
                visited[neighbor] = true;
                queue.offer(neighbor);
            }
        }
    }
}

// DFS Template (Recursive)
public void dfs(Graph g, int start) {
    boolean[] visited = new boolean[g.V];
    dfsHelper(g, start, visited);
}

private void dfsHelper(Graph g, int curr, boolean[] visited) {
    visited[curr] = true;
    System.out.print(curr + " ");
    
    for (int neighbor : g.adjList.get(curr)) {
        if (!visited[neighbor]) {
            dfsHelper(g, neighbor, visited);
        }
    }
}

// Cycle Detection (DFS)
public boolean hasCycle(Graph g) {
    int[] visited = new int[g.V];  // 0=unvisited, 1=visiting, 2=visited
    
    for (int i = 0; i < g.V; i++) {
        if (visited[i] == 0 && dfsCycle(g, i, visited)) {
            return true;
        }
    }
    return false;
}

private boolean dfsCycle(Graph g, int curr, int[] visited) {
    if (visited[curr] == 1) return true;  // Cycle
    if (visited[curr] == 2) return false;
    
    visited[curr] = 1;
    
    for (int neighbor : g.adjList.get(curr)) {
        if (dfsCycle(g, neighbor, visited)) {
            return true;
        }
    }
    
    visited[curr] = 2;
    return false;
}
```

---

## SECTION 14: Final Mastery Test

### **Test Questions:**

**Easy (2 problems):**
1. Find if Path Exists in Graph — LeetCode 1971
2. Keys and Rooms — LeetCode 841

**Medium (2 problems):**
1. Course Schedule — LeetCode 207
2. Clone Graph — LeetCode 133

**Hard (1 problem):**
1. Reconstruct Itinerary — LeetCode 332

**Contest-Style:**
- Solve in 90 minutes with test cases

**Interview-Style:**
- Explain approach, complexity, edge cases
- Write clean, production-ready code
- Handle follow-up questions
