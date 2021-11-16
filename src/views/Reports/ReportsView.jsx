import React from 'react'
import useReports from '../../hooks/Reports/useReports'
import { PageHeader, Row } from 'antd'
import AreaTraffic from '../../components/reports/AreaTraffic'
import HeatMap from '../../components/reports/HeatMap'
import "./styles.css"
import TimeRangeView from '../../components/reports/TimeRange/TimeRangeView'
import ReportQueryBar from '../../components/reports/ReportQueryBar'

const ReportsView = () => {
  const {
    traffic,
    heatMap,
    checkIn,
    from,
    to,
    setFrom,
    setTo,
    loading,
    facilites,
    idFacility,
    setIdFacility,
  } = useReports()
  return (
    <div className="reports-container">
      <PageHeader
        onBack={null}
        title="Reportes"
      />
      <ReportQueryBar
        from={from}
        to={to}
        setFrom={setFrom}
        setTo={setTo}
        facilites={facilites}
        idFacility={idFacility}
        setIdFacility={setIdFacility}
      />
      <Row gutter={[16, 16]} type="flex" justify="space-between">
        <AreaTraffic data={traffic} loading={loading} />
        <HeatMap data={heatMap} loading={loading} />
        <TimeRangeView from={from.format("YYYY-MM-DD")} to={to.format("YYYY-MM-DD")} data={checkIn} loading={loading} />
      </Row>
    </div>
  )
}

export default ReportsView
