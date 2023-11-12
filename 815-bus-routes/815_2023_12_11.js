const numBusesToDestination_routesGraph = (routes, source, target) => {
    if (source === target) return 0

    const routesByStop = new Map()
    const routesGraph = new Map()

    const n = routes.length

    for (const [route, stops] of routes.entries()) {
        for (const stop of stops) {
            if (!routesByStop.has(stop)) routesByStop.set(stop, [])
            routesByStop.get(stop).push(route)
        }
    }

    if (!routesByStop.has(source) || !routesByStop.has(target)) return -1

    for (const [route, stops] of routes.entries()) {
        if (!routesGraph.has(route)) routesGraph.set(route, new Set())
        const connectedRoutes = routesGraph.get(route)
        for (const stop of stops) {
            for (const connectedRoute of routesByStop.get(stop)) {
                if (connectedRoute === route) continue
                connectedRoutes.add(connectedRoute)
            }
        }
    }

    const targetRoutes = routesByStop.get(target)
    const queue = [...routesByStop.get(source)]

    let buses = 0
    const visited = new Set()

    while (queue.length > 0) {
        const queueLength = queue.length
        buses += 1
        for (let i = 0; i < queueLength; i++) {
            const route = queue.shift()

            if (visited.has(route)) continue
            visited.add(route)

            if (targetRoutes.includes(route)) return buses

            for (const connectedRoute of routesGraph.get(route))
                queue.push(connectedRoute)
        }
    }

    return -1
}

const numBusesToDestination = (routes, source, target) => {
    if (source === target) return 0

    const routesByStop = new Map()

    for (const [route, stops] of routes.entries()) {
        for (const stop of stops) {
            if (!routesByStop.has(stop)) routesByStop.set(stop, [])
            routesByStop.get(stop).push(route)
        }
    }

    if (!routesByStop.has(source) || !routesByStop.has(target)) return -1

    const queue = [...routesByStop.get(source)]

    let buses = 0
    const visitedRoute = new Set()
    const visitedStop = new Set()

    while (queue.length > 0) {
        const queueLength = queue.length
        buses += 1
        for (let i = 0; i < queueLength; i++) {
            const route = queue.shift()

            for (const stop of routes[route]) {
                if (stop === target) return buses

                if (visitedStop.has(stop)) continue
                visitedStop.add(stop)

                for (const connectedRoute of routesByStop.get(stop)) {
                    if (visitedRoute.has(connectedRoute)) continue
                    visitedRoute.add(connectedRoute)

                    queue.push(connectedRoute)
                }
            }
        }
    }

    return -1
}

// prettier-ignore
const funcs = [
    numBusesToDestination,
]

// prettier-ignore
const data = [
    [[[1,2,7],[3,6,7]], 1, 6, 2],
    [[[7,12],[4,5,15],[6],[15,19],[9,12,13]], 15, 12, -1],
    [[[1,7],[3,5]], 5, 5, 0]
]

for (const func of funcs) {
    for (const [routes, source, target, expected] of data) {
        console.log(func(routes, source, target) === expected)
    }
}

/**
 * @param {number[][]} routes
 * @param {number} source
 * @param {number} target
 * @return {number}
 */
var numBusesToDestination_ = function (routes, source, target) {
    const graph = new Map()
    for (const [k, v] of routes.entries()) {
        for (const stop of v) {
            if (!graph.has(stop)) graph.set(stop, [])
            graph.get(stop).push(k)
        }
    }

    if (!graph.has(source) || !graph.has(target)) return -1
    if (target === source) return 0

    const visitedBus = new Set()
    const visitedStop = new Set()

    const q = []
    for (const bus of graph.get(source)) {
        q.push(bus)
        visitedBus.add(bus)
    }

    let cost = 1

    while (q.length) {
        const len = q.length
        for (let i = 0; i < len; ++i) {
            const cur = q.shift()
            for (const s of routes[cur]) {
                if (s === target) {
                    return cost
                }
                if (graph.has(s) && !visitedStop.has(s)) {
                    visitedStop.add(s)
                    for (const b of graph.get(s)) {
                        if (!visitedBus.has(b)) {
                            q.push(b)
                            visitedBus.add(b)
                        }
                    }
                }
            }
        }
        cost++
    }
    return -1
}
