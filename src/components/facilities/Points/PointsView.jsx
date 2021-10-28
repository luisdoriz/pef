import React from 'react'

const PointsView = ({ points, walls }) => {
  const renderPoints = () => {
    return Object.values(points).map((pointItem, i) => (
      <p>{i + 1}: {pointItem.x}, {pointItem.y}</p>
    ))
  }
  const renderWalls = () => {
    return walls.map((pointItem, i) => (
      <p>{i + 1}: ({pointItem[0]}) - ({pointItem[1]}) </p>
    ))
  }
  return (
    <div className="points-container">
      <h3>Points Input</h3>
      {renderPoints()}
      <hr />
      {renderWalls()}
    </div>
  )
}

export default PointsView
