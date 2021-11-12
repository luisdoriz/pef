import { Col, DatePicker, Row, Select } from 'antd'
import moment from 'moment'
import React from 'react'
const { RangePicker } = DatePicker;
const { Option } = Select;

const ReportQueryBarView = ({
  from,
  to,
  setFrom,
  setTo,
  facilites,
  idFacility,
  setIdFacility,
}) => {
  const disableDateTime = (current) => current && current >= moment()
  const onChange = (dates) => {
    setFrom(dates[0])
    setTo(dates[1])
  }
  return (
    <Row style={{ marginBottom: 20 }}>
      <Col span={7}>
        <RangePicker
          value={[from, to]}
          onChange={onChange}
          disabledDate={disableDateTime}
          disabledTime={disableDateTime}
        />
      </Col>
      <Col span={8}>
        <Select
          onChange={setIdFacility}
          value={idFacility}
        >
          {facilites.map(({ idFacility, name }) => (
            <Option value={idFacility}>{name}</Option>
          ))}
        </Select>
      </Col>
    </Row>
  )
}

export default ReportQueryBarView
