/* eslint-disable no-template-curly-in-string */
import React, { Component } from 'react'
import { Modal, Form, Input, Button, Select, Row, Col, DatePicker } from 'antd';

const { Option } = Select;

const validateMessages = {
  required: '¡${label} es requerido!',
  pattern: '${label} no tiene el formato correcto.',
  types: {
    email: '¡${label} no es un correo válido!',
  },
};

class AddVisitorView extends Component {
  formRef = React.createRef();
  constructor(props) {
    super(props)

    this.state = {
      beacons: [],
    }
  }


  componentDidUpdate = (prevProps) => {
    const { visible } = this.props;
    if (visible && prevProps.visible === false) {
      this.setBeacons()
    }
  }

  setBeacons = async () => {
    const data = [
      {
        "idOrganization": 1,
        "idFacility": 1,
        "idBeacon": 6,
        "macAddress": "a1:a1:a1:a1:a1:a2",
        "idPrivilegeLevel": 1,
        "isActive": 1,
        "CreatedBy": null,
        "CreationDate": null,
        "UpdatedBy": null,
        "UpdatedDate": null,
        "deletedAt": null,
        "sizeX": 100,
        "sizeY": 100,
        "name": "UDEM",
        "address": "morones prieto 400",
        "phoneNumber": "82657894"
      },
      {
        "idOrganization": 1,
        "idFacility": 1,
        "idBeacon": 7,
        "macAddress": "a1:a1:a1:a1:a1:a3",
        "idPrivilegeLevel": 1,
        "isActive": 1,
        "CreatedBy": null,
        "CreationDate": null,
        "UpdatedBy": null,
        "UpdatedDate": null,
        "deletedAt": null,
        "sizeX": 100,
        "sizeY": 100,
        "name": "UDEM",
        "address": "morones prieto 400",
        "phoneNumber": "82657894"
      },
      {
        "idOrganization": 1,
        "idFacility": 1,
        "idBeacon": 8,
        "macAddress": "00:00:00:00:00:00",
        "idPrivilegeLevel": 1,
        "isActive": 1,
        "CreatedBy": null,
        "CreationDate": null,
        "UpdatedBy": null,
        "UpdatedDate": null,
        "deletedAt": null,
        "sizeX": 100,
        "sizeY": 100,
        "name": "UDEM",
        "address": "morones prieto 400",
        "phoneNumber": "82657894"
      },
      {
        "idOrganization": 1,
        "idFacility": 1,
        "idBeacon": 9,
        "macAddress": "1a:1a:1a:1a:1a:1a",
        "idPrivilegeLevel": 1,
        "isActive": 1,
        "CreatedBy": null,
        "CreationDate": null,
        "UpdatedBy": null,
        "UpdatedDate": null,
        "deletedAt": null,
        "sizeX": 100,
        "sizeY": 100,
        "name": "UDEM",
        "address": "morones prieto 400",
        "phoneNumber": "82657894"
      },
      {
        "idOrganization": 1,
        "idFacility": 1,
        "idBeacon": 10,
        "macAddress": "1a:1a:1a:1a:1a:1b",
        "idPrivilegeLevel": 1,
        "isActive": 1,
        "CreatedBy": null,
        "CreationDate": null,
        "UpdatedBy": null,
        "UpdatedDate": null,
        "deletedAt": null,
        "sizeX": 100,
        "sizeY": 100,
        "name": "UDEM",
        "address": "morones prieto 400",
        "phoneNumber": "82657894"
      },
      {
        "idOrganization": 1,
        "idFacility": 1,
        "idBeacon": 12,
        "macAddress": "3a:3a:3a:3a:3a:3a",
        "idPrivilegeLevel": 1,
        "isActive": 1,
        "CreatedBy": null,
        "CreationDate": null,
        "UpdatedBy": null,
        "UpdatedDate": null,
        "deletedAt": null,
        "sizeX": 100,
        "sizeY": 100,
        "name": "UDEM",
        "address": "morones prieto 400",
        "phoneNumber": "82657894"
      },
      {
        "idOrganization": 1,
        "idFacility": 1,
        "idBeacon": 13,
        "macAddress": "5a:5a:5a:5a:5a:5a",
        "idPrivilegeLevel": 1,
        "isActive": 1,
        "CreatedBy": null,
        "CreationDate": null,
        "UpdatedBy": null,
        "UpdatedDate": null,
        "deletedAt": null,
        "sizeX": 100,
        "sizeY": 100,
        "name": "UDEM",
        "address": "morones prieto 400",
        "phoneNumber": "82657894"
      },
      {
        "idOrganization": 1,
        "idFacility": 2,
        "idBeacon": 11,
        "macAddress": "2a:2a:2a:2a:2a:2a",
        "idPrivilegeLevel": 1,
        "isActive": 1,
        "CreatedBy": null,
        "CreationDate": null,
        "UpdatedBy": null,
        "UpdatedDate": null,
        "deletedAt": null,
        "sizeX": 70,
        "sizeY": 120,
        "name": "UDEM",
        "address": "morones prieto 400",
        "phoneNumber": "82657894"
      }
    ];
    this.setState({ beacons: data })
  }

  onReset = () => {
    const { onClose } = this.props;
    onClose()
    this.setState({ beacons: [] })
    this.formRef.current.resetFields();
  };

  onCancel = () => {
    this.onReset()
  }
  onFinish = (values) => {

    const fName = values.name.split(' ');
    for (var i = 0; i < fName.length; i++) {
      fName[i] = fName[i].charAt(0).toUpperCase() + fName[i].slice(1);
    }
    const ucName = fName.join(' ');

    const fLName = values.firstLastName.split(' ');
    for (var index = 0; index < fLName.length; index++) {
      fLName[index] = fLName[index].charAt(0).toUpperCase() + fLName[index].slice(1);
    }
    const uc1LName = fLName.join(' ');

    const sLName = values.secondLastName.split(' ');
    for (var slNameIndex = 0; slNameIndex < sLName.length; slNameIndex++) {
      sLName[slNameIndex] = sLName[slNameIndex].charAt(0).toUpperCase() + sLName[slNameIndex].slice(1);
    }
    const uc2LName = sLName.join(' ');

    values.name = ucName;
    values.firstLastName = uc1LName;
    values.secondLastName = uc2LName;
    console.log(values)
    this.onReset()
  };

  render() {
    const { visible, onClose } = this.props;
    const { beacons } = this.state;
    return (
      <Modal footer={null} title="Añadir visitor" visible={visible} onCancel={onClose}>
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
                    required: true,
                  },
                ]}
              >
                <Input placeholder="ejemplo@correo.com" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="idBeacon" label="Rol" rules={[{ required: true, }]}>
                <Select
                  showSearch
                  placeholder="Selecciona el rol"
                  allowClear
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {beacons.map(({ idBeacon }) => (
                    <Option value={idBeacon}>{idBeacon}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="internalId" label="Fecha limite">
                <DatePicker showTime />
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

export default AddVisitorView
