function onSegment(p,q,r)
{
     if (q.x <= Math.max(p.x, r.x) &&
            q.x >= Math.min(p.x, r.x) &&
            q.y <= Math.max(p.y, r.y) &&
            q.y >= Math.min(p.y, r.y))
        {
            return true;
        }
        return false;
}
 
// To find orientation of ordered triplet (p, q, r).
    // The function returns following values
    // 0 --> p, q and r are collinear
    // 1 --> Clockwise
    // 2 --> Counterclockwise
function orientation(p,q,r)
{
    let val = (q.y - p.y) * (r.x - q.x)
                - (q.x - p.x) * (r.y - q.y);
  
        if (val == 0)
        {
            return 0; // collinear
        }
        return (val > 0) ? 1 : 2; // clock or counterclock wise
}

function areEqual(obj1, obj2){
    return (obj1.x === obj2.x && obj1.y === obj2.y)
}
 
// The function that returns true i
    // line segment 'p1q1' and 'p2q2' intersect.
function intersect(p1,q1,p2,q2, isSameRoom, ia = false, vertices){
        
    // Find the four orientations needed for
        // general and special cases
        let o1 = orientation(p1, q1, p2); 
        let o2 = orientation(p1, q1, q2); 
        let o3 = orientation(p2, q2, p1); 
        let o4 = orientation(p2, q2, q1);
        if(!ia){
            if(isSameRoom){
                if(areEqual(p1,q2) && areEqual(q1,p2))
                    return true
                if(areEqual(p2, q1)){
                    return (o3 === 0 && o2 === 0 && onSegment(p1, q2, q1))
                }
            }
            else {  
                if(o1 === 0 && onSegment(p1, p2, q1)){
                    if((o2 === 0 && onSegment(p1, q2, q1))){
                        return false;
                    }
                    else{
                        return insideArea(vertices, q2, true);
                    }
                }
                if((o2 === 0 && onSegment(p1, q2, q1))){
                    if(areEqual(p1, q2) || areEqual(q1, q2)){
                        return false;
                    }
                    else{
                        return insideArea(vertices, p2)
                    }
                    
                }
            }
        }
        if (o1 != o2 && o3 != o4){
            return true;
        }
    
        // General case
        
  
        // Special Cases
        // p1, q1 and p2 are collinear and
        // p2 lies on segment p1q1
        if (o1 == 0 && onSegment(p1, p2, q1))
        {
            return true;
        }
  
        // p1, q1 and p2 are collinear and
        // q2 lies on segment p1q1
        if (o2 == 0 && onSegment(p1, q2, q1))
        {
            return true;
        }
  
        // p2, q2 and p1 are collinear and
        // p1 lies on segment p2q2
        if (o3 == 0 && onSegment(p2, p1, q2))
        {
            return true;
        }
  
        // p2, q2 and q1 are collinear and
        // q1 lies on segment p2q2
        if (o4 == 0 && onSegment(p2, q1, q2))
        {
            return true;
        }
  
        // Doesn't fall in any of the above cases
        return false;
}

function  insideArea(vertices, p, allowBorder = false)
{
    // There must be at least 3 vertices in polygon[]
        if (vertices.length < 3)
        {
            return false;
        }
  
        // Create a point for line segment from p to infinite
        let extreme = {x:99999, y: p.y};
  
        // Count intersections of the above line
        // with sides of polygon
        let count = 0, i = 0;
        do
        {
            let next = (i + 1) % vertices.length;
  
            // Check if the line segment from 'p' to
            // 'extreme' intersects with the line
            // segment from 'polygon[i]' to 'polygon[next]'
            if (intersect(vertices[i], vertices[next], p, extreme, false, true))
            {
                // If the point 'p' is colinear with line
                // segment 'i-next', then check if it lies
                // on segment. If it lies, return true, otherwise false
                if (orientation(vertices[i], p, vertices[next]) == 0)
                {
                    if(allowBorder){
                        return !(onSegment(vertices[i], p,
                            vertices[next]));
                    }
                    else{
                        return onSegment(vertices[i], p,
                            vertices[next]);
                    }
                }
  
                count++;
            }
            i = next;
        } while (i != 0);
        // Return true if count is odd, false otherwise
        
        return (count % 2 == 1); // Same as (count%2 == 1)
}

export {
    intersect,
    insideArea
}

export default intersect