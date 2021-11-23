/* eslint-disable no-template-curly-in-string */
import React, { Component } from 'react'
import { Modal, Form, Button, Select, Row, Col, notification } from 'antd';
import getFacilities from '../../../data/facilities';
import getAvailableBeacons from '../../../data/beacons';
import { getEmployees, putEmployeeBeacon } from '../../../data/employees';
import moment from 'moment';

const { Option } = Select;

const validateMessages = {
  required: '¡${label} es requerido!',
  pattern: '${label} no tiene el formato correcto.',
  types: {
    email: '¡${label} no es un correo válido!',
  },
};

const initialState = {
  beacons: [],
  facilities: [],
  employees: [],
  currentFacility: null,
  employee: null,
  employeeBeacon: null,
}

class ReassginBeacon extends Component {
  formRef = React.createRef();
  constructor(props) {
    super(props)

    this.state = initialState
  }

  componentDidUpdate = (prevProps) => {
    const { visible } = this.props;
    if (visible && prevProps.visible === false) {
      this.setBeacons()
      this.setFacilites()
      this.setEmployees()
    }
  }

  setFacilites = async () => {
    const { data } = await getFacilities()
    this.setState({ facilities: data })
  }

  setBeacons = async () => {
    const { data } = await getAvailableBeacons()
    this.setState({ beacons: data })
  }

  setEmployees = async () => {
    const { data } = await getEmployees()
    this.setState({ employees: data })
  }

  setSelectedFacility = (value) => {
    this.setState({ currentFacility: value })
  }

  onChangeFacility = (facility) => {
    this.setState({
      currentFacility: facility,
      employeeBeacon: null,
      employee: null,
    })
    this.formRef.current.setFieldsValue({
      idBeacon: null,
      idEmployees: null,
    })
  }

  onChangeEmployee = (idEmployee) => {
    const { employees } = this.state;
    const employee = employees.find((item) => item.idEmployee === idEmployee)
    const { idBeacon, macAddress, idFacility } = employee

    this.setState({ employee, employeeBeacon: { idBeacon, macAddress, idFacility } })
    this.formRef.current.setFieldsValue({ idBeacon: idBeacon })
  }

  onReset = () => {
    const { onClose } = this.props;
    onClose()
    this.setState(initialState)
    this.formRef.current.resetFields();
  };

  onCancel = () => {
    this.onReset()
  }

  onFinish = async ({ idBeacon }) => {
    const { employee: { idPerson, name, lastNames } } = this.state
    const data = { idPerson, isActive: 1, idBeacon }
    const { createAlert } = this.props;
    try {
      await putEmployeeBeacon(data)
      const date = moment().format("YYYY-MM-DD");
      const fullName = name + ' ' + lastNames
      const payload = `${fullName} olvidó su credencial el día ${date}`
      createAlert({ idPerson: data.idPerson, payload: payload, date: date })
      this.onReset()
      notification.success({
        message: "Éxito",
        description: "Se reasignó el beacon al empleado de forma correcta.",
      })
    } catch {
      notification.error({
        message: "Error",
        description: "Ocurrió un error, favor de intentarlo de nuevo.",
      })
    }
  };


  render() {
    const { visible } = this.props;
    const {
      facilities,
      beacons: beaconsData,
      employees,
      currentFacility,
      employeeBeacon
    } = this.state;
    let beacons = [...beaconsData]
    if (employeeBeacon !== null) {

      beacons.push(employeeBeacon)
    }
    return (
      <Modal footer={null} title="Reasignar beacon" visible={visible} onCancel={this.onCancel}>
        <Form ref={this.formRef} layout="vertical" onFinish={this.onFinish} validateMessages={validateMessages}>
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item name="idFacility" label="Edificio" rules={[{ required: true, }]}>
                <Select
                  showSearch
                  placeholder="Selecciona el edificio"
                  allowClear
                  onChange={this.onChangeFacility}
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {facilities.map(({ idFacility, name }) => (
                    <Option value={idFacility}>{name}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="idEmployees" label="Empleados" rules={[{ required: true, }]}>
                <Select
                  showSearch
                  onChange={this.onChangeEmployee}
                  disabled={!currentFacility}
                  placeholder="Selecciona el empleado"
                  allowClear
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {employees.filter((employee) => currentFacility === null || currentFacility === employee.idFacility).map(({ idEmployee, name, lastNames }) => (
                    <Option value={idEmployee}>{`${name} ${lastNames}`}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="idBeacon" label="Beacon" rules={[{ required: true, }]}>
                <Select
                  showSearch
                  disabled={!employeeBeacon}
                  placeholder="Selecciona el beacon"
                  allowClear
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {beacons.filter((beacon) => currentFacility === null || currentFacility === beacon.idFacility).map(({ idBeacon, macAddress }) => (
                    <Option value={idBeacon}>{macAddress}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={24} style={{
              textAlign: 'right',
            }}
            >
              <Form.Item>
                <Button
                  style={{
                    margin: '0 8px',
                  }}
                  type="button" shape="round" onClick={this.onReset}>
                  Cancelar
                </Button>
                <Button type="primary" shape="round" htmlType="submit">
                  Guardar
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    )
  }
}

export default ReassginBeacon
