import React from 'react'
import { Col, Row, Spin, Table, Empty } from 'antd'
import { getCheckInReportsColumns } from '../../../constants/tables/reports'

const TimeRangeView = ({ data, from, to, loading }) => {
  const renderContent = () => {
    if (data.length === 0) {
      return <Empty />
    }
    return <Table
      scroll={{ y: 300 }}
      dataSource={data}
      columns={getCheckInReportsColumns()}
      pagination={false}
    />
  }
  return (
    <Col span={10} className="reports-container__traffic">
      <Row justify="space-between">
        <Col>
          <h3>Fecha de llegada por persona</h3>
        </Col>
      </Row>
      <div className="chart-container">
        {loading ? <Spin /> : renderContent()}
      </div>
    </Col>
  )
}

export default TimeRangeView
