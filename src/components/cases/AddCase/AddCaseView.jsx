/* eslint-disable no-template-curly-in-string */
import React, { Component } from 'react'
import { Modal, Form, DatePicker, Input, Button, Select, Row, Col } from 'antd';
import moment from 'moment'

const { Option, OptGroup } = Select;

const validateMessages = {
  required: '¡${label} es requerido!',
  pattern: '${label} no tiene el formato correcto.',
  types: {
    email: '¡${label} no es un correo válido!',
  },
};

class AddCaseView extends Component {
  formRef = React.createRef();
  constructor(props) {
    super(props)
  
    this.state = {
       selectedFacility: null
    }
  }

  setSelectedFacility = (value) =>{
    this.setState({selectedFacility: value})
  }
  
  onReset = () => {
    const { onClose } = this.props;
    onClose()
    this.formRef.current.resetFields();
  };

  onCancel = () => {
    this.onReset()
  }

  onFinish = (values) => {
    const { setActiveCases } = this.props;
    const date = values.contagionDate.format('YYYY/MM/DD');
    values.contagionDate = date;
    console.log(values);
    setActiveCases(values);
    this.onReset()
  };

  disabledDate = (current) => {
    return  current > moment().endOf('day');
  }

  render() {
    const { visible, onClose, facilities } = this.props;
    const dateFormat = 'YYYY/MM/DD'
    return (
      <Modal footer={null} title="Registrar caso positivo" visible={visible} onCancel={onClose}>
        <Form ref={this.formRef} layout="vertical" onFinish={this.onFinish} validateMessages={validateMessages}>
          <Row gutter={24}>
            <Col span={24}>
            <Form.Item name="employeeId" label="Empleado" rules={[{ required: true, }]}>
                <Select
                  showSearch
                  placeholder="Selecciona el empleado"
                  allowClear
                  filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {facilities.map(({facilityName, employees}) => (
                    <OptGroup label={facilityName}>
                      {employees.map(({name, id }) => (
                        <Option value={id}>{name}</Option>
                      ))}
                    </OptGroup>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="contagionDate"
                label="Fecha de prueba positiva"
                rules={[
                  { type: 'date',
                    required: true }
                ]}
              >
                <DatePicker 
                  placeholder = "Seleccionar fecha"
                  format = {dateFormat}
                  disabledDate = {this.disabledDate}
                />
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
                  type="button" onClick={this.onReset}>
                  Cancelar
                </Button>
                <Button type="primary" htmlType="submit">
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

export default AddCaseView
