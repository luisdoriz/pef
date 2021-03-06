import React, { useState } from 'react'
import { Col, Row, Spin, Switch, Table, Empty } from 'antd'
import { ResponsiveHeatMap } from '@nivo/heatmap'
import { getHeatMapReportsColumns } from '../../../constants/tables/reports'

const HeatMapView = ({ data, loading }) => {
  const formatData = () => {
    const newData = {}
    const areas = {}
    data.forEach((item) => {
      areas[item.name] = 1
      if (newData[item.personName]) {
        const newDataInstance = newData[item.personName][item.name]
        if (newDataInstance) {
          newData[item.personName][item.name] = newDataInstance + Number(item.count)
        } else {
          newData[item.personName][item.name] = Number(item.count)
        }
      } else {
        newData[item.personName] = {
          [item.name]: Number(item.count)
        }
      }
    });
    return [Object.keys(newData).map((key) => ({ person: key, ...newData[key] })), Object.keys(areas)]
  }
  const [formatedData, areas] = formatData()
  const [showTable, setShowTable] = useState(false)

  const renderChart = () => (<ResponsiveHeatMap
    data={formatedData}
    keys={areas}
    indexBy="person"
    margin={{ top: 60, right: 30, bottom: 30, left: 30 }}
    forceSquare={true}
    colors={['#86c9ca', '#77C9CB', '#2A96C1', '#14a1da', '#4d4e9c', '#31327A']}
    colorBy="index"
    axisTop={{ orient: 'top', tickSize: 5, tickPadding: 5, tickRotation: -90, legend: '', legendOffset: 36 }}
    axisRight={null}
    axisBottom={null}
    axisLeft={{
      orient: 'left',
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: 'Personas',
      legendPosition: 'middle',
      legendOffset: -40
    }}
    cellOpacity={1}
    cellBorderWidth={3}
    cellBorderColor={{ from: 'color', modifiers: [['darker', '0.5']] }}
    labelTextColor="white"
    defs={[
      {
        id: 'lines',
        type: 'patternLines',
        background: 'inherit',
        color: 'rgba(0, 0, 0, 0.1)',
        rotation: -45,
        lineWidth: 4,
        spacing: 7
      }
    ]}
    fill={[{ id: 'lines' }]}
    animate={true}
    motionConfig="wobbly"
    motionStiffness={80}
    motionDamping={9}
    hoverTarget="cell"
    cellHoverOthersOpacity={0.25}
  />)
  const renderContent = () => {
    if (data.length === 0) {
      return <Empty />
    }
    if (showTable) {
      return <Table
        scroll={{ y: 300 }}
        dataSource={data}
        columns={getHeatMapReportsColumns()}
        pagination={false}
      />
    }
    return renderChart()
  }
  return (
    <Col span={13} className="reports-container__traffic">
      <Row justify="space-between">
        <Col>
          <h3>Frecuencia de visitas a ??rea por persona</h3>
        </Col>
        <Col>
          <Switch checked={showTable} onChange={setShowTable} />
        </Col>
      </Row>
      <div className="chart-container">
        {loading ? <Spin /> : renderContent()}
      </div>
    </Col>
  )
}

export default HeatMapView
