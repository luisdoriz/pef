/* eslint-disable no-template-curly-in-string */
import React, { Component } from 'react'
import { Modal, Form, Input, Button, Row, Col, Popconfirm, Select } from 'antd';
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
    const { user } = this.props
    this.formRef.current.setFieldsValue(user);

  }

  onCancel = () => {
    this.onReset()
  }
  onFinish = (values) => {
    this.onReset();
    const { editUser, user } = this.props;
    editUser({ idUser: user.idUser, ...values });
  };

  deleteUser = (user) => {
    const { removeUser, setEditUserVisible } = this.props;
    const idUser = user.idUser;
    removeUser(idUser);
    setEditUserVisible(false);
  }

  render() {
    const { visible, onClose, user, roles } = this.props;
    return (
      <Modal footer={null} title="Editar usuario" visible={visible} onCancel={onClose}>
        <Row justify="end">
          <Popconfirm
            title="¿Seguro que quieres borrar esta alerta?"
            onConfirm={() => this.deleteUser(user)}
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
        <Form ref={this.formRef} layout="vertical" onFinish={this.onFinish} validateMessages={validateMessages} style={{ paddingTop: 16 }}>
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
              <Form.Item name="idRole" label="Rol" rules={[{ required: true, }]}>
                <Select
                  showSearch
                  placeholder="Selecciona el rol"
                  allowClear
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {roles.map(({ idRole, name }) => (
                    <Option value={idRole}>{name}</Option>
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

export default EditEmployeeView
