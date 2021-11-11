import React, { useState } from 'react'
import { intersect, insideArea } from "../../../helpers/determineArea"
import { notification } from "antd";
import "./styles.css"
const openNotification = (type, title, message) =>
  notification[type]({
    message: title,
    description: message,
  });

const areEqual = (obj1, obj2) => {
  if (obj1 === null) {
    return false;
  }
  return (obj1.x === obj2.x && obj1.y === obj2.y)
}

const BluePrintMapView = ({ point, setCurrentPoint, points, setPoints, walls, setWalls, rooms, setAddRoomVisible, setRooms, currentRoom, setCurrentRoom, sizeX, sizeY, addingGateways, gateways, setGateways }) => {

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
    const preX = ((x - left) / height) * sizeX
    const preY = ((height - (y - top)) / height) * sizeY
    const decimalX = Math.round(preX * 10) / 10
    const decimalY = Math.round(preY * 10) / 10
    if (!addingGateways) {
      let formattedX = decimalX
      let formattedY = decimalY
      if (decimalX % 1 !== 0.5) {
        if (Math.round((decimalX % 1) * 10) / 10 == 0.4 || Math.round((decimalX % 1) * 10) / 10 == 0.6) {
          formattedX = parseFloat(decimalX.toString().replace(/.$/, '5'));
        }
        else {
          formattedX = Math.round(decimalX)
        }
      }
      if (decimalY % 1 !== 0.5) {
        if (Math.round((decimalY % 1) * 10) / 10 == 0.4 || Math.round((decimalY % 1) * 10) / 10 == 0.6) {
          formattedY = parseFloat(decimalY.toString().replace(/.$/, '5'));
        }
        else {
          formattedY = Math.round(decimalY)
        }
      }


      const coords = { x: formattedX, y: formattedY }
      let prevPoint = null;
      if (point !== null) {
        prevPoint = currentRoom.vertices[point]
      }
      const newPoints = points
      const points_array = Object.values(newPoints)
      let id = points_array.length + 1
      const matchingIndex = points_array.findIndex((c) => c.x === coords.x & c.y === coords.y)
      if (matchingIndex === 0 && points_array.length >= 3)
        finalPoint = true;
      let isSameRoom = false;
      rooms.map((room, i) => {
        if (i === rooms.length - 1) {
          isSameRoom = true
        }
        if (prevPoint === null && insideArea(Object.values(room.vertices), coords)) {
          firstPointInvalid = true;
        }
        Object.values(room.edges).map((wall, i) => {
          if (room.vertices1 !== [] && prevPoint && !(finalPoint && isSameRoom && i === 0)) {
            const bool = intersect(room.vertices[wall[0]], room.vertices[wall[1]], prevPoint, coords, isSameRoom, false, Object.values(room.vertices))
            if (bool === true)
              intersects = bool;

            return bool;
          }
        }
        )
      })
      if (!firstPointInvalid && !intersects && !areEqual(prevPoint, coords) || (matchingIndex === 0 && points_array.length >= 3 && !intersects)) {
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
        if (matchingIndex === 0 && points_array.length >= 3) {
          let newRooms = rooms;
          newRooms.push({ vertices: [], edges: [] });
          setRooms(newRooms);
          setPoints({});
          setWalls([]);
          setCurrentPoint(null);
          setAddRoomVisible(true);
        }
        else {
          let newRoom = currentRoom;
          newRoom = { vertices: points, edges: walls };
          setCurrentRoom(newRoom);
          let newRooms = rooms;
          if (rooms.length > 0) {
            newRooms[rooms.length - 1] = newRoom;
          }
          else {
            newRooms.push(newRoom);
          }
          setRooms(newRooms);
        }
      }
      else {
        openNotification(
          "error",
          "Punto no válido",
          "El punto que ingresó no es válido, revise que no intersecte otras paredes o esté dentro de otras áreas"
        );
      }
    }
    else {
      const coords = { x: decimalX, y: decimalY }
      const matchingIndex = gateways?.findIndex((c) => c.x === coords.x & c.y === coords.y)
      if (insideArea(Object.values(currentRoom.vertices), coords) && matchingIndex === -1) {
        let newGateways = [...gateways];
        newGateways.push(coords);
        setGateways(newGateways);
      }
      else {
        if (!gateways) {
          let newGateways = [];
          newGateways.push(coords);
          setGateways(newGateways);
        }
        else{
          openNotification(
            "error",
            "Punto no válido",
            "El punto que ingresó no está dentro del área actual"
          );
        }
      }
    }
  }
  return (
    <div className="blueprint-container">
      <svg height="100%" width="100%" onClick={printCoordinates} viewBox="0 0 401 401">
        {rooms.map((room, i) => (
          <>
            {Object.values(room.vertices).map(({ x, y }) => (<circle cx={`${(x * (100 / sizeX))}%`} cy={`${(100 - (y * (100 / sizeY)))}%`} r="2" fill="black" />))}
            {Object.values(room.edges).map((wall) => (
              <line
                x1={`${room.vertices[wall[0]].x * (100 / sizeX)}%`}
                y1={`${100 - (room.vertices[wall[0]].y * (100 / sizeY))}%`}
                x2={`${room.vertices[wall[1]].x * (100 / sizeX)}%`}
                y2={`${100 - (room.vertices[wall[1]].y * (100 / sizeY))}%`}
                style={{ stroke: colors[i % colors.length], strokeWidth: 2 }}
              />
            ))}
          </>
        ))}
        {gateways?.map((gateway) => (
          <circle className="bluePoint" cx={`${(gateway.x * (100 / sizeX))}%`} cy={`${(100 - (gateway.y * (100 / sizeY)))}%`} r="2" />
        ))}
        <defs>
          <pattern id="grid" width={`${400 / sizeX}`} height={`${400 / sizeY}`} patternUnits="userSpaceOnUse">
            <rect width="40" height="40" fill="none" />
            <path d={`M ${400 / sizeX} 0 L 0 0 0 ${400 / sizeY}`} fill="none" stroke="gray" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    </div>
  )
}

export default BluePrintMapView
