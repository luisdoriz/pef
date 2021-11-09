import React, { useState } from 'react'
import { intersect, insideArea } from "../../../helpers/determineArea"
import { notification } from "antd";

const openNotification = (type, title, message) =>
  notification[type]({
    message: title,
    description: message,
  });

const areEqual = (obj1, obj2) => {
    if(obj1 === null){
      return false;
    }
    return (obj1.x === obj2.x && obj1.y === obj2.y)
}

const BluePrintMapView = ({ range, points, setPoints, walls, setWalls, rooms, setAddRoomVisible, setRooms, currentRoom, setCurrentRoom }) => {
  const [point, setCurrentPoint] = useState(null);
  const colors = ["#FF0000", "#FF00FB", "#1B00FF", "#00E0FF", "#FF9700", "#008C0D"];
  // if (points.length === 0) {
  //   return null
  // }
  const printCoordinates = (e) => {
    let intersects = false;
    let firstPointInvalid = false;
    let finalPoint = false;
    const { clientX: x, clientY: y } = e
    const rect = e.target.getBoundingClientRect()
    const { left, top, height } = rect
    const formattedX = Math.round(((x - left) / height) * range)
    const formattedY = Math.round(((height - (y - top)) / height) * range)
    const coords = { x: formattedX, y: formattedY }
    let prevPoint = null;
    if(point !== null){
      prevPoint = currentRoom.vertices[point]
    }
    const newPoints = points
    const points_array = Object.values(newPoints)
    let id = points_array.length + 1
    const matchingIndex = points_array.findIndex((c) => c.x === coords.x & c.y === coords.y)
    if(matchingIndex === 0 && points_array.length >= 3)
      finalPoint = true;
    let isSameRoom = false;
    rooms.map((room, i) => {
      if(i === rooms.length-1){
        isSameRoom = true
      }
      if( prevPoint  === null && insideArea(Object.values(room.vertices), coords)){
        firstPointInvalid = true;
      }
      Object.values(room.edges).map(( wall, i ) => {
        if(room.vertices1 !== [] && prevPoint && !(finalPoint && isSameRoom && i === 0)){
          const bool = intersect(room.vertices[wall[0]],room.vertices[wall[1]], prevPoint, coords, isSameRoom, false, Object.values(room.vertices))
          if(bool === true)
            intersects = bool;
          
          return bool;
          }
      }
      )
    })
    if(!firstPointInvalid && !intersects && !areEqual(prevPoint, coords) || (matchingIndex === 0 && points_array.length >= 3 && !intersects)){
      if (matchingIndex === -1) {
        newPoints[id] = coords
        setPoints(newPoints)
      } else {
          id = matchingIndex + 1
      }

      if (point === null) {
        setCurrentPoint(id)
      } else {
          const wall = [point, id]
          setCurrentPoint(id)
          const newWalls = walls
          newWalls.push(wall)
          if (
            newWalls.filter((wallItem) => (
              wallItem.includes(point) & wallItem.includes(id)
            ))
              .length === 0) {
            newWalls.push(wall)
            setWalls(newWalls)
          }
      }
      if(matchingIndex === 0 && points_array.length >= 3 ){
        let newRooms = rooms;
        newRooms.push({name:"Área actual", vertices:[], edges: []});
        setRooms(newRooms);
        setPoints({});
        setWalls([]);
        setCurrentPoint(null);
        setAddRoomVisible(true);
        setCurrentRoom([])
        
      }
      else{
        let newRoom = currentRoom;
        newRoom = { vertices: points, edges: walls};
        setCurrentRoom(newRoom);
        let newRooms = rooms;
        if(rooms.length > 0){
          newRooms[rooms.length-1] = newRoom;
        }
        else{
          newRooms.push(newRoom);
        }
        setRooms(newRooms);
      }
    } 
    else{
      openNotification(
        "error",
        "Punto no válido",
        "El punto que ingresó no es válido, revise que no intersecte otras paredes o esté dentro de otras áreas"
      );
    }
  }
  return (
    <div className="blueprintmap-container">
      <svg height="100%" width="100%" onClick={printCoordinates} viewBox="0 0 400 400">
        {rooms.map((room, i) => (
          <>
          {Object.values(room.vertices).map(({ x, y }) => (<circle cx={`${(x * range)}%`} cy={`${(100 - (y * range))}%`} r="2" fill="black" />))}
          {Object.values(room.edges).map(( wall ) => (
            <line
              x1={`${room.vertices[wall[0]].x * range}%`}
              y1={`${100 - (room.vertices[wall[0]].y * range)}%`}
              x2={`${room.vertices[wall[1]].x * range}%`}
              y2={`${100 - (room.vertices[wall[1]].y * range)}%`}
              style={{ stroke: colors[i % colors.length], strokeWidth: 2 }}
            />
          ))}
          </>
        ))}
        <defs>
          <pattern id="smallGrid" width="8" height="8" patternUnits="userSpaceOnUse">
            <path d="M 8 0 L 0 0 0 8" fill="none" stroke="gray" stroke-width="0.5" />
          </pattern>
          <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
            <rect width="80" height="80" fill="url(#smallGrid)" />
            <path d="M 80 0 L 0 0 0 80" fill="none" stroke="gray" stroke-width="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    </div>
  )
}

export default BluePrintMapView
