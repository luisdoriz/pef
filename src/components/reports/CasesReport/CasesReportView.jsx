import React, { useState } from 'react'
import { Col, Row, Spin, Switch, Table, Empty } from 'antd'
import { ResponsiveBar } from '@nivo/bar'
import { getCasesReportColumns } from '../../../constants/tables/reports'
import moment from 'moment'

const CasesReportView = ({
  casesReport,
  casesReportData,
  loading,
}) => {
  const [showTable, setShowTable] = useState(false)
  console.log(casesReport)
  const renderChart = () => (<ResponsiveBar
    data={casesReport
      .map(({ CreationDate, count }) => ({
        CreationDate: moment(CreationDate).format("YYYY-MM-DD"),
        [moment(CreationDate).format("YYYY-MM-DD")]: count,
      })
      )}
    keys={casesReport
      .map(({ CreationDate }) => moment(CreationDate).format("YYYY-MM-DD"))
    }
    indexBy="CreationDate"
    margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
    padding={0.2}
    valueScale={{ type: 'linear' }}
    indexScale={{ type: "band", round: true }}
    colors={{ scheme: 'category10' }}
    axisTop={null}
    axisRight={null}
    axisBottom={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: 'Semanas',
      legendPosition: 'middle',
      legendOffset: 32
    }}
    axisLeft={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: 'Frecuencia',
      legendPosition: 'middle',
      legendOffset: -40,
      format: e => Math.floor(e) === e && e,
    }}
    enableLabel={false}
    legends={[]}
    motionConfig="wobbly"
    role="application"
  />)
  const renderContent = () => {
    if (casesReportData.length === 0) {
      return <Empty />
    }
    if (showTable) {
      return <Table
        scroll={{ y: 300 }}
        dataSource={casesReportData}
        columns={getCasesReportColumns()}
        pagination={false}
      />
    }
    return renderChart()
  }
  return (
    <Col span={13} className="reports-container__traffic">
      <Row justify="space-between">
        <Col>
          <h3>Casos de COVID-19</h3>
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

export default CasesReportView
