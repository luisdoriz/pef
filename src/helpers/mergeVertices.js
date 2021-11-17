function cross(o, a, b) {
    return (a.x - o.x) * (b.y - o.y) - (a.y - o.y) * (b.x - o.x)
}

function slope(pt1, pt2) {
    return ((pt2.y - pt1.y) / (pt2.x - pt1.x))
}

function sortCoords(coords) {
    let newArray = [];
    if (coords[0].x > coords[1].x) {
        newArray[0] = coords[1];
        newArray[1] = coords[0];
    }
    else if (coords[0].x === coords[1].x) {
        if (coords[0].y > coords[1].y) {
            newArray[0] = coords[1];
            newArray[1] = coords[0];
        }
        else {
            newArray = coords
        }
    }
    else {
        newArray = coords
    }
    return newArray
}

const areEqual = (obj1, obj2) => {
    if (obj1 === null) {
        return false;
    }
    return (obj1.x === obj2.x && obj1.y === obj2.y)
}

function mergeVertices(segmentA, segmentB) {
    const sortedA = sortCoords(segmentA)
    const sortedB = sortCoords(segmentB)

    let segments = []
    const firstPt = sortCoords([sortedA[0], sortedB[0]])
    if (firstPt[0] === sortedA[0]) {
        segments[0] = sortedA
        segments[1] = sortedB
    } else {
        segments[0] = sortedB
        segments[1] = sortedA
    }
    const A = segments[0]
    const B = segments[1]
    if (areEqual(A[1], B[0])) {
        if (slope(A[0], A[1]) === slope(B[0], B[1])) {
            return ([A[0], B[1]])
        } else {
            return false
        }
    }
    if (cross(A[0], A[1], B[1]) == 0 && cross(A[0], B[0], B[1]) == 0) {
        const secondPt = sortCoords([A[1],B[0]])
        if (secondPt[1] === A[1]) {
            return ([A[0], B[1]])
        }
    }
    return false
}
export {
    mergeVertices
}

export default mergeVertices