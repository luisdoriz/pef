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
    email: '¡${label} no es un correo valido!',
  },
};

class EditEmployeeView extends Component {
  formRef = React.createRef();
  onReset = () => {
    const { onClose } = this.props;
    onClose()
    this.formRef.current.resetFields();
  };

  componentDidUpdate = () => {
    const { visible } = this.props;
    if (visible) {
      this.setFormState()
    }
  }

  setFormState = () => {
    const { employee } = this.props
    const lastNames = employee?.lastNames.split(' ');
    if(lastNames.length === 2){
      const values = {firstLastName: lastNames[0], secondLastName: lastNames[1] ,...employee};
      delete values.lastNames;
      this.formRef.current.setFieldsValue(values);
    }
    else
      this.formRef.current.setFieldsValue(employee);

  }

  onCancel = () => {
    this.onReset()
  }
  onFinish = (values) => {
    const { employee, modifyEmployee } = this.props;
    modifyEmployee({idEmployee:employee.idEmployee, ...values});
    this.onReset()
  };

  deleteEmployee = (employee) => {
    const { removeEmployee, setEditEmployeeVisible } = this.props;
    const idEmployee = employee.idEmployee;

    removeEmployee(idEmployee);
    setEditEmployeeVisible(false);
  }

  render() {
    const { visible, onClose, facilities, roles, employee } = this.props;
    return (
      <Modal footer={null} title="Editar Empleado" visible={visible} onCancel={onClose}>
        <Row justify="end">
          <Popconfirm
              title="¿Seguro que quieres borrar este empleado?"
              onConfirm={() => this.deleteEmployee(employee)}
              okText="Confirmar"
              cancelText="Cancelar"
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
                label="Direccion de correo electronico"
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
              <Form.Item
                name="macAddress"
                label="Direccion MAC (Beacon)"
                rules={[
                  { required: true, pattern: /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/ }
                ]}
              >
                <Input placeholder="00:00:00:00:00:00" />
              </Form.Item>
            </Col>
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
                  {roles.map(({idPrivilegeLevel, name}) => (
                    <Option value={idPrivilegeLevel}>{name}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="idFacility" label="Edificio" rules={[{ required: true, }]}>
                <Select
                  placeholder="Selecciona el edificio del empleado"
                  allowClear
                >
                  {facilities.map(({ idFacility, name }) => (
                    <Option value={idFacility}>{name}</Option>
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

export default EditEmployeeView
