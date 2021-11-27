/* eslint-disable no-template-curly-in-string */
import React, { Component } from 'react'
import { Modal, Form, Input, Button, Select, Row, Col, Popconfirm } from 'antd';
import {
  DeleteOutlined
} from "@ant-design/icons";
const { Option } = Select;

const validateMessages = {
  required: '¡${label} es requerido!',
  pattern: '${label} no tiene el formato correcto.',
  types: {
    email: '¡${label} no es un correo válido!',
  },
};

const initialState = {
  selectedFacility: null,
  currentBeacon: null,
}

class EditEmployeeView extends Component {
  formRef = React.createRef();
  onReset = () => {
    const { onClose } = this.props;
    onClose()
    this.formRef.current.resetFields();
  };

  constructor(props) {
    super(props)

    this.state = initialState
  }

  componentDidUpdate = (prevProps) => {
    const { visible } = this.props;
    if (visible && prevProps.visible !== visible) {
      this.setFormState()
    }
  }

  setFormState = () => {
    const { employee } = this.props
    const lastNames = employee?.lastNames.split(' ');
    if (lastNames && lastNames.length === 2) {
      const values = { firstLastName: lastNames[0], secondLastName: lastNames[1], ...employee };
      delete values.lastNames;
      this.formRef.current.setFieldsValue(values);
    }
    else
      this.formRef.current.setFieldsValue(employee);

    const { idFacility, idBeacon, macAddress } = employee;

    this.setState({ selectedFacility: idFacility, currentBeacon: {idBeacon, macAddress} })

  }

  onCancel = () => {
    this.onReset()
  }
  onFinish = (values) => {
    const { employee, modifyEmployee } = this.props;
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
    modifyEmployee({ idEmployee: employee.idEmployee, ...values });
    this.onReset()
  };

  deleteEmployee = (employee) => {
    const { removeEmployee, setEditEmployeeVisible } = this.props;
    const idEmployee = employee.idEmployee;

    removeEmployee(idEmployee);
    setEditEmployeeVisible(false);
  }

  changePrivilegeLevels = (prop) => {
    this.setState({ selectedFacility: prop })
    this.formRef.current.setFieldsValue({ idPrivilegeLevel: null })

  }

  render() {
    const { visible, facilities, privilegeLevels, employee, beacons: propsBeacons } = this.props;
    const { selectedFacility, currentBeacon } = this.state
    let beacons = [...propsBeacons]
    if (currentBeacon) {
      beacons.push(currentBeacon)
    }
    return (
      <Modal footer={null} title="Editar empleado" visible={visible} onCancel={this.onCancel}>
        <Row justify="end">
          <Popconfirm
            title="¿Seguro que quieres borrar este empleado?"
            onConfirm={() => this.deleteEmployee(employee)}
            okText="Confirmar"
            cancelText="Cancelar"
            okButtonProps={{ shape: "round" }}
            cancelButtonProps={{ shape: "round" }}
          >
            <Button
              type="danger"
              shape="round"
              icon={<DeleteOutlined />}
            />
          </Popconfirm>
        </Row>
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
            <Col span={24}>
              <Form.Item name="idBeacon" label="Beacons ya registrados" rules={[{ required: true, }]}>
                <Select
                  showSearch
                  placeholder="Selecciona el beacon"
                  allowClear
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {beacons.map(({ idBeacon, macAddress }) => (
                    <Option value={idBeacon}>{macAddress}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item name="idFacility" label="Edificio" rules={[{ required: true, }]} >
                <Select
                  placeholder="Selecciona el edificio del empleado"
                  allowClear
                  onChange={this.changePrivilegeLevels}
                >
                  {facilities.map(({ idFacility, name }) => (
                    <Option key={idFacility} value={idFacility}>{name}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="idPrivilegeLevel" label="Rol" rules={[{ required: true, }]}>
                <Select
                  placeholder="Selecciona el rol"
                  allowClear
                  disabled={!selectedFacility}
                >
                  {privilegeLevels.filter((privilegeLevel) => privilegeLevel.idFacility === selectedFacility).map(({ idPrivilegeLevel, name }) => (
                    <Option value={idPrivilegeLevel}>{name}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
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

export default EditEmployeeView
