import React, { useState } from 'react'
import { Col, Row, Spin, Switch, Table, Empty } from 'antd'
import { ResponsiveTimeRange } from '@nivo/calendar'
import moment from 'moment'
import { getCheckInReportsColumns } from '../../../constants/tables/reports'

const TimeRangeView = ({ data, from, to, loading }) => {
  const formatData = () => {
    const newData = {}
    data.forEach((item) => {
      const date = moment(item.CreationDate).format("YYYY-MM-DD")
      if (newData[date]) {
        newData[date] = newData[date] + 1
      } else {
        newData[date] = 1
      }
    });
    return Object.keys(newData).map((key) => ({ day: key, value: newData[key] }))
  }
  const formatedData = formatData()
  const [showTable, setShowTable] = useState(false)
  const renderChart = () => (<ResponsiveTimeRange
    data={formatedData}
    from={from}
    to={to}
    emptyColor="#eeeeee"
    colors={['#61cdbb', '#97e3d5', '#e8c1a0', '#f47560']}
    margin={{ top: 40, right: 40, bottom: 100, left: 40 }}
    dayBorderWidth={2}
    dayBorderColor="#ffffff"
    legends={[
      {
        anchor: 'bottom-right',
        direction: 'row',
        justify: false,
        itemCount: 4,
        itemWidth: 42,
        itemHeight: 36,
        itemsSpacing: 14,
        itemDirection: 'right-to-left',
        translateX: -60,
        translateY: -60,
        symbolSize: 20
      }
    ]}
  />)
  const renderContent = () => {
    if (data.length === 0) {
      return <Empty />
    }
    if (showTable) {
      return <Table
        scroll={{ y: 300 }}
        dataSource={data}
        columns={getCheckInReportsColumns()}
        pagination={false}
      />
    }
    return renderChart()
  }
  return (
    <Col span={24} className="reports-container__traffic">
      <Row justify="space-between">
        <Col>
          <h3>Fecha de llegada por persona</h3>
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

export default TimeRangeView
