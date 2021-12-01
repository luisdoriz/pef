import React from 'react'
import useReports from '../../hooks/Reports/useReports'
import { PageHeader, Row } from 'antd'
import AreaTraffic from '../../components/reports/AreaTraffic'
import HeatMap from '../../components/reports/HeatMap'
import TimeRange from '../../components/reports/TimeRange'
import ReportQueryBar from '../../components/reports/ReportQueryBar'
import CasesReport from '../../components/reports/CasesReport'
import TimeSpent from '../../components/reports/TimeSpent'
import "./styles.css"

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
    casesReport,
    casesReportData,
    timeSpent,
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
        <TimeRange from={from.format("YYYY-MM-DD")} to={to.format("YYYY-MM-DD")} data={checkIn} loading={loading} />
        <TimeSpent data={timeSpent} loading={loading} />
        <CasesReport
          casesReport={casesReport}
          casesReportData={casesReportData}
          loading={loading}
        />
      </Row>
    </div>
  )
}

export default ReportsView
