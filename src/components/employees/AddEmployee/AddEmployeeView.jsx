/* eslint-disable no-template-curly-in-string */
import React, { Component } from 'react'
import { Modal, Form, Input, Button, Select, Row, Col, Switch } from 'antd';
import MaskedInput from 'antd-mask-input'

const { Option } = Select;

const validateMessages = {
  required: '¡${label} es requerido!',
  pattern: '${label} no tiene el formato correcto.',
  types: {
    email: '¡${label} no es un correo válido!',
  },
};

class AddEmployeeView extends Component {
  formRef = React.createRef();
  onReset = () => {
    const { onClose } = this.props;
    onClose()
    this.formRef.current.resetFields();
  };

  constructor(props) {
    super(props)
  
    this.state = {
       newMacAddress: true,
    }
  }

  onCancel = () => {
    this.onReset()
  }
  onFinish = (values) => {
    const { addEmployee } = this.props;

    let fName = values.name.trim();
    fName = fName.split(' ');
    for (var i = 0; i < fName.length; i++) {
      fName[i] = fName[i].charAt(0).toUpperCase() + fName[i].slice(1);
    }
    const ucName = fName.join(' ');

    let fLName = values.firstLastName.trim();
    fLName = fLName.split(' ');
    for (var index = 0; index < fLName.length; index++) {
      fLName[index] = fLName[index].charAt(0).toUpperCase() + fLName[index].slice(1);
    }
    const uc1LName = fLName.join(' ');

    let sLName = values.secondLastName.trim();
    sLName = sLName.split(' ');
    for (var slNameIndex = 0; slNameIndex < sLName.length; slNameIndex++) {
      sLName[slNameIndex] = sLName[slNameIndex].charAt(0).toUpperCase() + sLName[slNameIndex].slice(1);
    }
    const uc2LName = sLName.join(' ');

    values.name = ucName;
    values.firstLastName = uc1LName;
    values.secondLastName = uc2LName;
    addEmployee(values)
    this.onReset()
  };

  changeMacAddress = () => {
    const { newMacAddress } = this.state
    this.formRef.current.setFieldsValue({macAddress: ""})
    this.setState({newMacAddress:!newMacAddress})
  }

  changePrivilegeLevels = (prop) =>{
    const { setSelectedFacility } =this.props
    this.formRef.current.setFieldsValue({idPrivilegeLevel: null})
    setSelectedFacility(prop)
  }
  render() {
    const { visible, onClose, facilities, privilegeLevels, beacons, selectedFacility } = this.props;
    const { newMacAddress } = this.state
    return (
      <Modal footer={null} title="Añadir empleado" visible={visible} onCancel={onClose}>
        <Form ref={this.formRef} layout="vertical" onFinish={this.onFinish} validateMessages={validateMessages}>
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item
                name="name"
                label="Nombre"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="firstLastName"
                label="Apellido paterno"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="secondLastName"
                label="Apellido materno"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="email"
                label="Dirección de correo electrónico"
                rules={[
                  {
                    type: 'email',
                    required: false,
                  },
                ]}
              >
                <Input placeholder="ejemplo@correo.com" />
              </Form.Item>
            </Col>
            <Row gutter={0} justify="end">
              <Switch
                onChange={this.changeMacAddress}
                size="small"
              />
              <h5 style={{paddingLeft:10}}>Cambiar entre beacon nuevo o beacon ya registrado</h5>
            </Row>
            {(!newMacAddress) ? (
            <Col span={24}>
              <Form.Item name="macAddress" label="Beacons ya registrados" rules={[{ required: true, }]}>
                <Select
                  showSearch
                  placeholder="Selecciona el beacon"
                  allowClear
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {beacons.map(({idBeacon, macAddress}) => (
                    <Option value={idBeacon}>{macAddress}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            )
            : (
            <Col span={24}>
              <Form.Item
                name="macAddress"
                label="Dirección MAC (Beacon)"
                rules={[
                  { required: true, pattern: /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/}
                ]}
              >
                <MaskedInput mask="##:##:##:##:##:##" placeholder="00:00:00:00:00:00"/>
              </Form.Item>
            </Col>  
            
            )}
            <Col span={12}>
              <Form.Item name="idFacility" label="Edificio" rules={[{ required: true, }]}>
                <Select
                  placeholder="Selecciona el edificio del empleado"
                  allowClear
                  onChange={this.changePrivilegeLevels}
                >
                  {facilities.map(({ idFacility, name }) => (
                    <Option value={idFacility}>{name}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            {selectedFacility && (
              <Col span={12}>
                <Form.Item name="idPrivilegeLevel" label="Rol" rules={[{ required: true, }]}>
                  <Select
                    showSearch
                    placeholder="Selecciona el rol"
                    allowClear
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {privilegeLevels.map(({idPrivilegeLevel, name}) => (
                      <Option value={idPrivilegeLevel}>{name}</Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            )
            }
            <Col span={12}>
              <Form.Item name="internalId" label="Matricula">
                <Input placeholder="Identificador interno" />
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

export default AddEmployeeView
