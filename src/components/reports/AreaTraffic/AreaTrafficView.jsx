import React, { useState } from 'react'
import { Col, Row, Spin, Switch, Table, Empty } from 'antd'
import { ResponsivePie } from '@nivo/pie'
import getAreasTrafficReportsColumns from '../../../constants/tables/reports'

const AreaTrafficView = ({ data, loading }) => {
  const formatData = () => data.map(({ idArea, name, count }) => ({
    id: name,
    key: idArea,
    label: name,
    value: count,
  }));
  const [showTable, setShowTable] = useState(false)
  const renderChart = (formattedData) => (<ResponsivePie
    title="title"
    data={formattedData}
    margin={{ top: 40, right: 40, bottom: 80, left: 80 }}
    innerRadius={0.5}
    padAngle={2}
    cornerRadius={10}
    activeOuterRadiusOffset={8}
    colors={{ scheme: 'category10' }}
    borderWidth={1}
    borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
    enableArcLinkLabels={false}
    arcLabelsSkipAngle={10}
    // arcLabelsTextColor={{ from: 'color', modifiers: [['darker', 2]] }}
    motionConfig="wobbly"
    arcLabelsTextColor="white"
    legends={[
      {
        anchor: 'left',
        direction: 'column',
        justify: false,
        translateX: -80,
        translateY: -30,
        itemsSpacing: 0,
        itemWidth: 72,
        itemHeight: 34,
        itemTextColor: '#999',
        itemDirection: 'left-to-right',
        itemOpacity: 1,
        symbolSize: 14,
        symbolShape: 'circle',

        effects: [
          {
            on: 'hover',
            style: {
              itemTextColor: '#000'
            }
          }
        ]
      }
    ]}
  />)
  const renderContent = () => {
    if (data.length === 0) {
      return <Empty />
    }
    const formattedData = formatData()

    if (showTable) {
      return <Table
        scroll={{ y: 300 }}
        dataSource={formattedData}
        columns={getAreasTrafficReportsColumns()}
        pagination={false}
      />
    }
    return renderChart(formattedData)
  }
  return (
    <Col span={10} className="reports-container__traffic">
      <Row justify="space-between">
        <Col>
          <h3>Tráfico de personas por área</h3>
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

export default AreaTrafficView
