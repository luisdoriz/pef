import React from 'react'
import { Spin, Popover } from "antd"
import { LoadingOutlined } from '@ant-design/icons';
import moment from 'moment';


const FacilityMapView = ({
  loading,
  areas,
  positions,
}) => {
  if (loading) {
    const antIcon = (<LoadingOutlined style={{ fontSize: 24 }} spin />);
    return (
      <Spin indicator={antIcon} />
    )
  }
  const { facilitySizeX: sizeX, facilitySizeY: sizeY } = areas[0]
  const renderContent = (from, to) => (
    <div>
      <p> Desde:{moment(from).format("HH:MM a")}</p>
      <p> Hasta: {moment(to).format("HH:MM a")}</p>
    </div>
  )
  const colors = ["#FF0000", "#FF00FB", "#1B00FF", "#00E0FF", "#FF9700", "#008C0D"];
  return (
    <div className="blueprint-container" style={{ height: "80%" }}>
      <svg height="100%" width="100%" viewBox="0 0 401 401">
        {areas.map(({ vertices }, i) => vertices
          .map(({ vertices }) => {
            const len = vertices.length
            const color = colors[i % colors.length]
            return vertices.map((coords, i) => {
              const wall = [coords]
              if (i === len - 1) {
                wall.push(vertices[0])
              } else {
                wall.push(vertices[i + 1])
              }
              return (
                <line
                  x1={`${wall[0][0] * (100 / sizeX)}%`}
                  y1={`${100 - (wall[0][1] * (100 / sizeY))}%`}
                  x2={`${wall[1][0] * (100 / sizeX)}%`}
                  y2={`${100 - (wall[1][1] * (100 / sizeY))}%`}
                  style={{ stroke: color, strokeWidth: 2 }}
                />)

            })
          }
          )
        )
        }
        <defs>
          <pattern id="grid" width={`${400 / sizeX}`} height={`${400 / sizeY}`} patternUnits="userSpaceOnUse">
            <rect width="40" height="40" fill="none" />
            <path d={`M ${400 / sizeX} 0 L 0 0 0 ${400 / sizeY}`} fill="none" stroke="gray" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
        {
          positions.map(({
            x,
            y,
            name,
            firstLastName,
            secondLastName,
            from,
            to
          }) => (
            <Popover
              placement="top"
              title={`${name} ${firstLastName} ${secondLastName}`}
              trigger="click"
              content={() => renderContent(from, to)}
            >
              <circle
                cx={`${(x * (100 / sizeX))}%`}
                cy={`${(100 - (y * (100 / sizeY)))}%`}
                r="3"
                fill="red"
              />
            </Popover>
          ))
        }
      </svg>
    </div >
  )
}

export default FacilityMapView