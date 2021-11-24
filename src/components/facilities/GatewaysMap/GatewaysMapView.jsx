import React from 'react'
import { insideArea } from "../../../helpers/determineArea"
import { notification } from "antd";
import "./styles.css"
const openNotification = (type, title, message) =>
  notification[type]({
    message: title,
    description: message,
  });


const GatewaysMapView = ({ sizeX, sizeY, area, gatewayPosition, setGatewayPosition, gateways }) => {
  const printCoordinates = (e) => {
    const { clientX: x, clientY: y } = e
    const rect = e.target.getBoundingClientRect()
    const { left, top, height } = rect
    const preX = ((x - left) / height) * sizeX
    const preY = ((height - (y - top)) / height) * sizeY
    const decimalX = Math.round(preX * 10) / 10
    const decimalY = Math.round(preY * 10) / 10
    const coords = { x: decimalX, y: decimalY }
    const matchingIndex = gateways?.findIndex((c) => c.x === coords.x & c.y === coords.y)
    let objectVertices = [];
    area.vertices.forEach((vertex) => {
      objectVertices.push({ x: vertex[0], y: vertex[1] });
    })
    if (insideArea(objectVertices, coords) && (!gatewayPosition || matchingIndex === -1)) {
      setGatewayPosition(coords);
    }
    else {
      openNotification(
        "error",
        "Punto no válido",
        "El punto que ingresó no está dentro del área seleccionada"
      );
    }
  }
  return (
    <div className="blueprint-container" style={{ height: 550 }}>
      <svg height="100%" width="100%" onClick={printCoordinates} viewBox="0 0 401 401">
        {area.vertices.map((coord, i) => (
          (i < area.vertices.length - 1) ?
          <line
            x1={`${coord[0] * (100 / sizeX)}%`}
            y1={`${100 - (coord[1] * (100 / sizeY))}%`}
            x2={`${area.vertices[i + 1][0] * (100 / sizeX)}%`}
            y2={`${100 - (area.vertices[i + 1][1] * (100 / sizeY))}%`}
            style={{ stroke: 'red', strokeWidth: 2 }}
          /> :
          <line
            x1={`${coord[0] * (100 / sizeX)}%`}
            y1={`${100 - (coord[1] * (100 / sizeY))}%`}
            x2={`${area.vertices[0][0] * (100 / sizeX)}%`}
            y2={`${100 - (area.vertices[0][1] * (100 / sizeY))}%`}
            style={{ stroke: 'red', strokeWidth: 2 }}
          />
        ))}
        {gatewayPosition &&
          <circle className="bluePoint" cx={`${(gatewayPosition.x * (100 / sizeX))}%`} cy={`${(100 - (gatewayPosition.y * (100 / sizeY)))}%`} r="3" />
        }
        {gateways?.map((gateway) => (
          <circle className="darkBluePoint" cx={`${(gateway.x * (100 / sizeX))}%`} cy={`${(100 - (gateway.y * (100 / sizeY)))}%`} r="2" />
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

export default GatewaysMapView
