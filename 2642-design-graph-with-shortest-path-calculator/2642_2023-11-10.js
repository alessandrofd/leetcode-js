import { MinPriorityQueue } from '@datastructures-js/priority-queue'

class Graph_Dijkstra {
    constructor(n, edges) {
        this.adjList = new Array(n).fill().map((_) => [])
        for (const [from, to, cost] of edges)
            this.adjList[from].push([to, cost])
    }

    addEdge(edge) {
        const [from, to, cost] = edge
        this.adjList[from].push([to, cost])
    }

    shortestPath(node1, node2) {
        const costForNode = new Array(this.adjList.length).fill(Infinity)
        costForNode[node1] = 0

        const pq = new MinPriorityQueue({ priority: (element) => element[1] })
        pq.enqueue([node1, 0])

        while (!pq.isEmpty()) {
            const [currNode, currCost] = pq.dequeue().element
            if (currNode === node2) return currCost
            if (currCost > costForNode[currNode]) continue

            for (const [adjNode, adjCost] of this.adjList[currNode]) {
                const newCost = currCost + adjCost
                if (newCost < costForNode[adjNode]) {
                    costForNode[adjNode] = newCost
                    pq.enqueue([adjNode, newCost])
                }
            }
        }

        return -1
    }
}

class Graph {
    constructor(n, edges) {
        this.n = n
        this.adjMatrix = new Array(n)
            .fill()
            .map((_) => new Array(n).fill(Infinity))

        for (let i = 0; i < n; i++) this.adjMatrix[i][i] = 0
        for (const [from, to, cost] of edges) this.adjMatrix[from][to] = cost

        for (let mid = 0; mid < n; mid++) {
            for (let start = 0; start < n; start++) {
                for (let end = 0; end < n; end++) {
                    this.adjMatrix[start][end] = Math.min(
                        this.adjMatrix[start][end],
                        this.adjMatrix[start][mid] + this.adjMatrix[mid][end]
                    )
                }
            }
        }
    }

    addEdge(edge) {
        const n = this.n
        const adjMatrix = this.adjMatrix
        const [from, to, cost] = edge

        for (let start = 0; start < n; start++) {
            for (let end = 0; end < n; end++) {
                adjMatrix[start][end] = Math.min(
                    adjMatrix[start][end],
                    adjMatrix[start][from] + cost + adjMatrix[to][end]
                )
            }
        }
    }

    shortestPath(node1, node2) {
        const cost = this.adjMatrix[node1][node2]
        return cost === Infinity ? -1 : cost
    }
}

const g = new Graph(4, [
    [0, 2, 5],
    [0, 1, 2],
    [1, 2, 1],
    [3, 0, 3],
])
console.log(g.shortestPath(3, 2)) // return 6
console.log(g.shortestPath(0, 3)) // return -1
g.addEdge([1, 3, 4])
console.log(g.shortestPath(0, 3)) // return 6
